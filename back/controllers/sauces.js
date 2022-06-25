const Sauce = require ('../models/sauce')

exports.CreateSauce = (req,res,next) => {
    delete req.body._id
    const sauce = new Sauce({...req.body})
    sauce.save()
    .then(() => { res.status(201).json({ message : 'post success'})})
    .catch(error =>res.status(400).json({ error }))
}

exports.GetAllSauce = (req,res,next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error }))
}

exports.GetOneSauce = (req,res,next) => {
    Sauce.findOne({ _id : req.params.id})
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }))
}

exports.ModifySauce =  (req,res,next) =>{
    Sauce.updateOne({_id : req.params.id},{...req.body, _id : req.params.id})
    .then(res.status(200).json({message : 'sauce modifié'}))
    .catch(error => res.status(404).json({error})) 
}

exports.DeleteSauce = (req,res,next) => {
    Sauce.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({message :'sauce supprimée'}))
    .catch(error => res.status(404).json({ error }));
}


exports.DeleteAllSauce = (req,res,next) => {
    Sauce.deleteMany()
    .then(() => res.status(200).json({message :'sauces supprimées'}))
    .catch(error => res.status(404).json({ error }));
}