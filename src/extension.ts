import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Congratulations, your extension "codigo-duplicado-detector" is now active!'
  );

  const disposable = vscode.commands.registerCommand(
    'codigo-duplicado-detector.helloWorld',
    () => {
      vscode.window.showInformationMessage(
        'Hello World from Codigo Duplicado Detector!'
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
