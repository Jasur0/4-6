const tabsItem = document.querySelectorAll(".tabsItem");
const tabsContent = document.querySelectorAll(".tabsContentItem ");

for (let i = 0; i < tabsItem.length; i++) {
  tabsItem[i].addEventListener("click", function () {
    for (let j = 0; j < tabsItem.length; j++) {
      tabsItem[j].classList.remove("active");
      tabsContent[j].classList.remove("active");
    }
    tabsItem[i].classList.add("active");
    tabsContent[i].classList.add("active");
  });
}

// soat

const s = document.querySelector(".s");
const m = document.querySelector(".m");
const h = document.querySelector(".h");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");

function soat() {
  let time = new Date();
  let sec = time.getSeconds() * 6;
  let min = time.getMinutes() * 6;
  let hour = time.getHours() * 30;

  s.style = `transform:rotate(${sec}deg);`;
  m.style = `transform:rotate(${min}deg);`;
  h.style = `transform:rotate(${hour}deg);`;

  hours.innerHTML =
    time.getHours() < 10 ? "0" + time.getHours() : time.getHours();
  minutes.innerHTML =
    time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();
  setTimeout(() => {
    soat();
  }, 1000);
}
soat();

// secundamer

const stopwatch__btn = document.querySelector(".stopwatch__btn");
const stopwatch__seconds = document.querySelector(".stopwatch__seconds");
const stopwatch__minutes = document.querySelector(".stopwatch__minutes");
const stopwatch__hours = document.querySelector(".stopwatch__hours");
const stopwatch__del = document.querySelector(".stopwatch__del");

stopwatch__btn.addEventListener("click", function () {
  if (stopwatch__btn.innerHTML == "start") {
    stopwatch__btn.innerHTML = "STOP";
  } else if (stopwatch__btn.innerHTML == "STOP") {
    stopwatch__btn.innerHTML = "start";
  }
  function secundamer() {
    if (stopwatch__btn.innerHTML == "STOP") {
      setTimeout(() => {
        stopwatch__seconds.innerHTML = Number(stopwatch__seconds.innerHTML) + 1;
        if (stopwatch__seconds.innerHTML == 60) {
          stopwatch__minutes.innerHTML =
            Number(stopwatch__minutes.innerHTML) + 1;
          stopwatch__seconds.innerHTML = 0;
        } else if (stopwatch__minutes.innerHTML == 60) {
          stopwatch__hours.innerHTML = Number(stopwatch__hours.innerHTML) + 1;
          stopwatch__minutes.innerHTML = 0;
        }
        secundamer();
      }, 1000);
    }
  }
  secundamer();
  if (
    stopwatch__seconds.innerHTML > 0 ||
    stopwatch__minutes.innerHTML > 0 ||
    stopwatch__hours.innerHTML > 0
  ) {
    stopwatch__del.classList.remove("none");
  }
  stopwatch__del.addEventListener("click", function () {
    stopwatch__seconds.innerHTML = 0;
    stopwatch__minutes.innerHTML = 0;
    stopwatch__hours.innerHTML = 0;
    stopwatch__del.classList.add("none");
  });
});

// calculator

const result = document.querySelector(".result p");
const numbers = document.querySelectorAll(".numbers");
const signs = document.querySelectorAll(".sign");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".clear");
const negative = document.querySelector(".negative");
const percent = document.querySelector(".percent");

let firstValue = "";
let isFristValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;

for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener("click", (e) => {
    let atr = e.target.getAttribute("value");
    if (isFristValue === false) {
      getFirstValue(atr);
    }
    if (isSecondValue == false) {
      getSecondValue(atr);
    }
  });
}

function getFirstValue(el) {
  result.innerHTML = "";
  firstValue += el;
  result.innerHTML = firstValue;
  firstValue = +firstValue;
}

function getSecondValue(el) {
  if (firstValue != "" && sign != "") {
    secondValue += el;
    result.innerHTML = secondValue;
    secondValue = +secondValue;
  }
}

function getSign() {
  for (let i = 0; i < signs.length; i++) {
    signs[i].addEventListener("click", (e) => {
      sign = e.target.getAttribute("value");
      isFristValue = true;
    });
  }
}

getSign();

equals.addEventListener("click", () => {
  result.innerHTML = "";

  if (sign === "+") {
    resultValue = firstValue + secondValue;
  } else if (sign === "-") {
    resultValue = firstValue - secondValue;
  } else if (sign === "*") {
    resultValue = firstValue * secondValue;
  } else if (sign === "/") {
    resultValue = firstValue / secondValue;
  }

  result.innerHTML = resultValue;
  firstValue = resultValue;
  secondValue = "";

  checkResultLength();
});

function checkResultLength() {
  resultValue = JSON.stringify(resultValue);

  if (resultValue.length >= 8) {
    resultValue = JSON.parse(resultValue);
    result.innerHTML = resultValue.toFixed(5);
  }
}

negative.addEventListener("click", () => {
  result.innerHTML = "";

  if (firstValue != "") {
    resultValue = -firstValue;
    firstValue = resultValue;
  }

  result.innerHTML = resultValue;
});

percent.addEventListener("click", () => {
  result.innerHTML = "";

  if (firstValue != "") {
    resultValue = firstValue / 100;
    firstValue = resultValue;
  }

  if (firstValue != "" && secondValue != "" && sign != "") {
    resultValue = resultValue / 100;
  }

  result.innerHTML = resultValue;
});

clear.addEventListener("click", () => {
  result.innerHTML = "";

  firstValue = "";
  isFristValue = false;
  secondValue = "";
  isSecondValue = false;
  sign = "";
  resultValue = 0;
});
