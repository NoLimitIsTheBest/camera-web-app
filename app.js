var frontCamera=false
var currentStream;

const
cameraView = document.querySelector("#camera-view");
cameraDevice = document.querySelector("#camera-device");
photoDisplay = document.querySelector("#photo-display");
takePhotoButton = document.querySelector("#take-photo-button");
frontCameraButton = document.querySelector("#front-camera-button");

function cameraStart(){
    if(typeof currentStream != undefined){
        currentStream.getTracks().forEach(track=>track.stop());
    }

    var constraints = {video:{facingMode:(frontCamera? "user":"environment"), auto:false}}

    navigator.mediaDevices.getUserMedia(constraints).then(function(stream){
        currentStream = true;
        cameraDevice.srcObject = stream;
    }).catch(function(error){
        console.error("Error",error);
    });
}

takePhotoButton.onClick = function(){
    cameraView.width= cameraDevice.videoWidth;
    cameraView.height= cameraDevice.videoHeight;
    cameraView.getContext("2d").drawimage(cameraDevice,0,0);
    photoDisplay.src = cameraView.toDataURL("image/webp");
    photoDisplay.classList.add("photo-taken")
};

frontCameraButton.onclick = function(){
    frontCamera =!frontCamera;
    if(frontCamera){
        frontCameraButton.textContent = "Back Camera"
    }else{
        frontCameraButton.textContent = "Front Camera"
    }
    cameraStart();
}

window.addEventListener("load", cameraStart);