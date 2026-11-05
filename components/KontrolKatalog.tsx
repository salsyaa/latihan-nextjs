interface KontrolKatalogProps {
  cari: string;
  setCari: (val: string) => void;
  kategori: string;
  setKategori: (val: string) => void;
  urut: string;
  setUrut: (val: string) => void;
  hanyaAdaTiket: boolean;
  setHanyaAdaTiket: (val: boolean) => void;
  hargaMaks: string;
  setHargaMaks: (val: string) => void;
  daftarKategori: string[];
}

export default function KontrolKatalog({
  cari,
  setCari,
  kategori,
  setKategori,
  urut,
  setUrut,
  hanyaAdaTiket,
  setHanyaAdaTiket,
  hargaMaks,
  setHargaMaks,
  daftarKategori,
}: KontrolKatalogProps) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <input
        value={cari}
        onChange={(e) => setCari(e.target.value)}
        placeholder="Cari event..."
        className="rounded border bg-white px-3 py-2"
      />
      <select
        value={kategori}
        onChange={(e) => setKategori(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        {daftarKategori.map((k) => (
          <option key={k}>{k}</option>
        ))}
      </select>
      <select
        value={urut}
        onChange={(e) => setUrut(e.target.value)}
        className="rounded border bg-white px-3 py-2"
      >
        <option value="tanggal">Tanggal terdekat</option>
        <option value="murah">Harga termurah</option>
        <option value="mahal">Harga termahal</option>
        <option value="nama">Nama A-Z</option>
      </select>

      {/* Input Harga Maksimal */}
      <input
        type="number"
        value={hargaMaks}
        onChange={(e) => setHargaMaks(e.target.value)}
        placeholder="Harga maksimal..."
        className="rounded border bg-white px-3 py-2"
      />

      {/* Checkbox Hanya yang Masih Ada Tiket */}
      <label className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
        <input
          type="checkbox"
          checked={hanyaAdaTiket}
          onChange={(e) => setHanyaAdaTiket(e.target.checked)}
          className="rounded border"
        />
        Hanya yang masih ada tiket
      </label>
    </div>
  );
}
