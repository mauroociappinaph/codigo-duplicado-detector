import { Project, SourceFile } from 'ts-morph';
import { getRangePositions } from '../utils/tsMorphUtils'; // Importar la función auxiliar

/**
 * Servicio para realizar operaciones de refactorización en archivos TypeScript/JavaScript
 * utilizando la librería ts-morph.
 */
export class RefactorService {
  private project: Project;

  /**
   * Crea una instancia de RefactorService.
   * @param project La instancia del proyecto ts-morph.
   */
  constructor(project: Project) {
    this.project = project;
  }

  /**
   * Extrae un bloque de código de un SourceFile y lo reemplaza con una llamada a una nueva función.
   * @param sourceFile El archivo fuente de ts-morph donde se realizará la extracción.
   * @param startLine La línea de inicio del bloque de código a extraer (basada en 1).
   * @param endLine La línea de fin del bloque de código a extraer (basada en 1).
   * @param newFunctionName El nombre de la nueva función a crear.
   * @returns true si la extracción fue exitosa, false en caso contrario.
   */
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
