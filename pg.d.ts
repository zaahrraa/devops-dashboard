declare module 'pg' {
  export interface PoolConfig {
    connectionString?: string;
    ssl?: unknown;
  }

  export class Pool {
    constructor(config?: PoolConfig);
    connect(): Promise<any>;
    query<T = any>(queryText: string, values?: unknown[]): Promise<{ rows: T[] }>;
    end(): Promise<void>;
  }
}
