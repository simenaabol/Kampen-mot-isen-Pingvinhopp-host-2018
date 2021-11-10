//ani er bergensk for å berøre
//beklager misforståelse

let kanvas = document.getElementById("spillKanvas");
let kontekst = kanvas.getContext("2d");

let rekord = localStorage.getItem("rekordfil1.txt");
if (rekord == false) {
  rekord = 0;
}

let menyÅpen = false;

let toSpillere = false;
let menybakgrunn = new Image();
menybakgrunn.src = "grafikk/menybakgrunn.png";
let menyvalg = new Image();
menyvalg.src = "grafikk/menyvalgbakgrunn.png"

let førsteGang = true;
let blåSeier = true;
let mus = {
  x: 0,
  y: 0,
  klikk: false
};

let lyd = {
  på: true,
  bilde: new Image(),
  x: kanvas.width - 45,
  y: 0,
  hopp: new Audio(),
  fisk: new Audio(),
  død: new Audio()
};
lyd.hopp.src = "lyd/hopp.wav";
lyd.død.src = "lyd/død.oga";

let musikk = {
  på: true,
  bilde: new Image(),
  x: kanvas.width - 80,
  y: 0,
  fil: new Audio(),
  vanskelig: false
};
musikk.fil.src = "lyd/musikk.oga";

let temaID = 1;
let tema = [];
tema[0] = {
  bakgrunn: new Image(),
  istapp: new Image(),
  fiskebilde: new Image(),
  pingvin: new Image(),
  rødpingvin: new Image(),
  isPlattform: new Image(),
  sprettPlattform: new Image(),
  skjørPlattform: new Image(),
  ammofisk: new Image()
};

tema[1] = {
  bakgrunn: new Image(),
  istapp: new Image(),
  fiskebilde: new Image(),
  pingvin: new Image(),
  rødpingvin: new Image,
  isPlattform: new Image(),
  sprettPlattform: new Image(),
  skjørPlattform: new Image(),
  ammofisk: new Image()
};

tema[2] = {
  bakgrunn: new Image(),
  istapp: new Image(),
  fiskebilde: new Image(),
  pingvin: new Image(),
  rødpingvin: new Image(),
  isPlattform: new Image(),
  sprettPlattform: new Image(),
  skjørPlattform: new Image(),
  ammofisk: new Image()
};

tema[3] = {
  bakgrunn: new Image(),
  istapp: new Image(),
  fiskebilde: new Image(),
  pingvin: new Image(),
  rødpingvin: new Image(),
  isPlattform: new Image(),
  sprettPlattform: new Image(),
  skjørPlattform: new Image(),
  ammofisk: new Image()
};

//istema
tema[0].bakgrunn.src = "grafikk/bakgrunner/is.png";
tema[0].pingvin.src = "grafikk/pingvin.png";
tema[0].rødpingvin.src = "grafikk/rød/pingvin.png";
tema[0].istapp.src = "grafikk/istapp.png";
tema[0].fiskebilde.src = "grafikk/fisk.png";
tema[0].isPlattform.src = "grafikk/snøplattform.png";
tema[0].sprettPlattform.src = "grafikk/snøsprettplattform.png";
tema[0].skjørPlattform.src = "grafikk/snøskjørplattform.png";
tema[0].ammofisk.src = "grafikk/ammofisk.png";


//gresstema
tema[1].bakgrunn.src = "grafikk/bakgrunner/slott.png";
tema[1].pingvin.src = "grafikk/pingvin.png";
tema[1].rødpingvin.src = "grafikk/rød/pingvin.png";
tema[1].istapp.src = "grafikk/gresstapp.png";
tema[1].fiskebilde.src = "grafikk/fisk.png";
tema[1].isPlattform.src = "grafikk/gressplattform.png";
tema[1].sprettPlattform.src = "grafikk/gressprettplattform.png";
tema[1].skjørPlattform.src = "grafikk/gresskjørplattform.png";
tema[1].ammofisk.src = "grafikk/gressfisk.png";

//ørkentema
tema[2].bakgrunn.src = "grafikk/bakgrunner/ørken.png";
tema[2].pingvin.src = "grafikk/pingvin.png";
tema[2].rødpingvin.src = "grafikk/rød/pingvin.png";
tema[2].istapp.src = "grafikk/ørkentapp.png";
tema[2].fiskebilde.src = "grafikk/fisk.png";
tema[2].isPlattform.src = "grafikk/sandplattform.png";
tema[2].sprettPlattform.src = "grafikk/sandsprettplattform.png";
tema[2].skjørPlattform.src = "grafikk/sandskjørplattform.png";
tema[2].ammofisk.src = "grafikk/ørkenfisk.png";

//fjelltema
tema[3].bakgrunn.src = "grafikk/bakgrunner/fjell.png";
tema[3].pingvin.src = "grafikk/pingvin.png";
tema[3].rødpingvin.src = "grafikk/rød/pingvin.png";
tema[3].istapp.src = "grafikk/fjelltapp.png";
tema[3].fiskebilde.src = "grafikk/fisk.png";
tema[3].isPlattform.src = "grafikk/fjellplattform.png";
tema[3].sprettPlattform.src = "grafikk/fjellsprettplattform.png";
tema[3].skjørPlattform.src = "grafikk/fjellskjørplattform.png";
tema[3].ammofisk.src = "grafikk/fjellfisk.png";

let istapPos = {
  x: 0,
  y: kanvas.height + 1,
  synlig: false
};

let rotering = 0;

let nyFisk = {
  x: 0,
  y: 0
};
let fisk = [];
fisk.push(nyFisk);
let rødeFisk = [];
rødeFisk.push(nyFisk);

let tapt = true;

let dx = 0;
let dy;
let pingvinIMidten = false;
let sertilvenstre = true;
let x = kanvas.width / 2;
let y = kanvas.height - tema[temaID].pingvin.height - 70;

