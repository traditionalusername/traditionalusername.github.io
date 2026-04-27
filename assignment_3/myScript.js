let images = [
    "img/img1.jpg",
    "img/img2.jpg",
    "img/img3.jpg",
    "img/img4.jpg"
];

let names = [
      "Name_1",traditionalusername/cloudflare
      "Name_2",
      "Name_3",
      "Name_4"
];

let slideIndex = 1;

document.addEventListener("DOMContentLoaded", () => {
  createSlides();
  showSlides(slideIndex);
});

function createSlides() {
  const slideshowContainer = document.getElementById("slideshow-container");

  images.forEach((src, index) => {
    const slide = document.createElement("div");
    slide.className = "mySlides fade";
    slide.innerHTML = `
      <img src="${src}" style="width:100%" alt="">
      <div class="text">Caption ${index + 1}</div>
    `;

    slideshowContainer.appendChild(slide);
  });
}

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  const slides = document.getElementsByClassName("mySlides");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  // Show current slide
  slides[slideIndex - 1].style.display = "block";
}