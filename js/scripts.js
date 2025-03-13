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