const startFart = 8;
let tidSidenHopp = 10;

let rød = {
  x: kanvas.width / 2,
  y: kanvas.height - tema[temaID].rødpingvin.height - 70,
  dy: 0,
  dx: 0,
  sertilvenstre: true,
  antallAmmo: 20,
  tidSidenHopp: -startFart,
  rotering: 0,
  pingvinIMidten: false,
  tapt: false
}


let høyreTrykk = false;
let venstreTrykk = false;
let enterTrykk = false;
let mellomromTrykk = false;
let oppTrykk = false;
let mTrykk = false;
let lTrykk = false;
let aTrykk = false;
let wTrykk = false;
let dTrykk = false;

const plattformBredde = 80;
const plattformHøyde = 22;
let plattformer = [];
let plattformType = 0;

//lager den første plattformen
let plattform = {
  x: kanvas.width / 2 - plattformBredde / 4,
  y: 0,
  type: 0,
  synlig: true,
  ammunisjon: false,
  ammo: 0,
  retning: "høyre",
  bevegelse: false
};
plattformer.push(plattform);

let poeng = 0;

let nyttAmmo = 0;
let antallAmmo = 20;
let nyAmmunisjon = false;
let ammolyd = new Audio();
ammolyd.src = "lyd/ammunisjon.oga";

let hjelp = {
  x: kanvas.width - 110,
  y: 0,
  ikon: new Image()
};
hjelp.ikon.src = "grafikk/spørsmålstegn.png";

function startverdier() { //tilbakestiller alle verdier slik at man kan spille flere ganger

  tema[temaID].pingvin.src = "grafikk/pingvinhoppvenstre.png";
  temaID = 1;

  if (musikk.vanskelig) musikk.fil.src = "lyd/musikk.oga";
  musikk.vanskelig = false;

  musikk.x = kanvas.width - 80;
  lyd.x = kanvas.width - 45;

  førsteGang = false;

  istapPos = {
    x: 0,
    y: kanvas.height + 1,
    synlig: false
  };

  rotering = 0;

  nyFisk = {
    x: 0,
    y: 0
  };
  fisk = [];
  fisk.push(nyFisk);
  rødeFisk = [];
  rødeFisk.push(nyFisk);

  tapt = false;

  hjelp.x = kanvas.width - 110;

  dx = 0;
  dy = 0;
  pingvinIMidten = false;
  sertilvenstre = true;
  x = kanvas.width / 2;
  y = kanvas.height - tema[temaID].pingvin.height - 70;


  rød = {
    x: kanvas.width / 2,
    y: kanvas.height - tema[temaID].rødpingvin.height - 70,
    dy: 0,
    dx: 0,
    sertilvenstre: true,
    antallAmmo: 20,
    tidSidenHopp: -startFart,
    rotering: 0,
    pingvinIMidten: false,
    tapt: false
  }

  tidSidenHopp = -startFart;

  høyreTrykk = false;
  venstreTrykk = false;
  enterTrykk = false;
  mellomromTrykk = false;
  oppTrykk = false;
  mTrykk = false;
  lTrykk = false;
  dTrykk = false;
  wTrykk = false;
  aTrykk = false;

  plattformer = [];
  plattformType = 0;

  //lager den første plattformen
  plattform = {
    x: kanvas.width / 2 - plattformBredde / 4,
    y: 0,
    type: 0,
    synlig: true,
    ammunisjon: false,
    ammo: 0,
    retning: "høyre",
    bevegelse: false
  };
  plattformer.push(plattform);

  poeng = 0;

  nyttAmmo = 0;
  antallAmmo = 20;
  nyAmmunisjon = false;

  //større bakgrunnsbilde hvis man spiller to stykk
  if (toSpillere) {
    tema[1].bakgrunn.src = "grafikk/bakgrunner/duell_slott.png";
    tema[0].bakgrunn.src = "grafikk/bakgrunner/duell_is.png";
    tema[2].bakgrunn.src = "grafikk/bakgrunner/duell_ørken.png";
    tema[3].bakgrunn.src = "grafikk/bakgrunner/duell_fjell.png";
  } else {
    tema[1].bakgrunn.src = "grafikk/bakgrunner/slott.png";
    tema[0].bakgrunn.src = "grafikk/bakgrunner/is.png";
    tema[2].bakgrunn.src = "grafikk/bakgrunner/ørken.png";
    tema[3].bakgrunn.src = "grafikk/bakgrunner/fjell.png";
  }
}

function tegnPoeng() { //tegner opp poengsum i øvre venstre hjørne

  //Sjekker om man har fått ny rekord, og hvis ja, lagrer ny rekord
  if (rekord < poeng) {
    localStorage.setItem("rekordfil1.txt", poeng);
    rekord = poeng;
  }

  //tegn opp rekord
  kontekst.fillStyle = "#d48852";
  kontekst.font = "16px Sigmar One";
  kontekst.fillText("Rekord: " + rekord, 8, 20);

  //poeng er lik posisjonen til den første plattformen
  poeng = Math.floor(plattformer[0].y);
  kontekst.font = "16px Sigmar One";
  kontekst.fillStyle = "#d48852";
  kontekst.fillText("Poeng: " + poeng, 8, 40);

  //tegner antall ammunisjon
  kontekst.font = "16px Sigmar One";
  if (!toSpillere) {
    kontekst.fillStyle = "#d48852";
    kontekst.fillText("Fisk: " + antallAmmo, kanvas.width - 80, 50);
  } else {
    kontekst.fillStyle = "#d48852";
    kontekst.fillText("Fisk:", kanvas.width - 80, 50);
    kontekst.fillStyle = "#3a76b5";
    kontekst.fillText(antallAmmo, kanvas.width - 30, 50);
    kontekst.fillStyle = "#d72148";
    kontekst.fillText(rød.antallAmmo, kanvas.width - 30, 70);
  }
}

