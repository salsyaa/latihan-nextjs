"use client";
import { useState, useEffect } from "react";
import type { Event } from "@/data/events";
import { rupiah } from "@/data/events";
import KartuEvent from "./KartuEvent";
import KontrolKatalog from "./KontrolKatalog";

export default function KatalogInteraktif({ events }: { events: Event[] }) {
  const [cari, setCari] = useState("");
  const [kategori, setKategori] = useState("Semua");
  const [urut, setUrut] = useState("tanggal");
  const [hanyaAdaTiket, setHanyaAdaTiket] = useState(false);
  const [hargaMaks, setHargaMaks] = useState("");

  const [tampilJumlah, setTampilJumlah] = useState(4);

  useEffect(() => {
    setTampilJumlah(4);
  }, [cari, kategori, urut, hanyaAdaTiket, hargaMaks]);

  const daftarKategori = ["Semua", ...new Set(events.map((e) => e.kategori))];

  const hasil = events.filter((e) => {
    const cocokCari = e.judul.toLowerCase().includes(cari.toLowerCase());
    const cocokKategori = kategori === "Semua" || e.kategori === kategori;
    const sisaTiket = e.kuota - e.terisi;
    const cocokTiket = !hanyaAdaTiket || sisaTiket > 0;
    const cocokHarga = hargaMaks === "" || e.harga <= Number(hargaMaks);

    return cocokCari && cocokKategori && cocokTiket && cocokHarga;
  });

  const tersusun = [...hasil].sort((a, b) => {
    if (urut === "murah") return a.harga - b.harga;
    if (urut === "mahal") return b.harga - a.harga;
    if (urut === "nama") return a.judul.localeCompare(b.judul);
    return a.tanggal.localeCompare(b.tanggal);
  });

  const eventTampil = tersusun.slice(0, tampilJumlah);

  const totalHarga = tersusun.reduce((acc, e) => acc + e.harga, 0);
  const rataRataHarga = tersusun.length > 0 ? totalHarga / tersusun.length : 0;
  const totalSisaTiket = tersusun.reduce(
    (acc, e) => acc + (e.kuota - e.terisi),
    0,
  );

  return (
    <div>
      {/* Memanggil Komponen KontrolKatalog */}
      <KontrolKatalog
        cari={cari}
        setCari={setCari}
        kategori={kategori}
        setKategori={setKategori}
        urut={urut}
        setUrut={setUrut}
        hanyaAdaTiket={hanyaAdaTiket}
        setHanyaAdaTiket={setHanyaAdaTiket}
        hargaMaks={hargaMaks}
        setHargaMaks={setHargaMaks}
        daftarKategori={daftarKategori}
      />

      <p className="text-sm text-slate-500">
        {tersusun.length} event ditemukan
      </p>
      <p className="mb-3 text-sm text-slate-500">
        Rata-rata harga {rupiah(rataRataHarga)} · Total sisa tiket{" "}
        {totalSisaTiket}
      </p>

      {tersusun.length === 0 ? (
        <p className="text-slate-500">Tidak ada event yang cocok.</p>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {eventTampil.map((e) => (
              <KartuEvent key={e.id} event={e} />
            ))}
          </div>

          {tampilJumlah < tersusun.length && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setTampilJumlah((prev) => prev + 4)}
                className="rounded bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-300"
              >
                Tampilkan lagi
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
