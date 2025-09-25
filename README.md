# Detector de Código Duplicado

Esta extensión para Visual Studio Code te ayuda a encontrar y refactorizar código duplicado en tu proyecto.

## Características

- Análisis de código para detectar bloques duplicados.
- Integración con el panel de "Problemas" de VS Code.
- Sugerencias de refactorización "Quick Fix" para solucionar duplicados.

## Configuración

Puedes personalizar el comportamiento de la extensión a través de tu `settings.json` o la interfaz de configuración de VS Code.

- **`codeDuplicateDetector.minLines`**
  - **Descripción:** Número mínimo de líneas para que un bloque sea considerado duplicado. (Corresponde a 'minLines' de jscpd).
  - **Tipo:** `number`
  - **Default:** `5`

- **`codeDuplicateDetector.minTokens`**
  - **Descripción:** Número mínimo de tokens (palabras, símbolos) para que un bloque sea considerado duplicado. Es más preciso que las líneas. (Corresponde a 'minTokens' de jscpd).
  - **Tipo:** `number`
  - **Default:** `50`

- **`codeDuplicateDetector.ignore`**
  - **Descripción:** Lista de patrones 'glob' para ignorar archivos y carpetas en el análisis. (Corresponde a 'ignore' de jscpd).
  - **Tipo:** `array`
  - **Default:** `["**/node_modules/**", "**/.git/**", "**/dist/**", "**/*.md"]`

- **`codeDuplicateDetector.useGitignore`**
  - **Descripción:** Si es `true`, utilizará las reglas del archivo `.gitignore` del proyecto para ignorar archivos. (Corresponde a 'gitignore' de jscpd).
  - **Tipo:** `boolean`
  - **Default:** `true`
