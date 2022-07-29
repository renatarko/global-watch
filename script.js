const select = document.querySelector("#select-city");
const button = document.querySelector("#btn-sub");
const p = document.querySelector(".city");

const arrFuso = [];

const start = async () => {
  const url = "http://worldtimeapi.org/api/timezone";
  const response = await fetch(url);
  const data = await response.json();

  const arr = data.map((item) => {
    return item;
  });

  arrFuso.push(...arr);

  createListCitys();
};

start();
button.addEventListener("submit", start);

function createListCitys() {
  arrFuso.forEach((element) => {
    const option = document.createElement("option");

    option.innerHTML = element;
    select.appendChild(option);
  });
}
