let hamburger = document.getElementById("hamburger");
let overlay = document.getElementById("overlay");
let navlinks = document.getElementById("nav-links");
let close = document.getElementById("close");

hamburger.addEventListener('click', function() {
  overlay.classList.add("openOverlay");
  overlay.classList.remove("closeOverlay");
  overlay.style.display = 'block';
  navlinks.classList.add("visible");
});

overlay.addEventListener('click', function() {
  overlay.classList.add("closeOverlay");
  overlay.classList.remove("openOverlay");
  navlinks.classList.remove("visible");

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
})

close.addEventListener('click', function() {
  overlay.classList.add("closeOverlay");
  overlay.classList.remove("openOverlay");
  navlinks.classList.remove("visible");

  setTimeout(() => {
    overlay.style.display = 'none';
  }, 300);
})

// Homepage
if (window.location.pathname === '/') {
  // Slider Function from: https://www.w3schools.com/howto/howto_js_slideshow.asp
  let slideIndex = 1;
  showSlides(slideIndex);
  let autoSlideInterval;

  function startAutoSlide(){
    autoSlideInterval = setInterval(autoSlide, 3000);  
  }

  startAutoSlide();

  // Next/previous controls
  function plusSlides(n) {
    clearInterval(autoSlideInterval);
    showSlides(slideIndex += n);
    startAutoSlide();
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    clearInterval(autoSlideInterval);
    showSlides(slideIndex = n);
    startAutoSlide();
  }
  
  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
  }

  // End of Slider function

  function autoSlide() {
    plusSlides(1);
  }
}

// About page, button redirect
if (window.location.pathname === '/about.html') {
  const linkedinBtn = document.querySelector('.linkedinBtn');
  if (linkedinBtn) {
    linkedinBtn.addEventListener('click', function() {
      window.open('https://www.linkedin.com/in/kevinc45/', '_blank');
    });
  }
}

// Projects page, sorting function
if (window.location.pathname === '/projects.html') {
  const sort = document.getElementById('sort');
  const container = document.getElementById('cardsContainer');

  sort.addEventListener('change', (event) => {
      const sortBy = event.target.value;
      sortCards(sortBy);
  });

  function sortCards(sortBy) {

      const cards = Array.from(container.querySelectorAll('.projectCard'));

      let sortedCards;
      switch (sortBy) {
          case 'recent':
              sortedCards = cards.sort((a, b) => {

                  const dateA = new Date(a.dataset.date || 0);
                  const dateB = new Date(b.dataset.date || 0);

                  return dateB - dateA;
              });
              break;

          case 'oldest':
              sortedCards = cards.sort((a, b) => {

                  const dateA = new Date(a.dataset.date || Infinity);
                  const dateB = new Date(b.dataset.date || Infinity);

                  return dateA - dateB;
              });
              break;

          case 'alphabet':
              sortedCards = cards.sort((a, b) => {

                  const titleA = a.querySelector('.cardTitle')?.textContent.trim().toLowerCase() || '';
                  const titleB = b.querySelector('.cardTitle')?.textContent.trim().toLowerCase() || '';

                  return titleA.localeCompare(titleB);
              });
              break;

          default:
              sortedCards = cards;
      }

      sortedCards.forEach(card => {
          container.appendChild(card);
      });
  }
}

if (window.location.pathname === '/projects/bennettquest.html' ||
    window.location.pathname === '/projects/binary.html' ||
    window.location.pathname === '/projects/firstmed.html' ||
    window.location.pathname === '/projects/simmagang.html' ){
      const btns = document.querySelectorAll('.project-navigation');

      btns.forEach(btn => {
        btn.addEventListener('click', function(event) {
          event.preventDefault();
          sessionStorage.setItem('previousScrollY', window.scrollY);
          window.location.href = this.getAttribute('href');
        })
      })
      
      if (sessionStorage.getItem('previousScrollY') !== null) {
        const startPosition = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const targetPosition = 0;
        const duration = 1000;
        const startTime = performance.now();

        function easeInOutCubic(t) {
          // Calculation for ease in and out
          // https://gist.github.com/gre/1650294
            return t < 0.5 ? 4*t*t*t : (t-1) * (2*t-2) * (2*t-2) + 1;
        }

        function animateScroll() {
            const currentTime = performance.now();
            const timeElapsed = currentTime - startTime;

            if (timeElapsed < duration) {
                const t = timeElapsed / duration;
                const easedT = easeInOutCubic(t);
                const newPosition = startPosition + (targetPosition - startPosition) * easedT;
                window.scrollTo(0, newPosition);
                requestAnimationFrame(animateScroll);
            } else {
                window.scrollTo(0, targetPosition);
                sessionStorage.removeItem('previousScrollY');
            }
        }

        window.scrollTo(0, startPosition);
        requestAnimationFrame(animateScroll);
      }
}