import { Project, SourceFile } from 'ts-morph';
import { RefactorService } from '../services/refactorService'; // Importar el RefactorService

describe('RefactorService', () => {
  // Cambiado el nombre del describe
  let project: Project;
  let refactorService: RefactorService;
  let mockSourceFile: SourceFile;
  let consoleSpy: jest.SpyInstance;

  beforeEach(() => {
    project = new Project({
      tsConfigFilePath: './tsconfig.json',
    });
    refactorService = new RefactorService(project);

    // Crear un SourceFile mock para las pruebas
    mockSourceFile = project.createSourceFile(
      'testFile.ts',
      `line 1 content
line 2 content
line 3 content
line 4 content
line 5 content
line 6 content
`
    ); // Corrected: Removed leading newline
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {}); // Mock console.log
  });

  afterEach(() => {
    consoleSpy.mockRestore(); // Restaurar console.log después de cada prueba
  });

  it('should be able to initialize ts-morph project', () => {
    expect(project).toBeDefined();
  });

  it('should extract the correct text for a given line range', () => {
    const startLine = 2; // Corresponde a "line 2 content"
    const endLine = 4; // Corresponde a "line 4 content"
    const expectedText = `line 2 content
line 3 content
line 4 content
`; // Incluye los saltos de línea

    refactorService.extractFunction(
      mockSourceFile,
      startLine,
      endLine,
      'testFunction'
    );

    // Verificar que el console.log fue llamado con el texto esperado
    expect(consoleSpy).toHaveBeenCalledWith('Text to extract:', expectedText);
  });

  // Aquí irán más pruebas para la lógica de refactorización
});
