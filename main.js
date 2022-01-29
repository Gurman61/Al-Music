song="";
leftWristX= 0;
leftWristY= 0;
rightWristX= 0;
rightWristy= 0;
scoreLeftWrist= 0;
scoreRightWrist= 0;

song1="music.mp3";
song2="music-2.mp3";

function preload()
{
    song1=loadSound("music.mp3");
    song2=loadSound("music-2.mp3");
}

function setup()
{
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture();
    video.hide();

    poseNet=ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotPoses);
}

function modalLoaded()
{
    console.log("Modal is initialized");
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        leftWristx=results[0].pose.leftWrist.x;
        leftWristy=results[0].pose.leftWrist.y;
        console.log("leftWristx = "+leftWristx+"leftWristy = "+leftWristy);

        rightWristx=results[0].pose.rightWrist.x;
        rightWristy=results[0].pose.rightWrist.y;
        console.log("rightWristx = "+rightWristx+"rightWristy = "+rightWristy);

        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score for left wrist "+scoreLeftWrist);

        scoreRightWrist=results[0].pose.keypoints[10].score;
        console.log("score for right wrist "+scoreRightWrist);
    }
}

function draw()
{
    image(video,0,0,300,300);

    fill("#FF0000");
    stroke("#FF0000");
    if(scoreLeftWrist>0.2)
    {
        circle(leftWristx,leftWristy,20);
        inNumberleftWrity=Number(leftWristy);
        remove_decimal=floor(inNumberleftWrity);
        volume=remove_decimal/1000;
        volumeX=document.getElementById("volume").innerHTML="volume ="+volume;
        song.setVolume(volume);
    }
}

function play()
{
    song1.play();
    song1.setVolume(1);
    song.rate(1);
}

function stop()
{
    song.stop();
}

function pause()
{
    song.pause();
}

function next()
{
    song2.play();
}

function previous()
{
    song1.play();
}