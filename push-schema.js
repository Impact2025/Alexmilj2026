import { spawn } from 'child_process';

const child = spawn('npm', ['run', 'db:push'], {
  stdio: ['pipe', 'inherit', 'inherit'],
  shell: true
});

// Wait a bit for the prompt to appear
setTimeout(() => {
  // Send down arrow to select "Yes"
  child.stdin.write('\x1B[B');
  // Send enter
  child.stdin.write('\n');
}, 3000);

child.on('close', (code) => {
  console.log(`Schema push completed with code ${code}`);
  process.exit(code);
});
