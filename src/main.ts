import type { Mahasiswa } from './models/Mahasiswa';
import { Database } from './db/Database';
import { MahasiswaRepository } from './db/MahasiswaRepository';

function requireElement<T extends HTMLElement>(id: string, elementType: { new (): T }): T {
  const element = document.getElementById(id);
  if (!(element instanceof elementType)) {
    throw new Error(`Elemen #${id} tidak ditemukan di index.html`);
  }
  return element;
}

const form = requireElement('form-mahasiswa', HTMLFormElement);
const tbody = requireElement('table-body', HTMLTableSectionElement);
const editId = requireElement('edit-id', HTMLInputElement);
const inputNim = requireElement('nim', HTMLInputElement);
const inputNama = requireElement('nama', HTMLInputElement);
const inputJurusan = requireElement('jurusan', HTMLInputElement);
const inputAngkatan = requireElement('angkatan', HTMLInputElement);
const inputIpk = requireElement('ipk', HTMLInputElement);

let repo: MahasiswaRepository;

async function initApp(): Promise<void> {
  const db = await Database.getInstance();
  repo = new MahasiswaRepository(db);
  await loadTable();
}

function fillFormFromButton(button: HTMLButtonElement): void {
  editId.value = button.dataset.id ?? '';
  inputNim.value = button.dataset.nim ?? '';
  inputNama.value = button.dataset.nama ?? '';
  inputIpk.value = button.dataset.ipk ?? '';
  inputJurusan.value = button.dataset.jurusan ?? '';
  inputAngkatan.value = button.dataset.angkatan ?? '';
}

async function handleDelete(button: HTMLButtonElement): Promise<void> {
  const id = Number(button.dataset.id);
  if (Number.isNaN(id)) {
    alert('Data mahasiswa gagal dihapus: ID tidak valid.');
    return;
  }
  try {
    const deleted = await repo.delete(id);
    if (!deleted) {
      alert('Data tidak ditemukan atau sudah terhapus.');
      return;
    }
    resetForm();
    await loadTable();
    alert('Data berhasil dihapus.');
  } catch (error) {
    console.error('Gagal menghapus mahasiswa:', error);
    alert('Terjadi error saat menghapus data. Cek console.');
  }
}

async function loadTable(searchNim: string = ''): Promise<void> {
  let data: Mahasiswa[] = [];

  if (searchNim !== '') {
    const result = await repo.findByNim(searchNim);
    if (result) {
      data = [result];
    }
  } else {
    data = await repo.findAll();
  }

  tbody.innerHTML = data
    .map(
      (m: Mahasiswa) => `
<tr>
  <td>${m.nim}</td><td>${m.nama}</td><td>${m.ipk}</td><td>${m.jurusan}</td><td>${m.angkatan}</td>
  <td>
    <button type="button" class="btn-edit"
      data-id="${m.id}" data-nim="${m.nim}" data-nama="${m.nama}" data-ipk="${m.ipk}"
      data-jurusan="${m.jurusan}" data-angkatan="${m.angkatan}">Edit</button>
    <button type="button" class="btn-delete" data-id="${m.id}">Hapus</button>
  </td>
</tr>
`
    )
    .join('');

  // 🧹 KODE LISTENER LAMA DI SINI SUDAH KITA SAPU BERSIH!
}

form.addEventListener('submit', async (e: SubmitEvent) => {
  e.preventDefault();

  const angkatanStr = inputAngkatan.value.trim();
  if (angkatanStr === '') {
    alert('Tahun angkatan tidak boleh kosong!');
    return;
  }
  const angkatanValue = Number(angkatanStr);
  if (Number.isNaN(angkatanValue) || angkatanValue < 2000 || angkatanValue > 3000) {
    alert('Tahun angkatan harus angka yang valid!');
    return;
  }

  const ipkValue = Number(inputIpk.value);
  if (ipkValue > 4 || ipkValue < 0) {
    alert('Nilai IPK tidak valid. Maksimal 4.0!');
    return;
  }

  const currentId = editId.value ? Number(editId.value) : null;

  const cekNim = await repo.findByNim(inputNim.value.trim());
  if (cekNim && cekNim.id !== currentId) {
    alert('NIM ini sudah terdaftar.');
    return;
  }

  const cekNama = await repo.findByNama(inputNama.value.trim());
  if (cekNama && cekNama.id !== currentId) {
    alert('Mahasiswa dengan nama ini sudah ada di sistem!');
    return;
  }

  const payload: Omit<Mahasiswa, 'id'> = {
    nim: inputNim.value,
    nama: inputNama.value,
    ipk: ipkValue,
    jurusan: inputJurusan.value,
    angkatan: angkatanValue,
  };

  editId.value ? await repo.update(Number(editId.value), payload) : await repo.insert(payload);
  resetForm();
  await loadTable();
});

function resetForm(): void {
  form.reset();
  editId.value = '';
}

document.getElementById('btn-clear')!.onclick = resetForm;

const inputSearchNim = requireElement('search-nim', HTMLInputElement);
const btnSearch = requireElement('btn-search', HTMLButtonElement);
const btnResetSearch = requireElement('btn-reset-search', HTMLButtonElement);

btnSearch.addEventListener('click', async () => {
  const keyword = inputSearchNim.value.trim();
  if (keyword === '') {
    alert('Masukkan NIM yang mau dicari dulu sob!');
    return;
  }
  await loadTable(keyword);
});

btnResetSearch.addEventListener('click', async () => {
  inputSearchNim.value = '';
  await loadTable();
});

tbody.addEventListener('click', async (e: MouseEvent) => {
  const target = e.target as HTMLElement;

  if (target.classList.contains('btn-edit')) {
    fillFormFromButton(target as HTMLButtonElement);
  }

  if (target.classList.contains('btn-delete')) {
    await handleDelete(target as HTMLButtonElement);
  }
});

initApp();
