`use strict`;

const btnsTabContainer = document.querySelector(`.tab-btns-container`);
const tabs = document.querySelectorAll(`.tab-btn`);
const tabsContent = document.querySelectorAll(`.tab-content`);
const nav = document.querySelector(`.nav`);
const btnNavEl = document.querySelector(".btn-mobile-nav");
const navAboutMe = document.querySelector(`.link-about`);
const navProjects = document.querySelector(`.link-projects`);
const navContact = document.querySelector(`.link-contact`);
const navHeight = nav.getBoundingClientRect().height;
const btnMobileNavOpen = document.querySelector(`.btn-mobile-nav-open`);
const header = document.querySelector(`.header`);
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);
const section2 = document.querySelector(`#section--2`);
const section3 = document.querySelector(`#section--3`);
const sliderBox = document.querySelector(`.slider`);
const allModals = document.querySelector(`.modals-container`);
const btnCloseModal = document.querySelector(`.btn-close-modal`);
const overlay = document.querySelector(`.overlay`);

//FUNCTIONS

const checkNavOpen = function () {
  if (nav.classList.contains(`nav-open`)) {
    nav.classList.remove(`nav-open`);
  }
};

//Nav Fade Animation
const handleNavHover = function (e) {
  if (e.target.classList.contains(`nav-link`)) {
    //Which link is clicked
    const link = e.target;
    //which links are not
    const siblingLinks = link.closest(`.nav`).querySelectorAll(`.nav-link`);
    //find the logo in the nav
    const logo = link.closest(`.nav`).querySelector(`.logo`);

    siblingLinks.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//Make nav sticky
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add(`sticky`);
  } else {
    nav.classList.remove(`sticky`);
  }
};

//Header observer
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Observer sections
const allSections = document.querySelectorAll(`section`);

const showSection = function (entries, observer) {
  const [entry] = entries;

  //Guard Clause
  if (!entry.isIntersecting) return;

  entry.target.classList.remove(`section--hidden`);
  //Unobserve or we will get countless entries from this
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(showSection, {
  root: null,
  //15% intersection
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add(`section--hidden`);
});

//SLIDER

const slider = function () {
  const slides = document.querySelectorAll(`.slide`);
  const sliderBtnLeft = document.querySelector(`.slider-btn-left`);
  const sliderBtnRight = document.querySelector(`.slider-btn-right`);
  const dotsContainer = document.querySelector(`.dots-container`);

  let curSlide = 0;
  const maxSlide = slides.length;

  //Handle dots
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        `beforeend`,
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  const highlightDot = function (slide) {
    document
      .querySelectorAll(`.dots-dot`)
      .forEach((dot) => dot.classList.remove(`dots-dot--active`));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add(`dots-dot--active`);
  };

  //Navigate Slides

  const moveToSlide = function (slide) {
    slides.forEach(
      //the slide with the translateX property of 0 will be visible
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    moveToSlide(curSlide);
    highlightDot(curSlide);
  };
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else curSlide--;

    moveToSlide(curSlide);
    highlightDot(curSlide);
  };

  const init = function () {
    moveToSlide(0);
    createDots();
    highlightDot(0);
  };
  init();

  sliderBtnLeft.addEventListener(`click`, prevSlide);
  sliderBtnRight.addEventListener(`click`, nextSlide);

  dotsContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots-dot`)) {
      const { slide } = e.target.dataset;

      moveToSlide(slide);
      highlightDot(slide);
    }
  });
};

slider();

//EVENT LISTENERS

//Tabbed Component Tabs
btnsTabContainer.addEventListener(`click`, function (e) {
  e.preventDefault();
  //find the target where it will not matter if we click the text or the btn itself
  const clicked = e.target.closest(`.tab-btn`);

  //Guard clause
  if (!clicked) return;

  //Remove active classes
  tabs.forEach((tab) => tab.classList.remove(`tab-btn--active`));
  tabsContent.forEach((c) => c.classList.remove(`tab-content--active`));

  //activate current tab
  clicked.classList.add(`tab-btn--active`);

  //activate the content area
  document
    .querySelector(`.tab-content--${clicked.dataset.tab}`)
    .classList.add(`tab-content--active`);
});

//Handle Nav Hover Event

nav.addEventListener(`mouseover`, handleNavHover.bind(0.5));
nav.addEventListener(`mouseout`, handleNavHover.bind(1));

//SMOOTH SCROLLING

btnScrollTo.addEventListener(`click`, function (e) {
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top - navHeight + window.pageYOffset,
    behavior: `smooth`,
  });
});

//NAVBAR LINKS W SMOOTH SCROLL -- NEEDS REFACTOR
navAboutMe.addEventListener(`click`, function (e) {
  e.preventDefault();
  checkNavOpen();
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top - navHeight + window.pageYOffset,
    behavior: `smooth`,
  });
});

navProjects.addEventListener(`click`, function (e) {
  e.preventDefault();
  checkNavOpen();
  const s2coords = section2.getBoundingClientRect();
  window.scrollTo({
    left: s2coords.left + window.pageXOffset,
    top: s2coords.top - navHeight + window.pageYOffset,
    behavior: `smooth`,
  });
});
navContact.addEventListener(`click`, function (e) {
  e.preventDefault();
  checkNavOpen();
  const s3coords = section3.getBoundingClientRect();
  window.scrollTo({
    left: s3coords.left + window.pageXOffset,
    top: s3coords.top - navHeight + window.pageYOffset,
    behavior: `smooth`,
  });
});

//MOBILE NAV
btnMobileNavOpen.addEventListener(`click`, function () {
  nav.classList.toggle(`nav-open`);
});

//MODAL

sliderBox.addEventListener(`click`, function (e) {
  e.preventDefault();

  //Which slide's button is clicked
  let clicked = e.target.dataset.project;
  console.log(clicked);
  //open modal-window--${clickedBtn.dataset.project aka 1/2/3}
  if (clicked) {
    document.querySelector(`.modal--${clicked}`).classList.remove(`hidden`);
    overlay.classList.remove("hidden");
  }
});

console.log(allModals);

allModals.addEventListener(`click`, function (e) {
  e.preventDefault();

  if (e.target.classList.contains(`btn-close-modal`)) {
    e.target.parentElement.classList.add(`hidden`);
    overlay.classList.add("hidden");
  }
});
