document.querySelector("#orderNumberbox > p").innerHTML = document.location.search.split("=")[1]
"2021052944"
function orderstatus() {
    let signstatus = "check"
    let req_account = new XMLHttpRequest();
    let search_url = "/api/user?signstatus=" + signstatus;
    req_account.open("get", search_url);
    req_account.send(null)
    req_account.onload = function () {
        let contextArea = JSON.parse(req_account.responseText);
        if (contextArea["data"] != "null") {
            let box = document.getElementById("singnboxBTN");
            box.textContent = "登出"
            document.querySelector("#usernamebox > p").innerText = contextArea["data"]["name"]
            box.onclick = function () { location.href = "/A_signout" }
            document.querySelector("#thankyouMessagebox > div.goHome > p").onclick = function () { location.href = "/" }
        }
    }
};
orderstatus();