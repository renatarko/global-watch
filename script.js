const form = document.querySelector("#form");
const select = document.querySelector("#city");
const button = document.querySelector("#btn-sub");
const listOfCloks = document.querySelector(".listOfCloks");

const arrFuso = [];
const arrayOfCards = [];
const arrayCardAppended = [];

const start = async () => {
  const url = "http://worldtimeapi.org/api/timezone";
  const response = await fetch(url);
  const data = await response.json();

  arrFuso.push(...data);

  createListTimezone();
};

function createListTimezone() {
  arrFuso.forEach((element) => {
    const option = document.createElement("option");
    option.setAttribute("value", element);

    option.innerHTML = element;

    select.appendChild(option);
  });
}

// add nova chamada a api para carregar a datetime
async function createClock(event) {
  event.preventDefault();

  const city = select.options[select.selectedIndex].value;

  if (!city) return;

  const urlTime = `http://worldtimeapi.org/api/timezone/${city}`;

  const res = await fetch(urlTime);
  const data = await res.json();
  console.log({ data });

  options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: city,
    hour12: false,
  };

  //console.log(data.datetime);
  const horaFormatada = new Intl.DateTimeFormat("en-US", options).format(
    new Date(data.datetime)
  );

  const alreadyExistTheCity = arrayOfCards.some(
    (element) => element.city === city
  );
  console.log({ alreadyExistTheCity });
  if (alreadyExistTheCity) {
    return;
  }

  arrayOfCards.push({
    city: city,
    time: horaFormatada,
    datetime: data.datetime,
  });

  listOfCloks.innerHTML = "";

  arrayCardAppended.length = 0;
  arrayOfCards.forEach((item) => {
    const c = createCard(item);
    arrayCardAppended.push(c);
  });

  arrayCardAppended.forEach((element) => {
    listOfCloks.appendChild(element);
  });

  console.log({ arrayOfCards });
  console.log({ arrayCardAppended });

  // percorrer o array e para cada cidade criar um card
}

function createCard(item) {
  const card = document.createElement("div");
  card.classList.add("card");

  const time = document.createElement("span");
  time.classList.add("time");

  const button = document.createElement("button");
  button.classList.add("btn-close");

  console.log("oi item", { item });
  button.addEventListener("click", (e) => {
    console.log("vou remover = ", item);
    const novoArr = arrayOfCards.filter((i) => i.city !== item.city);
    console.log({ novoArr });
    arrayOfCards.length = 0;
    arrayCardAppended.length = 0;
    arrayOfCards.push(...novoArr);
    arrayOfCards.forEach((item) => {
      const c = createCard(item);
      arrayCardAppended.push(c);
    });
    listOfCloks.innerHTML = "";

    arrayCardAppended.forEach((element) => {
      listOfCloks.appendChild(element);
    });
  });

  const p = document.createElement("p");
  p.classList.add("city");

  time.innerHTML = item.time;
  p.innerHTML = item.city;
  button.innerHTML = "X";

  card.append(time);
  card.append(button);
  card.append(p);
  return card;
}

window.addEventListener("load", start);
form.addEventListener("submit", createClock);

setInterval(() => {
  // arrayCardAppended.forEach((element) => {
  //   const span = element.childNodes[0];
  //   console.log(span.innerHTML);
  //   const dt = new Date()
  //   dt.setHours = span.innerHTML
  //   const nd = Date.now();
  //   console.log(nd);
  //   // console.log({ t });
  // });

  arrayOfCards.forEach((element) => {
    console.log(element.datetime);
    const d = new Date(element.datetime);
    console.log(d.getSeconds());
    d.setSeconds(d.getSeconds() + 1);
    console.log(d);
    element.datetime = d;
    const horaFormatada = new Intl.DateTimeFormat("en-US", options).format(d);
    console.log(horaFormatada);
    console.log({ arrayCardAppended });
    const c = arrayCardAppended.find(
      (e) => e.childNodes[2].innerHTML === element.city
    );
    c.childNodes[0].innerHTML = horaFormatada;

    // arrayCardAppended.forEach((card) => {
    //   const span = card.childNodes[0];
    //   console.log(span);
    //   span.innerHTML = horaFormatada;
    // });
  });
}, 1000);
