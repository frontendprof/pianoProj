const BLACK_KEYS = ["s", "d", "g", "h", "j"];
const WHITE_KEYS = ["z", "x", "c", "v", "b", "n", "m"];


const recordBtn = document.querySelector(".record-button");
const keys = document.querySelectorAll(".key");
const white_keys = document.querySelectorAll(".key.white");
const black_keys = document.querySelectorAll(".key.black");

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




function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add("active");
  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}