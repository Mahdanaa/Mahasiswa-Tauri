import type SqlDatabase from '@tauri-apps/plugin-sql';
export abstract class Repository<T> {
  protected db: SqlDatabase;
  protected table: string;
  constructor(db: SqlDatabase, table: string) {
    this.db = db;
    this.table = table;
  }
  async findAll(): Promise<T[]> {
    return await this.db.select<T[]>(`SELECT * FROM ${this.table}`);
  }
  async findById(id: number): Promise<T | undefined> {
    const rows = await this.db.select<T[]>(`SELECT * FROM ${this.table} WHERE id = $1`, [id]);
    return rows[0];
  }
  async delete(id: number): Promise<boolean> {
    const result = await this.db.execute(`DELETE FROM ${this.table} WHERE id = $1`, [id]);
    return result.rowsAffected > 0;
  }
  abstract insert(data: Omit<T, 'id'>): Promise<T>;
  abstract update(id: number, data: Partial<T>): Promise<T | undefined>;
}
