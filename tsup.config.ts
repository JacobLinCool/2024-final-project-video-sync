import { readFileSync, writeFileSync } from 'node:fs';
import { defineConfig } from 'tsup';

export default defineConfig({
    entryPoints: ['src/index.ts'],
    format: ['esm'],
    clean: true,
    minify: false,
    treeshake: false,
    async onSuccess() {
        const content = readFileSync('dist/index.js', 'utf-8');
        const header = readFileSync('src/header.ts', 'utf-8');
        writeFileSync('dist/index.user.js', `${header}\n${content}`);
    },
});
