from re import split
from flask import *
from datetime import timedelta, datetime
import mysql.connector
import os
import json
import requests
from dotenv import load_dotenv
app = Flask(__name__,
            static_url_path="/",
            static_folder="data")
app.config["JSON_AS_ASCII"] = False
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config['SECRET_KEY'] = os.urandom(24)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=31)
mydb = mysql.connector.Connect(
    host=os.getenv('APP_DB_HOST'),
    user=os.getenv('APP_DB_USER'),
    password=os.getenv('APP_DB_PASSWORD'),
    database=os.getenv('APP_DB_DATABASE'),
    charset=os.getenv('APP_DB_CHARSET')
)
load_dotenv()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/attraction/<id>")
def APIattraction(id):
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


@app.route("/api/attractions")
def APIattractions():
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
        data_dic = {
            "nextPage": nextwebpage,
            "data": dataspace[0][1]
        }
        # print(data_dic, "data_dic")
        data_printout.append(data_dic)

    return jsonify(data_printout[0])


@app.route("/api/user", methods=["POST", "GET"])
def API():

    check_username = session.get('username')  # 確認是否登入中
    content = request.json  # 確認是否有需求
    signstatus_message = request.args.get("signstatus", "")
    signstatus_message.encode('utf-8')
    mycursor = mydb.cursor()
    if(signstatus_message == "check"):
        check_username = session.get('username')
        if(check_username == None):
            user_info = {
                "data": "null"
            }
            return jsonify(user_info)
        else:
            sql_json = "SELECT raw_id,user_name,user_email FROM user WHERE user_email = '{username_db}'".format(
                username_db=check_username)
            mycursor.execute(sql_json)
            myresult = mycursor.fetchall()
            if myresult == []:
                user_info = {
                    "data": "null"
                }
                return jsonify(user_info)

            userDataBox = []
            for i in myresult[0]:
                userDataBox.append(i)
            user_info = {
                "data": {
                    "id": userDataBox[0],
                    "name": userDataBox[1],
                    "email": userDataBox[2]
                }
            }
            return jsonify(user_info)

    # signup_name = content["name"]
    signup_email = content["email"]
    signup_password = content["password"]
    mycursor = mydb.cursor()
    sql_json = "SELECT raw_id,user_name,user_email,user_password FROM user WHERE user_email = '{username_db}'".format(
        username_db=signup_email)
    mycursor.execute(sql_json)
    myresult = mycursor.fetchall()
    # print(content["name"])
    if len(myresult) != 0:

        if(content.get("name") == None):  # 登入判斷
            userDataBox = []
            for i in myresult[0]:
                userDataBox.append(i)
            if(content["password"] == userDataBox[3]):
                signInfo = {"ok": True}
                return jsonify(signInfo)
            else:
                signInfo = {"error": True, "message": "passworderror"}
                return jsonify(signInfo)
        else:
            signInfo = {"error": True, "message": "existed "}
            return jsonify(signInfo)

    else:
        if(content.get("name") != None):
            signup_name = content["name"]
            signup_sql = "INSERT INTO user (user_name,user_email,user_password,signup_time) VALUES(%s, %s, %s,now())"
            val = (signup_name, signup_email, signup_password)
            mycursor.execute(signup_sql, val)
            mydb.commit()
            signInfo = {"ok": True}
            return jsonify(signInfo)
        else:
            signInfo = {"error": True, "message": "accounterror"}
            return jsonify(signInfo)


