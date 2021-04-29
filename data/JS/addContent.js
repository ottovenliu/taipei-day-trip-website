// window.onload = function addImg() {
//     var parent = document.getElementById('contentArea');
//     for (var i = 0; i < lessShow; i++) {
//         var newDiv = document.createElement('div');
//         newDiv.setAttribute("class", "item")
//         newDiv.setAttribute("id", `item_${i}`)
//         parent.appendChild(newDiv);
//     }
//     for (i = 0; i < lessShow; i++) {
//         var imageSources = items[i][4];
//         var img = document.createElement("img");
//         var boxConten = document.getElementById(`item_${i}`)
//         var imgBox = document.createElement('div')
//         var textBox = document.createElement('div')
//         var textNode = document.createTextNode(items[i][8]);
//         boxConten.style.display = "flex";
//         boxConten.style.justifyContent = "center";
//         boxConten.style.alignItems = "center";
//         boxConten.style.flexDirection = "column";
//         imgBox.style.maxWidth = "100%";
//         imgBox.style.width = "100%";
//         imgBox.style.maxHeight = "80%";
//         imgBox.style.height = "250px";
//         imgBox.style.display = "flex";
//         imgBox.style.justifyContent = "center";
//         imgBox.style.alignItems = "center";
//         textBox.style.maxHeight = "20%";
//         textBox.style.height = "60px";
//         img.style.flex = "none";
//         img.style.width = "100%";
//         img.style.height = "100%";
//         img.style.maxWidth = "100%";
//         img.style.maxHeight = "100%";
//         img.style.objectFit = "cover";
//         img.src = imageSources;
//         imgBox.setAttribute("id", `imgBox_${i}`)
//         textBox.appendChild(textNode);
//         imgBox.appendChild(img)
//         boxConten.appendChild(imgBox)
//         boxConten.appendChild(textBox)
//     };
// }