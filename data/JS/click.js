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
function booking() {
    let signstatus = "check"
    let req_account = new XMLHttpRequest();
    let search_url = "/api/user?signstatus=" + signstatus;
    req_account.open("get", search_url);
    req_account.send()
    req_account.onload = function () {
        let contextArea = JSON.parse(req_account.responseText);
        if (contextArea["data"] == "null") {
            showsignbox();
        }
        else {
            if (document.getElementById("bookingBTM") == null) {
                location.href = "/booking"
            }
            else {
                var name = contextArea["data"]["name"]
                if (document.getElementsByName("date")[0].value == "") {
                    alert("請選擇任意一日期");
                }
                else if (document.getElementById("noon").checked == false && document.getElementById("afternoon").checked == false) {
                    alert("請選擇任意一時段");
                }
                else {
                    const booking_attraction = document.getElementById("attractionName").innerHTML;
                    const booking_date = document.getElementsByName("date")[0].value;
                    let booking_time = "noon"
                    if (document.getElementById("noon").checked == true) {
                        booking_time = "noon";
                    }
                    else {
                        booking_time = "afternoon";
                    };
                    let databox = {}
                    databox.username = name
                    databox.booking_attraction_id = document.location.pathname.split("/")[2]
                    databox.booking_attraction = booking_attraction
                    databox.booking_date = booking_date
                    databox.booking_time = booking_time
                    databox.action = "insert"
                    let Req_account = new XMLHttpRequest();
                    let booking_url = "/api/booking";
                    Req_account.open("post", booking_url, true);
                    Req_account.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
                    Req_account.onload = function () {
                        location.href = "/booking"
                    }
                    Req_account.send(JSON.stringify(databox))
                }
            }
        }
    }
}
function gohomepage() {
    location.href = "/"
}

