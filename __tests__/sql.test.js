import assert from 'node:assert';
import test from 'node:test';
import { QueryBuilder } from '../dist/builder.js';

test('QueryBuilder produces parameterized Postgres SQL query correctly', () => {
  const query = new QueryBuilder('postgres')
    .from('users')
    .select('id', 'email', 'status')
    .where('status', '=', 'active')
    .where('age', '>=', 18)
    .orderBy('created_at', 'DESC')
    .limit(10)
    .compile();

  assert.strictEqual(query.sql, 'SELECT id, email, status FROM users WHERE status = $1 AND age >= $2 ORDER BY created_at DESC LIMIT 10');
  assert.deepStrictEqual(query.params, ['active', 18]);
});