function nyPlattform() { //lager ny plattform litt over øverst på skjermen med vilkårlig x-posisjon
  let plattformX = Math.floor(Math.random() * (kanvas.width - tema[temaID].isPlattform.width));
  let plattformY = -30;

  //lager kanskje ammunisjon
  if (Math.random() * 10 < 1.5) {
    nyAmmunisjon = true;
  }

  let bevegelse = false;
  if (Math.random() < poeng / 12000) bevegelse = true;
  let retning = "høyre";
  if (Math.random() < 0.5) retning = "venstre";

  //plattformer får mellom 1 og 5 fisk
  nyttAmmo = Math.floor(Math.random() * 5) + 1;

  //lager forskjellige plattformtyper
  if (!toSpillere) {
    if (Math.floor(Math.random() * 10) == 3) plattformType = 1; //sprettplattform
    else if (Math.floor(Math.random() * 10) <= 2) plattformType = 2; //skjør plattform
    else plattformType = 0; //vanlig plattform
  } else {
    if (Math.floor(Math.random() * 10) == 3) plattformType = 1; //sprettplattform
    else if (Math.floor(Math.random() * 10) == 2) plattformType = 2; //skjør plattform
    else plattformType = 0; //vanlig plattform
  }


  let plattform = {
    x: plattformX,
    y: plattformY,
    type: plattformType,
    synlig: true,
    ammunisjon: nyAmmunisjon,
    ammo: nyttAmmo,
    retning: retning,
    bevegelse: bevegelse
  };
  nyAmmunisjon = false;
  plattformer.push(plattform);
}

function tegnPlattformer() { //tegner opp alle plattformer

  //begrens mellomrom mellom plattformer
  if (toSpillere) { //mindre mellomrom hvis to spillere spiller
    if (plattformer[plattformer.length - 1].y > 20) {
      nyPlattform();
    }
  } else {
    if (plattformer[plattformer.length - 1].y > 60) {
      nyPlattform();
    }
  }

  //tegner opp alle plattformer
  for (let i = 0; i < plattformer.length; i++) {
    if (plattformer[i].y > kanvas.height + 50) plattformer[i].synlig = false;

    //beveg plattformen hvis den skal det
    if (plattformer[i].bevegelse) {
      if (plattformer[i].retning == "høyre") plattformer[i].x += 2;
      else plattformer[i].x -= 1.5;
    }

    //endre retning på plattformer hvis den når kanten av kanvaset
    if (plattformer[i].x+tema[temaID].isPlattform.width >= kanvas.width) plattformer[i].retning = "venstre";
    else if (plattformer[i].x <= 0) plattformer[i].retning = "høyre";


    //plattformer flytter seg hvis pingvinen er i midten av skjermen
    if (rød.pingvinIMidten) plattformer[i].y -= rød.dy;
    else if (pingvinIMidten) plattformer[i].y -= dy;

    //tegn bare plattformer hvis de skal vises (synlig)
    if (plattformer[i].synlig) {
      if (plattformer[i].type == 0) { //vanlig plattform
        kontekst.drawImage(tema[temaID].isPlattform, plattformer[i].x, plattformer[i].y);
      } else if (plattformer[i].type == 1) { //sprettplattform
        kontekst.drawImage(tema[temaID].sprettPlattform, plattformer[i].x, plattformer[i].y);
      } else if (plattformer[i].type == 2) { //skjør plattform
        kontekst.drawImage(tema[temaID].skjørPlattform, plattformer[i].x, plattformer[i].y);
      }

      //skriver opp antall ammo ved siden av fisken
      if (plattformer[i].ammunisjon) {
        kontekst.font = "16px Sigmar One";
        if (temaID == 0) {
          kontekst.drawImage(tema[temaID].ammofisk, plattformer[i].x, plattformer[i].y - 20);
          kontekst.fillStyle = "#3498db";
          kontekst.fillText(plattformer[i].ammo, plattformer[i].x, plattformer[i].y - 20);
        } else if (temaID == 1) {
          kontekst.drawImage(tema[temaID].ammofisk, plattformer[i].x, plattformer[i].y - 20);
          kontekst.fillStyle = "#ff9900";
          kontekst.fillText(plattformer[i].ammo, plattformer[i].x, plattformer[i].y - 20);
        } else if (temaID == 2) {
          kontekst.drawImage(tema[temaID].ammofisk, plattformer[i].x, plattformer[i].y - 35);
          kontekst.fillStyle = "#a16e39";
          kontekst.fillText(plattformer[i].ammo, plattformer[i].x, plattformer[i].y - 35);
        } else if (temaID == 3) {
          kontekst.drawImage(tema[temaID].ammofisk, plattformer[i].x, plattformer[i].y - 30);
          kontekst.fillStyle = "#e74c3c";
          kontekst.fillText(plattformer[i].ammo, plattformer[i].x, plattformer[i].y - 30);
        }
      }
    }
  }
}

