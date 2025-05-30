window.onload = function () {
  Particles.init({
  selector: ".background"
  });
  compareTables('table1', 'table2');
  document.getElementById('year').textContent = new Date().getFullYear();
  animateSliders();
};


window.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.newslider').forEach((slider, i) => {
const btns = slider.querySelectorAll('.slider-btn');
const group = slider.querySelector('.slide-group');

// Set default to the middle slide: index 1
const defaultIndex = 1;
if (btns[defaultIndex]) {
  btns.forEach(b => b.classList.remove('active'));
  btns[defaultIndex].classList.add('active');
  group.style.transform = `translateX(-${defaultIndex * 100}%)`;
}

// Add click handlers
btns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    group.style.transform = `translateX(-${index * 100}%)`;
  });
});
const imgs = slider.querySelectorAll('img');
console.log(`Found ${imgs.length} images in slider #${i}`);
slider.querySelectorAll('img').forEach(img => {
if (!img.complete) {
  // Not yet loaded: attach onerror now
  img.onerror = function () {
    handleImageFallback(this);
  };
} else if (img.naturalWidth === 0) {
  // Already failed to load
  handleImageFallback(img);
}
});
});
document.querySelectorAll(".newslider").forEach(slider => {
const buttons = slider.querySelectorAll(".slider-btn");
const slideGroup = slider.querySelector(".slide-group");

const setActiveView = (index) => {
  // Move the slide group
  slideGroup.style.transform = `translateX(-${index * 100}%)`;

  // Update button states
  buttons.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });
};

// Button click
buttons.forEach((button, index) => {
  button.addEventListener("click", () => {
    setActiveView(index);
  });
});

// Click-half jump logic
const clickHalves = slider.querySelectorAll(".click-half");
clickHalves.forEach(half => {
  half.addEventListener("click", () => {
    const parentSlide = half.closest(".slide");
    const slides = Array.from(parentSlide.parentElement.children);
    const currentIndex = slides.indexOf(parentSlide);

    if (half.classList.contains("left-half")) {
      const newIndex = Math.max(0, currentIndex - 1);
      setActiveView(newIndex);
    } else if (half.classList.contains("right-half")) {
      const newIndex = Math.min(2, currentIndex + 1);
      setActiveView(newIndex);
    }
  });
});

// Set initial view to middle (1)
setActiveView(1);
});
});

function handleImageFallback(img) {
const fallback = document.createElement('div');
fallback.className = 'image-fallback';
fallback.textContent = img.alt || 'Image not available';
fallback.style.cssText = `
background-color: #ccc;
color: white;
font-size: 5rem;
`;
img.style.display = 'none';
img.parentNode.appendChild(fallback);
}

function compareTables(id1, id2) {
const t1 = document.getElementById(id1);
const t2 = document.getElementById(id2);

const rows1 = t1.tBodies[0].rows;
const rows2 = t2.tBodies[0].rows;

for (let i = 0; i < rows1.length; i++) {
const cells1 = rows1[i].cells;
const cells2 = rows2[i]?.cells;
for (let j = 0; j < cells1.length; j++) {
const val1 = cells1[j].textContent.trim().replace(/–/g, "-");
const val2 = cells2[j].textContent.trim().replace(/–/g, "-");
if (val1 !== val2) {
  cells1[j].classList.add("diff");
  cells2[j].classList.add("diff");
}
}
}
}

const particles = Particles.init({
selector: ".background",
color: ["#03dac6", "#ff0266", "#000000"],
connectParticles: true,
maxParticles:180,
responsive: [
{
breakpoint: 768,
options: {
  color: ["#faebd7", "#03dac6", "#ff0266"],
  maxParticles: 50,
  sizeVariations:4,
  connectParticles: true
}
},
{
breakpoint: 425,
options: {
  maxParticles: 
  20,
  connectParticles: true
  }
}, 
{
breakpoint: 320,
options: {
  maxParticles: 10
  }
}
]
});

//Animated sliders for image
let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
showSlides(slideIndex += n);
}
function currentSlide(n) {
showSlides(slideIndex = n);
}
function showSlides(n) {
let i;
let slides = document.getElementsByClassName("mySlides");
let dots = document.getElementsByClassName("dot");
if (n > slides.length) {slideIndex = 1}    
if (n < 1) {slideIndex = slides.length}
for (i = 0; i < slides.length; i++) {
slides[i].style.display = "none";  
}
for (i = 0; i < dots.length; i++) {
dots[i].className = dots[i].className.replace(" active", "");
}
slides[slideIndex-1].style.display = "block";  
dots[slideIndex-1].className += " active";
}

class NavigationPage {
constructor() {
this.currentId = null;
this.currentTab = null;
this.tabContainerHeight = 70;
this.lastScroll = 0;

let self = this;
$(".nav-tab").click(function () {
self.onTabClick(event, $(this));
});
$(window).scroll(() => {
this.onScroll();
});
$(window).resize(() => {
this.onResize();
});
}

onTabClick(event, element) {
event.preventDefault();
$(".nav-tab").removeClass('active-tab');
//$(".slider").removeClass("active-section");
let scrollTop =
$(element.attr("href")).offset().top - this.tabContainerHeight + 1;
$("html, body").animate({ scrollTop: scrollTop }, 600);
$(element).addClass('active-tab');
//$(element.attr("href")).addClass('active-section');

}

onScroll() {
this.checkHeaderPosition();
this.findCurrentTabSelector();
this.lastScroll = $(window).scrollTop();
}

onResize() {
if (this.currentId) {
this.setSliderCss();
}
}

checkHeaderPosition() {
const headerHeight = 75;
if ($(window).scrollTop() > headerHeight) {
$(".nav-container").addClass("nav-container--scrolled");
} 
}

findCurrentTabSelector(element) {
let newCurrentId;
let newCurrentTab;
let self = this;
$(".nav-tab").each(function () {
let id = $(this).attr("href");
let offsetTop = $(id).offset().top - self.tabContainerHeight;
let offsetBottom =
  $(id).offset().top + $(id).height() - self.tabContainerHeight;
if (
  $(window).scrollTop() > offsetTop &&
  $(window).scrollTop() < offsetBottom
) {
  newCurrentId = id;
  newCurrentTab = $(this);
}
});
if (this.currentId != newCurrentId || this.currentId === null) {
this.currentId = newCurrentId;
this.currentTab = newCurrentTab;
this.setSliderCss();
}
}

setSliderCss() {
let width = 0;
let left = 0;
if (this.currentTab) {
width = this.currentTab.css("width");
left = this.currentTab.offset().left;
}
$(".nav-tab-slider").css("width", width);
$(".nav-tab-slider").css("left", left);
}
}

new NavigationPage();
