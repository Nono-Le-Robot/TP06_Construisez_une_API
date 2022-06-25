const express = require("express");
const router = express.Router();
const ctrlSauces = require('../controllers/sauces')

router.post('/', ctrlSauces.CreateSauce);
router.get('/', ctrlSauces.GetAllSauce);
router.get('/:id',ctrlSauces.GetOneSauce);
router.put('/:id',ctrlSauces.ModifySauce);
router.delete('/:id',ctrlSauces.DeleteSauce);

module.exports = router;