
function signup() { //確保同email不重複申請帳號
    const signupUsernameElement = document.getElementsByName("signupUsername");
    const signupUsername = signupUsernameElement[0].value;
    const signupEnailElement = document.getElementsByName("signupEnail");
    const signupEnail = signupEnailElement[0].value;
    const signupPasswordElement = document.getElementsByName("signupPassword");
    const signupPassword = signupPasswordElement[0].value;
    let req_account = new XMLHttpRequest();
    let search_url = "/api/user";
    var data = {}
    data.name = signupUsername
    data.email = signupEnail
    data.password = signupPassword
    req_account.open("post", search_url, true);
    req_account.setRequestHeader("Content-type", "application/json");
    signupdata = JSON.stringify(data)
    req_account.onload = function () {
        let contextArea = JSON.parse(req_account.responseText);
        console.log(contextArea);
        if (contextArea["ok"] == true) {
            let box = document.getElementById("signupMessage");
            box.textContent = "註冊完畢了，來試試看登入一下吧"
        } else if (contextArea["error"] == true) {
            alert("已註冊帳號")
            let box = document.getElementById("signupMessage");
            box.textContent = "此信箱已經註冊過了喔，先試試看登入一下吧"
        }
    }
    req_account.send(signupdata)
};
function signin() { //先攔截錯誤帳號密碼
    const signinEmailElement = document.getElementsByName("signinEmail");
    const signinEmail = signinEmailElement[0].value;
    const signinPWElement = document.getElementsByName("signinPassword");
    const signinPW = signinPWElement[0].value;
    let req_account = new XMLHttpRequest();
    let search_url = "/api/user";
    var data = {}
    data.email = signinEmail
    data.password = signinPW
    console.log(data)
    req_account.open("post", search_url, true);
    req_account.setRequestHeader("Content-type", "application/json");
    signindata = JSON.stringify(data)
    console.log(signindata)
    req_account.onload = function () {
        let contextArea = JSON.parse(req_account.responseText);
        console.log(contextArea);
        if (contextArea["error"] == true) {
            let box = document.getElementById("signinMessage");
            box.textContent = "帳號或密碼出現錯誤,請再仔細想想"
        } else if (contextArea["error"] != true) {
            let box = document.getElementById("signinMessage");
            box.textContent = "歡迎回來，稍後將為您跳轉回首頁"
            function JUMP() {
                document.getElementById("A_signin").submit()
            }
            window.setTimeout(JUMP, 2000);
        }
    }
    req_account.send(signindata)
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