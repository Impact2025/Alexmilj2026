import { exec } from 'child_process';

const child = exec('npm run db:push', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  console.log(stdout);
});

setTimeout(() => {
  // Select "Yes" option (down arrow)
  child.stdin.write('\x1B[B');
  setTimeout(() => {
    // Press Enter
    child.stdin.write('\r\n');
  }, 500);
}, 4000);
