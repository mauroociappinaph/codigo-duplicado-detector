import { Project, SourceFile } from 'ts-morph';
import { getRangePositions } from '../utils/tsMorphUtils'; // Importar la función auxiliar

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

    // Usar la función auxiliar para obtener las posiciones
    const { startPos, endPos } = getRangePositions(
      sourceFile,
      startLine,
      endLine
    );

    const textToExtract = sourceFile.getFullText().substring(startPos, endPos);
    console.log('Text to extract:', textToExtract);

    // Placeholder: Aquí iría la implementación real de ts-morph para la refactorización
    // Por ahora, solo imprimimos el texto.
    return true; // Retorno temporal
  }
}
