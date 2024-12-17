import * as flsFunctions from "./modules/functions.js";
import "./modules/jquery-3.7.1.min.js";
import "./modules/inputmask.min.js";

import "./modules/bootstrap.bundle.min.js";
import AOS from "../../node_modules/aos/dist/aos.js";
import { Fancybox } from "./modules/fancybox.esm.js";

flsFunctions.isWebp();

let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
});

AOS.init();

// Import swiper
import Swiper, { Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar } from 'swiper';
Swiper.use([Navigation, Pagination, Autoplay, Mousewheel, EffectFade, Thumbs, Scrollbar]);

const togglePasswordEach = document.querySelectorAll('.togglePassword');

togglePasswordEach.forEach(el => {
  let password = el.closest('.form-floating').querySelector('.password-field');
  el.addEventListener('click', () => {
    const type = password.getAttribute('type') === 'password' ?
      'text' : 'password';
    password.setAttribute('type', type);
    el.classList.toggle('active');
  });
});

document.querySelector('.chatContent')?.scrollTo({ left: 0, top: document.querySelector('.chatContent').scrollHeight, behavior: "smooth" });


let chatSearchInputEach = document.querySelectorAll('.chatSearch input');
chatSearchInputEach.forEach(el => {
  let elClose = el.closest('.chatSearch').querySelector('.chatSearchClose');
  el?.addEventListener("input", (input) => {
    if (el.value != '') {
      elClose.classList.add('active');
    } else {
      elClose.classList.remove('active');
    }
  });
  elClose?.addEventListener('click', () => {
    el.value = '';
    el.focus();
    elClose.classList.remove('active');
  });
});

// chatSendMessage
let actionTextStartInput = document.querySelector('.actionTextStart textarea');
let actionBtnStart = document.querySelector('.actionBtnStart');
let chatActionInner = document.querySelector('.chatActionInner');
let chatActionBtnW = document.querySelector('.chatActionBtnW');
let chatAction = document.querySelector('.chatAction');

actionTextStartInput?.addEventListener('mouseup', () => {
  actionBtnStart.classList.add('active');
  actionTextStartInput.focus();
  chatActionInner.classList.add('flex-column');
  chatActionBtnW.classList.add('w-100');
});
// actionTextStartInput.addEventListener('mousewheel', () => {
//   actionBtnStart.classList.remove('active');  
//   chatActionInner.classList.remove('flex-column');
//   chatActionBtnW.classList.remove('w-100');
// });


let filterAction = document.querySelector('.filterAction');
let filterBtn = document.querySelector('.filterBtn');
let filterSmBtn = document.querySelector('.filterSmBtn');
let chatSearchMobile = document.querySelector('.nav-action .chatSearch');
let searchBtn = document.querySelector('.searchBtn');

// filterAction show
filterBtn?.addEventListener('click', () => {
  filterAction.classList.toggle('active');
  filterBtn.classList.toggle('active');
  if (searchBtn.classList.contains('active')) {
    chatSearchMobile.classList.remove('active');
    searchBtn.classList.remove('active');
  }
});
// filterAction show
filterSmBtn?.addEventListener('click', () => {
  filterAction.classList.toggle('active');
  filterSmBtn.classList.toggle('active');
  if (searchBtn.classList.contains('active')) {
    chatSearchMobile.classList.remove('active');
    searchBtn.classList.remove('active');
  }
});

// searchField-mobile show
searchBtn?.addEventListener('click', () => {
  chatSearchMobile.classList.toggle('active');
  searchBtn.classList.toggle('active');
  if (filterBtn.classList.contains('active')) {
    filterAction.classList.remove('active');
    filterBtn.classList.remove('active');
  }
});

document.addEventListener('click', e => {
  let target = e.target;
  let its_chatAction = target == chatAction || chatAction?.contains(target);
  let its_filterAction = target == filterAction || filterAction?.contains(target);
  let its_filterBtn = target == filterBtn || filterBtn?.contains(target);
  let its_filterSmBtn = target == filterSmBtn || filterSmBtn?.contains(target);
  let its_chatSearchMobile = target == chatSearchMobile || chatSearchMobile?.contains(target);
  let its_searchBtn = target == searchBtn || searchBtn?.contains(target);

  if (!its_chatAction) {
    actionBtnStart?.classList.remove('active');
    chatActionInner?.classList.remove('flex-column');
    chatActionBtnW?.classList.remove('w-100');
    document.querySelectorAll('.textarea-noscroll').forEach(el => {
      el.style.height = el.setAttribute('style', 'height: ' + 'px');
      el.classList.remove('auto');     
    });
  }
  if (!its_filterAction && !its_filterBtn && !its_filterSmBtn) {
    filterAction?.classList.remove('active');
    filterBtn?.classList.remove('active');
    filterSmBtn?.classList.remove('active');
  }
  if (!its_chatSearchMobile && !its_searchBtn) {
    chatSearchMobile?.classList.remove('active');
    searchBtn?.classList.remove('active');
  }
});

