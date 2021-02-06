import images from "./gallery-items.js";

const galleryContainer = document.querySelector(".js-gallery");
const galleryModal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const coseModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector(".lightbox__overlay");

const galleryMarkup = createGalleryMarkup(images);
galleryContainer.insertAdjacentHTML("beforeend", galleryMarkup);

galleryContainer.addEventListener("click", onImageClick);
coseModalBtn.addEventListener("click", onCloseModal);
overlay.addEventListener("click", onCloseModal);
document.addEventListener("keydown", OnEscapePress);
// document.addEventListener("keydown", OnArrowRightPress);

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
      <a
        class="gallery__link"
        href="${original}"
      >
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>`;
    })
    .join(" ");
}

function onImageClick(e) {
  document.addEventListener("keydown", OnArrowLeftPress);
  e.preventDefault();

  let image = e.target;
  // console.log(image.closest(".gallery__item").previousElementSibling.querySelector(".gallery__image"));

  if (!image.classList.contains("gallery__image")) {
    return;
  }

  setIsOpenClass();
  setImageSrc(image);
  setImageAlt(image);
  OnArrowLeftPress(e);

  function OnArrowLeftPress(evt) {
    if (evt.key === "ArrowLeft") {
      image = image.closest(".gallery__item").previousElementSibling.querySelector(".gallery__image");
    }
  }
}

function OnEscapePress(e) {
  if (e.key === "Escape") {
    onCloseModal(image.previousSibling);
  }
}

function onCloseModal() {
  removeIsOpenClass();
  clearImageSrc();
  clearImageAlt();
}

function setIsOpenClass() {
  galleryModal.classList.add("is-open");
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
  modalImg.src = "";
}

function clearImageAlt() {
  modalImg.alt = "";
}

function choosePrevImg() {}
