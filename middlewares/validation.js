// middlewares/validation.js
module.exports = {
  validateSiswaCreate: (req, res, next) => {
    const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;
    const errors = [];

    if (!kode_siswa || kode_siswa.trim() === '') errors.push('Kode Siswa wajib diisi');
    if (!nama_siswa || nama_siswa.trim() === '') errors.push('Nama Siswa wajib diisi');
    if (!alamat_siswa || alamat_siswa.trim() === '') errors.push('Alamat Siswa wajib diisi');
    if (!tgl_siswa || tgl_siswa.trim() === '') errors.push('Tanggal Siswa wajib diisi');
    if (!jurusan_siswa || jurusan_siswa.trim() === '') errors.push('Jurusan Siswa wajib diisi');

    if (errors.length) return res.status(400).json({ errors });
    next();
  },

  validateSiswaUpdate: (req, res, next) => {
    const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;
    const errors = [];

    if (kode_siswa !== undefined && kode_siswa.trim() === '') errors.push('Kode Siswa tidak boleh kosong');
    if (nama_siswa !== undefined && nama_siswa.trim() === '') errors.push('Nama Siswa tidak boleh kosong');
    if (alamat_siswa !== undefined && alamat_siswa.trim() === '') errors.push('Alamat Siswa tidak boleh kosong');
    if (tgl_siswa !== undefined && tgl_siswa.trim() === '') errors.push('Tanggal Siswa tidak boleh kosong');
    if (jurusan_siswa !== undefined && jurusan_siswa.trim() === '') errors.push('Jurusan Siswa tidak boleh kosong');

    if (errors.length) return res.status(400).json({ errors });
    next();
  }
};