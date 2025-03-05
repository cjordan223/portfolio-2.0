// Simple script to run Vitest tests
const { execSync } = require('child_process');

try {
  console.log('Running component tests...');
  const output = execSync('npx vitest run', { encoding: 'utf-8' });
  console.log(output);
  console.log('Tests completed successfully!');
} catch (error) {
  console.error('Error running tests:');
  console.error(error.stdout);
  console.error(error.stderr);
  process.exit(1);
} 