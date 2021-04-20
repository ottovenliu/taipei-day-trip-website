from flask import *
import mysql.connector
import requests
app = Flask(__name__)
app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Pages


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/attraction/<id>")
def attraction(id):
    mydb = mysql.connector.Connect(
        host="localhost",
        user="my_user",
        password="123456789",
        database="my_db"
    )
    # 數據庫查詢
    mycursor = mydb.cursor()
    sql_page = "SELECT web_id,name,category,description,address,transport,mrt,latitude,longitude,imges FROM taipei_travel WHERE web_id = {id}".format(
        id=id)
    mycursor.execute(sql_page)
    myresult_page = mycursor.fetchall()
    # error stear
    # 數據整理
    print(myresult_page)
    print(type(myresult_page))
    dic = {
        "id": myresult_page[0][0],
        "name": myresult_page[0][1],
        "category": myresult_page[0][2],
        "description": myresult_page[0][3],
        "address": myresult_page[0][4],
        "transport": myresult_page[0][5],
        "mrt": myresult_page[0][6],
        "latitude": myresult_page[0][7],
        "longitude": myresult_page[0][8],
        "images": myresult_page[0][9]
    }

    # 輸出
    if dic["id"] == False:
        abort(400)
    printout = {
        "data": dic
    }
    # TPtravelInfo_json = json.dumps(
    #     printout, ensure_ascii=False)

    # TPtravelInfo_json = jsonify(printout)
    # TPtravelInfo_json = json.dumps(printout)
    # return render_template("attraction.html", content_template=TPtravelInfo_json)
    return jsonify(printout)
    # 跟json風磚的時候不太相關 重新試試看資料整理的方法有關 formater
    # error end


@app.route("/booking")
def booking():
    return render_template("booking.html")


@app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


@app.route("/attractions")
def attractions():
    mydb = mysql.connector.Connect(
        host="localhost",
        user="my_user",
        password="123456789",
        database="my_db"
    )
    # 參數整理
    web_page = request.args.get("page", 0)
    keywords = request.args.get("keyword", "")
    keywords.encode('utf-8')
    page = int(web_page)//12
    webpage = int(web_page)
    pagecontent_start = webpage % 12
    pagecontent_end = 12-pagecontent_start

    if pagecontent_start >= pagecontent_end:
        region = (webpage-pagecontent_start+1, webpage+pagecontent_end)
        # print(region)
    else:
        region = (webpage-pagecontent_start+1, webpage+pagecontent_end)
    # 數據庫查詢
    mycursor = mydb.cursor()
    sql_page = "SELECT web_id,name,category,description,address,transport,mrt,latitude,longitude,imges FROM taipei_travel WHERE web_id BETWEEN {start} AND {end} AND name LIKE '%{keyword}%'".format(
        start=region[0], end=region[1], keyword=keywords)
    mycursor.execute(sql_page)
    myresult_page = mycursor.fetchall()

    # 數據整理
    data = []
    for item in myresult_page:
        dic = {
            "id": item[0],
            "name": item[1],
            "category": item[2],
            "description": item[3],
            "address": item[4],
            "transport": item[5],
            "mrt": item[6],
            "latitude": item[7],
            "longitude": item[8],
            "images": item[9]
        }
        data.append(dic)
    # 輸出
    if len(data) == 0:
        data = "無檢索資料"
    printout = {
        "nextPage": page+1,
        "data": data

    }

    return jsonify(printout)


@app.errorhandler(500)
def err_handler(e):
    return jsonify({
        "error": "true",
        "message": "伺服器錯誤"
    })


@app.errorhandler(400)
def err_handler(e):
    return jsonify({
        "error": "true",
        "message": "景點編號有誤"
    })


app.run(port=3000)
