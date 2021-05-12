
function signup() { //確保同email不重複申請帳號
    const signupUsernameElement = document.getElementsByName("signupUsername");
    const signupUsername = signupUsernameElement[0].value;
    let req_account = new XMLHttpRequest();
    let search_url = "/api/user?signup_account=" + signupUsername;
    req_account.open("get", search_url);
    req_account.onload = function () {
        let contextArea = JSON.parse(req_account.responseText);
        console.log(contextArea);
        if (contextArea["data"] == "null") {
            document.getElementById("A_signup").submit()
        } else {
            alert("已註冊帳號")
            let box = document.getElementById("signupMessage");
            box.textContent = "此信箱已經註冊過了喔，先試試看登入一下吧"
        }
    }
    req_account.send()
};
function signin() { //先攔截錯誤帳號密碼
    const signinUsernameElement = document.getElementsByName("signinEmail");
    const signinUsername = signinUsernameElement[0].value;
    const signinPWElement = document.getElementsByName("signinPassword");
    const signinPW = signinPWElement[0].value;
    let req_account = new XMLHttpRequest();
    let search_url = "/api/user?signin_account=" + signinUsername;
    req_account.open("get", search_url);
    req_account.onload = function () {
        let contextArea = JSON.parse(req_account.responseText);
        console.log(contextArea);
        if (contextArea["data"] == "null") {
            let box = document.getElementById("signinMessage");
            box.textContent = "帳號或密碼出現錯誤,請再仔細想想"
        } else if (contextArea["data"]["password"] != signinPW) {
            alert("帳號密碼錯誤")
            let box = document.getElementById("signinMessage");
            box.textContent = "帳號或密碼出現錯誤,請再仔細想想"
        } else {
            document.getElementById("A_signin").submit()
        }
    }
    req_account.send()
};
function signstatus() {
    let signstatus = "check"
    let req_account = new XMLHttpRequest();
    let search_url = "/api/user?signstatus=" + signstatus;
    req_account.open("get", search_url);
    req_account.onload = function () {
        let contextArea = JSON.parse(req_account.responseText);
        console.log(contextArea);
        if (contextArea["data"] != "null") {
            let box = document.getElementById("singnboxBTN");
            box.textContent = "登出"
            box.onclick = function () { location.href = "/A_signout" }
        }
    }
    req_account.send()

};
signstatus();