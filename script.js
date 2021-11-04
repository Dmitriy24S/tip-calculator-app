const bill = document.getElementById("bill");
const tipButtons = document.querySelectorAll(".tip-btn");
const customTip = document.getElementById("custom-tip");
const peopleNumber = document.getElementById("people-number");
const resetBtn = document.querySelector(".reset-btn");
const tipPerPerson = document.getElementById("tip");
const totalPerPerson = document.getElementById("total");

let selectedTipPercent;
let selectedNumberOfPeople;
let billValue;
let errorText;

// Bill input
bill.addEventListener("input", (e) => {
  billValue = parseInt(e.target.value);
  calculate(billValue, selectedNumberOfPeople, selectedTipPercent);
});

// Tip % buttons
tipButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    // reset previous active btn
    tipButtons.forEach((btn) => {
      btn.classList.remove("active");
    });
    customTip.value = null;
    btn.classList.add("active");
    selectedTipPercent = parseInt(btn.innerText);
    calculate(billValue, selectedNumberOfPeople, selectedTipPercent);
  });
});

// Custom tip % input
customTip.addEventListener("input", (e) => {
  selectedTipPercent = parseInt(e.target.value);
  // reset previous active btn
  tipButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
  calculate(billValue, selectedNumberOfPeople, selectedTipPercent);
});

// Number of people input
peopleNumber.addEventListener("input", (e) => {
  selectedNumberOfPeople = parseInt(e.target.value);
  if (selectedNumberOfPeople < 1) {
    if (!errorText) {
      let errorMsg = `Can't be zero`;
      let tag = document.createElement("p");
      let text = document.createTextNode(errorMsg);
      tag.appendChild(text);
      tag.classList.add("error-msg");
      peopleNumber.classList.add("error");
      const peopleSection = document.querySelector(".people-section");
      peopleSection.appendChild(tag);
      errorText = document.querySelector(".error-msg");
    }
  }
  if (selectedNumberOfPeople > 0) {
    peopleNumber.classList.remove("error");
    if (errorText) {
      errorText.remove();
    }
  }
  calculate(billValue, selectedNumberOfPeople, selectedTipPercent);
});

// Reset button
resetBtn.addEventListener("click", () => {
  //  reset stored values
  selectedTipPercent = NaN;
  selectedNumberOfPeople = NaN;
  billValue = NaN;
  //  reset html values
  peopleNumber.value = null;
  bill.value = null;
  customTip.value = null;
  tipPerPerson.innerText = "$0.00";
  totalPerPerson.innerText = "$0.00";
  //   remove active css style
  tipButtons.forEach((btn) => {
    btn.classList.remove("active");
  });
  peopleNumber.classList.remove("error");
  if (errorText) {
    errorText.remove();
    errorText = null;
  }
  resetBtn.classList.remove("active-reset");
});

// Calculate tip
function calculate(bill, numPeople, tipPercent) {
  // let totalTipAmount = Math.round(bill * (tipPercent / 100) * 1e2) / 1e2;
  // let tipPerson = Math.round((totalTipAmount / numPeople) * 1e2) / 1e2;
  // let totalPerson = Math.round((bill / numPeople + tipPerson) * 1e2) / 1e2;
  let totalTipAmount = bill * (tipPercent / 100);
  let tipPerson = totalTipAmount / numPeople;
  let totalPerson = bill / numPeople + tipPerson;
  //   if all values are filled in display tip amount
  if (!isNaN(tipPerson) && !isNaN(totalPerson) && numPeople > 0) {
    tipPerPerson.innerText = `$${tipPerson.toFixed(2)}`;
    totalPerPerson.innerText = `$${totalPerson.toFixed(2)}`;
  }
  if (numPeople < 1) {
    tipPerPerson.innerText = "$0.00";
    totalPerPerson.innerText = "$0.00";
  }
  resetBtn.classList.add("active-reset");
}
