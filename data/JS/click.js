function noonselect() {
    document.getElementById("pay").textContent = "新台幣 2,000 元"
}
function afternoonselect() {
    document.getElementById("pay").textContent = "新台幣 2,500 元"
}
function showsignUpInfo() {
    document.getElementById("signupInfobox").style.display = "block"
    document.getElementById("signinInfobox").style.display = "none"
}
function showsignInInfo() {
    document.getElementById("signupInfobox").style.display = "none"
    document.getElementById("signinInfobox").style.display = "block"
}
function closesignbox() {
    document.getElementById("signBox").style.display = "none"
    document.getElementById("signBackground").style.display = "none"
}
function showsignbox() {
    document.getElementById("signBox").style.display = "block"
    document.getElementById("signBackground").style.display = "block"
}