import { createJson } from "./modules";
import { join } from 'path';

const tsconfigJson: object = {
  compilerOptions: {
    incremental: true,
    composite: false,
    target: "ESNext",
    lib: [
      "ESNext",
      "DOM",
    ],
    experimentalDecorators: true,
    emitDecoratorMetadata: true,
    module: "Preserve",
    moduleDetection: "force",
    baseUrl: "./",
    noResolve: false,
    allowJs: false,
    checkJs: false,
    declaration: true,
    declarationMap: false,
    emitDeclarationOnly: false,
    outDir: "./out",
    importHelpers: true,
    newLine: "lf",
    forceConsistentCasingInFileNames: true,
    strict: true,
    skipLibCheck: true,
    noImplicitAny: true,
    noFallthroughCasesInSwitch: true,
    noUncheckedIndexedAccess: true,
    noImplicitOverride: true,
    strictNullChecks: true,
    strictFunctionTypes: true,
    strictBindCallApply: true,
    strictPropertyInitialization: true,
    noImplicitThis: true
  }
}

export const tsconfig = async (): Promise<void> => {
  await createJson(tsconfigJson, join(process.cwd(), '.selize', 'tsconfig.json'))
}