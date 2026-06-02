# Mahasiswa-Tauri

Aplikasi desktop untuk manajemen data mahasiswa yang dibangun dengan **Tauri**, **TypeScript**, dan **SQLite**. Aplikasi ini menyediakan fitur lengkap untuk mengelola informasi mahasiswa termasuk CRUD (Create, Read, Update, Delete) operations dengan antarmuka yang user-friendly.

---

## 📑 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Project](#-struktur-project)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Cara Memulai](#-cara-memulai)
- [Database Schema](#-database-schema)
- [Arsitektur](#-arsitektur)
- [Development Guide](#-development-guide)
- [Building & Deployment](#-building--deployment)
- [Troubleshooting](#-troubleshooting)
- [Known Issues & Roadmap](#-known-issues--roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Fitur Utama

✅ **Tambah Data Mahasiswa** - Menambahkan data mahasiswa baru ke database dengan validasi

✅ **Lihat Semua Data** - Menampilkan daftar seluruh mahasiswa dalam format tabel yang rapi

✅ **Edit Data Mahasiswa** - Mengubah informasi mahasiswa yang sudah ada dengan update otomatis

✅ **Hapus Data Mahasiswa** - Menghapus data mahasiswa dari database dengan konfirmasi

✅ **Search by NIM** - Mencari mahasiswa berdasarkan Nomor Induk Mahasiswa (NIM)

✅ **Validasi Data** - Validasi input untuk tahun angkatan dan IPK sebelum disimpan

✅ **Database Lokal** - Menggunakan SQLite untuk penyimpanan data yang persisten dan reliable

✅ **UI Modern** - Antarmuka yang sederhana, intuitif, dan responsif

✅ **Type Safe** - Full TypeScript untuk error detection dan better DX

---

## 🛠️ Tech Stack

| Teknologi            | Versi  | Kegunaan                                           |
| -------------------- | ------ | -------------------------------------------------- |
| **Tauri**            | 2.x    | Framework untuk desktop application cross-platform |
| **TypeScript**       | ~5.6.2 | Bahasa pemrograman dengan type safety              |
| **Vite**             | ^6.0.3 | Build tool & dev server yang super cepat           |
| **SQLite**           | Latest | Database lokal untuk penyimpanan persisten         |
| **Tauri SQL Plugin** | ^2.4.0 | Driver untuk akses SQLite dari Tauri               |
| **Node.js**          | >=16.x | Runtime environment (tested: 18.x, 20.x)           |
| **npm**              | >=8.x  | Package manager                                    |

### Keunggulan Tauri dibanding Electron:

- 📦 Ukuran bundle lebih kecil (~3MB vs 150MB+)
- ⚡ Memory usage lebih efisien
- 🔒 Security lebih baik dengan Rust backend
- 🎯 Performance lebih tinggi
- 🌍 Cross-platform (Windows, macOS, Linux)

---

## 📁 Struktur Project

```
mahasiswa-tauri/
├── src/                              # Frontend TypeScript
│   ├── main.ts                       # Entry point & event handlers
│   ├── styles.css                    # Styling aplikasi
│   ├── db/                          # Database layer
│   │   ├── Database.ts              # Singleton database instance
│   │   ├── Repository.ts            # Base repository class (abstract)
│   │   └── MahasiswaRepository.ts    # CRUD operations untuk mahasiswa
│   ├── models/                      # Data models (TypeScript interfaces)
│   │   ├── Mahasiswa.ts             # Mahasiswa data model
│   │   └── Dosen.ts                 # Dosen data model
│   └── assets/                      # Static assets
│
├── src-tauri/                       # Backend Rust (Tauri)
│   ├── src/
│   │   ├── main.rs                  # Main Tauri window setup
│   │   └── lib.rs                   # Library exports
│   ├── Cargo.toml                   # Rust dependencies
│   ├── tauri.conf.json              # Tauri configuration
│   ├── build.rs                     # Build script
│   └── capabilities/                # Tauri security capabilities
│
├── index.html                       # HTML template
├── package.json                     # Project dependencies
├── tsconfig.json                    # TypeScript configuration
├── vite.config.ts                   # Vite configuration
├── Cargo.toml                       # Root Cargo config
└── README.md                        # Dokumentasi ini
```

### Penjelasan Struktur

- **`src/`** - Kode frontend TypeScript yang akan di-compile menjadi JavaScript
- **`src-tauri/`** - Kode backend Rust untuk Tauri framework
- **`src/db/`** - Layer database dengan pattern Repository
- **`src/models/`** - TypeScript interfaces untuk data models
- **`index.html`** - Template HTML utama
- **`src-tauri/tauri.conf.json`** - Konfigurasi window, build, dll

---

## 📊 Database Schema

### Tabel: `mahasiswa`

```sql
CREATE TABLE mahasiswa (
  id INTEGER PRIMARY KEY AUTOINCREMENT,  -- ID unik (auto increment)
  nim TEXT NOT NULL UNIQUE,              -- Nomor Induk Mahasiswa (unique)
  nama TEXT NOT NULL,                    -- Nama lengkap mahasiswa
  jurusan TEXT NOT NULL,                 -- Program studi/jurusan
  angkatan INTEGER NOT NULL,             -- Tahun masuk (contoh: 2023)
  ipk REAL NOT NULL DEFAULT 0            -- Index Prestasi Kumulatif (0.0 - 4.0)
);
```

### Penjelasan Kolom

| Kolom      | Tipe    | Constraint                  | Keterangan                                 |
| ---------- | ------- | --------------------------- | ------------------------------------------ |
| `id`       | INTEGER | PRIMARY KEY, AUTO_INCREMENT | ID unik, auto-increment                    |
| `nim`      | TEXT    | NOT NULL, UNIQUE            | Nomor Induk Mahasiswa (harus unique)       |
| `nama`     | TEXT    | NOT NULL                    | Nama lengkap mahasiswa                     |
| `jurusan`  | TEXT    | NOT NULL                    | Program studi (contoh: Teknik Informatika) |
| `angkatan` | INTEGER | NOT NULL                    | Tahun masuk (contoh: 2023)                 |
| `ipk`      | REAL    | NOT NULL, DEFAULT 0         | IPK (0.0 - 4.0, default: 0)                |

### Contoh Data

```sql
INSERT INTO mahasiswa (nim, nama, jurusan, angkatan, ipk)
VALUES
('2023001', 'Budi Santoso', 'Teknik Informatika', 2023, 3.85),
('2023002', 'Siti Nurhaliza', 'Sistem Informasi', 2023, 3.92),
('2023003', 'Ahmad Wijaya', 'Teknologi Informasi', 2023, 3.76);
```

---

## 📋 Prasyarat

### Persyaratan Minimum

- **Node.js**: >= 16.x (Tested dengan versi 18.x dan 20.x)
- **npm**: >= 8.x atau **yarn** >= 1.22.x
- **Git**: Untuk cloning repository
- **RAM**: Minimal 2GB
- **Disk Space**: ~500MB untuk development, ~300MB untuk runtime

### Sistem Operasi yang Didukung

✅ **Windows** - Windows 7 dan lebih baru
✅ **macOS** - 10.13 dan lebih baru
✅ **Linux** - Ubuntu 16.04+, Fedora, Debian, dll

### Verifikasi Instalasi

```bash
# Cek Node.js version
node --version
# Expected: v16.x atau lebih tinggi

# Cek npm version
npm --version
# Expected: v8.x atau lebih tinggi

# Cek Git
git --version
```

---

## 💻 Instalasi

### Langkah 1: Clone Repository

```bash
git clone https://github.com/yourusername/mahasiswa-tauri.git
cd mahasiswa-tauri
```

### Langkah 2: Install Dependencies

```bash
npm install
```

**Notes:**

- Proses ini akan menginstall semua dependencies di `package.json`
- Tauri CLI dan dependencies Rust akan didownload secara otomatis
- Mungkin memakan waktu 2-5 menit tergantung kecepatan internet

### Langkah 3: Verifikasi Instalasi

```bash
# Cek apakah semua dependencies terinstall dengan benar
npm list

# Test dengan menjalankan development mode
npm run dev
```

Jika aplikasi Tauri window terbuka tanpa error, instalasi berhasil! ✅

---

## 🚀 Cara Memulai

### Development Mode

Jalankan aplikasi dalam mode development dengan hot-reload:

```bash
npm run dev
```

**Fitur development mode:**

- ✅ Hot Module Replacement (HMR) - Auto reload saat ada perubahan file
- ✅ DevTools terintegrasi
- ✅ Source maps untuk debugging
- ✅ Fast refresh untuk TypeScript changes
- ✅ Console untuk melihat logs

**Tips Development:**

1. Buka DevTools dengan `F12` atau `Ctrl+Shift+I` (Windows/Linux) / `Cmd+Option+I` (macOS)
2. Buka Console tab untuk melihat errors dan logs
3. Buat perubahan di file TypeScript dan otomatis reload
4. Gunakan VS Code untuk better DX dengan IntelliSense

### Production Build

Build aplikasi untuk deployment:

```bash
npm run build
```

**Proses build:**

- ✅ Compile TypeScript ke JavaScript
- ✅ Bundle dengan Vite untuk optimasi
- ✅ Compile Rust backend dengan cargo
- ✅ Generate distributable di folder `src-tauri/target/release/`

### Preview Production Build

Jalankan versi production untuk testing:

```bash
npm start
```

**Note:** Gunakan command ini untuk test production build sebelum deploy.

---

## 🏗️ Arsitektur

### Architecture Diagram

```
┌──────────────────────────────────────────────────────────────┐
│              Tauri Desktop Application                       │
├──────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌─────────────────┐                                        │
│  │ FRONTEND LAYER  │                                        │
│  │  (TypeScript)   │                                        │
│  ├─────────────────┤                                        │
│  │                 │                                        │
│  │ • index.html    │                                        │
│  │ • main.ts       │                                        │
│  │ • styles.css    │                                        │
│  │                 │                                        │
│  └────────┬────────┘                                        │
│           │ IPC Commands                                    │
│           ▼                                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ REPOSITORY LAYER (Data Access)                      │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │                                                     │   │
│  │ • Repository.ts (Abstract)                          │   │
│  │ • MahasiswaRepository.ts (CRUD Implementation)      │   │
│  │ • Database.ts (Singleton Instance)                  │   │
│  │ • Models (TypeScript Interfaces)                    │   │
│  │                                                     │   │
│  └────────┬────────────────────────────────────────────┘   │
│           │ SQL Queries                                     │
│           ▼                                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ BACKEND LAYER (Rust/Tauri)                          │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ • main.rs (Window Management)                       │   │
│  │ • lib.rs (Library exports)                          │   │
│  └────────┬────────────────────────────────────────────┘   │
│           │                                                  │
│           ▼                                                  │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ DATABASE LAYER (SQLite)                             │   │
│  ├─────────────────────────────────────────────────────┤   │
│  │ • mahasiswa.db (SQLite Database File)               │   │
│  │ • Tabel: mahasiswa                                  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Data Flow Diagram

```
User Action (Click Edit/Delete/Save)
        ↓
Event Handler (main.ts)
        ↓
Repository Method Call (MahasiswaRepository)
        ↓
Database Query (SQLite via Tauri Plugin)
        ↓
Result & Error Handling
        ↓
Update UI (Re-render table/form)
        ↓
User Sees Updated Data
```

### Design Patterns yang Digunakan

#### 1. **Singleton Pattern** - Database Instance

Database instance hanya dibuat sekali dan digunakan di seluruh aplikasi:

```typescript
export class Database {
  private static instance: SqlDatabase;

  static async getInstance(): Promise<SqlDatabase> {
    if (!Database.instance) {
      Database.instance = await SqlDatabase.load('sqlite:mahasiswa.db');
    }
    return Database.instance;
  }
}
```

**Keuntungan:**

- Single connection ke database
- Efisiensi memory
- Thread-safe

#### 2. **Repository Pattern** - Data Access Layer

Abstraksi database operations dari business logic:

```typescript
// Base class
export abstract class Repository<T> {
  async findAll(): Promise<T[]> { ... }
  async findById(id: number): Promise<T | undefined> { ... }
  async delete(id: number): Promise<boolean> { ... }
  abstract insert(data: Omit<T, 'id'>): Promise<T>;
}

// Implementation
export class MahasiswaRepository extends Repository<Mahasiswa> {
  async insert(data: Omit<Mahasiswa, 'id'>): Promise<Mahasiswa> { ... }
  async update(id: number, data: Partial<Mahasiswa>): Promise<Mahasiswa | undefined> { ... }
  async findByNim(nim: string): Promise<Mahasiswa | undefined> { ... }
}
```

**Keuntungan:**

- Separation of concerns
- Reusable untuk berbagai models
- Easy to test
- Easy to maintain

#### 3. **MVC Pattern** - Separation of Concerns

```
Model (Mahasiswa.ts) → View (index.html) → Controller (main.ts)
```

### Layered Architecture

```
┌─────────────────────────────────────┐
│   Presentation Layer                │ ← HTML/CSS/JavaScript
├─────────────────────────────────────┤
│   Business Logic Layer              │ ← Event handlers, Validation
├─────────────────────────────────────┤
│   Data Access Layer (Repository)    │ ← CRUD operations
├─────────────────────────────────────┤
│   Database Layer                    │ ← SQLite
└─────────────────────────────────────┘
```

---

## 📝 Development Guide

### Project Structure untuk Development

```
src/
├── main.ts           # ✏️ Main entry point & event handlers
├── styles.css        # ✏️ Styling
├── db/
│   ├── Database.ts   # 🔧 Singleton database (modify jika perlu koneksi)
│   ├── Repository.ts # 🔧 Base class (modify jika perlu method baru)
│   └── MahasiswaRepository.ts  # ✏️ CRUD untuk mahasiswa (main focus)
└── models/
    └── Mahasiswa.ts  # 📋 Type definitions
```

### Workflow Development

#### 1. **Start Development Server**

```bash
npm run dev
```

Aplikasi akan terbuka di Tauri window dengan auto-reload enabled.

#### 2. **Open DevTools**

- **Windows/Linux**: `F12` atau `Ctrl+Shift+I`
- **macOS**: `Cmd+Option+I`

#### 3. **Make Changes**

Edit file TypeScript atau CSS:

- `src/main.ts` - Modifikasi UI logic atau event handlers
- `src/db/MahasiswaRepository.ts` - Tambah/modifikasi CRUD methods
- `src/styles.css` - Ubah styling
- `src/models/Mahasiswa.ts` - Ubah data model jika diperlukan

#### 4. **Hot Reload**

Perubahan akan otomatis di-reload di aplikasi.

#### 5. **Check Console**

Lihat DevTools Console untuk errors dan logs:

```typescript
console.log('Data mahasiswa:', mahasiswa);
console.error('Error:', error);
```

### Code Guidelines

#### Naming Convention

```typescript
// Classes: PascalCase
export class MahasiswaRepository {}

// Functions & variables: camelCase
const getMahasiswa = async () => {};
const inputNim = document.getElementById('nim');

// Constants: UPPER_SNAKE_CASE
const MAX_IPK = 4.0;
const MIN_ANGKATAN = 2000;

// Interfaces: PascalCase (I prefix optional)
export interface Mahasiswa {}
type MahasiswaInput = Omit<Mahasiswa, 'id'>;
```

#### File Organization

- Satu class/interface per file
- Related files dalam folder yang sama
- Reusable utilities di `utils/` folder
- Models di `models/` folder
- Database logic di `db/` folder

#### Comments & Documentation

```typescript
/**
 * Menambahkan mahasiswa baru ke database
 *
 * @param data - Data mahasiswa (tanpa ID)
 * @returns Data mahasiswa yang telah disimpan dengan ID
 * @throws Error jika NIM sudah exist atau data invalid
 *
 * @example
 * const newMahasiswa = await repo.insert({
 *   nim: '2023001',
 *   nama: 'Budi',
 *   jurusan: 'TI',
 *   angkatan: 2023,
 *   ipk: 3.8
 * });
 */
async insert(data: Omit<Mahasiswa, 'id'>): Promise<Mahasiswa>
```

#### Error Handling

```typescript
try {
  const result = await repo.findByNim(nim);
  if (!result) {
    console.warn(`Mahasiswa dengan NIM ${nim} tidak ditemukan`);
    alert('Data tidak ditemukan');
    return;
  }
} catch (error) {
  const message = error instanceof Error ? error.message : 'Unknown error';
  console.error('Database error:', message);
  alert(`Terjadi error: ${message}`);
}
```

### Best Practices

✅ Gunakan TypeScript untuk type safety
✅ Ikuti naming convention yang konsisten
✅ Pisahkan business logic dari UI logic
✅ Gunakan async/await untuk database operations
✅ Validate input sebelum database operations
✅ Handle errors dengan proper error messages
✅ Comment complex logic dengan JSDoc
✅ Keep functions small dan reusable

---

## 🏗️ Building & Deployment

### Build untuk Production

```bash
npm run build
```

Output akan tersimpan di:

- `src-tauri/target/release/` - Executable files
- `src-tauri/target/release/bundle/` - Platform-specific bundles

### Platform-Specific Builds

#### Windows (MSI Installer)

```bash
npm run build
# Output: mahasiswa-tauri_0.1.0_x64_en-US.msi
```

#### macOS (DMG)

```bash
npm run build
# Output: mahasiswa-tauri_0.1.0_x64.dmg
```

#### Linux (AppImage)

```bash
npm run build
# Output: mahasiswa-tauri_0.1.0_amd64.AppImage
```

### Build Configuration

Konfigurasi build tersimpan di `src-tauri/tauri.conf.json`:

```json
{
  "build": {
    "frontendDist": "../dist",
    "devUrl": "http://localhost:5173",
    "beforeBuildCommand": "npm run build",
    "beforeDevCommand": "npm run dev"
  },
  "bundle": {
    "active": true,
    "targets": ["msi", "dmg", "appimage"]
  }
}
```

### Distribution

Untuk mendistribusikan aplikasi:

1. **Build aplikasi**

   ```bash
   npm run build
   ```

2. **Catat versi di `package.json` dan `src-tauri/tauri.conf.json`**

3. **Upload executable ke release page**

4. **Create installer dengan electron-builder (optional)**
   ```bash
   npm install -D electron-builder
   ```

---

## 🧪 Testing Checklist

### Manual Testing

#### ✅ CRUD Operations

- [ ] Create: Tambah data mahasiswa baru
- [ ] Read: Display semua data dengan benar di tabel
- [ ] Update: Edit data dan lihat perubahan
- [ ] Delete: Hapus data dengan konfirmasi

#### ✅ Data Validation

- [ ] NIM harus unique (coba input NIM yang sama 2x)
- [ ] Required fields tidak boleh kosong
- [ ] Angkatan harus valid number (2000-3000)
- [ ] IPK harus valid number (0.0-4.0)

#### ✅ Database Persistence

- [ ] Database file created correctly
- [ ] Data persist setelah aplikasi ditutup
- [ ] Database recovery dari corruption (jika ada)

#### ✅ Search Features

- [ ] Search by NIM bekerja dengan benar
- [ ] Return hasil yang tepat atau not found

#### ✅ UI/UX

- [ ] Form submit bekerja
- [ ] Error messages ditampilkan dengan benar
- [ ] Table updates otomatis setelah CRUD
- [ ] UI layout responsive dan rapi

#### ✅ Performance

- [ ] Loading data tidak lambat
- [ ] UI responsive dengan banyak data
- [ ] Memory usage stabil

### Automated Testing (Future)

Untuk menambah automated testing:

```bash
# Unit testing
npm install -D vitest @testing-library/dom

# Integration testing
npm install -D cypress

# E2E testing dengan Tauri
npm install -D tauri-specron
```

---

## 🔒 Security

### Security Features

✅ **Context Isolation** - Renderer process terisolasi dari system
✅ **Sandbox** - Application berjalan dalam sandboxed environment
✅ **Prepared Statements** - SQL Injection prevention dengan parameterized queries
✅ **Input Validation** - Semua user input divalidasi sebelum processing
✅ **Secure IPC** - Tauri's secure IPC protocol

### Security Best Practices

#### Database Security

```typescript
// ✅ BAIK - Menggunakan prepared statements
const result = await db.select(
  'SELECT * FROM mahasiswa WHERE nim = $1',
  [userInput] // Parameter terpisah dari query
);

// ❌ BURUK - String concatenation (SQL Injection!)
const result = await db.select(`SELECT * FROM mahasiswa WHERE nim = '${userInput}'`);
```

#### Input Validation

```typescript
// Validate sebelum database operation
const validateMahasiswa = (data: any) => {
  if (!data.nim || typeof data.nim !== 'string') {
    throw new Error('NIM harus berupa string');
  }
  if (!data.nama || data.nama.length < 3) {
    throw new Error('Nama minimal 3 karakter');
  }
  if (data.angkatan < 2000 || data.angkatan > 3000) {
    throw new Error('Angkatan tidak valid');
  }
  if (data.ipk < 0 || data.ipk > 4.0) {
    throw new Error('IPK harus antara 0.0 dan 4.0');
  }
};
```

---

## 🐛 Troubleshooting

### Error: Database file not found

**Solusi:**
Database file akan otomatis dibuat di:

```
Windows:  %APPDATA%/mahasiswa-tauri/mahasiswa.db
macOS:    ~/Library/Application Support/mahasiswa-tauri/mahasiswa.db
Linux:    ~/.config/mahasiswa-tauri/mahasiswa.db
```

Jika tidak ada, coba jalankan aplikasi sekali lagi dengan `npm run dev`.

### Error: Tauri window tidak terbuka

**Solusi:**

1. Cek apakah dev server berjalan: `npm run dev`
2. Check console untuk error messages
3. Coba clear npm cache: `npm cache clean --force`
4. Reinstall dependencies: `npm install`

### Hot reload tidak bekerja

**Solusi:**

1. Pastikan hanya 1 instance aplikasi yang running
2. Cek file watcher limit (Linux):
   ```bash
   cat /proc/sys/fs/inotify/max_user_watches
   # Jika terlalu rendah, tingkatkan:
   echo 524288 | sudo tee /proc/sys/fs/inotify/max_user_watches
   ```

### Performance Issues

**Solusi:**

1. Check database file size
2. Monitor memory usage dengan DevTools
3. Check untuk infinite loops di main.ts
4. Optimize SQL queries di repository

---

## 📋 Known Issues & Roadmap

### Current Limitations (v0.1.0)

- ❌ Belum support multiple windows
- ❌ Tidak ada export data functionality
- ❌ Belum ada backup automation
- ❌ UI belum fully responsive untuk ukuran window kecil
- ❌ Belum ada advanced search/filter features

### Roadmap

#### Phase 2 (v0.2.0) - Enhanced Features

🔲 Search dan filter features
🔲 Sort table by column
🔲 Pagination untuk large datasets
🔲 Data export to CSV/Excel

#### Phase 3 (v0.3.0) - Advanced Features

🔲 Import data dari file
🔲 Backup dan restore functionality
🔲 Advanced reporting & statistics
🔲 Data validation rules customizable

#### Phase 4 (Future) - Advanced

🔲 User authentication
🔲 Multi-user support
🔲 Cloud sync capability
🔲 REST API for third-party integration

---

## 🤝 Contributing

Kontribusi sangat diterima! Berikut cara untuk berkontribusi:

### Langkah-Langkah

1. **Fork Repository**
   - Klik fork button di GitHub

2. **Clone Fork Anda**

   ```bash
   git clone https://github.com/YOUR_USERNAME/mahasiswa-tauri.git
   cd mahasiswa-tauri
   ```

3. **Create Feature Branch**

   ```bash
   git checkout -b feature/your-feature-name
   ```

   Format: `feature/deskripsi-singkat`

4. **Make Changes**
   - Ikuti code standards
   - Test perubahan secara manual
   - Add comments untuk complex logic

5. **Commit Changes**

   ```bash
   git add .
   git commit -m "feat: deskripsi singkat perubahan"
   ```

   **Format commit messages:**
   - `feat:` - Fitur baru
   - `fix:` - Bug fixes
   - `refactor:` - Code improvements
   - `docs:` - Dokumentasi
   - `test:` - Testing related

6. **Push ke Fork**

   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request**
   - Klik "Compare & pull request" di GitHub
   - Jelaskan perubahan dengan detail
   - Reference related issues jika ada

### Code Review Process

- ✅ Minimal 1 approval sebelum merge
- ✅ CI checks harus pass
- ✅ Code style harus sesuai guidelines
- ✅ Tests harus berjalan dengan baik

### Development Setup untuk Contributors

```bash
# Clone dan setup
git clone https://github.com/yourusername/mahasiswa-tauri.git
cd mahasiswa-tauri
npm install

# Start development
npm run dev

# Create feature branch
git checkout -b feature/your-feature
```

---

## 📚 References

- [Tauri Documentation](https://tauri.app/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Documentation](https://vitejs.dev/)
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Tauri SQL Plugin](https://github.com/tauri-apps/plugins-workspace/tree/v2/plugins/sql)

---

## 👨‍💻 Authors

- **[Your Name]** - Initial work and project creator
  - GitHub: [@yourusername](https://github.com/yourusername)
  - Email: your.email@example.com

---

## 📄 License

Proyek ini dibuat untuk keperluan pembelajaran **Pemrograman Berbasis Objek** (Semester 4) dan dirilis di bawah **MIT License**.

### MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND**, express or implied.

---

## 🙏 Acknowledgments

- Terima kasih kepada komunitas [Tauri](https://tauri.app/)
- Inspirasi dari best practices aplikasi desktop modern
- Referensi dokumentasi resmi Tauri dan TypeScript

---

### Quick Links

- 📋 [Issues](https://github.com/yourusername/mahasiswa-tauri/issues)
- 🔀 [Pull Requests](https://github.com/yourusername/mahasiswa-tauri/pulls)
- 💬 [Discussions](https://github.com/yourusername/mahasiswa-tauri/discussions)

---

<div align="center">

**Last Updated:** June 2, 2026
**Version:** 0.1.0
**Status:** ✅ Active Development

</div>
