canvas = "";

music = "";

left_wrist_x = 0;
left_wrist_y = 0;
right_wrist_y = 0;
right_wrist_x = 0;
leftWrist_score = 0;
rightWrist_score = 0;

function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();

    poseNet = ml5.poseNet(video, mdl);
    poseNet.on("pose", gotPoses);

}


function mdl(){
    console.log("Posenet Is Initialized")
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("red");
    stroke("red");
    if(leftWrist_score > 0.2){
    circle(left_wrist_x, left_wrist_y, 20);
    leftWrist_no = Number(left_wrist_y);
    remove_decimal = floor(leftWrist_no);
    volume = remove_decimal/550;
    music.setVolume(volume);
    document.getElementById('volume').innerHTML = "Volume : " + volume.toFixed(2);
    }
    if(rightWrist_score > 0.2){
    circle(right_wrist_x, right_wrist_y, 20);
    
    if (right_wrist_y >0 && right_wrist_y <= 100){
        document.getElementById('speed').innerHTML = "Speed : 0.5x";
        music.rate(0.5);
    }

    if(right_wrist_y >100 && right_wrist_y <=200){
        document.getElementById('speed').innerHTML = "Speed : 1x";
        music.rate(1);
    }

    if (right_wrist_y >200 && right_wrist_y <= 300){
        document.getElementById('speed').innerHTML = "Speed : 1.5x"
        music.rate(1.5);
    }

    if(right_wrist_y >300 && right_wrist_y <= 400){
        document.getElementById('speed').innerHTML = "Speed : 2x";
        music.rate(2);
    }

    if(right_wrist_y >400 && right_wrist_y <= 500){
        document.getElementById('speed').innerHTML = "Speed : 2.5x";
        music.rate(2.5);
    }
}
}

function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}

function gotPoses(results){
    if (results.length > 0){
        left_wrist_x = results[0].pose.leftWrist.x;
        right_wrist_x = results[0].pose.rightWrist.x;
        left_wrist_y = results[0].pose.leftWrist.y;
        right_wrist_y = results[0].pose.rightWrist.y;
        leftWrist_score = results[0].pose.keypoints[9].score;
        console.log(leftWrist_score);
        console.log("Left Wrist X : " + left_wrist_x + ", Right Wrist X : " + right_wrist_x + ", Left Wrist Y : " + left_wrist_y + " and Right Wrist Y : " + right_wrist_y);
        rightWrist_score = results[0].pose.keypoints[10].score;
    }
}