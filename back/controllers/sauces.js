const Sauce = require ('../models/sauce')
const fs = require("fs");

exports.CreateSauce = (req,res,next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id
    const sauce = new Sauce({
        ...sauceObject,
        likes : 0,
        dislikes : 0,
        usersDisliked : [],
        usersLiked : [],
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    })
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
    const sauceObject = req.file ? 
    { 
        ...JSON.parse(req.body.sauce),
        imageUrl : `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
     } : { ...req.body }
    Sauce.updateOne({_id : req.params.id},{...sauceObject, _id : req.params.id})
    .then(res.status(200).json({message : 'sauce modifié'}))
    .catch(error => res.status(404).json({error})) 
}

exports.DeleteSauce = (req,res,next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
    const filename = sauce.imageUrl.split('/images/')[1];
    fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
        });
    })
    .catch(error => res.status(500).json({ error }));
}

exports.DeleteAllSauce = (req,res,next) => {
    Sauce.deleteMany()
    .then(() => res.status(200).json({message :'sauces supprimées'}))
    .catch(error => res.status(404).json({ error }));
}

exports.CreateLike = (req,res,next) => {
    Sauce.findOne({
        _id : req.params.id
    })
    .then(sauce => {
        if(req.body.like == -1) {
            sauce.dislikes++;
            sauce.usersDisliked.push(req.body.userId);
            sauce.save();
        }
        if(req.body.like == 1) {
            sauce.likes++;
            sauce.usersLiked.push(req.body.userId);
            sauce.save();
        }
        if (req.body.like == 0){
            if(sauce.usersLiked.indexOf(req.body.userId) != 1){
                sauce.likes--
                sauce.usersLiked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1)
            }else{
                sauce.dislikes--
                sauce.usersDisliked.splice(sauce.usersDisliked.indexOf(req.body.userId), 1)
            }
            sauce.save()
        }
        res.status(200).json({message : 'like pris en compte'})
    })
    .catch(error => {
        res.status(500).json({ error })
    })
}