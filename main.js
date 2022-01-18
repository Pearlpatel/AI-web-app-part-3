song_1=" ";
song_2=" ";
leftwristX=0;
leftwristY=0;
rightwristX=0;
rightwristY=0;
scoreleftwrist=0;
scorerightwrist=0;
songleft=" ";
songright=" ";

function preload() {
    song_1=loadSound("Peter_Pan.mp3"); 
    song_2=loadSound("HarryPotter.mp3");
}

function setup() {
    canvas=createCanvas(500,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    model_posenet=ml5.poseNet(video,model_loaded);
  model_posenet.on("pose",gotresults);
}

function draw() {
    image(video,0,0,500,500);

    fill("blue");
    stroke("blue");

    songleft=song_1.isPlaying();
    songright=song_2.isPlaying();

     if (scoreleftwrist>0.2) {
         circle(leftwristX,leftwristY,20);
         song_2.stop();

         if (songleft==false) {
             song_1.play();
             document.getElementById("song_nameh3").innerHTML="This song is Peter Pan !";
         }
     }
     
     if (scorerightwrist>0.2) {
         
        circle(rightwristX,rightwristY,20);
        song_1.stop();

        if (songright==false) {
            song_2.play();
            document.getElementById("song_nameh3").innerHTML="This song is Harry Potter !";
        }
     }
}

function  model_loaded() {
    console.log("The model has been loaded");
}

function gotresults(results) {
    if (results.length>0) {
        console.log(results);


        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;

    }
}