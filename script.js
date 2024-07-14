var translateProps;

window.addEventListener("load", function () {
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    translateProps = 100;
  } else {
    translateProps = 25;
  }
});

window.addEventListener("resize", function () {
  const windowWidth = window.innerWidth;
  if (windowWidth < 768) {
    translateProps = 100;
  } else {
    translateProps = 25;
  }
});

// Form Submission

$(document).ready(function () {
  $("#contactForm").on("submit", function (e) {
    e.preventDefault();

    var form = $(this);
    var url = form.attr("action");

    $.ajax({
      type: "POST",
      url: url,
      crossDomain: true,
      data: form.serialize(),
      success: function (data) {
        alert("Form submitted successfully!");
        $("#contactModal").modal("hide");
        form[0].reset();
      },
      error: function (data) {
        alert("An error occurred. Please try again.");
      },
    });
  });
});

// Services Slider
$(document).ready(function () {
  const slider = $(".slider");
  const dotsContainer = $(".dots");
  let currentIndex = 0;

  const slides = [
    {
      img: "./assets/1.png",
      title: "WEB DEVELOPMENT",
      desc: "Morbi sed lacus nec risus finibus feugiat et fermentum nibh. Pellentesque",
    },
    {
      img: "./assets/2.png",
      title: "DESIGN",
      desc: "Morbi sed lacus nec risus finibus feugiat et fermentum nibh. Pellentesque",
    },
    {
      img: "./assets/3.png",
      title: "MARKETING",
      desc: "Morbi sed lacus nec risus finibus feugiat et fermentum nibh. Pellentesque",
    },
    {
      img: "./assets/2.png",
      title: "ANALYTICS",
      desc: "Morbi sed lacus nec risus finibus feugiat et fermentum nibh. Pellentesque",
    },
  ];

  // Create slides
  function createSlide(slide) {
    return `
          <div class="slide">
              <img src="${slide.img}" alt="${slide.title}">
              <div class="hover-content">
                  <div class="service-icon">
                    <img  src="./assets/icon.svg" alt="${slide.title}">
                  </div>
                  <h5>${slide.title}</h5>
                  <p>${slide.desc}</p>
                  <a href="https://fylehq.com" target="_blank" class="btn btn-light service-btn" style="color:#FF3147">
                  <span>READ MORE</span>
                  <img class="service-btn-img" src="./assets/arrow.png" alt="arrow">
                  </a>
              </div>
          </div>
      `;
  }

  // Initialize slider
  function initSlider() {
    // Add cloned slides before the original slides
    // slides.slice(-4).forEach(slide => {
    //     slider.append(createSlide(slide));
    // });

    // Add original slides
    slides.forEach((slide) => {
      slider.append(createSlide(slide));
    });

    // Add cloned slides after the original slides
    // slides.slice(0, 2).forEach(slide => {
    //     slider.append(createSlide(slide));
    // });

    // Create dots
    slides.forEach((_, index) => {
      dotsContainer.append(
        `<div class="dot${index === 0 ? " active" : ""}"></div>`
      );
    });

    updateSliderPosition(false);
  }

  function updateSliderPosition(transition = true) {
    if (!transition) {
      slider.css("transition", "none");
    }
    slider.css("transform", `translateX(-${currentIndex * translateProps}%)`);
    if (!transition) {
      slider[0].offsetHeight; // Force reflow
      slider.css("transition", "");
    }
    $(".dot").removeClass("active").eq(currentIndex).addClass("active");
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
      slider.css("transform", `translateX(-50%)`);
      slider[0].offsetHeight; // Force reflow
    }
    updateSliderPosition();
  }

  function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = slides.length - 1;
      slider.css("transform", `translateX(-${(slides.length + 1) * 25}%)`);
      slider[0].offsetHeight; // Force reflow
    }
    updateSliderPosition();
  }

  initSlider();

  $(".dot").click(function () {
    currentIndex = $(this).index();
    updateSliderPosition();
  });

  setInterval(nextSlide, 5000);

  slider.on("transitionend", function () {
    if (currentIndex >= slides.length) {
      currentIndex = 0;
      updateSliderPosition(false);
    } else if (currentIndex < 0) {
      currentIndex = slides.length - 1;
      updateSliderPosition(false);
    }
  });
});
/////////////////////////////////////////////////////////////

// Our Project
$(document).ready(function () {
  $(".project-item").click(function () {
    $(".project-item").removeClass("active");
    $(this).addClass("active");

    var newImageSrc = $(this).data("image");
    $("#project-image").fadeOut(300, function () {
      $(this).attr("src", newImageSrc).fadeIn(300);
    });
  });
});

/////////////////////////////////////////////////////////////
// Our Growth
$(document).ready(function () {
  $(".growth-card").each(function (index) {
    $(this)
      .delay(index * 100)
      .animate({ opacity: 1, top: 0 }, 500);
  });
});
