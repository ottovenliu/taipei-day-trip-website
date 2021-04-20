import json
a = ["123", "456", "7789"]

for url in a:
    if ("4" or "3") in url:
        print(url)
    elif ("15" in url or "2" in url):
        print("url")
    else:
        print("nope")


file = open(
    'data/taipei-attractions.json', "r", encoding="utf-8")
rawdata_json = json.load(file)
print(len(rawdata_json["result"]["results"]))

image = []
for item in rawdata_json["result"]["results"]:
    images = []
    img_url = item["file"].split("http:")
    # print(img_url)
    # print(item["file"])
    print("--------------------------------")
    for url in img_url:
        if (".jpg" in url or ".JPG" in url):
            # images.append("http:"+url)
            print("!!!!!!!!!"+url)
            print("測試成功")
        elif (".png" in url or ".PNG" in url):
            # images.append("http:"+url)
            print("!!!!!!!!!"+url)
            print("測試成功")
        # if (".jpg" or ".JPG"or ".png" or ".PNG") in url:
        #     # images.append("http:"+url)
        #     print("!!!!!!!!!"+url)
        #     print("測試成功")
        else:
            print("null"+url)
            # images.append("null")
            # images.remove("null")
# print(images)
