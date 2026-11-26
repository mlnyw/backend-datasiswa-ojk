const express = require('express');
const router = express.Router();
const siswaController = require('../controllers/siswaController');
const { validateSiswaCreate, validateSiswaUpdate } = require('../middlewares/validation');

router.get('/', siswaController.getAll);
router.get('/:id', siswaController.getById);
router.post('/', validateSiswaCreate, siswaController.create);
router.put('/:id', validateSiswaUpdate, siswaController.update);
router.delete('/:id', siswaController.remove);

module.exports = router;