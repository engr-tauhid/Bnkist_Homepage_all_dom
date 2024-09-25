'use strict';
const scrollLearnMore = document.querySelector('.btn--scroll-to');
const section_1 = document.querySelector('#section--1');
let nav__links = document.querySelector('.nav__links');
let nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
scrollLearnMore.addEventListener('click', function (e) {
  e.preventDefault();
  let daimontion = section_1.getBoundingClientRect();
  window.scrollTo({
    top: window.pageYOffset + daimontion.y,
    left: window.pageXOffset + daimontion.x,
    behavior: 'smooth',
  });
});
nav.addEventListener('click', function (e) {
  e.preventDefault();
  let navBtn = e.target;
  if (!navBtn.classList.contains('navigation')) return;
  let section = document.querySelector(navBtn.getAttribute('href'));
  section.scrollIntoView({ behavior: 'smooth' });
  // console.log(section);
});

////hover effect in nav links
let hoverEffect = function (e) {
  let target = e.target;
  if (!target.classList.contains('nav__link')) return;
  let siblings = document.querySelectorAll('.nav__link');
  siblings.forEach(el => {
    if (el !== e.target) {
      el.style.opacity = this;
    }
  });
  nav.querySelector('img').style.opacity = this;
  // console.log(siblings);
};
nav.addEventListener('mouseover', hoverEffect.bind(0.5));
nav.addEventListener('mouseout', hoverEffect.bind(1));
//// stikey navbar
const navObserver = new IntersectionObserver(
  function (entries, observer) {
    let entry = entries[0];
    if (!entry.isIntersecting) {
      nav.classList.add('sticky');
    } else nav.classList.remove('sticky');
    // console.log(entry);
  },
  {
    root: null,
    threshold: 0,
    rootMargin: `-${nav.getBoundingClientRect().height}px`,
  }
);
navObserver.observe(document.querySelector('header'));
////section floting over on  load the site
const sections = document.querySelectorAll('section');

