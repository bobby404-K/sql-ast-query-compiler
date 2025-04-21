import { CompiledQuery, Dialect } from './types.js';

export class QueryBuilder {
  private table = '';
  private selectCols: string[] = ['*'];
  private whereClauses: Array<{ col: string; op: string; val: any }> = [];
  private orderCol?: string;
  private orderDir: 'ASC' | 'DESC' = 'ASC';
  private limitVal?: number;

  constructor(private dialect: Dialect = 'postgres') {}

  from(table: string): this {
    this.table = table;
    return this;
  }

  select(...cols: string[]): this {
    this.selectCols = cols;
    return this;
  }

  where(col: string, op: string, val: any): this {
    this.whereClauses.push({ col, op, val });
    return this;
  }

  orderBy(col: string, dir: 'ASC' | 'DESC' = 'ASC'): this {
    this.orderCol = col;
    this.orderDir = dir;
    return this;
  }

  limit(n: number): this {
    this.limitVal = n;
    return this;
  }

  compile(): CompiledQuery {
    const params: any[] = [];
    let sql = `SELECT ${this.selectCols.join(', ')} FROM ${this.table}`;

    if (this.whereClauses.length > 0) {
      const parts = this.whereClauses.map((c, idx) => {
        params.push(c.val);
        const placeholder = this.dialect === 'postgres' ? `$${idx + 1}` : '?';
        return `${c.col} ${c.op} ${placeholder}`;
      });
      sql += ` WHERE ${parts.join(' AND ')}`;
    }

    if (this.orderCol) sql += ` ORDER BY ${this.orderCol} ${this.orderDir}`;
    if (this.limitVal) sql += ` LIMIT ${this.limitVal}`;

    return { sql, params };
  }
}
