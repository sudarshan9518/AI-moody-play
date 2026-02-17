const express = require('express')
const multer = require('multer');
const uploadFile = require('../service/storage.service');
const router = express.Router();
const songModel = require("../models/song.model")


const upload = multer({sotrage: multer.memoryStorage()})

router.post("/songs", upload.single("audio"),  async(req, res)=>{

    console.log(req.body)
    console.log(req.file)
    const fileData = await uploadFile( req.file)

    const song = await songModel.create({
        title: req.body.title,
        artist : req.body.artist,
        audio: fileData.url,
        mood: req.body.mood

    })

    res.status(201).json({
        message : "creted",
        song : song
    })

})


router.get("/songs", async (req, res) => {
  try {
    const { mood } = req.query;

    if (!mood) {
      return res.status(400).json({
        message: "Mood is required"
      });
    }
    await connectDB();
    const songs = await songModel.find({ mood });

    res.status(200).json({
      message: "Successfully fetched data",
      songs
    });

  } catch (error) {
    console.error("Songs Route Error:", error);

    res.status(500).json({
      message: "Internal Server Error"
    });
  }
});

  
 




module.exports = router;