@app.route("/api/booking", methods=["POST", "GET"])
def A_booking():
    mycursor = mydb.cursor()
    booking_message = request.args.get("bookingstatus", "")
    content = request.json
    if(booking_message == "check"):
        check_username = session.get("username")
        booking_user = "SELECT * FROM user WHERE user_email = '{username}'".format(
            username=check_username)
        mycursor.execute(booking_user)
        myresult = mycursor.fetchall()
        if (myresult == []):
            return jsonify({"data": "null"})
        else:
            booking_user = "SELECT * FROM user_booking WHERE user = '{username}'".format(
                username=myresult[0][1])
            mycursor.execute(booking_user)
            myresult = mycursor.fetchall()
            print(myresult)
            if(myresult == []):
                return jsonify({"data": "null"})
            if(myresult[len(myresult)-1][12] == '0'):
                booking_Infodata = []
                for item in myresult:
                    dic = {
                        "booking_id": item[0],
                        "attraction": {
                            "id": item[2],
                            "name": item[3],
                            "imgsrc": item[4],
                            "location": item[5]
                        },
                        "date": item[6],
                        "time": item[7]
                    }
                    booking_Infodata.append(dic)
                print("已成功回送")
                return jsonify({"data": booking_Infodata})
            if(myresult[len(myresult)-1][12] == '1'):
                return jsonify({"data": "null"})
    if(content != None):
        if(content["action"] == "insert"):
            booking_insert = "INSERT INTO user_booking (user,attraction_id,attraction,location,imgsrc,date,time,booking_time,order_status) VALUES(%s, %s, %s, %s, %s, %s, %s,now(), %s)"
            val = (content["username"], content["booking_attraction_id"], content["booking_attraction"], content["booking_location"], content["booking_imgsrc"],
                   content["booking_date"], content["booking_time"], content["order_status"])
            mycursor.execute(booking_insert, val)
            mydb.commit()
            print("成功輸入")
            print("------------------------------SPOTLIGHT------------------------------")
            return jsonify({"ok": True, "message": "成功輸入"})
        else:
            return jsonify({"error": True, "message": "無資料進來"})
    else:
        signInfo = {"data": "null"}
        return jsonify(signInfo)


@app.route("/api/booking/<booking_id>", methods=["DELETE"])
def booking_delete(booking_id):
    mycursor = mydb.cursor()
    booking_search = "DELETE from user_booking WHERE id = '{id_db}'".format(
        id_db=booking_id)
    mycursor.execute(booking_search)
    mydb.commit()
    return jsonify({"ok": True, "message": "成功刪除"})


@app.route("/attraction/<id>")
def attraction(id):
    print(id)
    return render_template("attraction.html")


@app.route("/A_signin", methods=["POST", "GET"])
def A_signin():
    Account = request.form["signinEmail"]
    Password = request.form["signinPassword"]
    session['username'] = Account
    userDataBox = []
    mycursor = mydb.cursor()
    sql = "SELECT * FROM user WHERE user_email = '{username}'".format(
        username=Account)
    mycursor.execute(sql)
    myresult = mycursor.fetchall()
    if (myresult == []):
        return "無此帳號"
    for i in myresult[0]:
        userDataBox.append(i)
    if(Account == userDataBox[2]):
        if Password == userDataBox[3]:
            return redirect("/")

        else:
            return "密碼錯誤"


@app.route("/A_signout", methods=["POST", "GET"])
def A_signout():
    session['username'] = False
    return redirect("/")


@app.route("/booking")
def booking():
    check_username = session.get("username")
    if(check_username == None):
        return redirect("/")
    return render_template("booking.html")


@app.route("/test")
def test():
    return render_template("testwithoutoffice.html")