function kollisjonDeteksjon() { //sjekk om ting er ani hverandre på skjermen

  //sjekk plattformer
  for (let i = 0; i < plattformer.length; i++) {
    let p = plattformer[i];

    //måler bare ved føttene til pingvinen
    if (mellomromTrykk || oppTrykk) { //må måle litt forskjøvet når pingvinen spyr
      var reellPosisjon = {
        x: x + tema[temaID].pingvin.width / 2,
        y: y - 13 + tema[temaID].pingvin.height
      };
    } else {
      var reellPosisjon = {
        x: x + tema[temaID].pingvin.width / 2,
        y: y + tema[temaID].pingvin.height
      };
    }

    //sjekker om pingvin er ani toppen av en plattform
    if (p.synlig)
      if (reellPosisjon.x + tema[temaID].pingvin.width / 3 > p.x &&
        reellPosisjon.x - tema[temaID].pingvin.width / 3 < p.x + plattformBredde &&
        reellPosisjon.y > p.y - 10 &&
        reellPosisjon.y < p.y + 30 &&
        dy > 0) {
        if (p.synlig) { //hopp bare hvis plattformen er synlig
          if (p.type == 1) { //hopp høyere hvis det er en sprettplattform
            tidSidenHopp = -7;
          } else if (p.type == 2) { //hopp vanlig og fjern plattform hvis den er skjør
            tidSidenHopp = 0;
            p.synlig = false;
          } else tidSidenHopp = 0; //hopp vanlig hvis det er en vanlig plattform
          //spill av hoppelyd
          if (lyd.på) lyd.hopp.play();
        }
      }

    //sjekk om pingvin er ani fisk og endre antall ammunisjon i så fall
    if (x + tema[temaID].pingvin.width >= plattformer[i].x &&
      x <= plattformer[i].x + tema[temaID].ammofisk.width &&
      y + tema[temaID].pingvin.height >= plattformer[i].y - 20 &&
      y <= plattformer[i].y - 20 + tema[temaID].ammofisk.height &&
      plattformer[i].ammunisjon == true) {
      plattformer[i].ammunisjon = false;
      antallAmmo += plattformer[i].ammo;

      //spiller av skytelyd
      if (lyd.på) ammolyd.play();
    }
  }

  //sjekk om istapp er ani pingvinen
  if (x + tema[temaID].pingvin.width >= istapPos.x &&
    x <= istapPos.x + tema[temaID].istapp.width &&
    y + tema[temaID].pingvin.height >= istapPos.y &&
    y <= istapPos.y + tema[temaID].istapp.height) {
    //hopp hvis pingvin lander oppå istappen
    if (reellPosisjon.y > istapPos.y - 10 &&
      reellPosisjon.y < istapPos.y + 20 &&
      dy > 0) {
      tidSidenHopp = 0;
      y -= 10;
      //spill av hoppelyd
      if (lyd) lyd.hopp.play();
    } else { //pingvin dør hvis ikke
      istapPos.x = -50;
      tapt = true;
      if (!menyÅpen) blåSeier = false;
      y -= 100;
      x -= 30;
    }
  }

  //sjekk om en fisk er ani istappen
  for (let i = 0; i < fisk.length; i++) {
    if (fisk[i].x + tema[temaID].fiskebilde.width >= istapPos.x &&
      fisk[i].x <= istapPos.x + tema[temaID].istapp.width &&
      fisk[i].y + tema[temaID].fiskebilde.height >= istapPos.y &&
      fisk[i].y <= istapPos.y + tema[temaID].istapp.height) {
      //gjem både plattform og fisk hvis de kolliderer
      istapPos.x = -50;
      fisk[i].x = -50;
    }
  }
}

function rødKollisjonDeteksjon() { //sjekk om den røde pingvinen er ani ting på skjermen

  //sjekk plattformer
  for (let i = 0; i < plattformer.length; i++) {
    let p = plattformer[i];

    //måler bare ved føttene til pingvinen
    if (wTrykk && !tapt) {
      var reellPosisjon = { //mål litt forskjøvet når pingvinen spyr
        x: rød.x + tema[temaID].rødpingvin.width / 2,
        y: rød.y - 13 + tema[temaID].rødpingvin.height
      };
    } else {
      var reellPosisjon = {
        x: rød.x + tema[temaID].rødpingvin.width / 2,
        y: rød.y + tema[temaID].rødpingvin.height
      };
    }

    //sjekker om pingvin er ani toppen av en plattform
    if (p.synlig)
      if (reellPosisjon.x + tema[temaID].rødpingvin.width / 3 > p.x &&
        reellPosisjon.x - tema[temaID].rødpingvin.width / 3 < p.x + plattformBredde &&
        reellPosisjon.y > p.y - 10 &&
        reellPosisjon.y < p.y + 30 &&
        rød.dy > 0) {
        if (p.synlig) { //hopp bare hvis plattformen er synlig
          if (p.type == 1) { //hopp høyere hvis det er en sprettplattform
            rød.tidSidenHopp = -7;
          } else if (p.type == 2) { //hopp vanlig og fjern plattform hvis den er skjør
            rød.tidSidenHopp = 0;
            p.synlig = false;
          } else rød.tidSidenHopp = 0; //hopp vanlig hvis det er en vanlig plattform
          //spill av hoppelyd
          if (lyd.på) lyd.hopp.play();
        }
      }

    //sjekk om pingvin er ani fisk og endre antall ammunisjon i så fall
    if (rød.x + tema[temaID].pingvin.width >= plattformer[i].x &&
      rød.x <= plattformer[i].x + tema[temaID].ammofisk.width &&
      rød.y + tema[temaID].pingvin.height >= plattformer[i].y - 20 &&
      rød.y <= plattformer[i].y - 20 + tema[temaID].ammofisk.height &&
      plattformer[i].ammunisjon == true) {
      plattformer[i].ammunisjon = false;
      rød.antallAmmo += plattformer[i].ammo;
      if (lyd.på) ammolyd.play();
    }
  }

  //sjekk om istapp er ani pingvinen
  if (rød.x + tema[temaID].rødpingvin.width >= istapPos.x &&
    rød.x <= istapPos.x + tema[temaID].istapp.width &&
    rød.y + tema[temaID].rødpingvin.height >= istapPos.y &&
    rød.y <= istapPos.y + tema[temaID].istapp.height) {
    //hopp hvis pingvin lander oppå istappen
    if (reellPosisjon.y > istapPos.y - 10 &&
      reellPosisjon.y < istapPos.y + 5 &&
      rød.dy > 0) {
      rød.tidSidenHopp = 0;
      //spill av hoppelyd
      if (lyd) lyd.hopp.play();
      rød.y -= 10;
    } else { //pingvin dør hvis ikke
      istapPos.x = -50;
      rød.tapt = true;
      if (!menyÅpen) blåSeier = true;
      rød.y -= 100;
      rød.x -= 30;
    }
  }

  //sjekk om en fisk er ani istappen
  for (let i = 0; i < fisk.length; i++) {
    if (fisk[i].x + tema[temaID].fiskebilde.width >= istapPos.x &&
      fisk[i].x <= istapPos.x + tema[temaID].istapp.width &&
      fisk[i].y + tema[temaID].fiskebilde.height >= istapPos.y &&
      fisk[i].y <= istapPos.y + tema[temaID].istapp.height) {
      //gjem både plattform og fisk hvis de kolliderer
      istapPos.x = -50;
      fisk[i].x = -50;
    }
  }
}

