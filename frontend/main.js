const apiUrl = "http://127.0.0.1:8000/home";

async function homeData() {
  const response = await fetch(apiUrl);
  const data = await response.json();

  console.log(data);
  printData(data.map());
}
function printData(data) {
  const cont = document.querySelector("#cont");
  const haeder = document.querySelector("#haeder");

  haeder.innerHTML += `
  <h1>hi</h1>
  ${data} `;

  console.log(haeder);
}

homeData();
