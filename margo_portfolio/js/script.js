// ANIM SCROLL

const animItems = document.querySelectorAll('._anim-items');
if(animItems.length > 0) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll(params) {
    for( let index = 0; index < animItems.length; index++) {
      const animItem = animItems[index];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 10;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if(animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)){
        animItem.classList.add('_active');
      }else{
        if(!animItem.classList.contains('_anim-no-hide')){
          animItem.classList.remove('_active');}        
      }
    }
  }
  function offset(el){
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft}
  }
  setTimeout(()=> {
     animOnScroll();
   },300); 
}



// BURGER-MENU

function burgerMenuOpen(){
  var chbox;
  chbox=document.getElementById('burger');
  const menu = document.querySelector('.menu');
  if (chbox.checked) {
    menu.classList.add('active');     
    bodyLock();
    menu.addEventListener("click",function(){
      menu.classList.remove('active');    
      bodyUnLock();
      chbox.checked = false;
    }); 
  }
  else {
    menu.classList.remove('active');    
    bodyUnLock(); 
  }
}



// POPUP OPEN

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('html');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 800;

if (popupLinks.length > 0) {
    for(let index = 0; index < popupLinks.length; index++){
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click",function(e){ 
          const popupName = popupLink.getAttribute('href').replace('#','');
          const curentPopup = document.getElementById(popupName);
          popupOpen(curentPopup);
          e.preventDefault();

        }); 
      }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length> 0) {
      for(let index = 0; index <  popupCloseIcon.length; index++){
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e){
          popupClose(el.closest('.popup'));
          e.preventDefault();
        });
      }
}
function popupOpen(curentPopup){
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    }else{
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function (e){
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnLock = true){
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnLock) {
      bodyUnLock();
    }
  }
}

function bodyLock(){
  const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
  if (lockPadding.length>0) {

  for (let index = 0; index < lockPadding.length; index++){
        const el = lockPadding[index];
        el.style.right = lockPaddingValue;
        }
    }
        body.style.paddingRight = lockPaddingValue;
        body.classList.add('lock');

        unlock = false;
        setTimeout(function(){
          unlock = true;          
        },timeout);
}

function bodyUnLock(){
  setTimeout(function(){
    if(lockPadding.length > 0){
      for(let index = 0; index < lockPadding.length; index++){
          const el = lockPadding[index];
          el.style.right = '0px';
        }
    }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
  },timeout);
  unlock = false;
        setTimeout(function(){
          unlock = true;          
        },timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});