function tegnPingvin() { //tegner selve pingvinen

  //roter pingvin hvis den treffer en istapp
  if (tapt) {
    if (sertilvenstre) {
      rotering += 0.02;
      x -= 2;
    } else {
      rotering -= 0.02;
      x += 2;
    }
    kontekst.save();
    kontekst.translate(x + 25, y + 80);
    kontekst.rotate(rotering);
    kontekst.drawImage(tema[temaID].pingvin, 0, 0);
    kontekst.restore();
  } else { //tegn pingvinen vanlig hvis man ikke har tapt
    if ((mellomromTrykk || oppTrykk) && !rød.tapt) kontekst.drawImage(tema[temaID].pingvin, x, y - 13);
    else kontekst.drawImage(tema[temaID].pingvin, x, y);
  }

  //beveg pingvin med tastetrykk
  if (!tapt && !rød.tapt) {
    if (høyreTrykk) {
      sertilvenstre = false;
      x += 4;
    } else if (venstreTrykk) {
      sertilvenstre = true;
      x -= 4;
    }
  }

  if (!tapt) {
    //retter pingvinen mot retning man beveger seg
    if (sertilvenstre) {
      if (dy < 0) tema[temaID].pingvin.src = "grafikk/pingvinhoppvenstre.png";
      else tema[temaID].pingvin.src = "grafikk/pingvinvenstre.png";
    } else {
      if (dy < 0) tema[temaID].pingvin.src = "grafikk/pingvinhopp.png";
      else tema[temaID].pingvin.src = "grafikk/pingvin.png";
    }

    //tegn at pingvinen spyr
    if ((mellomromTrykk || oppTrykk) && !rød.tapt) {
      if (dy < 0) {
        if (sertilvenstre)
          tema[temaID].pingvin.src = "grafikk/pingvinspyvenstre.png";
        else tema[temaID].pingvin.src = "grafikk/pingvinspyhøyre.png";
      } else {
        if (sertilvenstre)
          tema[temaID].pingvin.src = "grafikk/nedpingvinspyvenstre.png";
        else tema[temaID].pingvin.src = "grafikk/nedpingvinspyhøyre.png";
      }
    }

    //tegner tapp gjennom hodet
  } else {
    if (!tapt && lyd.på) {
      lyd.død.play();
    }
    if (temaID == 0) tema[temaID].pingvin.src = "grafikk/au.png";
    else if (temaID == 1) tema[temaID].pingvin.src = "grafikk/gressau.png";
    else if (temaID == 2) tema[temaID].pingvin.src = "grafikk/ørkenau.png";
    else if (temaID == 3) tema[temaID].pingvin.src = "grafikk/fjellau.png";
  }

  //pingvin kan gå rundt kantene på spillet
  if (x < 0) x = kanvas.width;
  if (x > kanvas.width) x = 0;

  //sjekker om pingvin faller gjennom
  if (y + tema[temaID].pingvin.height > kanvas.height + 100) {
    if (lyd.på && !tapt) {
      lyd.død.play();
    }
    tidSidenHopp = 100;
    tapt = true;
    if (!menyÅpen) blåSeier = false;
  }

  //endrer koordinatene på pingvinen
  x += dx;

  //sjekk om pingvinen er i midten av skjermen slik at plattformene kan flyttes
  if (!toSpillere) {
    if (y <= kanvas.height / 2 && y >= kanvas.height / 2 - 30 && dy < 0)
      pingvinIMidten = true;
    else {
      y += dy;
      pingvinIMidten = false;
    }
  }
}

