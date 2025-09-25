import * as vscode from 'vscode';
import { DetectionService } from './services/detectionService';

export function activate(context: vscode.ExtensionContext) {
  console.log('🚀 "codigo-duplicado-detector" activado.');

  const detectionService = new DetectionService();

  const commands = [
    vscode.commands.registerCommand('duplicate-code-detector.detect', () =>
      handleDetection(detectionService)
    ),
  ];

  context.subscriptions.push(...commands);
}

async function handleDetection(detectionService: DetectionService) {
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
        await detectionService.run(workspacePath);
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
