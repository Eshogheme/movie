const btn = document.querySelector('.button');

const input = document.querySelector('input');

btn.addEventListener('click', function () {
  input.classList.toggle('active');
  input.focus();

})
// if(input === ""){
//   alert("Fill out the search bar!! :(");
// }

// const topTen = document.querySelector('.top-ten');
// const dragging = (e)=>{
//     topTen.scrollLeft = e.pageX;
// }
// topTen.addEventListener("mousemove", dragging);
const imageSection = document.querySelector('.image-section');
const topTen = document.querySelector('.top-ten');
let isDragging = false;
let startPosition = 0;
let currentTranslate = 0;

topTen.addEventListener('mousedown', startSwipe);
topTen.addEventListener('mousemove', swipe);
topTen.addEventListener('mouseup', endSwipe);
topTen.addEventListener('mouseleave', endSwipe);

topTen.addEventListener('touchstart', startSwipe);
topTen.addEventListener('touchmove', swipe);
topTen.addEventListener('touchend', endSwipe);

function startSwipe(e) {
  if (e.type === 'mousedown') {
    isDragging = true;
    startPosition = e.clientX;
  } else if (e.type === 'touchstart') {
    isDragging = true; startPosition = e.touches[0].clientX;
  }
}

function swipe(e) {
  if (!isDragging) return;

  let currentPosition = 0;

  if (e.type === 'mousemove') {
    currentPosition = e.clientX;
  } else if (e.type === 'touchmove') {
    currentPosition = e.touches[0].clientX;
  }

  const diff = currentPosition - startPosition;
  currentTranslate += diff;

  topTen.style.transform = `translateX(${currentTranslate}px)`;

  startPosition = currentPosition;
}
function endSwipe() {
  isDragging = false;
}


const prevButton = document.querySelector('.left');
const nextButton = document.querySelector('.right');

const imageWidth = topTen.offsetWidth;

prevButton.addEventListener('click', swipePrev);
nextButton.addEventListener('click', swipeNext);

function swipePrev() {
  currentTranslate += imageWidth;
  if (currentTranslate > 0) {
    currentTranslate = -imageWidth * (topTen.childElementCount - 1);
  }
  topTen.style.transform = `translateX(${currentTranslate}px)`;

}

function swipeNext() {
  currentTranslate -= imageWidth;
  if (currentTranslate < -imageWidth * (topTen.childElementCount - 1)) {
    currentTranslate = 0;
  }
  topTen.style.transform = `translateX(${currentTranslate}px)`;
  togglePrevButtonVisibility();
}


function togglePrevButtonVisibility() {
  prevButton.style.display = currentTranslate === 0 ? 'none' : 'block';
}
