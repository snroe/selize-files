import fs from 'fs-extra';

/**
 * Create a formatted JSON file
 * @param {string|object} json - JSON object or string to write
 * @param {string} path - Absolute or relative file path
 */
export const createJson = async (json: string | object, path: string): Promise<void> => {
  let content: string | undefined;
  let hasHandled = false;

  if (typeof json === 'object' && json !== null) {
    content = JSON.stringify(json, null, 2);
    hasHandled = true;
  }

  if (typeof json === 'string') {
    try {
      const parsed = JSON.parse(json);
      content = JSON.stringify(parsed, null, 2);
      hasHandled = true;
    } catch (error) {
      throw new Error('Invalid JSON string provided');
    }
  }

  if (typeof json === 'undefined') {
    throw new TypeError('Input JSON is undefined');
  }

  if (json === null) {
    throw new TypeError('JSON input is null, which is not allowed');
  }

  if (!hasHandled) {
    throw new TypeError(
      `Expected a JSON object or string, but got ${typeof json}`
    );
  }

  if (!content) {
    throw new Error('Failed to generate content for JSON file');
  }

  await fs.writeFile(path, content, 'utf-8');
};