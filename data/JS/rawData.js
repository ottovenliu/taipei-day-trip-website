//當下querystring的抓取//window.location.search
//整理decodeURIComponent()轉碼為中文字
//var searchKeyword =decodeURIComponent(window.location.search)
//接下來req判讀-->/attractions?keyword=北&page=4
//      預設為attractions?keyword=&page=0(數字疊加判斷,後續可以優化)
//var apisearch="/attractions?keyword="

//透過抓取當前網址進行資料更新
//資料更新的方式為更改API搜尋要件後填入
//  X-->
var searchKeyword = decodeURIComponent(window.location.search.split("?keyword="))

var searchKWord = searchKeyword[1];
if (searchKeyword[1] == undefined) {
    searchKWord = "";
};
var SKword = "/api/attractions?keyword=" + searchKWord
var req = new XMLHttpRequest();
req.open("get", SKword, false)
req.onload = function rawData() { };
req.send(null);
var contextArea = JSON.parse(req.responseText);
var items = [];
for (i = 0; i < contextArea["data"].length; i++) {
    var item = [];
    var file = contextArea["data"][i]["images"].split("http://");
    item.push(contextArea["data"][i]["address"]); //0
    item.push(contextArea["data"][i]["category"]);//1
    item.push(contextArea["data"][i]["description"]);//2
    item.push(contextArea["data"][i]["id"]);//3
    var img = "http://" + file[1];
    item.push(img);//4
    item.push(contextArea["data"][i]["latitude"]);//5
    item.push(contextArea["data"][i]["longitude"]);//6
    item.push(contextArea["data"][i]["mrt"]);//7
    item.push(contextArea["data"][i]["name"]);//8
    item.push(contextArea["data"][i]["transport"]);//9
    items.push(item);
};
items.push(contextArea["nextPage"]);
var lessShow = (items.length - 1);
var endtimes = 0;
var nextPage = contextArea["nextPage"]
var firstpage = function addImg() {
    var parent = document.getElementById('contentArea');
    for (var i = 0; i < lessShow; i++) {
        var newDiv = document.createElement('a');
        var ID_URL = "/attraction/" + items[i][3]
        newDiv.href = ID_URL
        newDiv.style.color = "black"
        newDiv.style.textDecoration = "none"
        newDiv.setAttribute("class", "item")
        newDiv.setAttribute("id", `item_${i}`)
        parent.appendChild(newDiv);
    }
    for (i = 0; i < lessShow; i++) {
        var boxConten = document.getElementById(`item_${i}`);
        var imgBox = document.createElement('div');
        var img = document.createElement("img");
        var textBox = document.createElement('div');
        var infoBox = document.createElement('div');//-------------------------
        var infoBox_L = document.createElement('div');//-------------------------
        var infoBox_R = document.createElement('div');//------------------------
        var A_name = document.createTextNode(items[i][8]);
        var A_MRT = document.createTextNode(items[i][7]);//--------------------------
        var A_catagory = document.createTextNode(items[i][1]);//-------------------------
        var imageSources = items[i][4];
        boxConten.style.display = "flex";
        boxConten.style.justifyContent = "flex-start";
        boxConten.style.alignContent = "flex-start";
        boxConten.style.flexDirection = "column";
        // boxConten.style.borderRadius = "10px"
        boxConten.style.overflow = "hidden";
        imgBox.style.maxWidth = "100%";
        imgBox.style.width = "100%";
        imgBox.style.maxHeight = "80%";
        imgBox.style.height = "250px";
        imgBox.style.display = "flex";
        imgBox.style.justifyContent = "center";
        imgBox.style.alignItems = "center";
        img.style.flex = "none";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "cover";
        img.src = imageSources;
        textBox.style.maxHeight = "10%";
        textBox.style.height = "20px";
        textBox.style.width = "100%";
        textBox.style.fontSize = "16px";
        textBox.style.color = "black";
        textBox.style.textAlign = "left";
        textBox.style.fontWeight = "bold";
        textBox.style.paddingLeft = "5px"
        textBox.style.paddingRight = "5px"
        infoBox.style.width = "100%";
        infoBox.style.height = "10%";
        infoBox.style.display = "flex";
        infoBox.style.flexDirection = "row";
        infoBox.style.paddingLeft = "5px";
        infoBox.style.paddingRight = "5px";
        infoBox_L.style.width = "50%";
        infoBox_L.style.fontSize = "16px";
        infoBox_L.style.textAlign = "left";
        infoBox_R.style.width = "50%";
        infoBox_R.style.fontSize = "16px";
        infoBox_R.style.textAlign = "center";
        textBox.setAttribute("class", "textBox")
        infoBox.setAttribute("class", "infoBox")
        imgBox.setAttribute("id", `imgBox_${i}`)
        textBox.appendChild(A_name);
        infoBox_L.appendChild(A_MRT);
        infoBox_R.appendChild(A_catagory);
        infoBox.appendChild(infoBox_L);
        infoBox.appendChild(infoBox_R);
        imgBox.appendChild(img);
        boxConten.appendChild(imgBox);
        boxConten.appendChild(textBox);
        boxConten.appendChild(infoBox);
    };
}
firstpage();


