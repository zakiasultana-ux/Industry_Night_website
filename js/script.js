console.log("welcome to the Industry Night website!");

// variables

const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const hamburger= document.querySelector(".hamburger");

// functions 

function togglemenu() {
    console.log("toggle menu"); 
    if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
  } else {
    menu.classList.add("showMenu");
  }
}

// event listeners

hamburger.addEventListener('click', togglemenu);
