import * as vscode from 'vscode';

export class ProblemsProvider implements vscode.HoverProvider {
  private diagnosticCollection: vscode.DiagnosticCollection;
  private duplicateDecorationType: vscode.TextEditorDecorationType;
  private diagnostics: vscode.Diagnostic[] = []; // Para almacenar los diagnósticos y usarlos en el hover

  constructor() {
    this.diagnosticCollection =
      vscode.languages.createDiagnosticCollection('duplicate-code');

    this.duplicateDecorationType = vscode.window.createTextEditorDecorationType(
      {
        backgroundColor: 'rgba(255, 255, 0, 0.3)', // Amarillo semi-transparente
        overviewRulerLane: vscode.OverviewRulerLane.Right,
        overviewRulerColor: 'yellow',
      }
    );
  }

  // El 'report' real vendrá de jscpd. Por ahora, creamos un diagnóstico de ejemplo.
  public update(_report: unknown) {
    // Fix 1 & 2
    this.diagnosticCollection.clear();
    this.clearDecorations();
    this.diagnostics = []; // Limpiar diagnósticos anteriores

    // --- Lógica TEMPORAL para crear un diagnóstico de ejemplo ---
    // Esto se reemplazará cuando tengamos el reporte real de jscpd
    if (vscode.window.activeTextEditor) {
      const editor = vscode.window.activeTextEditor;
      const range = new vscode.Range(
        new vscode.Position(0, 0),
        new vscode.Position(0, 5)
      ); // Ejemplo: primeras 5 letras de la primera línea
      const diagnostic = new vscode.Diagnostic(
        range,
        'Ejemplo de código duplicado (T-07.4)',
        vscode.DiagnosticSeverity.Warning
      );
      diagnostic.code = 'duplicate-code';
      diagnostic.source = 'Duplicate Code Detector';
      this.diagnostics.push(diagnostic);
      this.diagnosticCollection.set(editor.document.uri, [diagnostic]);
      this.applyDecorations(editor, [range]);
    }
    // --- Fin de lógica TEMPORAL ---
  }

  public clear() {
    this.diagnosticCollection.clear();
    this.clearDecorations();
    this.diagnostics = [];
  }

  private clearDecorations() {
    vscode.window.visibleTextEditors.forEach((editor) => {
      editor.setDecorations(this.duplicateDecorationType, []);
    });
  }

  private applyDecorations(editor: vscode.TextEditor, ranges: vscode.Range[]) {
    editor.setDecorations(this.duplicateDecorationType, ranges);
  }

  // Implementación del HoverProvider
  public provideHover(
    document: vscode.TextDocument,
    position: vscode.Position,
    _token: vscode.CancellationToken // Fix 3
  ): vscode.ProviderResult<vscode.Hover> {
    // Buscar si hay un diagnóstico en la posición actual
    const diagnostic = this.diagnostics.find((d) => d.range.contains(position));

    if (diagnostic) {
      const contents = new vscode.MarkdownString(
        `**Código Duplicado Detectado**\n\n${diagnostic.message}\n\n[Más detalles...](https://example.com/details)`
      );
      contents.isTrusted = true;
      return new vscode.Hover(contents, diagnostic.range);
    }
    return undefined;
  }
}
