//не знаю як позбутися помилок в консолі при перематовані стрілками крайніх картинок

import images from "./gallery-items.js";
console.log(images);
const galleryContainer = document.querySelector(".js-gallery");
const galleryModal = document.querySelector(".js-lightbox");
const modalImg = document.querySelector(".lightbox__image");
const coseModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const overlay = document.querySelector(".lightbox__overlay");
let currentIndex = 0;
const galleryMarkup = createGalleryMarkup(images);
galleryContainer.innerHTML = galleryMarkup;

galleryContainer.addEventListener("click", onImageClick);
coseModalBtn.addEventListener("click", onCloseModal);
overlay.addEventListener("click", onCloseModal);
document.addEventListener("keydown", OnEscapePress);
// document.addEventListener("keydown", OnArrowRightPress);

function createGalleryMarkup(images) {
  return images
    .map(({ preview, original, description }, i) => {
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
          data-index="${i}"
        />
      </a>
    </li>`;
    })
    .join("");
}

function onImageClick(e) {
  e.preventDefault();
  let image = e.target;

  document.addEventListener("keydown", OnArrowLeftPress);
  document.addEventListener("keydown", OnArrowRightPress);
  // console.log(typeof currentIndex);
  if (!image.classList.contains("gallery__image")) {
    return;
  }

  setIsOpenClass();
  setImageSrc(image);
  setImageAlt(image);

  // console.log(currentIndex);
  function OnArrowRightPress(evt) {
    // setRightBtnDataIndex(currentIndex);
    if (evt.key === "ArrowRight") {
      // console.log(currentIndex);

      // if (currentIndex === images.length - 1) {
      //   return;
      // }
      image = document.querySelector(`img[data-index="${Number(currentIndex) + 1}"]`);
      setImageSrc(image);
      setImageAlt(image);

      // console.log(image);
    }
  }

  function OnArrowLeftPress(evt) {
    // setLefttBtnDataIndex(currentIndex);
    if (evt.key === "ArrowLeft") {
      // console.log(currentIndex);
      image = document.querySelector(`img[data-index="${currentIndex - 1}"]`);
      setImageSrc(image);
      setImageAlt(image);

      // console.log(image);
    }
  }
}

function OnEscapePress(e) {
  if (e.key === "Escape") {
    onCloseModal();
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
  currentIndex = image.dataset.index;
  // setDataIndex(currentIndex);

  // if (currentIndex === 0 || currentIndex === images.length) {
  //   return;
  // }
  modalImg.src = image.dataset.source;
}

function setImageAlt(image) {
  modalImg.alt = image.alt;
}

// function setLefttBtnDataIndex(currentIndex) {
//   modalImg.dataset.index = currentIndex - 1;
// }
// function setRightBtnDataIndex(currentIndex) {
//   modalImg.dataset.index = Number(currentIndex) + 1;
// }

function removeIsOpenClass() {
  galleryModal.classList.remove("is-open");
}

function clearImageSrc() {
  modalImg.src = "";
}

function clearImageAlt() {
  modalImg.alt = "";
}