function tegnRødPingvin() { //tegner den røde pingvinen

  //roter pingvin hvis den  har istapp gjennom hodet
  if (rød.tapt) {
    if (rød.sertilvenstre) {
      rød.rotering += 0.02;
      rød.x -= 2;
    } else {
      rød.rotering -= 0.02;
      rød.x += 2;
    }
    kontekst.save();
    kontekst.translate(rød.x + 25, rød.y + 80);
    kontekst.rotate(rød.rotering);
    kontekst.drawImage(tema[temaID].rødpingvin, 0, 0);
    kontekst.restore();
  } else { //tegn pingvin vanlig hvis den lever
    if (wTrykk && !tapt) kontekst.drawImage(tema[temaID].rødpingvin, rød.x, rød.y - 13);
    else kontekst.drawImage(tema[temaID].rødpingvin, rød.x, rød.y);
  }

  //beveg pingvin med tastetrykk
  if (!rød.tapt && !tapt) {
    if (dTrykk) {
      rød.sertilvenstre = false;
      rød.x += 4;
    } else if (aTrykk) {
      rød.sertilvenstre = true;
      rød.x -= 4;
    }
  }

  if (!rød.tapt) {
    //retter pingvinen mot retning man beveger seg
    if (rød.sertilvenstre) {
      if (rød.dy < 0) tema[temaID].rødpingvin.src = "grafikk/rød/pingvinhoppvenstre.png";
      else tema[temaID].rødpingvin.src = "grafikk/rød/pingvinvenstre.png";
    } else {
      if (rød.dy < 0) tema[temaID].rødpingvin.src = "grafikk/rød/pingvinhopp.png";
      else tema[temaID].rødpingvin.src = "grafikk/rød/pingvin.png";
    }

    if (wTrykk && !tapt) {
      if (rød.dy < 0) {
        if (rød.sertilvenstre)
          tema[temaID].rødpingvin.src = "grafikk/rød/pingvinspyvenstre.png";
        else tema[temaID].rødpingvin.src = "grafikk/rød/pingvinspyhøyre.png";
      } else {
        if (rød.sertilvenstre)
          tema[temaID].rødpingvin.src = "grafikk/rød/nedpingvinspyvenstre.png";
        else tema[temaID].rødpingvin.src = "grafikk/rød/nedpingvinspyhøyre.png";
      }
    }

    //tegner tapp gjennom hodet
  } else {
    if (!rød.tapt && lyd.på) {
      lyd.død.play();
      rød.tapt = true;
      if (!menyÅpen) blåSeier = true;
    }
    if (temaID == 0) tema[temaID].rødpingvin.src = "grafikk/rød/au.png";
    else if (temaID == 1) tema[temaID].rødpingvin.src = "grafikk/rød/gressau.png";
    else if (temaID == 2) tema[temaID].rødpingvin.src = "grafikk/rød/ørkenau.png";
    else if (temaID == 3) tema[temaID].rødpingvin.src = "grafikk/rød/fjellau.png";
  }

  //pingvin kan gå rundt kantene på spillet
  if (rød.x < 0) rød.x = kanvas.width;
  if (rød.x > kanvas.width) rød.x = 0;

  //sjekker om pingvin faller gjennom
  if (rød.y + tema[temaID].rødpingvin.height > kanvas.height + 100) {
    if (lyd.på && !rød.tapt) {
      lyd.død.play();
      rød.tapt = true;
      if (!menyÅpen) blåSeier = true;
    }
    rød.tapt = true;

    if (!menyÅpen) blåSeier = true;
  }

  //endrer koordinatene på pingvinen
  rød.x += rød.dx;

  //sjekk om pingvinen er i midten av skjermen slik at plattformene kan flyttes
  if (rød.y <= kanvas.height / 4 && rød.y >= kanvas.height / 4 - 30 && rød.dy < 0) {
    //rød i midten
    rød.pingvinIMidten = true;
    pingvinIMidten = false;
    y -= rød.dy;
    y += dy;
  } else if (y <= kanvas.height / 4 && y >= kanvas.height / 4 - 30 && dy < 0) {
    //blå i midten
    pingvinIMidten = true;
    rød.pingvinIMidten = false;
    rød.y -= dy;
    rød.y += rød.dy;
  } else { //beveg pingviner vanlig hvis ingen av dem er i midten
    rød.pingvinIMidten = false;
    pingvinIMidten = false;
    rød.y += rød.dy;
    y += dy;
  }
}

function tyngdeKraft() { //sørger for at pingvinen faller ned igjen
  if (toSpillere) {
    rød.dy = rød.tidSidenHopp - 10;
    rød.tidSidenHopp += 0.25;
  }
  dy = tidSidenHopp - 10;
  tidSidenHopp += 0.25;
}

function tegnBakgrunn() { //tegner bakgrunnsbildet
  kontekst.drawImage(tema[temaID].bakgrunn, 0, 0);
}

function tegnIstapp() { //tegn opp fallende tapper

  //tegner inn tapp hvis man har poengsum over 2000
  if (poeng > 2000) {
    //sjekk om det er en tapp på skjermen
    if (istapPos.y < kanvas.height) istapPos.synlig = true;
    else istapPos.synlig = false;

    //teng bare ny istapp hvis ingen er på skjermen
    if (!istapPos.synlig) {
      istapPos.x = Math.floor(Math.random() * (kanvas.width - tema[temaID].istapp.width));
      istapPos.y = 0;
    } else {
      //beveg tapp raskere nedover hvis pingvinen er i midten av skjermen
      if (!tapt && pingvinIMidten) {
        istapPos.y -= dy;
      } else if (!rød.tapt && rød.pingvinIMidten) {
        istapPos.y -= rød.dy
      }
      //farten til tappen
      istapPos.y += 3;
    }

    //tegn tappen
    kontekst.drawImage(tema[temaID].istapp, istapPos.x, istapPos.y);
  }
}

