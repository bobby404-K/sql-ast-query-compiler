export type Dialect = 'postgres' | 'mysql' | 'sqlite';

export interface CompiledQuery {
  sql: string;
  params: any[];
}
