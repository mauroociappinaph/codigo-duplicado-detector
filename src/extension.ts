import * as vscode from 'vscode';
import { DetectionService } from './services/detectionService';
import { ProblemsProvider } from './providers/problemsProvider'; // Importar el ProblemsProvider

export function activate(context: vscode.ExtensionContext) {
  console.log('🚀 "codigo-duplicado-detector" activado.');

  const detectionService = new DetectionService();
  const problemsProvider = new ProblemsProvider(); // Crear instancia del ProblemsProvider

  // Registrar el HoverProvider
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { scheme: 'file', language: '*' }, // Registrar para todos los archivos
      problemsProvider
    )
  );

  const commands = [
    vscode.commands.registerCommand(
      'duplicate-code-detector.detect',
      () => handleDetection(detectionService, problemsProvider) // Pasar problemsProvider
    ),
  ];

  context.subscriptions.push(...commands);
}

async function handleDetection(
  detectionService: DetectionService,
  problemsProvider: ProblemsProvider // Recibir problemsProvider
) {
  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (!workspaceFolders?.length) {
    vscode.window.showErrorMessage(
      '⚠️ Abre un proyecto o workspace para analizar.'
    );
    return;
  }

  const workspacePath = workspaceFolders[0].uri.fsPath;

  try {
    await vscode.window.withProgress(
      {
        location: vscode.ProgressLocation.Notification,
        title: 'Detectando código duplicado...',
        cancellable: false,
      },
      async () => {
        const report = await detectionService.run(workspacePath);
        problemsProvider.update(report); // Actualizar el ProblemsProvider con el reporte
      }
    );

    vscode.window.showInformationMessage('✅ Análisis completado con éxito.');
  } catch (err: unknown) {
    let message = 'Ocurrió un error desconocido';
    if (err instanceof Error) {
      message = err.message;
    }
    vscode.window.showErrorMessage(`❌ Error en la detección: ${message}`);
  }
}

export function deactivate() {
  console.log('🛑 "codigo-duplicado-detector" desactivado.');
}
