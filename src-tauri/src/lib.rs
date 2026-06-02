use tauri_plugin_sql::{Migration, MigrationKind};
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
let migrations = vec![
Migration {
version: 1,
description: "create mahasiswa table",
sql: "CREATE TABLE IF NOT EXISTS mahasiswa (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nim TEXT NOT NULL UNIQUE,
nama TEXT NOT NULL,
jurusan TEXT NOT NULL,
angkatan INTEGER NOT NULL
)",
kind: MigrationKind::Up,
}
];
tauri ::Builder::default()
.plugin(
tauri_plugin_sql::Builder::default()
.add_migrations("sqlite:mahasiswa.db", migrations)
.build(),
)
.run(tauri::generate_context!())
.expect("error while running tauri application");
}
