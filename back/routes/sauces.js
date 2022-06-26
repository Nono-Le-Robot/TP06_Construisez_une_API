const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth")
const multer = require('../middleware/multer-config')

const ctrlSauces = require('../controllers/sauces')

router.get('/', auth, ctrlSauces.GetAllSauce);
router.get('/:id',auth, ctrlSauces.GetOneSauce);
router.post('/', auth, multer, ctrlSauces.CreateSauce);
router.put('/:id',auth, multer, ctrlSauces.ModifySauce);
router.delete('/',auth, ctrlSauces.DeleteAllSauce)
router.delete('/:id',auth,ctrlSauces.DeleteSauce);

router.post('/:id/like', ctrlSauces.CreateLike)

module.exports = router;