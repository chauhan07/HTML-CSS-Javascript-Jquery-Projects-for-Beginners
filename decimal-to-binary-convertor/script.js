let convertFun = document.getElementById("convert")
let reset = document.getElementById("reset")
let getNumber = document.getElementById("getNumber")
let conNum, binaryNumber, checkCond, i;
convertFun.addEventListener("click", dec2bin);
reset.addEventListener("click", function() {
  getNumber.value = '';
  document.getElementById("showResult").innerHTML = "";
});

function dec2bin() {
  if (getNumber.value == "") {
    document.querySelector(".errorShow").style.display = "block";
  } else {
    document.querySelector(".errorShow").style.display = "none";
    checkCond = getNumber.value;
    conNum = '';
    binaryNumber = '';
    do {
      conNum += checkCond % 2;
      checkCond = Math.floor(checkCond / 2);
    }
    while (checkCond > 0);
    console.log(conNum)

    for (i = conNum.length - 1; i >= 0; i--) {
      binaryNumber += conNum.charAt(i);
    }
    console.log(binaryNumber)
    document.getElementById("showResult").innerHTML = binaryNumber;
  }
}