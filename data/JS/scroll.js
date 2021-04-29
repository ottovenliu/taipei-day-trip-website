// window.addEventListener('scroll', () => {
//     let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
//     let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
//     let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
//     console.log("活動!!");
//     if (scrollTop + clientHeight > scrollHeight - 1) {
//         endtimes++;
//         var Req = new XMLHttpRequest();
//         Req.open("get", "/attractions?page=" + endtimes, false)
//         // Req.onload = function () {
//         // };
//         Req.send(null);
//         var contextArea = JSON.parse(Req.responseText);
//         if (contextArea["data"] == "超出檢索範圍") {

//         } else if (contextArea["data"] != "超出檢索範圍") {
//             var items = [];
//             for (i = 0; i < contextArea["data"].length; i++) {
//                 var item = [];
//                 var file = contextArea["data"][i]["images"].split("http://");
//                 item.push(contextArea["data"][i]["address"]);
//                 item.push(contextArea["data"][i]["category"]);
//                 item.push(contextArea["data"][i]["description"]);
//                 item.push(contextArea["data"][i]["id"]);
//                 var img = "http://" + file[1];
//                 item.push(img);
//                 item.push(contextArea["data"][i]["latitude"]);
//                 item.push(contextArea["data"][i]["longitude"]);
//                 item.push(contextArea["data"][i]["mrt"]);
//                 item.push(contextArea["data"][i]["name"]);
//                 item.push(contextArea["data"][i]["transport"]);
//                 items.push(item);
//             };
//             console.log(items)
//             items.push(contextArea["nextPage"]);
//             var scrollNextpage = items[items.length - 1]
//             var lessShow = (items.length - 1);
//         };
//         function addImg() {
//             var parent = document.getElementById('contentArea');
//             console.log(parent)
//             var scrollNowpage = endtimes * 12
//             for (var i = 0; i < lessShow; i++) {
//                 var newDiv = document.createElement('div');
//                 newDiv.setAttribute("class", "item")
//                 newDiv.setAttribute("id", `item_${scrollNowpage + i}`)
//                 parent.appendChild(newDiv);
//             }
//             for (i = 0; i < lessShow; i++) {
//                 var imageSources = items[i][4];
//                 var img = document.createElement("img");
//                 var boxConten = document.getElementById(`item_${scrollNowpage + i}`)
//                 var imgBox = document.createElement('div')
//                 var textBox = document.createElement('div')
//                 var textNode = document.createTextNode(items[i][8]);
//                 boxConten.style.display = "flex";
//                 boxConten.style.justifyContent = "center";
//                 boxConten.style.alignItems = "center";
//                 boxConten.style.flexDirection = "column";
//                 imgBox.style.maxWidth = "100%";
//                 imgBox.style.width = "100%";
//                 imgBox.style.maxHeight = "80%";
//                 imgBox.style.height = "250px";
//                 imgBox.style.display = "flex";
//                 imgBox.style.justifyContent = "center";
//                 imgBox.style.alignItems = "center";
//                 textBox.style.maxHeight = "20%";
//                 textBox.style.height = "60px";
//                 img.style.flex = "none";
//                 img.style.width = "100%";
//                 img.style.height = "100%";
//                 img.style.maxWidth = "100%";
//                 img.style.maxHeight = "100%";
//                 img.style.objectFit = "cover";
//                 img.src = imageSources;
//                 imgBox.setAttribute("id", `imgBox_${i}`)
//                 textBox.appendChild(textNode);
//                 imgBox.appendChild(img)
//                 boxConten.appendChild(imgBox)
//                 boxConten.appendChild(textBox)
//             };
//         }
//         addImg();
//     };
// });

