const mongoose = require("mongoose");
const sauceSchema = mongoose.Schema({
    name: {type: String, required:true},
    manufacturer:  {type: String, required:true},
    description: {type: String, required:true},
    heat:  {type: Number, required:true},
    likes: {type: Number},
    dislikes: {type: Number},
    imageUrl: {type: String},
    mainPepper: {type: String, required:true},
    usersLiked: {type: Array},
    usersDisliked: {type: Array},
    userId: {type: String, required:true},
})

module.exports = mongoose.model('Sauce',sauceSchema)