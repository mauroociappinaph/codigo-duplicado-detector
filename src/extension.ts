import * as vscode from 'vscode';
import { DetectionService } from './services/detectionService';
import { ProblemsProvider } from './providers/problemsProvider';
import { Project } from 'ts-morph'; // Importar Project de ts-morph

export function activate(context: vscode.ExtensionContext) {
  console.log('🚀 "codigo-duplicado-detector" activado.');

  const detectionService = new DetectionService();
  const problemsProvider = new ProblemsProvider();

  // Registrar el HoverProvider
  context.subscriptions.push(
    vscode.languages.registerHoverProvider(
      { scheme: 'file', language: '*' },
      problemsProvider
    )
  );

  const commands = [
    vscode.commands.registerCommand('duplicate-code-detector.detect', () =>
      handleDetection(detectionService, problemsProvider)
    ),
    // Registrar el nuevo comando de refactorización
    vscode.commands.registerCommand(
      'duplicate-code-detector.refactor',
      async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
          vscode.window.showErrorMessage(
            'No hay ningún editor de texto activo.'
          );
          return;
        }

        const document = editor.document;
        if (document.uri.scheme !== 'file') {
          vscode.window.showErrorMessage(
            'Solo se pueden refactorizar archivos locales.'
          );
          return;
        }

        // Inicializar un proyecto de ts-morph
        const project = new Project({
          tsConfigFilePath: vscode.workspace.rootPath
            ? `${vscode.workspace.rootPath}/tsconfig.json`
            : undefined,
        });

        // Añadir el archivo activo al proyecto de ts-morph
        const sourceFile = project.addSourceFileAtPath(document.fileName);

        vscode.window.showInformationMessage(
          `ts-morph Project inicializado. Analizando: ${sourceFile.getBaseName()}`
        );
        // Aquí iría la lógica de refactorización con ts-morph
      }
    ),
  ];

  context.subscriptions.push(...commands);
}

async function handleDetection(
  detectionService: DetectionService,
  problemsProvider: ProblemsProvider
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
        problemsProvider.update(report);
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
