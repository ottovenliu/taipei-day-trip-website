function getBookingData() {
    let signstatus = "check"
    let req_account = new XMLHttpRequest();
    let search_url = "/api/user?signstatus=" + signstatus;
    req_account.open("get", search_url);
    req_account.onload = function () {
        let contextArea = JSON.parse(req_account.responseText);
        if (contextArea["data"] == "null") {
            location.href = "/";
        }
        else {
            let name = contextArea["data"]["name"]
            let databox = {}
            databox.username = name
            databox.action = "check"
            let Req_account = new XMLHttpRequest();
            let booking_url = "/api/booking";
            Req_account.open("post", booking_url, true);
            Req_account.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
            Req_account.onload = function () {
                let contextArea = JSON.parse(Req_account.responseText);
                console.log(contextArea)
            }
            Req_account.send(JSON.stringify(databox))
        }
    }
    req_account.send()
};
getBookingData();