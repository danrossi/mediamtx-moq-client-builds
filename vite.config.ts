import { resolve } from 'path';
import { defineConfig } from 'vite';

import { execSync } from 'node:child_process';

import { OutputOptions } from 'rolldown';

export interface PackageJson {
  name?: string;
  version: string;
  license: string;
  author: string;
  description: string;
  [key: string]: any; // Allows other unknown package.json properties
}

export function createBanner(
  pkg: PackageJson,
  moduleDesc: string = '',
): string {
  const date = new Date();
  return `/*! ${pkg.name} - ${pkg.version} - ${date.toDateString()}
 * ${pkg.description}
 * ${moduleDesc}
 * Copyright (c) ${date.getFullYear()} ${pkg.author}
 * Released under ${pkg.license} license
 */`;
}

interface ConfigMap {
  [key: string]: any | undefined;
}

const config: ConfigMap = {
  subscriber: {
    entry: resolve(import.meta.dirname, './src/reader.js'),
    description: 'MediaMTX MoQ Reader',
    name: 'mediamtx-moq-reader',
  },
  publisher: {
    entry: resolve(import.meta.dirname, './src/publisher.js'),
    description: 'MediaMTX MoQ Publisher',
    name: 'mediamtx-moq-publisher',
  },
};

let version = 'v1.0.0';
try {
  const raw = execSync(
    `cd mediamtx && git fetch --tags upstream && git describe --tags --always`,
    {
      stdio: ['ignore', 'pipe', 'ignore'],
      encoding: 'utf8',
    },
  ).trim();
  if (raw) {
    version = raw.split('-')[0];
  }
  console.log(version);
} catch {}

const currentConfig =
  process.env.LIB_NAME && config[process.env.LIB_NAME as string];
if (currentConfig === undefined) {
  throw new Error('LIB_NAME is not defined or is not valid');
}

let outDir = './dist',
  formats = ['es', 'iife'];

if (process.env.OUT_DIR) {
  outDir = process.env.OUT_DIR;
}

if (process.env.FORMATS) {
  formats = process.env.FORMATS.split(',');
}

const packageInfo: PackageJson = {
  author: 'Mediamtx',
  license: 'MIT License',
  description: currentConfig.description,
  version: version,
  name: currentConfig.name,
};

export default defineConfig(({ mode }) => {
  let buildMinify = true,
    outputOptions: OutputOptions = {
      minify: {
        mangle: true,
        compress: true,
      },
    };

  if (mode === 'dev') {
    buildMinify = false;
    outputOptions = {};
  }

  const config = {
    root: '.',
    envDir: resolve(import.meta.dirname),
    resolve: {
      preserveSymlinks: true,
      tsconfigPaths: true,
      alias: {
        '@mediamtx/moq': resolve(
          import.meta.dirname,
          './mediamtx/internal/servers/moq/',
        ),
      },
    },
    build: {
      minify: buildMinify,
      outDir: resolve(outDir),
      sourcemap: false,
      license: {
        fileName: 'license.md',
      },
      emptyOutDir: false,
      lib: {
        ...currentConfig,
        fileName: (format: string, entryName: string) => {
          let postfix = 'module';
          if (format === 'iife') postfix = 'min';
          return `mediamtx-moq-${entryName}.${postfix}.js`;
        },
        name: 'mediamtx',
        formats: formats,
      },
      rolldownOptions: {
        output: {
          codeSplitting: false,
          extend: true,
          postBanner: createBanner(packageInfo, process.env.LIB_NAME),
          comments: false,
          ...outputOptions,
        },
      },
    },
  };
  return config;
});
