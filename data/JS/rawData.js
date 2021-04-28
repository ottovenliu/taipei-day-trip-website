var req = new XMLHttpRequest();
req.open("get", "/attractions", false)

req.onload = function rawData() {
    alert("已成功聯繫伺服器");
};
req.send(null);
var contextArea = JSON.parse(req.responseText);
var items = [];
for (i = 0; i < contextArea["data"].length; i++) {
    var item = [];
    var file = contextArea["data"][i]["images"].split("http://");
    item.push(contextArea["data"][i]["address"]);
    item.push(contextArea["data"][i]["category"]);
    item.push(contextArea["data"][i]["description"]);
    item.push(contextArea["data"][i]["id"]);
    var img = "http://" + file[1];
    item.push(img);
    item.push(contextArea["data"][i]["latitude"]);
    item.push(contextArea["data"][i]["longitude"]);
    item.push(contextArea["data"][i]["mrt"]);
    item.push(contextArea["data"][i]["name"]);
    item.push(contextArea["data"][i]["transport"]);
    items.push(item);
};
items.push(contextArea["nextPage"]);
var lessShow = (items.length - 1);
var endtimes = 0;

