let dropDowns = document.querySelectorAll(".country");
let img = document.querySelector("flag");
let inpt = document.querySelector(".amount");
let btn = document.querySelector("button");
let message = document.querySelector("h4");

for (let select of dropDowns) {
  for (currCode in countryList) {
    let newOpt = document.createElement("option");
    newOpt.innerText = currCode;
    newOpt.value = currCode;
    if (select.name === "From" && currCode === "USD") {
      newOpt.selected = "selected";
    } else if (select.name === "TO" && currCode === "PKR") {
      newOpt.selected = "selected";
    }
    select.append(newOpt);
  }
  select.addEventListener("change", (evt) => {
    flagChange(evt.target);
  });
}
let flagChange = (event) => {
  let currCode = event.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = event.parentElement.querySelector("img");
  img.src = newSrc;
};
console.log(dropDowns[1].value);
btn.addEventListener("click", (evt) => {
  axios
    .get(
      `https://v6.exchangerate-api.com/v6/0d831608c08a5f17138b1401/latest/${dropDowns[0].value}`
    )
    .then(function (response) {
      if (inpt.value === "" || inpt.value < 1) {
        inpt.value = "1";
      }
      let convRates = response.data.conversion_rates;
      let forr = convRates[dropDowns[1].value];
      let finalAm = Number(inpt.value) * Number(forr);
      let msg =
        (message.innerHTML = `${inpt.value} ${dropDowns[0].value}=${finalAm} ${dropDowns[1].value}`);
    })
    .catch(function (error) {
      console.log(error);
    });
});
