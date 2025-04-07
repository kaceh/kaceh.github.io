// Homepage
if (window.location.pathname === '/') {
  // Slider Function from: https://www.w3schools.com/howto/howto_js_slideshow.asp
  let slideIndex = 1;
  showSlides(slideIndex);
  
  // Next/previous controls
  function plusSlides(n) {
    showSlides(slideIndex += n);
  }
  
  // Thumbnail image controls
  function currentSlide(n) {
    showSlides(slideIndex = n);
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

  setInterval(autoSlide, 3000);
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