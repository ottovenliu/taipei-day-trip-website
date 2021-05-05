from flask import *
import mysql.connector
app = Flask(__name__,
            static_url_path="/",
            static_folder="data")
app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True

# Pages


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/attraction/<id>")
def APIattraction(id):
    mydb = mysql.connector.Connect(
        host="localhost",
        user="my_user",
        password="nhAG*nn8Yu7V",
        database="my_db"
    )
    # nhAG*nn8Yu7V
    # 數據庫查詢
    mycursor = mydb.cursor()
    sql_page = "SELECT web_id,name,category,description,address,transport,mrt,latitude,longitude,imges FROM taipei_travel WHERE web_id = {id}".format(
        id=id)
    mycursor.execute(sql_page)
    myresult_page = mycursor.fetchall()

    if myresult_page == []:
        abort(400)
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

    printout = {
        "data": dic
    }

    return jsonify(printout)


@app.route("/attraction/<id>")
def attraction(id):
    print(id)
    return render_template("attraction.html")


@app.route("/booking")
def booking():
    return render_template("booking.html")


@app.route("/thankyou")
def thankyou():
    return render_template("thankyou.html")


@app.route("/api/attractions")
def APIattractions():
    mydb = mysql.connector.Connect(
        host="localhost",
        user="my_user",
        password="nhAG*nn8Yu7V",
        database="my_db"
    )
    # 參數整理
    web_page = request.args.get("page", 0)
    keywords = request.args.get("keyword", "")
    keywords.encode('utf-8')
    webpage = int(web_page)
    # 數據庫查詢
    mycursor = mydb.cursor()
    sql_keyword = "SELECT web_id,name,category,description,address,transport,mrt,latitude,longitude,imges FROM taipei_travel WHERE name LIKE '%{keyword}%' ORDER BY CAST(web_id AS UNSIGNED)".format(
        keyword=keywords)
    mycursor.execute(sql_keyword)
    myresult = mycursor.fetchall()
    data_printout = []
    rawdata = []
    dataspace = []
    data_box = []
    if myresult == []:
        data = "無檢索資料"
        i = None
        data_dic = {
            "nextPage": i,
            "data": data
        }
        data_printout.append(data_dic)
        print(myresult, "myresult")
    else:
        for item in myresult:
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
            rawdata.append(dic)
        for i in range(0, len(rawdata), 12):
            data_split = rawdata[i:i+12]
            data_box.append(data_split)

        if webpage < 0 or webpage >= len(data_box):
            return jsonify({
                "nextPage": None,
                "data": "超出檢索範圍"
            }
            )
        else:
            Nowpage = webpage
        dataspace.append([Nowpage, data_box[Nowpage]])

        nextwebpage = Nowpage+1
        if len(data_box) == 1 or Nowpage == len(data_box)-1:
            nextwebpage = None
        print("多少筆資料", len(data_box))
        data_dic = {
            "nextPage": nextwebpage,
            "data": dataspace[0][1]
        }
        # print(data_dic, "data_dic")
        data_printout.append(data_dic)

    return jsonify(data_printout[0])


@app.route("/test")
def test():
    return render_template("test.html")


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


# app.run(port=3000, debug=True)
app.run(host="0.0.0.0", port=3000, debug=True)
