// Popupboks for spillregler (via link i menyen til spillet)
$("#myModal").on("shown.bs.modal", function() {
  $("#myInput").trigger("focus");
});



// NAVIGASJON - ved scrolling krymper navbaren
window.onscroll = function() {
  scrollFunction();
  scrollLogoText();
};

// Når man scroller eller befinner seg et lite stykke fra toppen av siden skjer følgende:
function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {

    // Navbaren blir mindre (krymper)
    document.getElementById("navigasjon").style.padding = "0px 0px";

    // Bakgrunnsfargen på navbaren endres til hvit
    document.getElementById("navigasjon").style.backgroundColor = "white";

    // Navbaren får en border/liten skygge
    document.getElementById("navigasjon").style.boxShadow =
      "0 5px 3px -6px black";

    // Sørger for at navbaren er liten nok ved lite nettleservindu, slik at elementer ikke havner oppå hverandre
    document.getElementById("container").style.border = "0";

    // Logoen blir mindre i størrelse
    document.getElementById("logo").style.height = "55px";
    document.getElementById("logo").style.width = "80px";

    // Alle linker får mindre fontstørrelse
    var elements = document.getElementsByClassName("nav-link");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.style.fontSize = "14px";
    }

    // Når man er på toppen av nettsiden
  } else {

    document.getElementById("navigasjon").style.padding = "16px 16px";
    document.getElementById("navigasjon").style.backgroundColor = "#d5edf7";
    document.getElementById("navigasjon").style.boxShadow = "none";
    document.getElementById("container").style.border = "0";
    document.getElementById("logo").style.height = "70px";
    document.getElementById("logo").style.width = "100px";


    var elements = document.getElementsByClassName("nav-link");
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      element.style.fontSize = "16px";
    }
  }
}

function validerSkjema() {
  let navn = document.getElementById("fnavninput").value;
  let epost = document.getElementById("epostfelt").value;
  if (navn.trim() == "") {
    alert("Skriv inn navn.")
    return false;
  } else if (epost.trim() == "") {
    alert("Skriv inn epost.")
    return false;
  } else {
    return true;
  }
}


// Hvis man scroller eller befinner seg under Logoteksten som er på forsiden på nettsiden, blir logoteksten i navbaren synlig. Ellers er den skjult.
function scrollLogoText() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {

    document.getElementById("logoText").style.visibility = "visible";

  } else {

    document.getElementById("logoText").style.visibility = "hidden";
  }
}
