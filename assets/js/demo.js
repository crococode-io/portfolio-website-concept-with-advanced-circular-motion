/**
 * demo.js
 * https://www.instagram.com/croco.code/
 * https://www.tiktok.com/@croco.code 
 * https://github.com/crococode-io 
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2022, CROCO.CODE
 * https://www.instagram.com/croco.code/
 * https://www.tiktok.com/@croco.code 
 * https://github.com/crococode-io 
 */

// init variables
const slideshow = document.querySelector('.slideshow')
  loader = document.querySelector('.loader')
  navItems = document.querySelectorAll('.nav-item'),
  background = document.querySelectorAll('.background'),
  holder = document.querySelector('.holder'),
  content = document.querySelectorAll('.content'),
  activeID = null,
  activeImage = null,
  activeContent = null,
  rotation = null,
  type = "_short";

imagesLoaded(slideshow, { background: true }, function() {
  
    // hide loader
    loader.classList.add('is-loaded');

    // demo
    CSSPlugin.defaultForce3D = false

    // set tween values
    function setTweenValues(item) {
      rotation = Number(item.dataset.rotation);
      activeID = item.dataset.id;
      activeImage = item.dataset.bcg;
      activeContent = slideshow.querySelector("[data-id='content-" + activeID + "']");
      const tweenCode = 'TweenMax.to("' + activeContent + '", 0.5, { backgroundImage: "url(' + activeImage + ')" });';
      const tweenCode2 = 'TweenMax.to(".main-background", 0.5, { rotation:"' + rotation+type +'" });';
    }

    // do tween
    function doTween(){
      content.forEach(function(elem) {
        TweenMax.set(elem, { backgroundImage: '' });
        TweenMax.set(elem.querySelector('.inner'), { autoAlpha: 0 });
      }); 
      
      var timeline = new TimelineMax();
      
      timeline
        .to(activeContent, 0.4, { autoAlpha: 0, ease: Power4.easeInOut }, '-=0.4')
        .to(activeContent, 0.4, { backgroundImage: "url(" + activeImage + ")" }, '-=0.4')
        .staggerTo(background, 0.8, { rotation: rotation+type, transformOrigin:"100% 100%", ease: Back.easeOut.config(1.6) }, 0.025)
        .to(activeContent, 0.4, { autoAlpha: 1, rotation: 0, ease: Power4.easeInOut }, '-=0.8')
        .to(activeContent.querySelector('.inner'), 0.4, { autoAlpha: 1, ease: Power4.easeInOut }, '-=0.4');
        timeline.play();
    }

    // click/hover on items
    navItems.forEach(function (item) {
      item.addEventListener('click', function() {
        doTween();
      });
    });

    navItems.forEach(function (item) {
      item.addEventListener('mouseenter', function() {
        setTweenValues(item);
      });
    });
  });