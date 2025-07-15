import { join } from 'path';
import fs from 'fs-extra';

import { tsconfig } from './createTsconfig';

interface SelizeFileConfig {
  path: string;
  handler?: (fullPath: string) => Promise<void>;
}

export const selizeFiles = async (): Promise<void> => {
  const filesList: SelizeFileConfig[] = [
    {
      path: '.selize/tsconfig.json',
      handler: tsconfig
    },
  ];

  for (const file of filesList) {
    const fullPath = join(process.cwd(), file.path);

    try {
      await fs.ensureFile(fullPath);

      const stats = await fs.stat(fullPath);

      if (stats.size === 0 && file.handler) {
        await file.handler(fullPath);
      }
    } catch (error) {
      console.error(`Failed to process file: ${fullPath}`, error);
    }
  }
};