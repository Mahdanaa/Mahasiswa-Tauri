import SqlDatabase from '@tauri-apps/plugin-sql';
export class Database {
  private static instance: SqlDatabase;
  static async getInstance(): Promise<SqlDatabase> {
    if (!Database.instance) {
      Database.instance = await SqlDatabase.load('sqlite:mahasiswa.db');
    }
    return Database.instance;
  }
}
