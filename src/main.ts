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
async function loadTable(): Promise<void> {
  const data = await repo.findAll();
  tbody.innerHTML = data
    .map(
      (m: Mahasiswa) => `
<tr>
<td>${m.nim}</td><td>${m.nama}</td><td>${m.jurusan}</td><td>${m.angkatan}</td>
<td>
<button type="button" class="btn-edit"
data-id="${m.id}" data-nim="${m.nim}" data-nama="${m.nama}"
data-jurusan="${m.jurusan}" data-angkatan="${m.angkatan}">Edit</button>
<button type="button" class="btn-delete" data-id="${m.id}">Hapus</button>
</td>
</tr>
`
    )
    .join('');
  const editButtons = tbody.querySelectorAll<HTMLButtonElement>('.btn-edit');
  for (const button of editButtons) {
    button.addEventListener('click', () => {
      fillFormFromButton(button);
    });
  }
  const deleteButtons = tbody.querySelectorAll<HTMLButtonElement>('.btn-delete');
  for (const button of deleteButtons) {
    button.addEventListener('click', async () => {
      await handleDelete(button);
    });
  }
}
form.addEventListener('submit', async (e: SubmitEvent) => {
  e.preventDefault();
  const payload: Omit<Mahasiswa, 'id'> = {
    nim: inputNim.value,
    nama: inputNama.value,
    jurusan: inputJurusan.value,
    angkatan: Number(inputAngkatan.value),
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
initApp();