let sidebarHideBtn = document.querySelector('.sidebarHideBtn');
let sidebarShowBtn = document.querySelector('.sidebarShowBtn');
let sidebarRight = document.querySelector('.sidebarRight');
let chatSearchAction = document.querySelector('.chatSearchAction');
let chatBody = document.querySelector('.chatBody');
let chatContent = document.querySelector('.chatContent');

sidebarHideBtn?.addEventListener('click', () => {
  sidebarRight.classList.add('d-none');
  chatSearchAction.classList.add('active');
  chatBody.classList.add('chatBody--wide');
});
sidebarShowBtn?.addEventListener('click', () => {
  sidebarRight.classList.remove('d-none');
  chatSearchAction.classList.remove('active');
  chatBody.classList.remove('chatBody--wide');
});

// Burger
const btnMenu = document.querySelector('#toggle');
const menu = document.querySelector('.actionNav');
const bodyEl = document.querySelector('body');
const btnClose = document.querySelector('.headerNavCloseBtn');


const toggleMenu = function () {
  menu.classList.toggle('active');
}
const toggleBurger = function () {
  btnMenu.classList.toggle('active');
}
const bodyOverflow = function () {
  bodyEl.classList.toggle('hidden');
}
const menuClose = function () {
  toggleBurger();
  bodyOverflow();
  toggleMenu();
}

btnMenu?.addEventListener('click', function (e) {
  e.stopPropagation();
  toggleMenu();
  toggleBurger();
  bodyOverflow();
});

btnClose?.addEventListener('click', function (e) {
  menuClose();
});

let sidebarSmShowBtn = document.querySelector('.sidebarSmShowBtn');
let sidebarSmBackBtn = document.querySelector('.sidebarSmBackBtn');
let chatSearchSmBtn = document.querySelector('.chatSearchSmBtn');
let chatSearchSmAction = document.querySelector('.chatSearchSmAction');
let chatSearchCloseAction = document.querySelector('.chatSearchClose--action');
sidebarSmShowBtn?.addEventListener('click', () => {
  sidebarRight.classList.add('active');
  chatContent.classList.add('d-none')
});
sidebarSmBackBtn?.addEventListener('click', () => {
  sidebarRight.classList.remove('active');
  chatContent.classList.remove('d-none')
});
chatSearchSmBtn?.addEventListener('click', () => {
  chatSearchSmAction.classList.add('active');
});
chatSearchCloseAction?.addEventListener('click', () => {
  chatSearchSmAction.classList.remove('active');
});

let profileSidebarShowBtn = document.querySelector('.profileSidebarShowBtn');
let profileSidebar = document.querySelector('.profileSidebar');
let profileL = document.querySelector('.profileL');
let profileFormContentShow = document.querySelector('.profileFormContentShow');
profileSidebarShowBtn?.addEventListener('click', () => {
  profileSidebar.classList.add('active');
  profileL.classList.add('d-none');
});
profileFormContentShow?.addEventListener('click', () => {
  profileSidebar.classList.remove('active');
  profileL.classList.remove('d-none');
});

// Инициализация слайдера partnersSlider
const teamSlider = document.querySelector('.teamSlider');
var mySwiperTeam = new Swiper(teamSlider, {
  slidesPerView: 'auto',
  speed: 800,
  spaceBetween: 40,
  autoplay: {
    delay: 3000,
  },
  navigation: {
    nextEl: document.querySelector('.team .navArrowNext'),
    prevEl: document.querySelector('.team .navArrowPrev'),
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    575: {
      slidesPerView: 'auto',
      spaceBetween: 40,
    },
  },
});

let checkbox_org = document.getElementById('checkbox_org');
let checkbox_kontragent = document.getElementById('checkbox_contragent');
let organizationBlock = document.querySelector('.organization-block');
let contragentBlock = document.querySelector('.kontragent-block');
checkbox_org?.addEventListener('click', () => {
  organizationBlock.classList.toggle('d-none')
});
checkbox_kontragent?.addEventListener('click', () => {
  contragentBlock.classList.toggle('d-none')
});




document.querySelectorAll('.textarea-noscroll').forEach(el => {
  el.style.height = el.setAttribute('style', 'height: ' + el.scrollHeight + 'px');
  el.classList.add('auto');
  el.addEventListener('input', e => {
    el.style.height = 'auto';
    el.style.height = (el.scrollHeight) + 'px';
  });
});