function tegnFisk() { //tegn fiskeskjeletter

  //skyt fisk når man trykker på mellomromstasten eller opptasten
  if ((mellomromTrykk || oppTrykk) && antallAmmo > 0 && !rød.tapt) {
    //lag ny fisk hvis det er mer enn 150 piksler til den forrige
    if (fisk[fisk.length - 1].y < y - 150 && !tapt) {
      nyFisk = {
        x: x + tema[temaID].pingvin.width / 2,
        y: y
      };
      fisk.push(nyFisk);
      antallAmmo--;

      //velg tilfeldig oppkastlyd
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          lyd.fisk.src = "lyd/oppkast1.oga";
          break;
        case 1:
          lyd.fisk.src = "lyd/oppkast2.oga";
          break;
        case 2:
          lyd.fisk.src = "lyd/oppkast3.oga";
          break;
      }
      //spill av spylyd
      if (lyd.på) lyd.fisk.play();
    }
  }

  if (toSpillere) {
    if ((wTrykk) && rød.antallAmmo > 0 && !tapt) { //rød pingvin spyr fisk hvis w trykkes
      //lag ny fisk hvis det er mer enn 150 piksler til den forrige
      if (rødeFisk[rødeFisk.length - 1].y < rød.y - 150 && !rød.tapt) {
        nyFisk = {
          x: rød.x + tema[temaID].rødpingvin.width / 2,
          y: rød.y
        };
        rødeFisk.push(nyFisk);
        rød.antallAmmo--;

        //velg tilfeldig oppkastlyd
        switch (Math.floor(Math.random() * 3)) {
          case 0:
            lyd.fisk.src = "lyd/oppkast1.oga";
            break;
          case 1:
            lyd.fisk.src = "lyd/oppkast2.oga";
            break;
          case 2:
            lyd.fisk.src = "lyd/oppkast3.oga";
            break;
        }
        //spill av spylyd
        if (lyd.på) lyd.fisk.play();
      }
    }
  }

  //tegn alle fisk
  for (let i = 0; i < fisk.length; i++) {
    fisk[i].y -= 8;

    if (sertilvenstre) //fisk kommer ut av nebb
      kontekst.drawImage(tema[temaID].fiskebilde, fisk[i].x - 22, fisk[i].y);
    else kontekst.drawImage(tema[temaID].fiskebilde, fisk[i].x, fisk[i].y);
  }

  if (toSpillere) { //tegn rød spillers fisk
    for (let i = 0; i < rødeFisk.length; i++) {
      rødeFisk[i].y -= 8;
      if (rød.sertilvenstre) //fisk kommer ut av nebb
        kontekst.drawImage(tema[temaID].fiskebilde, rødeFisk[i].x - 22, rødeFisk[i].y);
      else kontekst.drawImage(tema[temaID].fiskebilde, rødeFisk[i].x, rødeFisk[i].y);
    }
  }
}

function tap() { //behandler tap
  if (enterTrykk) {
    startverdier();
    tapt = false;
  }
  tegnMeny();
}

function endreTema() { //endrer tema avhengig av poengsum

  if (poeng < 4000) temaID = 1; //gress
  else if (poeng > 12000) { //is
    temaID = 0;
    if (!musikk.vanskelig) { //spiller av annen musikk på isnivået
      musikk.fil.src = "lyd/musikk_is.oga";
      musikk.vanskelig = true;
    }
  } else if (poeng > 8000) temaID = 3; //fjell
  else if (poeng > 4000) temaID = 2; //ørken
}

function tegnIkoner() { //tegner knapper for å skru av og på lyd og musikk

  //skru av eller på lydeffekter
  if (lyd.på) lyd.bilde.src = "grafikk/lyd_på.png";
  else lyd.bilde.src = "grafikk/lyd_av.png";

  //sjekk om man klikker på lydknappen
  if (lyd.x <= mus.x &&
    lyd.x + lyd.bilde.width >= mus.x &&
    lyd.y <= mus.y &&
    lyd.y + lyd.bilde.height >= mus.y &&
    mus.klikk)
    lyd.på = !lyd.på;

  //tegn lydknapp
  kontekst.drawImage(lyd.bilde, lyd.x, lyd.y);

  //sett musikk på pause hvis man trykker på knappen
  if (musikk.på) musikk.bilde.src = "grafikk/musikk_på.png";
  else musikk.bilde.src = "grafikk/musikk_av.png";

  //sjekk om man klikker på musikknapp
  if (musikk.x <= mus.x &&
    musikk.x + musikk.bilde.width >= mus.x &&
    musikk.y <= mus.y &&
    musikk.y + musikk.bilde.height >= mus.y &&
    mus.klikk)
    musikk.på = !musikk.på;

  //tegn musikknapp
  kontekst.drawImage(musikk.bilde, musikk.x, musikk.y);

  //start/stopp musikk
  if (!musikk.på) musikk.fil.pause();
  if (musikk.på) musikk.fil.play();

  //tegn spørsmålstegnet
  kontekst.drawImage(hjelp.ikon, hjelp.x, hjelp.y);

  //sjekk om man klikker på spørsmålstegnet
  if (hjelp.x <= mus.x &&
    hjelp.x + hjelp.ikon.width >= mus.x &&
    hjelp.y <= mus.y &&
    hjelp.y + hjelp.ikon.height >= mus.y &&
    mus.klikk)
    $("#exampleModalCenter").modal();

  //skru av museklikk for at knappen ikke trykkes mange ganger på en gang
  mus.klikk = false;

  //brukk M- og L-tasten for å skru musikk og lyd av og på
  if (mTrykk) {
    musikk.på = !musikk.på;
    mTrykk = false;
  }
  if (lTrykk) {
    lyd.på = !lyd.på;
    lTrykk = false;
  }
}

