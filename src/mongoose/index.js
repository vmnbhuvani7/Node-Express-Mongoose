const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect("mongodb://localhost:27017/vmndata", { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("connection success"))
    .catch((err) => console.log(err))

//schema :-schema define a structure of document
// default value,validators,etc..

const playlistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true, //convert lower case
        uppercase: true, // convert upper case
        trim: true, // remove space before and after
        minlength: 2, // min 2 letter
        minlength: [2, "minimum 2 letters"], // min 2 letter with msg print
        maxlength: 30 // max length 
    },
    ctype: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["front end", "backend end"],
    },
    videos: {
        type: Number,
        validate(value) {
            if (value < 0) {
                throw new Error("Video count should not negative")
            }
        }
    },
    author: String,
    email: {
        type: String,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is Invalid")
            }
        }
    },
    active: Boolean,
    date: {
        type: Date,
        default: Date.now
    }
})

//model: collection  creation
const Playlist = new mongoose.model("Playlist", playlistSchema)

// create document or insert

const createDocument = async () => {
    try {
        const reactPlaylist = new Playlist({
            name: "React",
            ctype: "Front End",
            videos: 110,
            author: "vaman",
            email: "abc@gmail.com",
            active: true
        })
        const nodePlaylist = new Playlist({
            name: "Node",
            ctype: "Backend End",
            videos: 6,
            author: "vaman",
            email: "abc@gmail.co",
            active: true
        })
        //single record
        // const result = await reactPlaylist.save(); 
        //multiple record
        const result = await Playlist.insertMany([reactPlaylist, nodePlaylist]);
        console.log("create data result", result);
    }
    catch (err) {
        console.log(err);
    }
}

createDocument()

const getDocument = async () => {
    try {
        const result = await Playlist
            // .find({ videos:1 }) //find videos
            // .find({ videos: { $lt: 50 } }) //find videos lessthan 50
            // .find({ videos: { $lte: 50 } }) //find videos lessthan + equal 50
            // .find({ videos: { $gt: 50 } }) //find videos greter than 50
            // .find({ videos: { $gte: 50 } }) //find videos greter than + equal 50

            // in a number we used this sign adn String we use "in" and "nin"
            // .find({ctype:{$in:["Backend End","Front End"]}}) //single + multiple also search 

            // .find({
            //     $or: [{ ctype: "Front End" },
            //     { videos: 6 }
            //     ]
            // }) //or operator
            // .find({
            //     $and: [{ ctype: "Front End" },
            //     { videos: 110 }
            //     ]
            // }) //and operator
            .find({ author: "vaman" })
            .select({ name: 1 }) //show only name filed
            // .countDocuments() 
            // .sort({ name: 1 }); //assending order
            .sort({ name: -1 }); //decending order
        // .limit(1); //show only one record
        console.log("get data result", result);
    }
    catch (err) {
        console.log(err);
    }
}
// getDocument()

updateDocument = async (_id) => {
    try {
        // const result = await Playlist.updateOne({ _id }, {
        const result = await Playlist.findByIdAndUpdate({ _id }, {
            $set: {
                author: "Vaman Bhuvani"
            }
        }, {
            new: true, //show updated record otherwise console show old record
            useFindAndModify: false
        })
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}

// updateDocument("5fa9260cf59fcf21e01c8d5a")


const deleteDocument = async (_id) => {
    try {
        // const result = await Playlist.deleteOne({ _id }) //delete one
        // const result = await Playlist.deleteMany({ _id }) //delete multiple 
        const result = await Playlist.findByIdAndDelete({ _id })
        console.log(result);
    }
    catch (err) {
        console.log(err);
    }
}
// deleteDocument("5fa92906ac04e72804e64c94")