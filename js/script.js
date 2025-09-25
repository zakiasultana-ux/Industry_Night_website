console.log("welcome to the Industry Night website!");

// variables

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");
const playerCon = document.querySelector("#player-container");
const player = document.querySelector("video");
const videoControls = document.querySelector("#video-controls");
const playButton = document.querySelector("#play-button");
const pauseButton = document.querySelector("#pause-button");
const stopButton = document.querySelector("#stop-button");
const volumeSlider = document.querySelector("#change-vol");
const fullScreen = document.querySelector("#full-screen");

// control

// player.controls = false;
// videoControls.classList.remove("hidden");

// functions 

function togglemenu() {
    console.log("toggle menu"); 
    if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
  } else {
    menu.classList.add("showMenu");
  }
}

function playVideo() {
    console.log("play video function called");
    player.play();
}

function pauseVideo() {
    console.log("pause video function called");
    player.pause();
}

function stopVideo() {
    console.log("stop video function called");
    player.pause();
    player.currentTime = 1;// to avoid black screen, setting it to 1 sec instead of 0 sec 
}

function changeVolume() {
    console.log("change volume function called");
    console.log("volume value: ", volumeSlider.value);
    player.volume = volumeSlider.value;
}

function toggleFullScreen() {
    console.log("toggle full screen function called");
    if(document.fullscreenElement) {// if already in full screen mode then exit. its similiar to writing if(document.fullscreenElement === true)
        console.log("exiting full screen");
        document.exitFullscreen();
    } else {
        console.log("entering full screen");
        playerCon.requestFullscreen();// to make the whole player container full screen (not just video)
    }
}

function showControls() {
    console.log("show controls function called");
    videoControls.classList.remove("hide");
}

function hideControls() {
    console.log("hide controls function called");
    videoControls.classList.add("hide");
}

// event listeners

hamburger.addEventListener('click', togglemenu);
playButton.addEventListener("click", playVideo);
pauseButton.addEventListener("click", pauseVideo);
stopButton.addEventListener("click", stopVideo);
volumeSlider.addEventListener("change", changeVolume);
fullScreen.addEventListener("click", toggleFullScreen);
videoControls.addEventListener("mouseenter", showControls);
videoControls.addEventListener("mouseleave", hideControls);
player.addEventListener("mouseenter", showControls);
player.addEventListener("mouseleave", hideControls);