function tegnMeny() { //tegner menyen
  menyÅpen = true;

  //tegn bakgrunnen
  kontekst.drawImage(menybakgrunn, kanvas.width / 2 - 176, kanvas.height / 2 - 110)

  if (førsteGang) { //skriv "meny" når man starter spillet
    kontekst.font = "50px Sigmar One";
    kontekst.fillStyle = "#3a76b5";
    kontekst.fillText("Meny", kanvas.width / 2 - 75, kanvas.height / 2 - 50);
  } else {
    if (toSpillere) { //skriv hvem som vant hvis to spiller
      if (blåSeier) {
        kontekst.font = "50px Sigmar One";
        kontekst.fillStyle = "#3a76b5";
        kontekst.fillText("Blå vant", kanvas.width / 2 - 140, kanvas.height / 2 - 50);
      } else {
        kontekst.font = "50px Sigmar One";
        kontekst.fillStyle = "#d72148";
        kontekst.fillText("Rød vant", kanvas.width / 2 - 150, kanvas.height / 2 - 50);
      }
    } else { //skriv opp poengsum hvis bare en spiller
      kontekst.font = "40px Sigmar One";
      kontekst.fillStyle = "#3a76b5";

      //flytt teksten slik at den havner i midten av menyen
      if (poeng < 1000) kontekst.fillText(poeng + " poeng", kanvas.width / 2 - 120, kanvas.height / 2 - 50);
      else if (poeng < 10000) kontekst.fillText(poeng + " poeng", kanvas.width / 2 - 130, kanvas.height / 2 - 50);
      else kontekst.fillText(poeng + " poeng", kanvas.width / 2 - 145, kanvas.height / 2 - 50);
    }
  }

  //sjekk om mus er ani menyen og hvilket menyelement
  if (mus.x > kanvas.width / 2 - 176 &&
    mus.x < kanvas.width / 2 - 176 + menybakgrunn.width) {
    if (mus.y > kanvas.height / 2 - 30 && mus.y < kanvas.height / 2 - 4) { // en spiller
      kontekst.drawImage(menyvalg, kanvas.width / 2 - 100, kanvas.height / 2 - 27)
      if (mus.klikk) { //forbered for enkeltspiller
        document.getElementById("spillKanvas").setAttribute("width", "480");
        toSpillere = false;
        startverdier();
        tapt = false;
      }
    } else if (mus.y > kanvas.height / 2 && mus.y < kanvas.height / 2 + 20) { //to spillere
      kontekst.drawImage(menyvalg, kanvas.width / 2 - 100, kanvas.height / 2 - 2)
      if (mus.klikk) { //forbered for flerspiller
        document.getElementById("spillKanvas").setAttribute("width", "960");
        toSpillere = true;
        startverdier();
        tapt = false;
      }
    } else if (mus.y > kanvas.height / 2 + 25 && mus.y < kanvas.height / 2 + 45) { //hvordan spille
      kontekst.drawImage(menyvalg, kanvas.width / 2 - 100, kanvas.height / 2 + 23)
      if (mus.klikk) { //åpne hvordan spille
        $("#exampleModalCenter").modal();
      }
    } else if (mus.y > kanvas.height / 2 + 50 && mus.y < kanvas.height / 2 + 70) { //avslutt
      kontekst.drawImage(menyvalg, kanvas.width / 2 - 100, kanvas.height / 2 + 49)
      if (mus.klikk) { //gå tilbake til forsiden
        window.location = "../index.html";
      }
    }
  }

  //skriv opp menyelementene
  kontekst.font = "20px Sigmar One";
  kontekst.fillStyle = "#3a76b5";
  kontekst.fillText("1 Spiller", kanvas.width / 2 - 50, kanvas.height / 2 - 10);
  kontekst.fillText("2 Spillere", kanvas.width / 2 - 60, kanvas.height / 2 + 15);
  kontekst.fillText("Hvordan spille", kanvas.width / 2 - 90, kanvas.height / 2 + 40);
  kontekst.fillText("Avslutt", kanvas.width / 2 - 45, kanvas.height / 2 + 65);
}

function tegn() { //kjører alle funksjonene
  tegnBakgrunn();
  tyngdeKraft();
  tegnPlattformer();
  if (!tapt) kollisjonDeteksjon();
  if (!rød.tapt && toSpillere) rødKollisjonDeteksjon();
  tegnFisk();
  tegnPingvin();
  if (toSpillere) tegnRødPingvin();
  tegnIstapp();
  endreTema();

  if (tapt || rød.tapt) tap();
  if (!tapt && !rød.tapt) menyÅpen = false;
  tegnPoeng();
  tegnIkoner();

  //si til nettleser at vi vil tegne neste bilde
  requestAnimationFrame(tegn);
}

//hindre blaing med piltast og mellomrom
window.addEventListener("keydown",
  function(e) {
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
    }
  }, false
);

//lytter etter tastetrykk
document.addEventListener("keydown", tasteTrykk, false);
document.addEventListener("keyup", tasteSlipp, false);

//lytter om musen beveges eller klikkes
document.addEventListener("mousemove", musepos);
document.addEventListener("click", museklikk, false);

//henter museklikk
function museklikk(e) {
  mus.klikk = true;
}

//henter musens posisjon
function musepos(e) {
  var rekt = kanvas.getBoundingClientRect();
  mus = {
    x: (e.clientX - rekt.x) / rekt.width * kanvas.width,
    y: (e.clientY - rekt.y) / rekt.height * kanvas.height
  };
}

//henter tastetrykk
function tasteTrykk(e) {
  if (e.keyCode == 39) høyreTrykk = true;
  else if (e.keyCode == 13) enterTrykk = true;
  else if (e.keyCode == 37) venstreTrykk = true;
  else if (e.keyCode == 32) mellomromTrykk = true;
  else if (e.keyCode == 38) oppTrykk = true;
  else if (e.keyCode == 77) mTrykk = true;
  else if (e.keyCode == 76) lTrykk = true;
  else if (e.keyCode == 65) aTrykk = true;
  else if (e.keyCode == 87) wTrykk = true;
  else if (e.keyCode == 68) dTrykk = true;
}

//henter tasteslipp
function tasteSlipp(e) {
  if (e.keyCode == 39) høyreTrykk = false;
  else if (e.keyCode == 37) venstreTrykk = false;
  else if (e.keyCode == 13) enterTrykk = false;
  else if (e.keyCode == 32) mellomromTrykk = false;
  else if (e.keyCode == 38) oppTrykk = false;
  else if (e.keyCode == 77) mTrykk = false;
  else if (e.keyCode == 76) lTrykk = false;
  else if (e.keyCode == 65) aTrykk = false;
  else if (e.keyCode == 87) wTrykk = false;
  else if (e.keyCode == 68) dTrykk = false;
}

//spiller musikk i løkke
musikk.fil.addEventListener("ended", function() {
  this.currentTime = 0;
  if (lyd.på) this.play();
}, false);
musikk.fil.play();

//kjør hovedfunksjon
tegn();
