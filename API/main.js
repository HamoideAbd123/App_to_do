const api = "https://dragonball-api.com"
const api2 = "https://vpic.nhtsa.dot.gov/api/";

async function dragon () {

  const res = await fetch (api)
  const data = await res.json();

  console.log(data)
}

dragon()