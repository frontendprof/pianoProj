const BLACK_KEYS = ["s", "d", "g", "h", "j"];
const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m"];


const recordBtn = document.querySelector(".record-button");
const playBtn = document.querySelector(".play-button");
const saveBtn = document.querySelector(".save-button");
const keys = document.querySelectorAll(".key");
const white_keys = document.querySelectorAll(".key.white");
const black_keys = document.querySelectorAll(".key.black");

const keyMap = [...keys].reduce((map, key) => {
  map[key.dataset.note] = key;
  return map;
}, {})


let recordingStartTime;
let songNotes;




keys.forEach((key) => {
  key.addEventListener("click", () => playNote(key));
});

recordBtn.addEventListener("click", toggleRecording);

document.addEventListener("keydown", (e) => {
  if (e.repeat) return;

  const key = e.key;

  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) playNote(white_keys[whiteKeyIndex]);
  if (blackKeyIndex > -1) playNote(black_keys[blackKeyIndex]);
});


function toggleRecording() {
  recordBtn.classList.toggle("active");

  if (isRecording()) {
    startRecording()
  } else {
    stopRecording()
  }
}


function isRecording() {
  return recordBtn != null && recordBtn.classList.contains("active");
}


function startRecording() {
  recordingStartTime = Date.now();
  songNotes = [];

  playBtn.classList.remove("show");
  saveBtn.classList.remove("show");
}

function stopRecording() {
  playSong();
  playBtn.classList.add("show");
  saveBtn.classList.add("show");
}

function playSong() {
  if (songNotes.length === 0) return

  songNotes.forEach(note => {
    setTimeout(() => {
      playNote(keyMap[note.key]);

    }, note.startTime);
  })

}




function playNote(key) {

  if (isRecording()) recordNote(key.dataset.note);


  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add("active");
  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}


function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime
  })
}