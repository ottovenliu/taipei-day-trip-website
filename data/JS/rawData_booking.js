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
            document.querySelector("#username").innerText = name
            let action = "check"
            let Req_account = new XMLHttpRequest();
            let booking_url = "/api/booking?bookingstatus=" + action;
            Req_account.open("get", booking_url, true);
            Req_account.onload = function () {
                let contextArea = JSON.parse(Req_account.responseText);
                if (contextArea["data"] == "null") {
                    document.querySelector("#bookingContent").style.display = "none";
                    document.querySelector("body > footer").style.height = "95vh";
                    document.querySelector("body > footer").style.alignItems = "flex-start";
                    document.querySelector("body > footer > p").style.marginTop = "20px";
                }
                else {
                    document.querySelector("#nobookingContent").style.display = "none"
                    console.log(contextArea)
                    let items = []
                    for (i = 0; i < contextArea["data"].length; i++) {
                        let item = []
                        item.push(contextArea["data"][i]["booking_id"])//0
                        item.push(contextArea["data"][i]["date"])//1
                        item.push(contextArea["data"][i]["time"])//2
                        item.push(contextArea["data"][i]["attraction"]["id"])//3
                        item.push(contextArea["data"][i]["attraction"]["imgsrc"])//4
                        item.push(contextArea["data"][i]["attraction"]["location"])//5
                        item.push(contextArea["data"][i]["attraction"]["name"])//6
                        items.push(item)
                    }
                    console.log(items)
                    document.querySelector("#nobookingContent").style.display = "none"
                    document.querySelector("#bookingattractionBox > div > div.imgbox").style.backgroundImage = "url(" + items[items.length - 1][5] + ")"
                    document.querySelector("#bookingattractionBox > div > div.imgbox").style.backgroundSize = "300px"
                    document.querySelector("#bookingattractionBox > div > div.imgbox").style.backgroundPosition = "center"
                    document.querySelector("#attractionContent").innerHTML = items[items.length - 1][6]
                    document.querySelector("#dateContent").innerHTML = items[items.length - 1][1]
                    document.querySelector("#timeContent").innerHTML = items[items.length - 1][2]
                    let totalpayment
                    let payment
                    if (items[items.length - 1][1] == "noon") {
                        payment = "新台幣 2,000 元"
                        totalpayment = " 2,000 "
                    } else {
                        payment = "新台幣 2,500 元"
                        totalpayment = " 2,500 "
                    }
                    document.querySelector("#payContent").innerHTML = payment
                    document.querySelector("#totalaccount").innerHTML = totalpayment
                    document.querySelector("#locationContent").innerHTML = items[items.length - 1][4]
                    document.querySelector("#bookingattractionBox > div > div.Delete_icon").setAttribute("id", items[items.length - 1][0])
                    document.querySelector("#bookingattractionBox > div > div.Delete_icon").addEventListener('click', deletebooking, false);
                    function deletebooking() {
                        let id = document.querySelector("#bookingattractionBox > div > div.Delete_icon").id
                        let Req_delete = new XMLHttpRequest();
                        let booking_url = "/api/booking/" + id;
                        Req_delete.open("DELETE", booking_url, true);
                        Req_delete.onload = function () {
                            location.href = "/booking";
                        }
                        Req_delete.send()
                    }
                }

            }
            Req_account.send()
        }
    }
    req_account.send()
};
getBookingData();