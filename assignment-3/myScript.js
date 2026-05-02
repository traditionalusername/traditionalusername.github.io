let images = [
    "img/jefferson_voelker.jpg",
    "img/maria_bowling.jpg",
    "img/kerry_grundlingh.jpg",
    "img/lauren_blackburn.jpg",
    "img/james_li.jpg",
    "img/misrach_ewunetie.jpg"
];

let names = [
      "Jefferson Voelker ’28",
      "Maria Bowling",
      "Kerry Grundlingh ’27",
      "Lauren Blackburn ’26",
      "James Li '27",
      "Misrach Ewunetie ’24"
];

let slideIndex = 0;
let thoughtsByStudent = images.map(() => []);

document.addEventListener("DOMContentLoaded", () => {
  createSlides();
  bindThoughtForm();
  showSlides(0);
});

function createSlides() {
  const slideshowContainer = document.getElementById("slideshow-container");

  images.forEach((src, index) => {
    const slide = document.createElement("div");
    slide.className = "mySlides";
    slide.innerHTML = `
      <img src="${src}" alt="" draggable="false">
      <p class="text">${names[index] || `Student ${index + 1}`}</p>
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
  renderThoughtsForCurrentSlide();
}

function bindThoughtForm() {
  const thoughtForm = document.getElementById("thought-form");
  const thoughtInput = document.getElementById("thought-input");

  thoughtForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const message = thoughtInput.value.trim();

    if (!message) return;

    thoughtsByStudent[slideIndex].unshift(message);
    thoughtInput.value = "";
    renderThoughtsForCurrentSlide();
    thoughtInput.focus();
  });
}

function renderThoughtsForCurrentSlide() {
  const currentName = names[slideIndex] || `Student ${slideIndex + 1}`;
  const studentHeader = document.getElementById("thoughts-title");
  const title = document.getElementById("list-title");
  const entryList = document.getElementById("entry-list");
  const currentThoughts = thoughtsByStudent[slideIndex];

  studentHeader.textContent = currentName;
  title.textContent = "Recently Shared.";
  entryList.innerHTML = "";

  if (currentThoughts.length === 0) {
    const emptyMessage = document.createElement("p");
    emptyMessage.className = "empty";
    emptyMessage.textContent = "Be the first to share.";
    entryList.appendChild(emptyMessage);
    return;
  }

  currentThoughts.forEach((thought) => {
    const entry = document.createElement("div");
    entry.className = "entry";
    entry.textContent = thought;
    entryList.appendChild(entry);
  });
}
