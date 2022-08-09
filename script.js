`use strict`;

const btnsTabContainer = document.querySelector(`.tab-btns-container`);
const tabs = document.querySelectorAll(`.tab-btn`);
const tabsContent = document.querySelectorAll(`.tab-content`);
const nav = document.querySelector(`.nav`);
const header = document.querySelector(`.header`);
const btnScrollTo = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

const navHeight = nav.getBoundingClientRect().height;

//FUNCTIONS

//Smoooth Scrolling

btnScrollTo.addEventListener(`click`, function (e) {
  const s1coords = section1.getBoundingClientRect();
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top - navHeight + window.pageYOffset,
    behavior: `smooth`,
  });
});

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
