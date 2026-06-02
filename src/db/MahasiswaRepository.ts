import { Repository } from './Repository';
import type { Mahasiswa } from '../models/Mahasiswa';
import type SqlDatabase from '@tauri-apps/plugin-sql';
export class MahasiswaRepository extends Repository<Mahasiswa> {
  constructor(db: SqlDatabase) {
    super(db, 'mahasiswa');
  }
  async insert(data: Omit<Mahasiswa, 'id'>): Promise<Mahasiswa> {
    const result = await this.db.execute(
      `INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk)
VALUES ($1, $2, $3, $4, $5)`,
      [data.nim, data.nama, data.jurusan, data.angkatan, data.ipk]
    );
    return { id: result.lastInsertId, ...data };
  }
  async update(id: number, data: Partial<Mahasiswa>): Promise<Mahasiswa | undefined> {
    const existing = await this.findById(id);
    if (!existing) return undefined;
    const updated = { ...existing, ...data };
    await this.db.execute(
      `UPDATE mahasiswa
SET nim = $1, nama = $2, jurusan = $3, angkatan = $4, ipk = $5
WHERE id = $6`,
      [updated.nim, updated.nama, updated.jurusan, updated.angkatan, updated.ipk, id]
    );
    return updated;
  }
  async findByNim(nim: string): Promise<Mahasiswa | undefined> {
    const rows = await this.db.select<Mahasiswa[]>(`SELECT * FROM mahasiswa WHERE nim = $1`, [nim]);
    return rows[0];
  }
  async findByJurusan(jurusan: string): Promise<Mahasiswa[]> {
    return await this.db.select<Mahasiswa[]>(`SELECT * FROM mahasiswa WHERE jurusan = $1`, [jurusan]);
  }
  async findByNama(nama: string): Promise<Mahasiswa | undefined> {
    const rows = await this.db.select<Mahasiswa[]>(`SELECT * FROM mahasiswa WHERE nama = $1`, [nama]);
    return rows[0];
  }
}
