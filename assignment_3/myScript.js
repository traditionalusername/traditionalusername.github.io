let images = [
    "img/img1.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg"
];

let names = [
      "Name_1",
      "Name_2",
      "Name_3",
      "Name_4"
];

let slideIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
  createSlides();
  showSlides(0);
});

function createSlides() {
  const slideshowContainer = document.getElementById("slideshow-container");

  images.forEach((src, index) => {
    const slide = document.createElement("div");
    slide.className = "mySlides fade";
    slide.innerHTML = `
      <img src="${src}" alt="" draggable="false">
      <div class="text">Caption ${index + 1}</div>
    `;

    slideshowContainer.appendChild(slide);
  });
}

function plusSlides(n) {
  showSlides(slideIndex + n);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");
  const totalSlides = slides.length;

  if (!totalSlides) return;
  slideIndex = ((n % totalSlides) + totalSlides) % totalSlides;

  // Hide all slides
  for (let i = 0; i < totalSlides; i++) {
    slides[i].style.display = "none";
  }

  // Show current slide
  slides[slideIndex].style.display = "block";
}
