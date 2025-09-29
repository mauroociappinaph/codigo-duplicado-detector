import * as vscode from 'vscode';
import { spawn, Thread, Worker } from 'threads';
import { IClone, IOptions } from '@jscpd/core';

/**
 * Servicio para manejar la detección de código duplicado.
 * Encapsula la lógica de la librería jscpd.
 */
export class DetectionService {
  /**
   * Crea una instancia de DetectionService.
   */
  constructor() {
    // Inicialización
  }

  /**
   * Ejecuta el análisis de código duplicado en el workspace.
   * @param workspacePath La ruta del workspace a analizar.
   * @returns Una promesa que resuelve con el reporte de duplicados.
   */
  public async run(workspacePath: string): Promise<IClone[]> {
    vscode.window.showInformationMessage(
      'Ejecutando detección de duplicados...'
    );

    const config = vscode.workspace.getConfiguration('codeDuplicateDetector');
    const minLines = config.get<number>('minLines', 5);
    const minTokens = config.get<number>('minTokens', 50);
    const ignore = config.get<string[]>('ignore', []);

    const options: IOptions = {
      path: [workspacePath],
      minLines,
      minTokens,
      ignore,
      // Otras opciones que quieras pasar
    };

    const worker = await spawn(new Worker('./detection.worker.js'));

    try {
      const clones = await worker.detect(options);
      vscode.window.showInformationMessage(
        `Detección de duplicados finalizada. Se encontraron ${clones.length} clones.`
      );
      return clones;
    } catch (error) {
      vscode.window.showErrorMessage(
        `Error en la detección de duplicados: ${error}`
      );
      return [];
    } finally {
      await Thread.terminate(worker);
    }
  }
}
