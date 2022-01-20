function setup() {
    c1 = createCanvas(280, 280)
    c1.center()
    background("white");
    c1.mouseReleased(classifyCanvas);
    api = window.speechSynthesis
}

function preload() {
    mymodel = ml5.imageClassifier('DoodleNet');
}


function erase() {
    background("white");
}


function draw() {
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}


function classifyCanvas() {
    mymodel.classify(c1, gotResult)
}

function gotResult(error, results) {
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        document.getElementById("object_name").innerHTML = "My guess is-" + results[0].label;
        document.getElementById("accuracy").innerHTML = "My confidence is-" + Math.round(results[0].confidence * 100) + " %";
        say = new SpeechSynthesisUtterance(results[0].label);
        api.speak(say)
    }
}