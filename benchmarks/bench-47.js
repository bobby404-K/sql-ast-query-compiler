// Microbenchmark runner
const start = performance.now();
for (let i = 0; i < 10000; i++) {
  Math.sqrt(i * 3.14159);
}
console.log('Benchmark #47 completed in', (performance.now() - start).toFixed(3), 'ms');
