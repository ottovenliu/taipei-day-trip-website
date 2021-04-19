# 資料整理
import json
file = open(
    'data/taipei-attractions.json', "r", encoding="utf-8")
rawdata_json = json.load(file)
print(len(rawdata_json["result"]["results"]))

clist = []

for item in rawdata_json["result"]["results"]:
    images = []
    img_url = item["file"].split("http:")
    for url in img_url:
        if ".jpg" or ".JPG" in url:
            images.append("http:"+url)
        elif".png" or ".PNG" in url:
            images.append("http:"+url)
        else:
            images.append("null")
            images.remove("null")
    dict = {
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
print(clist)
# print(json.dumps(rawdata_json, indent=3, ensure_ascii=False))
