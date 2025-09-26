// src/test/__mocks__/vscode.ts
export const window = {
  showInformationMessage: jest.fn(),
};

export const workspace = {
  getConfiguration: jest.fn((section?: string) => {
    // Mockear el comportamiento de getConfiguration
    // Devolver un objeto con un método get para simular la configuración
    return {
      get: jest.fn((key: string) => {
        // Devolver valores por defecto o mocks específicos para las pruebas
        if (section === 'codeDuplicateDetector') {
          switch (key) {
            case 'minLines':
              return 5;
            case 'ignore':
              return ['**/node_modules/**'];
            case 'useGitignore':
              return true;
          }
        }
        return undefined;
      }),
    };
  }),
};
