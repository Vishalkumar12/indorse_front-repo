////// all apges

$(window).scroll(function () {
  var scroll = $(window).scrollTop();
  //console.log(scroll);
  if (scroll >= 20) {
    //console.log('a');
    $("header").addClass("fixed");
  } else {
    //console.log('a');
    $("header").removeClass("fixed");
  }
});

$(".ham-btn").click(function () {
  $(".navbar-nav").toggleClass("active");
  $("body").toggleClass("freeze-body");
  $(this).toggleClass("active");
});

$(".btn-aside").click(function () {
  $(this).toggleClass("active");
  $("aside").toggleClass("fold");
});

$(window).ready(function () {
  setTimeout(function () {
    $(".pro-bn-text").toggleClass("active");
  }, 2000);
});

$(".add-accessory").click(function () {
  $(this).next(".quantity").removeClass("d-none");
  $(this).addClass("d-none");
});

$(".drape-link, .f-links .col a ").click(function () {
  $(".drape").addClass("active");
});

$(".drape-link,  .f-links .col a").click(function (e) {
  e.preventDefault(); // prevent default anchor behavior
  var goTo = this.getAttribute("href"); // store anchor href

  // do something while timeOut ticks ...

  setTimeout(function () {
    window.location = goTo;
  }, 310); // time in ms
});

// $(window).on('load', function() {
$(window).ready(function () {
  setTimeout(function () {
    $(".drape").removeClass("active");
  }, 1000);
});
