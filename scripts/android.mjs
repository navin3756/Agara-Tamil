import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const action = process.argv[2] || 'sync';
const isWindows = process.platform === 'win32';
const commandName = (name) => isWindows ? `${name}.cmd` : name;
const gradleCommand = isWindows ? 'gradlew.bat' : './gradlew';
const env = { ...process.env };

if (isWindows) {
  const androidStudioJdk = 'C:\\Program Files\\Android\\Android Studio\\jbr';
  const androidSdk = path.join(env.LOCALAPPDATA || '', 'Android', 'Sdk');

  if (existsSync(androidStudioJdk)) {
    env.JAVA_HOME = androidStudioJdk;
  }
  if (!env.ANDROID_HOME && existsSync(androidSdk)) {
    env.ANDROID_HOME = androidSdk;
    env.ANDROID_SDK_ROOT = androidSdk;
  }
}

const run = (command, args, cwd = process.cwd()) => {
  const result = spawnSync(command, args, {
    cwd,
    env,
    stdio: 'inherit',
    shell: isWindows,
  });
  if (result.error) {
    console.error(result.error.message);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
};

run(commandName('npm'), ['run', 'build:web']);
run(commandName('npx'), ['cap', 'sync', 'android']);

if (action === 'dev') {
  run(path.join(process.cwd(), 'android', gradleCommand), ['assembleDebug'], path.join(process.cwd(), 'android'));
}

if (action === 'build') {
  run(path.join(process.cwd(), 'android', gradleCommand), ['bundleRelease'], path.join(process.cwd(), 'android'));
}
