// controllers/siswaController.js
const pool = require('../config/db');

module.exports = {
  // GET /api/siswa
  getAll: async (req, res, next) => {
    try {
      const [rows] = await pool.execute('SELECT * FROM siswa ORDER BY id DESC');
      res.json(rows);
    } catch (err) {
      next(err);
    }
  },

  // GET /api/siswa/:id
  getById: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [rows] = await pool.execute('SELECT * FROM siswa WHERE id = ?', [id]);
      if (rows.length === 0) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
      res.json(rows[0]);
    } catch (err) {
      next(err);
    }
  },

  // POST /api/siswa
  create: async (req, res, next) => {
    try {
      const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

      const [result] = await pool.execute(
        'INSERT INTO siswa (kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa) VALUES (?, ?, ?, ?, ?)',
        [kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa]
      );

      res.status(201).json({
        id: result.insertId,
        kode_siswa,
        nama_siswa,
        alamat_siswa,
        tgl_siswa,
        jurusan_siswa
      });
    } catch (err) {
      next(err);
    }
  },

  // PUT /api/siswa/:id
  update: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const { kode_siswa, nama_siswa, alamat_siswa, tgl_siswa, jurusan_siswa } = req.body;

      const fields = [];
      const values = [];

      if (kode_siswa !== undefined) { fields.push('kode_siswa = ?'); values.push(kode_siswa); }
      if (nama_siswa !== undefined) { fields.push('nama_siswa = ?'); values.push(nama_siswa); }
      if (alamat_siswa !== undefined) { fields.push('alamat_siswa = ?'); values.push(alamat_siswa); }
      if (tgl_siswa !== undefined) { fields.push('tgl_siswa = ?'); values.push(tgl_siswa); }
      if (jurusan_siswa !== undefined) { fields.push('jurusan_siswa = ?'); values.push(jurusan_siswa); }

      if (fields.length === 0) return res.status(400).json({ message: 'Nothing to update' });

      values.push(id);
      const sql = `UPDATE siswa SET ${fields.join(', ')} WHERE id = ?`;
      const [result] = await pool.execute(sql, values);

      if (result.affectedRows === 0) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
      res.json({ message: 'Siswa berhasil diperbarui' });
    } catch (err) {
      next(err);
    }
  },

  // DELETE /api/siswa/:id
  remove: async (req, res, next) => {
    try {
      const id = parseInt(req.params.id, 10);
      const [result] = await pool.execute('DELETE FROM siswa WHERE id = ?', [id]);
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Siswa tidak ditemukan' });
      res.json({ message: 'Siswa berhasil dihapus' });
    } catch (err) {
      next(err);
    }
  }
};