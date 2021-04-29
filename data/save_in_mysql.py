# 資料整理
import mysql.connector
import json
file = open(
    'taipei-attractions.json', "r", encoding="utf-8")
rawdata_json = json.load(file)


clist = []

for item in rawdata_json["result"]["results"]:
    images = []
    img_url = item["file"].split("http:")
    for url in img_url:
        if (".jpg" in url or ".JPG" in url):
            images.append("http:"+url)

        elif(".png" in url or ".PNG" in url):
            images.append("http:"+url)

        else:
            images.append("null")
            images.remove("null")
    dict = {
        "id": item["_id"],
        "name": item["stitle"],
        "category": item["CAT1"]+","+item["CAT2"],
        "description": item["xbody"],
        "address": item["address"],
        "transport": item["info"],
        "mrt": item["MRT"],
        "latitude": item["latitude"],
        "longitude": item["longitude"],
        "images": images
    }
    clist.append(dict)


# 輸入至mysql
mydb = mysql.connector.Connect(
    host="localhost",
    user="my_user",
    password="nhAG*nn8Yu7V",
    database="my_db"
)
print(mydb)
mycursor = mydb.cursor()
for item in clist:
    image = "".join(item["images"])

    rawdata_sql = "INSERT INTO taipei_travel (web_id,name,category,description,address,transport,mrt,latitude,longitude,imges) VALUES(%s,%s, %s, %s,%s, %s, %s,%s, %s, %s)"
    val = (item["id"], item["name"], item["category"], item["description"], item["address"],
           item["transport"], item["mrt"], item["latitude"], item["longitude"], image)
    mycursor.execute(rawdata_sql, val)
    mydb.commit()
    print(mycursor.rowcount, "was inserted")
