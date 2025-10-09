console.log("welcome to the Industry Night website!");

// greensock plug in 

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// variables

const menu = document.querySelector(".menu"),
    menuItems = document.querySelectorAll(".menuItem"),
    hamburger = document.querySelector(".hamburger"),
    container = document.querySelector("#students-container");

const students = [
    {
        name: "Josephine Muncaster",
        role: "Motion Designer",
        image: "images/industry_headshots/jo_headshot.png",
        portfolio: "#"
    },
    {
        name: "Amy Armstrong",
        role: "Designer",
        image: "images/industry_headshots/amy_headshot.png",
        portfolio: "#"
    },
    {
        name: "Laila Seif",
        role: "Manager/Designer",
        image: "images/industry_headshots/laila_headshot.png",
        portfolio: "#"
    },
    {
        name: "Zakia Sultana",
        role: "Developer",
        image: "images/industry_headshots/zakia_headshot.png",
        portfolio: "#"
    }
];

// functions 

function togglemenu() {
    console.log("toggle menu");
    if (menu.classList.contains("showMenu")) {
        menu.classList.remove("showMenu");
    } else {
        menu.classList.add("showMenu");
    }
}

function renderStudents(studentArray) {
  const container = document.getElementById("students-container");

  container.innerHTML = "";

  studentArray.forEach(student => {
    const card = document.createElement("div");
    card.classList.add("student-card");

    card.innerHTML = `
      <h2>${student.name}</h2>
      <p>${student.role}</p>
      <img src="${student.image}" alt="${student.name}">
      <a href="${student.portfolio}" target="_blank">View Portfolio</a>
    `;

    container.appendChild(card);
  });
}


renderStudents(students);

// event listeners

hamburger.addEventListener('click', togglemenu);
