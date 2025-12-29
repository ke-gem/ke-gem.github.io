// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

window.addEventListener('load', () => {
  // Scroll timeline to the far right
  const timeline = document.querySelector('#history .timeline-container');
  if (timeline) {
    timeline.scrollLeft = timeline.scrollWidth;
  }

  // Video management
  const videoFiles = Array.from({ length: 11 }, (_, i) => `resource/video/v_${i}.mp4`);
  const video = document.getElementById("backgroundVideo");
  const source = document.getElementById("videoSource");

  function getRandomIndex(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function playRandomVideo() {
    const randomIndex = getRandomIndex(4, 10); // only v_4 to v_10
    source.src = videoFiles[randomIndex];
    video.load();
  }

  video.addEventListener("ended", playRandomVideo);

  video.addEventListener("canplay", () => {
    video.play().catch(err => {
      console.error("Autoplay failed:", err);
    });
  });

  video.load();

  // Sticky header
  const header = document.getElementById('top-section');
  const page = document.getElementById('content');
  const openMenuButton = document.getElementById('openmenu');

  window.addEventListener('scroll', function() {
    page.classList.remove('menuopen');
    if (window.scrollY >= 100) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  openMenuButton.addEventListener('click', function() {
    header.classList.remove('sticky');
    page.classList.add('menuopen');
  });

  // Smooth scroll for anchor links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});

// Image fallback handler
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

// Slider setup
const sliders = [
  ["Velocity Comparison", "velocity"],
  ["Epsilon Comparison", "epsilon"],
  ["Velocity Update Comparison", "velocity_update"],
  ["Delta Comparison", "delta"],
];

const container = document.getElementById("newslider-section");

sliders.forEach(([title, prefix]) => {
  const html = `
  <div class="newslider">
    <div class="slider-header">${title}</div>
    <div class="slider-controls">
      <button class="slider-btn" data-view="0">Traditional</button>
      <button class="slider-btn active" data-view="1">Starting</button>
      <button class="slider-btn" data-view="2">GEM VM</button>
    </div>
    <div class="slider-track">
      <div class="slide-group">
        <div class="slide starting-slide">
          <div class="click-half right-half"></div>
          <img src="resource/img/${prefix}_traditional.png" alt="Traditional">
        </div>
        <div class="slide starting-slide">
          <div class="click-half left-half"></div>
          <div class="click-half right-half"></div>
          <img src="resource/img/${prefix}_starting.png" alt="Starting">
        </div>
        <div class="slide starting-slide">
          <div class="click-half left-half"></div>
          <img src="resource/img/${prefix}_gemvm.png" alt="GEM VM">
        </div>
      </div>
    </div>
  </div>`;
  container.insertAdjacentHTML("beforeend", html);
});

// Animate sliders
function animateSliders() {
  const allSliders = container.querySelectorAll('.newslider');

  allSliders.forEach(slider => {
    const sequence = [1, 0, 1, 2];
    let seqIndex = 0;

    const buttons = slider.querySelectorAll('.slider-btn');
    const slideGroup = slider.querySelector('.slide-group');

    function updateView(viewIndex) {
      slideGroup.style.transform = `translateX(-${viewIndex * 100}%)`;
      buttons.forEach(btn => {
        btn.classList.toggle('active', Number(btn.dataset.view) === viewIndex);
      });
    }

    updateView(sequence[seqIndex]);

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const view = Number(btn.dataset.view);
        seqIndex = sequence.indexOf(view);
        if (seqIndex === -1) seqIndex = 0;
        updateView(view);
      });
    });

    setInterval(() => {
      seqIndex = (seqIndex + 1) % sequence.length;
      updateView(sequence[seqIndex]);
    }, 3000);
  });
}

// Initialize sliders after DOM is ready
window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.newslider').forEach((slider, i) => {
    const btns = slider.querySelectorAll('.slider-btn');
    const group = slider.querySelector('.slide-group');

    const defaultIndex = 1;
    if (btns[defaultIndex]) {
      btns.forEach(b => b.classList.remove('active'));
      btns[defaultIndex].classList.add('active');
      group.style.transform = `translateX(-${defaultIndex * 100}%)`;
    }

    btns.forEach((btn, index) => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        group.style.transform = `translateX(-${index * 100}%)`;
      });
    });

    const imgs = slider.querySelectorAll('img');
    imgs.forEach(img => {
      if (!img.complete) {
        img.onerror = function () {
          handleImageFallback(this);
        };
      } else if (img.naturalWidth === 0) {
        handleImageFallback(img);
      }
    });
  });

  document.querySelectorAll(".newslider").forEach(slider => {
    const buttons = slider.querySelectorAll(".slider-btn");
    const slideGroup = slider.querySelector(".slide-group");

    const setActiveView = (index) => {
      slideGroup.style.transform = `translateX(-${index * 100}%)`;
      buttons.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
      });
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        setActiveView(index);
      });
    });

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

    setActiveView(1);
  });

  animateSliders();
});

// Scroll to top button
const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "block";
    scrollBtn.style.pointerEvents = "auto";
  } else {
    scrollBtn.style.display = "none";
    scrollBtn.style.pointerEvents = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});