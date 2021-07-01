var character = document.getElementById("character");
var car1 = document.getElementById("car1");
var car2 = document.getElementById("car2");
var car3 = document.getElementById("car3");
var car4 = document.getElementById("car4");
var car5 = document.getElementById("car5");
var counter = 0;
let posTop = 150;
let posRight = 0;
let step = 30;

var el = document.getElementById("swipezone");
swipedetect(el, function (swipedir) {
  swipedir = "";
});

window.addEventListener("keydown", moveplayer);

function moveplayer(e) {
  console.log(e);
  switch (e.keyCode) {
    //LEFT
    case 37:
      if (posRight <= -30) {
        posRight += step;
        character.style.right = posRight + "px";
      }
      break;
    //UP
    case 38:
      if (posTop >= 30) {
        posTop -= step;
        character.style.top = posTop + "px";
      }
      break;
    //RIGHT
    case 39:
      posRight -= step;
      character.style.right = posRight + "px";
      break;
    //DOWN
    case 40:
      if (posTop <= 300) {
        posTop += step;
        character.style.top = posTop + "px";
      }
      break;
  }
}

function swipedetect(el, callback) {
  var touchsurface = el,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 100, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function (swipedir) {};

  window.addEventListener(
    "touchstart",
    function (e) {
      var touchobj = e.changedTouches[0];
      swipedir = "none";
      console.log("RIGHT MOVE");
      dist = 0;
      startX = touchobj.pageX;
      startY = touchobj.pageY;
      startTime = new Date().getTime(); // record time when finger first makes contact with surface
      e.preventDefault();
    },
    false
  );

  window.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault(); // prevent scrolling when inside DIV
    },
    false
  );

  window.addEventListener(
    "touchend",
    function (e) {
      var touchobj = e.changedTouches[0];
      distX = touchobj.pageX - startX; // get horizontal dist traveled by finger while in contact with surface
      distY = touchobj.pageY - startY; // get vertical dist traveled by finger while in contact with surface
      elapsedTime = new Date().getTime() - startTime; // get time elapsed
      if (elapsedTime <= allowedTime) {
        // first condition for awipe met
        if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
          // 2nd condition for horizontal swipe met
          swipedir = distX < 0 ? "left" : "right"; // if dist traveled is negative, it indicates left swipe
        } else if (
          Math.abs(distY) >= threshold &&
          Math.abs(distX) <= restraint
        ) {
          // 2nd condition for vertical swipe met
          swipedir = distY < 0 ? "up" : "down"; // if dist traveled is negative, it indicates up swipe
        }
      }
      handleswipe(swipedir);

      switch (swipedir) {
        //LEFT
        case "left":
          if (posRight <= -30) {
            posRight += step;
            character.style.right = posRight + "px";
          }
          break;
        //UP
        case "up":
          if (posTop >= 30) {
            posTop -= step;
            character.style.top = posTop + "px";
          }
          break;
        //RIGHT
        case "right":
          posRight -= step;
          character.style.right = posRight + "px";
          break;
        //DOWN
        case "down":
          if (posTop <= 300) {
            posTop += step;
            character.style.top = posTop + "px";
          }
          break;
      }

      e.preventDefault();
    },
    false
  );
}

function randomcar() {
  return "car" + Math.floor(Math.random() * 5 + 1) + ".png";
}

function randomspeed() {
  return Math.floor(Math.random() * 5 + 5);
}

function checkcollision(car, skew) {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let characterLeft = parseInt(
    window.getComputedStyle(character).getPropertyValue("left")
  );
  let characterWidth = parseInt(
    window.getComputedStyle(character).getPropertyValue("width")
  );
  let characterHeight = parseInt(
    window.getComputedStyle(character).getPropertyValue("height")
  );
  let carLeft = parseInt(window.getComputedStyle(car).getPropertyValue("left"));
  let carTop = parseInt(window.getComputedStyle(car).getPropertyValue("top"));
  let carWidth = parseInt(
    window.getComputedStyle(car).getPropertyValue("width")
  );
  let carHeight = parseInt(
    window.getComputedStyle(car).getPropertyValue("height")
  );

  if (characterLeft > 750) {
    character.style.left = "0px";
    location.reload();
    alert("YOU WIN");
  }
  if (
    characterTop + characterHeight >= carTop + skew &&
    characterTop <= carTop + skew + carHeight &&
    characterLeft + characterWidth >= carLeft &&
    characterLeft <= carLeft + carWidth
  ) {
    return true;
  }
}
var checkDead = setInterval(function () {
  let c1top = parseInt(window.getComputedStyle(car1).getPropertyValue("top"));
  let c2top = parseInt(window.getComputedStyle(car2).getPropertyValue("top"));
  let c3top = parseInt(window.getComputedStyle(car3).getPropertyValue("top"));
  let c4top = parseInt(window.getComputedStyle(car4).getPropertyValue("top"));
  let c5top = parseInt(window.getComputedStyle(car5).getPropertyValue("top"));

  if (c1top <= -178) {
    car1.style.backgroundImage = "url('images/" + randomcar() + "')";
  }
  if (c2top <= -278) {
    car2.style.backgroundImage = "url('images/" + randomcar() + "')";
  }
  if (c3top <= -408) {
    car3.style.backgroundImage = "url('images/" + randomcar() + "')";
  }
  if (c4top <= -178 - 140 - 190) {
    car4.style.backgroundImage = "url('images/" + randomcar() + "')";
  }
  if (c5top <= -178 - 120 - 150 - 200) {
    car5.style.backgroundImage = "url('images/" + randomcar() + "')";
  }

  if (
    checkcollision(car1, 60) ||
    checkcollision(car2, 180) ||
    checkcollision(car3, 300) ||
    checkcollision(car4, 420) ||
    checkcollision(car5, 540)
  ) {
    location.reload();
    alert("YOU LOST");
  }
}, 100);
