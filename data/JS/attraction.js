function Arawdata() {
    var attracrionIDPath = window.location.pathname.split("/");
    var attracrionID = attracrionIDPath[2]
    var ID = "/api/attraction/" + attracrionID
    var req = new XMLHttpRequest();
    req.open("get", ID, false);
    req.send(null);
    contextArea = JSON.parse(req.responseText)
};
function pushInBox() {
    var name = contextArea["data"]["name"]
    var catagoryBox = contextArea["data"]["category"].split(",")
    var catagory = catagoryBox[1]
    var MRT = contextArea["data"]["mrt"]
    var description = contextArea["data"]["description"]
    var address = contextArea["data"]["address"]
    var transport = contextArea["data"]["transport"]
    var imgBox = contextArea["data"]["images"].split("http://")
    var imgbox = []
    for (i = 1; i < imgBox.length; i++) {
        imgbox.push("http://" + imgBox[i]);
    }
    document.getElementById("attractionName").textContent = name;
    if (MRT != null) {
        document.getElementById("attractionMRT").textContent = catagory + " at " + MRT;
    } else {
        document.getElementById("attractionMRT").textContent = catagory;
    }
    document.getElementById("abstract").textContent = description;
    document.getElementById("addresscontent").textContent = address;
    if (transport != null) {
        document.getElementById("Transcontent").textContent = transport;
    } else {
        document.getElementById("Transcontent").textContent = "建議開車直接去比較方便喔";
    }

    // alert(contextArea["data"]["category"].split(","))

    // document.getElementById("attractionMRT").

}
Arawdata();
pushInBox();
