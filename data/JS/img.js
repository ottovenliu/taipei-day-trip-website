function Arawdata() {
    var attracrionIDPath = window.location.pathname.split("/");
    var attracrionID = attracrionIDPath[2]
    var ID = "/api/attraction/" + attracrionID
    var req = new XMLHttpRequest();
    req.open("get", ID, false);
    req.send(null);
    contextArea = JSON.parse(req.responseText)
};
function slitimg() {
    //抓取資料
    var imgBox = contextArea["data"]["images"].split("http://")
    var imgbox = []
    for (i = 1; i < imgBox.length; i++) {
        imgbox.push("http://" + imgBox[i]);
    }
    //生成內容
    var imgpages = imgbox.length
    for (i = 0; i < imgpages; i++) {
        var pageparent = document.getElementById('pagescroll');
        var imageparent = document.getElementById('imagesscroll');
        var newLi = document.createElement('li');
        var newImg = document.createElement("img");
        newLi.setAttribute("id", i)
        newLi.addEventListener("mouseenter", overCircle)
        newImg.src = imgbox[i];
        imageparent.style.width = 600 * imgpages + "px"
        imageparent.style.height = "350px"
        pageparent.appendChild(newLi);
        imageparent.appendChild(newImg);
    }
    var newDiv = document.createElement('div');
    newDiv.style.clear = "both";
    var imageparent = document.getElementById('imagesscroll');
    imageparent.appendChild(newDiv);
    var currentIndex = 0;
    var preIndex = 0;
    var timer = null;
    var box = document.getElementById("Bimgbox");
    var circles = document.getElementById("pagescroll").getElementsByTagName("li");
    // var pageScrollWidth = document.getElementById('pagescroll').offsetWidth;
    // var boxWidth = document.getElementById('Bimgbox').offsetWidth;
    // pageparent.style.left = boxWidth / 2 - pageScrollWidth / 2 + "px"



    //左右點選事件添加
    var arrowLeft = document.getElementById("arrow-left");
    var arrowRight = document.getElementById("arrow-right");
    arrowLeft.addEventListener("click", preMove);
    function preMove() {
        preIndex = currentIndex;
        if (currentIndex != 0) {
            currentIndex--;
            // multiImages.style.transition="1s";
        }
        else {
            currentIndex = imgpages - 1;
            // multiImages.style.transition="0.5s";
        }
        changeCircleColor(preIndex, currentIndex);
        moveImage();
    }
    arrowRight.addEventListener("click", nextMove);
    function nextMove() {
        preIndex = currentIndex;
        if (currentIndex != imgpages - 1) {
            currentIndex++;
            // multiImages.style.transition="1s";
        }
        else {
            currentIndex = 0;
            // multiImages.style.transition="0.5s";
        }
        changeCircleColor(preIndex, currentIndex);
        moveImage();
    }
    timer = setInterval(nextMove, 2000);
    box.addEventListener("mouseover", function () {
        clearInterval(timer);
        arrowLeft.style.display = "block";
        arrowRight.style.display = "block";
    });
    box.addEventListener("mouseout", function () {
        timer = setInterval(nextMove, 2000);
        arrowLeft.style.display = "none";
        arrowRight.style.display = "none";
    });
    changeCircleColor(preIndex, currentIndex);
    //scroll事件添加
    // var circles = document.getElementById("pagescroll").getElementsByTagName("li");
    console.log(circles)
    function overCircle() {
        preIndex = currentIndex;
        currentIndex = parseInt(this.id);
        // multiImages.style.transition="1.5s";
        changeCircleColor(preIndex, currentIndex);
        moveImage();
    }
    function changeCircleColor(preIndex, currentIndex) {
        circles[preIndex].style.backgroundColor = "rgb(240, 240, 240)";
        circles[currentIndex].style.backgroundColor = "#448899";
    }
    //圖片滑動事件添加
    var multiImages = document.getElementById("imagesscroll");
    function moveImage() {
        multiImages.style.left = -currentIndex * 600 + "px";
    }
};

Arawdata();
slitimg();