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
  const startLineIndex = startLine - 1;
  const endLineIndex = endLine - 1;

  const lines = sourceFile.getFullText().split('\n');

  let startPos = 0;
  for (let i = 0; i < startLineIndex; i++) {
    startPos += lines[i].length + 1; // +1 para el carácter de nueva línea
  }

  let endPos = startPos;
  for (let i = startLineIndex; i <= endLineIndex; i++) {
    endPos += lines[i].length + 1; // +1 para el carácter de nueva línea
  }
  // Ajustar endPos si se excede la longitud del archivo (ej. la última línea no tiene un salto de línea final)
  endPos = Math.min(endPos, sourceFile.getFullText().length);

  return { startPos, endPos };
}
