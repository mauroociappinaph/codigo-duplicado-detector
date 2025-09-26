import * as vscode from 'vscode';

/**
 * Provee acciones de código (Quick Fixes) para el código duplicado detectado.
 * Implementa la interfaz vscode.CodeActionProvider.
 */
export class RefactorProvider implements vscode.CodeActionProvider {
  /**
   * Provee las acciones de código disponibles para el rango de selección dado.
   * @param _document El documento de texto en el que se solicitan las acciones.
   * @param _range El rango o selección para el que se solicitan las acciones.
   * @param _context Contexto en el que se solicitan las acciones.
   * @param _token Un token de cancelación.
   * @returns Un array de comandos o acciones de código.
   */
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
