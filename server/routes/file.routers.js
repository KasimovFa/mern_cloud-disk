const Router = require('express');
const fileController = require('../controllers/fileController');
const router = new Router();
const authmiddleware = require('../middleware/auth.middleware');

router.post('', authmiddleware, fileController.createDir);
router.get('', authmiddleware, fileController.getFiles);
router.post('/upload', authmiddleware, fileController.uploadFile);
router.post('/avatar', authmiddleware, fileController.uploadAvatar);
router.get('/download', authmiddleware, fileController.downLoadFile);
router.get('/search', authmiddleware, fileController.searchFile);
router.delete('', authmiddleware, fileController.deleteFile);
router.delete('/avatar', authmiddleware, fileController.deleteAvatar);


module.exports = router;