import * as vscode from 'vscode';
import { DetectionService } from './services/detectionService'; // Importar el servicio

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "codigo-duplicado-detector" is now active!'
  );

  // Crear una instancia del servicio
  const detectionService = new DetectionService();

  // Registrar el nuevo comando
  const disposable = vscode.commands.registerCommand(
    'duplicate-code-detector.detect', // Usar el ID de nuestro comando
    () => {
      // Obtener el path del workspace actual
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (workspaceFolders && workspaceFolders.length > 0) {
        const workspacePath = workspaceFolders[0].uri.fsPath;
        // Llamar al método run del servicio
        detectionService.run(workspacePath);
      } else {
        vscode.window.showErrorMessage(
          'Por favor, abre un proyecto o workspace.'
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