@app.route("/api/order", methods=["GET", "POST"])
def A_order():
    if request.method == "POST":
        orderData = request.json
        if orderData == []:
            return jsonify({"Message": "getRequest", "data": "null"})
        mycursor = mydb.cursor()
        contact_update = "UPDATE user_booking SET contact_name='{contact_name}',contact_phone='{contact_phone}',contact_email='{contact_email}' WHERE id='{order_id}';".format(
            order_id=orderData["data"]["order"]["trip"]["attraaction"]["id"], contact_name=orderData["data"]["contact"]["name"], contact_phone=orderData["data"]["contact"]["email"], contact_email=orderData["data"]["contact"]["phone"])
        mycursor.execute(contact_update)
        mydb.commit()
        print("------------------------split------------------------")
        print(orderData["data"])
        orderReqUrl = os.getenv("APP_ORDER_PAY_REQURL")
        orderReqHeader = {
            "content-type": os.getenv("APP_ORDER_PAY_CONTENTTYPE"),
            "x-api-key": os.getenv("APP_ORDER_PAY_APIKEY")
        }
        orderReqData = {
            "prime": orderData["data"]["prime"],
            "partner_key": os.getenv("APP_ORDER_PAY_APIKEY"),
            "merchant_id": "PursuingStudio_CTBC",
            "details": "Test",
            "amount": 100,
            "cardholder": {
                "phone_number": "+886923456789",
                "name": "王小明",
                "email": "LittleMing@Wang.com",
                "zip_code": "100",
                "address": "台北市天龍區芝麻街1號1樓",
                "national_id": "A123456789"
            },
            "remember": True
        }
        if(orderData["data"]["order"]["price"] == "2,000"):
            orderReqData["amount"] = 2000
        if(orderData["data"]["order"]["price"] == "2,500"):
            orderReqData["amount"] = 2500
        response = requests.post(
            orderReqUrl, data=json.dumps(orderReqData), headers=orderReqHeader, json=None
        )
        OrderedDict = response.json()
        if OrderedDict["status"] == 0:
            if OrderedDict["msg"] == 'Success':
                mycursor = mydb.cursor()
                order_update = "UPDATE user_booking SET order_status='1' WHERE id='{order_id}';".format(
                    order_id=orderData["data"]["order"]["trip"]["attraaction"]["id"])
                mycursor.execute(order_update)
                mydb.commit()
                print("ostest")
                number = orderData["data"]["order"]["trip"]["date"].replace(
                    "-", "")+str(orderData["data"]["order"]["trip"]["attraaction"]["id"])
                return jsonify({
                    "data": {
                        "number": number,
                        "payment": {
                            "status": 0,
                            "message": "付款成功"
                        }
                    }
                })

    print("------------------------split------------------------")

    return {
        "data": "null"
    }


@app.route("/api/order/<order_id>")
def order_info(order_id):
    mycursor = mydb.cursor()
    booking_search = "SELECT * from user_booking WHERE id = '{id_db}'".format(
        id_db=order_id)
    mycursor.execute(booking_search)
    orderInfo = mycursor.fetchall()
    if(orderInfo != []):
        print(orderInfo)
        datenumber = str(orderInfo[0][6].replace("-", ""))
        number = datenumber+str(orderInfo[0][0])
        price = True
        if(orderInfo[0][-6] == "noon"):
            price = 2000
        if(orderInfo[0][-6] == "afternoon"):
            price = 2500
        orderApi = {
            "data": {
                "number": number,
                "price": price,
                "trip": {
                    "attraction": {
                        "id": orderInfo[0][2],
                        "name": orderInfo[0][3],
                        "address": orderInfo[0][4],
                        "image": orderInfo[0][5]
                    },
                    "date": orderInfo[0][6],
                    "time": orderInfo[0][7]
                },
                "contact": {
                    "name": orderInfo[0][-4],
                    "email": orderInfo[0][-2],
                    "phone": orderInfo[0][-3]
                },
                "status": orderInfo[0][-1]
            }
        }
        return jsonify(orderApi)
    else:
        return jsonify({"data": "null"})


@ app.route("/thankyou")
def thankyou():
    orderStatus_message = request.args.get("number", "")
    return render_template("thankyou.html")


@ app.errorhandler(500)
def err_handler(e):
    return jsonify({
        "error": "true",
        "message": "伺服器錯誤"
    })


@ app.errorhandler(400)
def err_handler(e):
    return jsonify({
        "error": "true",
        "message": "後端錯誤"
    })


app.run(port=3000, debug=True)
# app.run(host="0.0.0.0", port=3000, debug=True)
