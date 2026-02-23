function add(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculate() {
  const val = document.getElementById("display").value;
  document.getElementById("display").value = eval(val);
}