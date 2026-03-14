import { yarrowStalk } from './src/logic/divination.ts';

const lines = [];
for (let i = 0; i < 6; i++) {
  lines.push(yarrowStalk());
}

console.log('--- AI SELF-REFLECTION READING ---');
console.log('Binary Pattern (Bottom to Top):', lines.map(v => (v === 7 || v === 9 ? '1' : '0')).join(''));
console.log('Lines:', lines);
