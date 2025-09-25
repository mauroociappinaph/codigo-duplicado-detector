import { Project, SourceFile } from 'ts-morph';

export class RefactorService {
  private project: Project;

  constructor(project: Project) {
    this.project = project;
  }

  public extractFunction(
    sourceFile: SourceFile,
    startLine: number,
    endLine: number,
    newFunctionName: string
  ): boolean {
    console.log(
      `Extracting function '${newFunctionName}' from ${sourceFile.getBaseName()} lines ${startLine}-${endLine}`
    );

    // ts-morph usa índices de línea basados en 0, y las líneas de VS Code son basadas en 1.
    // startLine y endLine vienen de VS Code (basadas en 1).
    const startLineIndex = startLine - 1;
    const endLineIndex = endLine - 1;

    const lines = sourceFile.getFullText().split('\n');

    let startPos = 0;
    for (let i = 0; i < startLineIndex; i++) {
      startPos += lines[i].length + 1; // +1 for the newline character
    }

    let endPos = startPos;
    for (let i = startLineIndex; i <= endLineIndex; i++) {
      endPos += lines[i].length + 1; // +1 for the newline character
    }
    // Ajustar endPos si se excede la longitud del archivo (ej. la última línea no tiene un salto de línea final)
    endPos = Math.min(endPos, sourceFile.getFullText().length);

    const textToExtract = sourceFile.getFullText().substring(startPos, endPos);
    console.log('Text to extract:', textToExtract);

    // Placeholder: Aquí iría la implementación real de ts-morph para la refactorización
    // Por ahora, solo imprimimos el texto.
    return true; // Retorno temporal
  }
}
