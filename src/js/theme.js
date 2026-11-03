(function () {
  "use strict";

  /**
   * ------------------------------------------------------------------------
   * Functions
   * ------------------------------------------------------------------------
   */
  
  // Back to top button
  const myBacktotop = function () {
    // browser window scroll 
    var offset = 300,
      offset_opacity = 1200,
      back_to_top = document.querySelector(".back-top"),
      scrollpos = window.scrollY;

    var add_class_back_scroll = function add_class_back_scroll() {
      back_to_top.classList.add("block");
      back_to_top.classList.remove("hidden");
    };

    var add_class_offset_scroll = function add_class_offset_scroll() {
      back_to_top.classList.add("opacity-90");
    };

    var remove_class_back_scroll = function remove_class_back_scroll() {
      back_to_top.classList.remove("block","opacity-90");
      back_to_top.classList.add("hidden");
    };

    // back to top by es6-scroll-to
    var defaults = {
      duration: 400,
      easing: function easing(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
      },
      to: 0
    };
    var animatedScrollTo = function animatedScrollTo(args) {
      if (isInteger(args)) {
        args = {
          to: args
        };
      }
      var options = extend(defaults, args);
      options.startingYOffset = window.pageYOffset;
      options.distanceYOffset = parseInt(options.to, 10) - options.startingYOffset;
      window.requestAnimationFrame(function (timestamp) {
        return animateScroll(options, timestamp);
      });
    };
    var animateScroll = function animateScroll(options, now) {
      if (!options.startTime) {
        options.startTime = now;
      }
      var currentTime = now - options.startTime;
      var newYOffset = Math.round(options.easing(currentTime, options.startingYOffset, options.distanceYOffset, options.duration));
      if (currentTime < options.duration) {
        window.requestAnimationFrame(function (timestamp) {
          return animateScroll(options, timestamp);
        });
      } else {
        newYOffset = options.to;
      }
      setScrollTopPosition(newYOffset);
    };
    var setScrollTopPosition = function setScrollTopPosition(newYOffset) {
      document.documentElement.scrollTop = newYOffset;
      document.body.scrollTop = newYOffset;
    };
    var isInteger = function isInteger(value) {
      if (Number.isInteger) {
        return Number.isInteger(value);
      } else {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
      }
    };
    var extend = function extend(defaults, options) {
      var extendedOptions = {};
      for (var key in defaults) {
        extendedOptions[key] = options[key] || defaults[key];
      }
      return extendedOptions;
    };
    var easeInQuint = function easeInQuint(t, b, c, d) {
      return c * (t /= d) * t * t * t * t + b;
    };

    const scroll_a = document.querySelectorAll('.back-top');
    if ( scroll_a !=null) {
      for (var i = 0; i < scroll_a.length; i++) {
        scroll_a[i].addEventListener("click", function(event){
          event.preventDefault();
          if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            window.scrollTo(0, 0);
            return;
          }
          animatedScrollTo({
            easing: easeInQuint,
            duration: 800
          });
        });
      }
    }

    window.addEventListener('scroll', function () {
      scrollpos = window.scrollY;
      if (scrollpos > offset) {
        add_class_back_scroll();
      } else {
        remove_class_back_scroll();
      }
      if (scrollpos > offset_opacity) {
        add_class_offset_scroll();
      }
    });
  }

  // Lightbox
  const myLightbox = function () {
    // GLightbox
    const lightbox_class = document.querySelector(".glightbox3");
    if ( lightbox_class != null) {
      const lightbox = GLightbox({
        selector: '.glightbox3',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });
    }
  }

  // splidejs
  const mySplidejs = function () {
    // mySplidejs
    const postslider_class = document.querySelector("#post-carousel");
    if ( postslider_class != null && typeof Splide !== "undefined") {
        const postslider = new Splide( postslider_class, {
          rewind    : true,
          pagination: true,
          arrows    : true,
          type   : 'loop',
          drag   : 'free',
          perPage: 3,
          perMove     : 1,
          gap      : 24,
          breakpoints: {
            1200: {
              perPage: 3,
            },
            768: {
              perPage: 2,
            },
            500: {
              perPage: 1,
            },
          }
        } );
        postslider.mount();
      }
  }

  // Typed Js
  const myTyped = function () {
    var x = document.querySelectorAll('[data-toggle="typed"]');
    "undefined"!=typeof Typed&&x&&[]
    .forEach.call( x, function(x){
      !function(x){
        var typo = x.dataset.options;
        typo = typo?JSON.parse(typo):{};
        var object = Object.assign({
          typeSpeed:100,
          backSpeed:100,
          backDelay:1e3,
          loop:!0
        },typo);
        new Typed(x,object)
      }(x)
    });
  }

   // wow animate
  const myWow = function () {
    if (typeof WOW !== "undefined") {
      new WOW().init();
    }
  }

  // Smooth Scroll Anchor
  const mySmooth = function () {
    if (typeof SmoothScroll === "undefined" || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)) {
      return;
    }
    var scroll = new SmoothScroll('a[href*="#"]:not(.back-top)', {
      offset : 80,
      speed: 1200,
      speedAsDuration: true
    });
  }
  
  // if scroll down
  const myScrollspy = function () {
    var nav_height = 80;
    var main_nav = document.querySelector(".main-nav");
    if (!main_nav) return;

    var nav_links = Array.prototype.slice.call(document.querySelectorAll('.navbar a[href^="#"]'));
    var sections = nav_links.map(function (link) {
      return document.getElementById(link.getAttribute('href').slice(1));
    }).filter(Boolean);

    var updateNavigation = function () {
      var scrollPosition = window.scrollY || document.documentElement.scrollTop;
      main_nav.classList.toggle('navbar-scrolled', scrollPosition >= nav_height);

      var activeSection = sections[0];
      sections.forEach(function (section) {
        if (section.offsetTop <= scrollPosition + nav_height) {
          activeSection = section;
        }
      });

      nav_links.forEach(function (link) {
        var isActive = activeSection && link.getAttribute('href') === '#' + activeSection.id;
        link.classList.toggle('active', Boolean(isActive));
        if (isActive) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    };

    window.addEventListener('load', updateNavigation);
    window.addEventListener('scroll', updateNavigation, { passive: true });
    window.addEventListener('resize', updateNavigation);
  }

  // menu mobile
  const menu_Mobile = function menu_Mobile() {
    var menuButton = document.querySelector('.menu-mobile');
    var menu = document.getElementById('primary-navigation');
    if (!menuButton || !menu) return;

    var setMenuOpen = function (isOpen) {
      menuButton.classList.toggle('show', isOpen);
      menu.classList.toggle('hidden', !isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    };

    menuButton.addEventListener('click', function () {
      setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenuOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuButton.focus();
      }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    });
  };

  // Custom JS
  const myCustom = function () {
    
    // insert your javascript in here

  }

  /**
   * ------------------------------------------------------------------------
   * Launch Functions
   * ------------------------------------------------------------------------
   */
   
  myBacktotop();
  menu_Mobile();
  myLightbox();
  mySplidejs();
  myTyped();
  myWow();
  mySmooth();
  myScrollspy();
  myCustom();

})();
