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
const STORAGE_KEY = "chapel_thoughts_by_student_v1";
let thoughtsByStudent = loadThoughts();

document.addEventListener("DOMContentLoaded", () => {
  createSlides();
  bindThoughtForm();
  bindInfoModal();
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
    saveThoughts();
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

  currentThoughts.forEach((thought, thoughtIndex) => {
    const entry = document.createElement("div");
    entry.className = "entry";
    entry.innerHTML = `
      <p class="entry-text">${escapeHtml(thought)}</p>
      <div class="entry-actions">
        <button type="button" data-action="edit">Edit</button>
        <button type="button" data-action="delete">Delete</button>
      </div>
    `;

    const editButton = entry.querySelector('[data-action="edit"]');
    const deleteButton = entry.querySelector('[data-action="delete"]');

    editButton.addEventListener("click", () => {
      startEditingThought(entry, thought, thoughtIndex);
    });

    deleteButton.addEventListener("click", () => {
      thoughtsByStudent[slideIndex].splice(thoughtIndex, 1);
      saveThoughts();
      renderThoughtsForCurrentSlide();
    });

    entryList.appendChild(entry);
  });
}

function startEditingThought(entryNode, currentText, thoughtIndex) {
  entryNode.innerHTML = `
    <textarea class="entry-edit" aria-label="Edit shared thought">${escapeHtml(currentText)}</textarea>
    <div class="entry-actions">
      <button type="button" data-action="save">Save</button>
      <button type="button" data-action="cancel">Cancel</button>
    </div>
  `;

  const editInput = entryNode.querySelector(".entry-edit");
  const saveButton = entryNode.querySelector('[data-action="save"]');
  const cancelButton = entryNode.querySelector('[data-action="cancel"]');

  saveButton.addEventListener("click", () => {
    const updatedText = editInput.value.trim();
    if (!updatedText) return;
    thoughtsByStudent[slideIndex][thoughtIndex] = updatedText;
    saveThoughts();
    renderThoughtsForCurrentSlide();
  });

  cancelButton.addEventListener("click", () => {
    renderThoughtsForCurrentSlide();
  });
}

function loadThoughts() {
  const emptyThoughts = images.map(() => []);
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) return emptyThoughts;

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return emptyThoughts;

    return images.map((_, index) => {
      const thoughts = parsed[index];
      if (!Array.isArray(thoughts)) return [];
      return thoughts.filter((thought) => typeof thought === "string");
    });
  } catch (error) {
    return emptyThoughts;
  }
}

function saveThoughts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(thoughtsByStudent));
}

function escapeHtml(input) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function bindInfoModal() {
  const infoButton = document.getElementById("info-button");
  const infoModal = document.getElementById("info-modal");
  const infoClose = document.getElementById("info-close");

  if (!infoButton || !infoModal || !infoClose) return;

  infoButton.addEventListener("click", () => {
    infoModal.classList.add("open");
    infoModal.setAttribute("aria-hidden", "false");
  });

  infoClose.addEventListener("click", () => {
    closeInfoModal(infoModal);
  });

  infoModal.addEventListener("click", (event) => {
    if (event.target === infoModal) {
      closeInfoModal(infoModal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && infoModal.classList.contains("open")) {
      closeInfoModal(infoModal);
    }
  });
}

function closeInfoModal(infoModal) {
  infoModal.classList.remove("open");
  infoModal.setAttribute("aria-hidden", "true");
}
