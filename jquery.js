/* Aktive linker i navigasjon */
$(".nav-item").on("click", function(e) {
  $("li.nav-item").removeClass("active");
  $(this).addClass("active");
});

$("body").scrollspy({ target: "#navigasjon" });

/* Lukker menyen når du klikker på lenke */

$(".nav-link").on("click", function() {
  $(".navbar-collapse").collapse("hide");
});

/* Lukker menyen når du klikker på body */

$("body").on("click", function() {
  $(".navbar-collapse").collapse("hide");
});
