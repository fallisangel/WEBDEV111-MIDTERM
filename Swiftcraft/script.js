
var cardName   = document.getElementById("card-name");
var cardNumber = document.getElementById("card-number");
var cardExpiry = document.getElementById("card-expiry");
var cardCvv    = document.getElementById("card-cvv");
var errorMsg   = document.getElementById("error-msg");


function placeOrder() {


    var name   = cardName.value;
    var number = cardNumber.value;
    var expiry = cardExpiry.value;
    var cvv    = cardCvv.value;


    if (name == "" || number == "" || expiry == "" || cvv == "") {
        errorMsg.style.display = "block";
        return;
    }


    errorMsg.style.display = "none";

    var randomNum = Math.floor(Math.random() * 900000) + 100000;
    var orderNum  = "SC-" + randomNum;


    document.getElementById("order-num").textContent = "Order #" + orderNum;


    document.getElementById("step2").className = "step done";
    document.getElementById("step2").querySelector(".step-num").textContent = "✓";
    document.getElementById("step3").className = "step active";
    document.getElementById("checkout-form-section").style.display = "none";
    document.getElementById("summary-section").style.display = "none";
    document.getElementById("confirmation").style.display = "block";

}