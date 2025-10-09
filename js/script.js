console.log("welcome to the Industry Night website!");

// greensock plug in 

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// variables

const menu = document.querySelector(".menu"),
    menuItems = document.querySelectorAll(".menuItem"),
    hamburger = document.querySelector(".hamburger"),
    playerCon = document.querySelector("#player-container"),
    player = document.querySelector("video"),
    videoControls = document.querySelector("#video-controls"),
    playButton = document.querySelector("#play-button"),
    pauseButton = document.querySelector("#pause-button"),
    stopButton = document.querySelector("#stop-button"),
    volumeSlider = document.querySelector("#change-vol"),
    fullScreen = document.querySelector("#full-screen"),
    imageContainer = document.querySelector('.image-container'),
    nameElement = document.querySelector('.name'),
    designationElement = document.querySelector('.designation'),
    quoteElement = document.querySelector('.quote'),
    prevButton = document.querySelector('.prev-button'),
    nextButton = document.querySelector('.next-button'),
    autoplayInterval = setInterval(handleNext, 5000);

let activeIndex = 0;

const testimonials = [
    {
        quote: "Watching the students collaborate as mini studios is truly inspiring. They draw on everything they’ve learned over four levels to bring real client projects to life. Each year, I’m impressed by the creativity, professionalism, and originality they bring to their work!",
        name: "Marco DeLuca",
        designation: "IDP3 Professor, Program Coordinator",
        src: "images/industry_photos/industry_marco.png",
    },
    {
        quote: "Industry Night belongs to the students. It is the combined effort of everything that they have been working toward for the past two years while in IDP. It is an extraordinary showcase of talent, abilities and the vast knowledge of each learner across an entire cohort of extraordinary people. All the best to our grads! It is your time to shine.",
        name: "Jarrod",
        designation: "IDP Design Instructor",
        src: "images/industry-night-photography/DSC00551_copy.jpg",
    },
    {
        quote: "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
        name: "Justin Brunner",
        designation: "Satisfied Customer",
        src: "images/industry-night-photography/DSC01039.jpg",
    },
    {
        quote: "Shining Yam is a hidden gem! From the moment I walked in, I knew I was in for a treat. The impeccable service and overall attention to detail created a memorable experience. I highly recommend it!",
        name: "Joe Kormendi",
        designation: "Satisfied Customer",
        src: "images/industry-night-photography/DSC00464_copy.jpg",
    }
];

// control

player.controls = false;
videoControls.classList.remove("hidden");

updateTestimonial(0);

[prevButton, nextButton].forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(autoplayInterval);
    });
});

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
    player.currentTime = 1;
}

function changeVolume() {
    console.log("change volume function called");
    console.log("volume value: ", volumeSlider.value);
    player.volume = volumeSlider.value;
}

function toggleFullScreen() {
    console.log("toggle full screen function called");
    if (document.fullscreenElement) {
        console.log("exiting full screen");
        document.exitFullscreen();
    } else {
        console.log("entering full screen");
        playerCon.requestFullscreen();
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

function calculateGap(width) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;

    if (width <= minWidth) return minGap;
    if (width >= maxWidth) return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));

    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

function updateTestimonial(direction) {
    const oldIndex = activeIndex;
    activeIndex = (activeIndex + direction + testimonials.length) % testimonials.length;

    const containerWidth = imageContainer.offsetWidth;
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;

    testimonials.forEach((testimonial, index) => {
        let img = imageContainer.querySelector(`[data-index="${index}"]`);
        if (!img) {
            img = document.createElement('img');
            img.src = testimonial.src;
            img.alt = testimonial.name;
            img.classList.add('testimonial-image');
            img.dataset.index = index;
            imageContainer.appendChild(img);
        }

        const offset = (index - activeIndex + testimonials.length) % testimonials.length;
        const zIndex = testimonials.length - Math.abs(offset);
        const opacity = index === activeIndex ? 1 : 1;
        const scale = index === activeIndex ? 1 : 0.85;

        let translateX, translateY, rotateY;
        if (offset === 0) {
            translateX = '0%';
            translateY = '0%';
            rotateY = 0;
        } else if (offset === 1 || offset === -2) {
            translateX = '20%';
            translateY = `-${maxStickUp / img.offsetHeight * 100}%`;
            rotateY = -15;
        } else {
            translateX = '-20%';
            translateY = `-${maxStickUp / img.offsetHeight * 100}%`;
            rotateY = 15;
        }

        gsap.to(img, {
            zIndex: zIndex,
            opacity: opacity,
            scale: scale,
            x: translateX,
            y: translateY,
            rotateY: rotateY,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    gsap.to([nameElement, designationElement], {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            nameElement.textContent = testimonials[activeIndex].name;
            designationElement.textContent = testimonials[activeIndex].designation;
            gsap.to([nameElement, designationElement], {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    gsap.to(quoteElement, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
            quoteElement.innerHTML = testimonials[activeIndex].quote.split(' ').map(word => `<span class="word">${word}</span>`).join(' ');
            gsap.to(quoteElement, {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
            animateWords();
        }
    });
}

function animateWords() {
    gsap.from('.word', {
        opacity: 0,
        y: 10,
        stagger: 0.02,
        duration: 0.2,
        ease: "power2.out"
    });
}

function handleNext() {
    updateTestimonial(1);
}

function handlePrev() {
    updateTestimonial(-1);
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
prevButton.addEventListener('click', handlePrev);
nextButton.addEventListener('click', handleNext);
window.addEventListener('resize', () => updateTestimonial(0));
