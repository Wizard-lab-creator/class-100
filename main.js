var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
}
recognition.onresult = function (event) {
    console.log(event);
    var content = event.results[0][0].transcript;
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {
        console.log("taking a selfie in 5 seconds");
        speak();
    }
}

function speak() {
    var synth = window.speechSynthesis;
    speakData = "Taking Your Selfie In 5 Seconds";
    var speakthis = new SpeechSynthesisUtterance(speakData);
    synth.speak(speakthis);
    Webcam.attach(camera);
    setTimeout(function () {
        takeSnapshot();
        save();
    }, 5000);
}
camera = document.getElementById("camera");
Webcam.set({
    width: 360,
    height: 250,
    image_format: "jpeg",
    jpeg_quality: 90
});

function takeSnapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='selfieImage' src='" + data_uri + "'>";
    });
}

function save() {
    link = document.getElementById("link");
    image = document.getElementById("selfieImage").src;
    link.href = image;
    link.click();
}