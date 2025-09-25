import * as vscode from 'vscode';

export class RefactorProvider implements vscode.CodeActionProvider {
  public provideCodeActions(
    _document: vscode.TextDocument,
    _range: vscode.Range | vscode.Selection,
    _context: vscode.CodeActionContext,
    _token: vscode.CancellationToken
  ): vscode.ProviderResult<(vscode.Command | vscode.CodeAction)[]> {
    // Lógica para generar Quick Fixes
    return [];
  }
}
