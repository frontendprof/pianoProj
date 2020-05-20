const express = require("express");
const mongoose = require("mongoose");

const Songs = require("./modules/song.js")

mongoose.connect("mongodb://localhost/songrRecorder", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.set("view engine", 'ejs');
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index")
});

app.post("/songs", async (req, res) => {
    const song = new Song({
        notes: req.body.songNotes
    })

    await song.save();

    res.json(song);
})

app.get("/songs/:id", async (req, res) => {
    let song

    try {
        song = await Song.findById(req.params.id);
    } catch (e) {
        song = undefined;
    }

    res.render("index", {
        song: song
    })
})


const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port ${port} 🔥`);