const sectionObserver = new IntersectionObserver(
  function (entries, observer) {
    let [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.2,
  }
);
// sections.forEach(el => {
//   el.classList.add('section--hidden');
//   sectionObserver.observe(el);
// });

//// image lazy load in javascript
const allLazyImg = document.querySelectorAll('img[data-src]');
const lazyImgObserver = new IntersectionObserver(
  function (entries, observer) {
    let [entry] = entries;
    if (!entry.isIntersecting) return;
    let targetElement = entry.target;
    // console.log(entry.target.getAttribute('src'));
    targetElement.src = targetElement.dataset.src;
    targetElement.addEventListener('load', function () {
      targetElement.classList.remove('lazy-img');
    });
    observer.unobserve(targetElement);
  },
  {
    root: null,
    threshold: 1,
  }
);
allLazyImg.forEach(el => lazyImgObserver.observe(el));
// console.log(allLazyImg);
//// tab element in javascript
let activeTab = document.querySelector('.operations__tab--1');
let activeTabContent = document.querySelector('.operations__content--1');

const tabBtn = document.querySelector('.operations__tab-container');
tabBtn.addEventListener('click', function (e) {
  const targetElement = e.target;
  if (!targetElement.classList.contains('operations__tab')) return;
  if (activeTab === targetElement) return;
  // console.log(targetElement);
  activeTab.classList.remove('operations__tab--active');
  activeTabContent.classList.remove('operations__content--active');
  activeTab = targetElement;
  activeTabContent = document.querySelector(
    `.operations__content--${targetElement.dataset.tab}`
  );
  activeTab.classList.add('operations__tab--active');
  activeTabContent.classList.add('operations__content--active');
});
let slider = function () {
  /// slider in javascript and this is the final one
  // let slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.5) translateX(-400px)';
  // slider.style.overflow = 'visible';
  let allslide = document.querySelectorAll('.slide');
  let moveslideFun = function (curPos = 0) {
    allslide.forEach((slide, index) => {
      slide.style.transform = `translateX(${100 * (index - curPos)}%)`;
    });
  };
  moveslideFun();
  let currentPosition = 0;
  const btnSlideLeft = document.querySelector('.slider__btn--left');
  const btnSlideright = document.querySelector('.slider__btn--right');
  let dots = document.querySelector('.dots');
  allslide.forEach((_, i) => {
    dots.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
  const ActiveDots = function (act = 0) {
    document.querySelectorAll('.dots__dot').forEach(el => {
      // console.log(el.dataset.slide);

      if (el.dataset.slide == act) {
        el.classList.add('dots__dot--active');
      } else {
        el.classList.remove('dots__dot--active');
      }
    });
  };
  ActiveDots();
  let leftScroll = function (e) {
    if (currentPosition === 0) {
      currentPosition = allslide.length - 1;
    } else {
      currentPosition--;
    }
    ActiveDots(currentPosition);
    moveslideFun(currentPosition);
  };
  let rightScroll = function (e) {
    if (currentPosition === allslide.length - 1) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
    ActiveDots(currentPosition);
    moveslideFun(currentPosition);
  };
  btnSlideright.addEventListener('click', rightScroll);
  btnSlideLeft.addEventListener('click', leftScroll);
  dots.addEventListener('click', function (e) {
    let target = e.target;
    if (!target.classList.contains('dots__dot')) return;
    ActiveDots(target.dataset.slide);
    moveslideFun(target.dataset.slide);
  });

  document.addEventListener('keydown', function (e) {
    // console.log(e.key);
    // if (e.key == 'ArrowRight') {
    //   rightScroll();
    // }
    e.key == 'ArrowRight' && rightScroll();
    e.key == 'ArrowLeft' && leftScroll();
  });
};
slider();
// nav.addEventListener('mouseover', function (e) {
//   let target = e.target;
//   if (!target.classList.contains('nav__link')) return;
//   let siblings = document.querySelectorAll('.nav__link');
//   siblings.forEach(el => {
//     if (el !== e.target) {
//       el.style.opacity = 0.5;
//     }
//   });
//   nav.querySelector('img').style.opacity = 0.5;
//   // console.log(siblings);
// });
// nav.addEventListener('mouseout', function (e) {
//   let target = e.target;
//   if (!target.classList.contains('nav__link')) return;
//   let siblings = document.querySelectorAll('.nav__link');
//   siblings.forEach(el => {
//     if (el !== e.target) {
//       el.style.opacity = 1;
//     }
//   });
//   nav.querySelector('img').style.opacity = 1;
//   // console.log(siblings);
// });

// function learnMoreScroll() {
//   scrollLearnMore.addEventListener('click', function (e) {
//     e.preventDefault();
//     let daimontion = section_1.getBoundingClientRect();
//     console.log(daimontion);
//     window.scrollTo({
//       top: daimontion.y + window.pageYOffset,
//       left: daimontion.x + window.pageXOffset,
//       behavior: 'smooth',
//     });
//   });
// }
// learnMoreScroll();
// //nevegration
// function navigation() {
//   nav__links.addEventListener('click', function (e) {
//     e.preventDefault();
//     if (!e.target.classList.contains('navigation')) return;
//     let daimontion = document
//       .querySelector(e.target.getAttribute('href'))
//       .getBoundingClientRect();
//     window.scrollTo({
//       top: daimontion.y + window.pageYOffset,
//       left: daimontion.x + window.pageXOffset,
//       behavior: 'smooth',
//     });
//   });
// }
// navigation();
// function tabletCompunent() {
//   let currentButton = document.querySelector('.operations__tab--1');
//   let currentContent = document.querySelector('.operations__content--1');
//   document
//     .querySelector('.operations__tab-container')
//     .addEventListener('click', function (e) {
//       let clicked = e.target.closest('button');
//       if (!clicked) return;
//       currentButton.classList.remove('operations__tab--active');
//       currentContent.classList.remove('operations__content--active');
//       currentButton = clicked;
//       currentContent = document.querySelector(
//         '.operations__content--' + clicked.dataset.tab
//       );
//       currentButton.classList.add('operations__tab--active');
//       currentContent.classList.add('operations__content--active');
//       // console.log(clicked, clicked.dataset.tab);
//     });
// }
// tabletCompunent();
// //Mouse Hover animation in nav section
// let headHoverAnimation = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     let hover = e.target;
//     let allChildNodes = hover.closest('.nav').querySelectorAll('.nav__link');
//     let logo = nav.querySelector('img');
//     allChildNodes.forEach(el => {
//       if (el !== hover) el.style.opacity = this;
//     });
//     logo.style.opacity = this;
//   }
// };
// nav.addEventListener('mouseover', headHoverAnimation.bind(0.5));
// nav.addEventListener('mouseout', headHoverAnimation.bind(1));
// /// image lazy loading
// let imgLazyload = document.querySelectorAll('img[data-src]');
// let imgLazyloadFunction = function (entries, observer) {
//   let [entry] = entries;
//   if (!entry.isIntersecting) return;
//   entry.target.src = entry.target.dataset.src;
//   entry.target.addEventListener('load', function (e) {
//     entry.target.classList.remove('lazy-img');
//   });
//   observer.unobserve(entry.target);
//   // console.log(entry.target);
// };

// let imageLazyloadObserver = new IntersectionObserver(imgLazyloadFunction, {
//   root: null,
//   threshold: 0.5,
// });
// imgLazyload.forEach(el => {
//   imageLazyloadObserver.observe(el);
// });
// // console.log(imgLazyload);
// let containerSlider = document.querySelector('.slider');
// let slides = document.querySelectorAll('.slide');
// let sliderBtnLeft = document.querySelector('.slider__btn--left');
// let sliderBtnRight = document.querySelector('.slider__btn--right');
// // containerSlider.style.transform = 'scale(0.35) translateX(-100px)';
// // containerSlider.style.overflow = 'visible';
// let currentPositionOfSlider = 0;
// const slideMove = function (currentPositon = 0) {
//   slides.forEach((el, i) => {
//     el.style.transform = `translateX(${100 * (i - currentPositon)}%)`;
//   });
// };
// slideMove();
// let slideRight = function () {
//   if (currentPositionOfSlider === slides.length - 1) {
//     currentPositionOfSlider = 0;
//   } else currentPositionOfSlider++;
//   slideMove(currentPositionOfSlider);
// };
// let slideLeft = function () {
//   if (currentPositionOfSlider === 0)
//     currentPositionOfSlider = slides.length - 1;
//   else currentPositionOfSlider--;
//   slideMove(currentPositionOfSlider);
// };

// sliderBtnRight.addEventListener('click', slideRight);
// sliderBtnLeft.addEventListener('click', slideLeft);
// console.log(slides);
/// way to do sticky nav bar at the fast hand
// let stickyTopValue = section_1.getBoundingClientRect();
// console.log(stickyTopValue);
// window.addEventListener('scroll', function () {
//   if (window.scrollY > stickyTopValue.y) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
// now a batter way to do sticky nav ber using a api intersectionobserver
// let obsCallback = function(entries , observer){
//   entries.forEach(entry => {
//     console.log(entry)
//   }
// )
// // console.log(entries)
// }
// let obsobject = {
//   root: null,
//   treshold: 0.1,
// }
// let observer = new IntersectionObserver(obsCallback , obsobject)
// observer.observe(section_1)
// let header = document.querySelector('header');
// let headerObserverFunction = function (entries) {
//   // entries.forEach(entry => {
//   //   console.log(entry)
//   // })
//   let [entry] = entries;

//   // console.log(entry)
//   if (!entry.isIntersecting) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// };
// let headerObserver = new IntersectionObserver(headerObserverFunction, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${nav.getBoundingClientRect().height}px`,
// });
// headerObserver.observe(header);
// console.log(header.getBoundingClientRect())

// console.log(document.querySelector('h1').previousElementSibling)
// // scroll animiton
// scrollLearnMore.addEventListener('click', function (e) {
//   let daimontion = section_1.getBoundingClientRect();
//   // console.log(daimontion)
//   // section_1.scrollIntoView({behavior:'smooth'})//this is the fastest way to do scrolling
//   window.scrollTo({
//     top: daimontion.y + window.pageYOffset,
//     left: daimontion.x + window.pageXOffset,
//     behavior: 'smooth',
//   });
// });
// ///////////////////////////////////page Navegration
// /// that would work in small scale app but in real world we have more then 10k of this event listner in a parent section so adding this function to all of them is quite a bad impretion to our app so we need to use parent
// // document.querySelector('.nav__links').addEventListener('click', function (e) {
// //   e.preventDefault();
// //   if (e.target.classList.contains('navigation')) {
// //     document
// //       .querySelector(e.target.getAttribute('href'))
// //       .scrollIntoView({ behavior: 'smooth' });
// //   }
// // });
// function Navegration() {
//   document.querySelector('.nav__links').addEventListener('click', function (e) {
//     e.preventDefault();
//     if (e.target.classList.contains('navigation')) {
//       //console.log(e.target.getAttribute('href'));
//       //document.querySelector(e.target.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
//       let daimontion = document
//         .querySelector(e.target.getAttribute('href'))
//         .getBoundingClientRect();
//       //console.log(daimontion, window.pageXOffset, pageYOffset);
//       window.scrollTo({
//         top: daimontion.y + window.pageYOffset,
//         left: daimontion.x + window.pageXOffset,
//         behavior: 'smooth',
//       });
//     }
//   });
// }
// Navegration();
//// tab operaton
// let currentConteiner = document.querySelector('.operations__content--1');
// let clicked = document.querySelector('.operations__tab--1');

// let tabContiner = document.querySelector('.operations__tab-container');
// tabContiner.addEventListener('click', function (e) {
//   clicked.classList.remove('operations__tab--active');
//   let currentButton = e.target.closest('button');
//   if (!currentButton) return;
//   clicked = currentButton;
//   clicked.classList.add('operations__tab--active');
//   currentConteiner.classList.remove('operations__content--active');
//   let newContent = document.querySelector(
//     '.operations__content--' + clicked.dataset.tab
//   );
//   currentConteiner = newContent;
//   currentConteiner.classList.add('operations__content--active');
// });

//dom travarsing
// let h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childElementCount);
// console.log(h1.parentElement.children);
// console.log(h1.childNodes);
// console.log(h1.closest('.header'));
// [...h1.parentElement.children].forEach(element => {
//   if (element !== h1){
//     console.log(element)
//     element.style.transform = 'scale(0.4)'
//   }
// });;
// console.log(h1.previousElementSibling)
// console.log(h1.nextElementSibling)
// //just for fun made some animiton from javscript atlast
// function textAnimiton() {
//   let change = document.querySelector('.changetimebytime');
//   let boll = true;
//   let index = 0;
//   let output = '';
//   let value = 'When    ';
//   let valLangth = value.length;
//   let value2 = 'Time to    ';
//   let val2Langth = value2.length;
//   setInterval(function () {
//     if (boll) {
//       if (valLangth - 1) {
//         output = output + value[index];
//         index++;
//         change.textContent = output;
//         if (!value[index + 1]) {
//           boll = false;
//           index = 0;
//           output = '';
//         }
//       }
//     } else if (!boll) {
//       if (val2Langth - 1) {
//         output = output + value2[index];
//         index++;
//         change.textContent = output;
//         if (!value2[index + 1]) {
//           boll = true;
//           index = 0;
//           output = '';
//         }
//       }
//     }
//   }, 300);
// }
// textAnimiton();
// ///page Navegration
// let nav__links = document.querySelectorAll('.nav__link');
// nav__links.forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     let scrollTo = document.querySelector(this.getAttribute('href'));
//     if(scrollTo && scrollTo!== '#'){
//     scrollTo?.scrollIntoView({ behavior: 'smooth' });}
//   });
// });
// document.querySelector('.nav__links').addEventListener('click' , function(e){
//   e.preventDefault()
//   if (e.target.classList.contains('nav__link')) {
//     document
//       .querySelector(e.target.getAttribute('href'))
//       .scrollIntoView({ behavior: 'smooth' });
//   }
// })

// // ///lacture fast
// let header = document.querySelector('.header');
// let massage = document.createElement('div');
// massage.classList.add('cookie-message');
// massage.innerHTML = `<h3>here is the cookie massage </h3> </br><button class = "btn btn--close-cookie"> ! gotIt </button>`;
// // header.after(massage)
// // header.before(massage)
// // console.log(document.body)
// // console.log(document.documentElement)
// header.append(massage);
// // header.prepend(massage)
// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     massage.parentElement.removeChild(massage);
//     // massage.remove()
//   });
// massage.style.backgroundColor = '#282828';
// massage.style.width = '105%';
// //you thik you can get the value from style function but using that you can only get the inline css value like we set in the top the backgroundColor and width but not the css in the stylesheet
// // now get the value form style sheet
// // console.log(getComputedStyle(massage).height)
// massage.style.height =
//   Number.parseFloat(getComputedStyle(massage).height, 10) + 30 + 'px';
// const scrollLearnmore = document.querySelector('.btn--scroll-to');
// const section_1 = document.querySelector('#section--1');
// scrollLearnmore.addEventListener('click', e => {
//   const deuraction = section_1.getBoundingClientRect();
//   // console.log(deuraction);
//   // console.log(window.pageXOffset, pageYOffset);
//   // console.log(
//   //   document.documentElement.clientHeight,
//   //   document.documentElement.clientWidth
//   // );
//   // window.scrollTo({
//   //   left: deuraction.x + window.pageXOffset,
//   //   top: deuraction.y + window.pageYOffset,
//   //   behavior: 'smooth',
//   // });
//   section_1.scrollIntoView({ behavior: 'smooth' });
// });
// scrollLearnmore.addEventListener('click',function(e){
//   e.preventDefault();
//  const sectionCordinat = section_1.getBoundingClientRect()
//  console.log(sectionCordinat.top , sectionCordinat.y , sectionCordinat.left ,sectionCordinat.x)
// //  console.log(e.target.getBoundingClientRect())
//  console.log('position of x/y' , window.pageXOffset , pageYOffset)
// //  console.log('page height and width' , document.documentElement.clientHeight , document.documentElement.clientWidth)
// window.scroll({left:sectionCordinat.left + window.pageXOffset , top:sectionCordinat.top + window.pageYOffset , behavior:'smooth'})
//   // section_1.scrollIntoView({behavior:'smooth'})
// })
// document.documentElement.style.setProperty('--color-primary' , 'red')
// console.log(document.documentElement.style.getPropertyValue('--color-primary'))
// get attribute and work with class
// let logo = document.querySelector('.nav__logo');
// console.log(logo.alt)
// console.log(logo.src)
// console.log(logo.id)
// console.log(logo.className)
// console.log(logo.owner)
// console.log(logo.getAttribute('owner'))

///change the value form javascript
// logo.src =
//   'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWI7clES9W75CGV-Bcxj248JnTz50rmHZS0Q&s';
//   logo.alt = 'Ha ha ha change'
//   logo.id ='new one'
//   logo.className = 'new one';
//   logo.owner = 'Tauhid Islam Rafi'
//   console.log(logo.alt);
//   console.log(logo.src);
//   console.log(logo.id);
//   console.log(logo.className);
//   console.log(logo.owner);
//   console.log(logo.getAttribute('owner'));
// document.addEventListener('keypress', function (e) {
//   e.preventDefault();
//   if (e.key === 'Enter') console.log(e.key);
// });
// massage.style.borderRadius = '40px 40px 0px 0px'

// console.log(document.documentElement)
// console.log(document.body)
// console.log(document.head)
// const allBtn = document.getElementsByClassName('btn')
// console.log(allBtn)
// const allSection = document.querySelectorAll('section')
// console.log(allSection)
// console.log(document.getElementsByClassName('section'))
// console.dir(document.getElementsByClassName('section'))
// const header = document.querySelector('.header')
// let message = document.createElement('div')
// message.classList.add('cookie-message');
// message.innerHTML = `Hi this is a cookie message and if want to close this just click the button <button class = 'btn btn--close-cookie'> ~Close cooke ~</button>`
// header.append(message)
// document.querySelector('.btn--close-cookie').addEventListener('click' , function(){
//   message.parentElement.removeChild(message)
// });
////
// let timer = document.createElement('div')
// timer.classList.add('cookie-message')
// document.querySelector('.header').prepend(timer)
// let timeintervel = setInterval(()=>{
//   let date = new Date()
//   let local = navigator.language
//   let today = new Intl.DateTimeFormat(local , {day:'2-digit',month:'short' , year:'numeric' ,weekday:'short' , minute:'2-digit' , hour :'2-digit' , second: '2-digit'}).format(date)
//   timer.textContent = `${today} ${date.getMilliseconds()}`
// }, 1)
/// lecture 08
// let num = 1;
// let h1 = document.querySelector('h1');
// // h1.addEventListener('mouseover' , function(e){
// //   console.log('mouse enter ' + num)
// //   num++
// // })
// let func = function (e) {
//   console.log('mouse enter ' + num);
//   num++;
//   h1.removeEventListener('mouseenter' , func)
// };
// // h1.onmouseenter = func;
// h1.addEventListener('mouseenter' , func)
// let f;
// function t(q , y){
//  let x = 1
//  return function f (){
//    return x++
//  }
//  return x
// }
// f =  t()
// console.log()
// console.log(f())
// console.log(f())
// console.log(f())
// console.log(f())section--1
// console.dir(t())
// let random_rgb = function (min, max) {
//   return `rgb(${Math.trunc(Math.random() * max - min + 1) + min},${
//     Math.trunc(Math.random() * max - min + 1) + min
//   },${Math.trunc(Math.random() * max - min + 1) + min})`;
// };

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.stopPropagation();
//   this.style.backgroundColor = random_rgb(0, 255);
//   console.log('nav-link',e.target);
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   // e.stopPropagation();
//   this.style.backgroundColor = random_rgb(0, 255);
//   console.log('nav-links',e.target);
// });
// document.querySelector('.nav').addEventListener(
//   'click',
//   function (e) {
//     // e.stopPropagation();
//     this.style.backgroundColor = random_rgb(0, 255);
//     console.log('nav',e.target , e.currentTarget === this );
//   }
// );
// console.log(logo.getAttribute('owner'))
// logo.setAttribute('fuckby' , 'rafi')
// console.log(logo.alt )
// console.log(logo.id )
// console.log(window.getComputedStyle(logo));
// console.log(getComputedStyle(logo));
// let HeadHover = function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     let over = e.target;
//     let logo = nav.querySelector('img');
//     let siblings = over.closest('.nav').querySelectorAll('.nav__link');
//     siblings.forEach(el => {
//       if (el !== over) el.style.opacity =this;
//     });
//     logo.style.opacity =this;
//   }
// };
// nav.addEventListener('mouseover' , HeadHover. bind(0.5))
// nav.addEventListener('mouseout' ,HeadHover.bind(1))

//////////////////////////////////////////////////
////////////////////////////////////////
////////////////////////////////
/////////////////////////
////////////////
///////////
///////
/*
/// every thing is rewrite agian
let daimontion = section_1.getBoundingClientRect();
document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', function (e) {
    window.scrollTo({
      top: window.pageYOffset + daimontion.y,
      left: window.pageXOffset + daimontion.x,
      behavior: 'smooth',
    });
  });
// console.log(nav__links.children)
nav__links.addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('navigation'))
    console.log(e.target.getAttribute('href'));
  // let scrollTo = document.querySelector(e.target.getAttribute('href')).getBoundingClientRect()
  let scrollTo = document.querySelector(e.target.getAttribute('href'));
  // console.log(scrollTo)
  scrollTo.scrollIntoView({ behavior: 'smooth' });

  // console.log(e.target)
});
// sticky navigration var with out intersectionObserver
// let skytop = section_1.getBoundingClientRect();
// // console.log(section_1.getBoundingClientRect().y);
// window.addEventListener('scroll', function (e) {
//   if (window.scrollY > skytop.y) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
//   // console.log(window.scrollY);
// });
let obsCallback = function (entries) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) nav.classList.add('sticky');
    else nav.classList.remove('sticky');
  });
};
let obsObj = {
  root: null,
  treshold: 0,
  rootMargin: '90px',
};
const observer = new IntersectionObserver(obsCallback, {
  root: null,
  rootMargin: `-${nav.getBoundingClientRect().height}px`,
  threshold: 0,
});
observer.observe(document.querySelector('header'));

//header hover animition
let hoverAnimation = function (e) {
  if (e.target.classList.contains('nav__link')) {
    // console.log(e.target)
    navLinks.forEach(el => (el.style.opacity = this));
    logo.style.opacity = this;
    e.target.style.opacity = 1;
  }
};
let navLinks = document.querySelectorAll('.nav__link');
let logo = nav.querySelector('img');
// console.log(navLinks, logo);
// nav.addEventListener('mouseover', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     // console.log(e.target)
//     navLinks.forEach(el => (el.style.opacity = 0.5));
//     logo.style.opacity = 0.5;
//     e.target.style.opacity = 1;
//   }
// });
// nav.addEventListener('mouseout', function (e) {
//   if (e.target.classList.contains('nav__link')) {
//     // console.log(e.target)
//     navLinks.forEach(el => (el.style.opacity = 1));
//     logo.style.opacity = 1;
//     e.target.style.opacity = 1;
//   }
// });
nav.addEventListener('mouseover', hoverAnimation.bind(0.5));
nav.addEventListener('mouseout', hoverAnimation.bind(1));

/// tabelet function
let currentTab = document.querySelector('.operations__tab--1');
let currentConteiner = document.querySelector('.operations__content--1');
document
  .querySelector('.operations__tab-container')
  .addEventListener('click', function (e) {
    let clicked = e.target.closest('button');
    if (!clicked) return;
    currentConteiner.classList.remove('operations__content--active');
    currentTab.classList.remove('operations__tab--active');
    currentTab = clicked
    currentConteiner = document.querySelector(`.operations__content--${clicked.dataset.tab}`);
    currentConteiner.classList.add('operations__content--active');
    currentTab.classList.add('operations__tab--active');
    console.log(clicked);
  });
*/
