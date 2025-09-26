import { SourceFile } from 'ts-morph';

/**
 * Calcula las posiciones de inicio y fin de carácter para un rango de líneas dado en un SourceFile.
 * @param sourceFile El archivo fuente de ts-morph.
 * @param startLine El número de línea de inicio (basado en 1).
 * @param endLine El número de línea de fin (basado en 1).
 * @returns Un objeto con las propiedades startPos y endPos (basadas en 0).
 */
export function getRangePositions(
  sourceFile: SourceFile,
  startLine: number,
  endLine: number
): { startPos: number; endPos: number } {
  const lines = sourceFile.getFullText().split('\n');

  // Calcular startPos (posición del primer carácter de la línea de inicio)
  let startPos = 0;
  for (let i = 0; i < startLine - 1; i++) {
    startPos += lines[i].length + 1; // +1 para el carácter de nueva línea
  }

  // Calcular endPos (posición del primer carácter de la línea *después* de la línea final)
  let endPos = 0;
  for (let i = 0; i < endLine; i++) {
    // Loop up to endLine (exclusive of endLine)
    endPos += lines[i].length + 1; // +1 para el carácter de nueva línea
  }
  // Ajustar endPos si se excede la longitud del archivo (ej. la última línea no tiene un salto de línea final)
  endPos = Math.min(endPos, sourceFile.getFullText().length);

  return { startPos, endPos };
}
