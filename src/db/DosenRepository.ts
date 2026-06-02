import { Repository } from './Repository';
import type { Dosen } from '../models/Dosen';
import type SqlDatabase from '@tauri-apps/plugin-sql';

export class DosenRepository extends Repository<Dosen> {
  constructor(db: SqlDatabase) {
    super(db, 'dosen');
  }

  async insert(data: Omit<Dosen, 'id'>): Promise<Dosen> {
    const result = await this.db.execute(`INSERT INTO dosen (nidn, nama, mata_kuliah) VALUES ($1, $2, $3)`, [
      data.nidn,
      data.nama,
      data.mata_kuliah,
    ]);
    return { id: result.lastInsertId, ...data };
  }

  async update(id: number, data: Partial<Dosen>): Promise<Dosen | undefined> {
    const existing = await this.findById(id);
    if (!existing) return undefined;

    const updated = { ...existing, ...data };
    await this.db.execute(`UPDATE dosen SET nidn = $1, nama = $2, mata_kuliah = $3 WHERE id = $4`, [
      updated.nidn,
      updated.nama,
      updated.mata_kuliah,
      id,
    ]);
    return updated;
  }
}
