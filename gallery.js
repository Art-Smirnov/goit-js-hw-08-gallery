import images from "./gallery-items.js";

let currentIndex;

const galleryContainer = document.querySelector(".js-gallery");
const galleryModal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const coseModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector(".lightbox__overlay");
const galleryMarkup = createGalleryMarkup(images);
galleryContainer.innerHTML = galleryMarkup;

galleryContainer.addEventListener("click", onImageClick);
coseModalBtn.addEventListener("click", onCloseModal);
overlay.addEventListener("click", onOverlayClick);

function createGalleryMarkup(images) {
  return images.reduce((acc, { preview, original, description }, i) => {
    return (
      acc +
      `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
          data-index="${i}"
        />
      </a>
    </li>`
    );
  }, "");
}

function onImageClick(e) {
  e.preventDefault();

  if (!image.classList.contains("gallery__image")) {
    return;
  }

  let image = e.target;

  window.addEventListener("keyup", onEscapePress);
  document.addEventListener("keydown", onArrowLeftPress);
  document.addEventListener("keydown", onArrowRightPress);

  setIsOpenClass();
  setModalDataIndex(image);
  setImageSrc(image);
  setImageAlt(image);
}

function onArrowRightPress(evt) {
  if (evt.code === "ArrowRight") {
    const nextImg = galleryContainer.querySelector(`img[data-index="${(currentIndex += 1)}"]`);
    if (nextImg === null) {
      return (currentIndex = modalImg.dataset.index);
    }
    setImageSrc(nextImg);
    setImageAlt(nextImg);
    setModalDataIndex(nextImg);
  }
}

function onArrowLeftPress(evt) {
  if (evt.code === "ArrowLeft") {
    const prevImg = galleryContainer.querySelector(`img[data-index="${(currentIndex -= 1)}"]`);
    if (prevImg === null) {
      return (currentIndex = 0);
    }
    setImageSrc(prevImg);
    setImageAlt(prevImg);
    setModalDataIndex(prevImg);
  }
}

function onCloseModal() {
  window.removeEventListener("keydown", onEscapePress);
  window.removeEventListener("keydown", onArrowLeftPress);
  window.removeEventListener("keydown", onArrowRightPress);
  removeIsOpenClass();
  clearImageSrc();
  clearImageAlt();
  modalImg.removeAttribute("data-index");
}

function onOverlayClick(e) {
  if (e.target === e.currentTarget) {
    onCloseModal();
  }
}

function onEscapePress(e) {
  const ESC_KEY_CODE = "Escape";

  if (e.code === ESC_KEY_CODE) {
    onCloseModal();
  }
}

function setIsOpenClass() {
  galleryModal.classList.add("is-open");
}

function setModalDataIndex(image) {
  currentIndex = Number(image.dataset.index);

  modalImg.dataset.index = currentIndex;
}

function setImageSrc(image) {
  modalImg.src = image.dataset.source;
}

function setImageAlt(image) {
  modalImg.alt = image.alt;
}

function removeIsOpenClass() {
  galleryModal.classList.remove("is-open");
}

function clearImageSrc() {
  modalImg.src = "#";
}

function clearImageAlt() {
  modalImg.alt = "#";
}