window.addEventListener('scroll', () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    if (nextPage == "null") {

    } else if (scrollTop + clientHeight > scrollHeight - 1) {
        endtimes++;
        var Req = new XMLHttpRequest();
        Req.open("get", SKword + "&page=" + endtimes, false)
        Req.send(null);
        var contextArea = JSON.parse(Req.responseText);
        if (contextArea["data"] == "超出檢索範圍") {

        } else if (contextArea["data"] != "超出檢索範圍") {
            var items = [];
            for (i = 0; i < contextArea["data"].length; i++) {
                var item = [];
                var file = contextArea["data"][i]["images"].split("http://");
                item.push(contextArea["data"][i]["address"]);//0
                item.push(contextArea["data"][i]["category"]);//1
                item.push(contextArea["data"][i]["description"]);//2
                item.push(contextArea["data"][i]["id"]);//3
                var img = "http://" + file[1];
                item.push(img);//4
                item.push(contextArea["data"][i]["latitude"]);//5
                item.push(contextArea["data"][i]["longitude"]);//6
                item.push(contextArea["data"][i]["mrt"]);//7
                item.push(contextArea["data"][i]["name"]);//8
                item.push(contextArea["data"][i]["transport"]);//9
                items.push(item);
            };
            items.push(contextArea["nextPage"]);
            var lessShow = (items.length - 1);
        };
        function addImg() {
            var parent = document.getElementById('contentArea');
            var scrollNowpage = endtimes * 12
            for (var i = 0; i < lessShow; i++) {
                var newDiv = document.createElement('a');
                var ID_URL = "/attraction/" + items[i][3]
                newDiv.href = ID_URL
                newDiv.style.color = "black"
                newDiv.style.textDecoration = "none"
                newDiv.setAttribute("class", "item")
                newDiv.setAttribute("id", `item_${scrollNowpage + i}`)
                parent.appendChild(newDiv);
            }
            for (i = 0; i < lessShow; i++) {
                var boxConten = document.getElementById(`item_${scrollNowpage + i}`);
                var imgBox = document.createElement('div');
                var img = document.createElement("img");
                var textBox = document.createElement('div');
                var infoBox = document.createElement('div');//-------------------------
                var infoBox_L = document.createElement('div');//-------------------------
                var infoBox_R = document.createElement('div');//------------------------
                var A_name = document.createTextNode(items[i][8]);
                var A_MRT = document.createTextNode(items[i][7]);//--------------------------
                var A_catagory = document.createTextNode(items[i][1]);//-------------------------
                var imageSources = items[i][4];
                boxConten.style.display = "flex";
                boxConten.style.justifyContent = "flex-start";
                boxConten.style.alignContent = "flex-start";
                boxConten.style.flexDirection = "column";
                // boxConten.style.borderRadius = "10px"
                boxConten.style.overflow = "hidden";
                imgBox.style.maxWidth = "100%";
                imgBox.style.width = "100%";
                imgBox.style.maxHeight = "80%";
                imgBox.style.height = "250px";
                imgBox.style.display = "flex";
                imgBox.style.justifyContent = "center";
                imgBox.style.alignItems = "center";
                img.style.flex = "none";
                img.style.width = "100%";
                img.style.height = "100%";
                img.style.maxWidth = "100%";
                img.style.maxHeight = "100%";
                img.style.objectFit = "cover";
                img.src = imageSources;
                textBox.style.maxHeight = "10%";
                textBox.style.height = "20px";
                textBox.style.width = "100%";
                textBox.style.fontSize = "16px";
                textBox.style.color = "black";
                textBox.style.textAlign = "left";
                textBox.style.fontWeight = "bold";
                textBox.style.paddingLeft = "5px"
                textBox.style.paddingRight = "5px"
                infoBox.style.width = "100%";
                infoBox.style.height = "10%";
                infoBox.style.display = "flex";
                infoBox.style.flexDirection = "row";
                infoBox.style.paddingLeft = "5px";
                infoBox.style.paddingRight = "5px";
                infoBox_L.style.width = "50%";
                infoBox_L.style.fontSize = "16px";
                infoBox_L.style.textAlign = "left";
                infoBox_R.style.width = "50%";
                infoBox_R.style.fontSize = "16px";
                infoBox_R.style.textAlign = "center";
                textBox.setAttribute("class", "textBox")
                infoBox.setAttribute("class", "infoBox")
                imgBox.setAttribute("id", `imgBox_${scrollNowpage + i}`)
                textBox.appendChild(A_name);
                infoBox_L.appendChild(A_MRT);
                infoBox_R.appendChild(A_catagory);
                infoBox.appendChild(infoBox_L);
                infoBox.appendChild(infoBox_R);
                imgBox.appendChild(img);
                boxConten.appendChild(imgBox);
                boxConten.appendChild(textBox);
                boxConten.appendChild(infoBox);
                ////////////////////////////////

            };
        }
        addImg();
    };
});

