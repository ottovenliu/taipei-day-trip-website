# a = [1, 2, 3]
# b = ["a", "b", 5, 4, 5, 6]

# if len(b) % 3 == 0:
#     split_ = len(b)//3+1
#     print("%")
# else:
#     split_ = len(b)//3
#     print(len(b)//3)
#     print("o")

# for i in range(0, split_):
#     print("i=", i)
#     for k in a:
#         print("i=", i, "k=", i+k)

area = []
test = ["a", "1", "2", "3", "4", "5", "6", "7", " 8", "9"]
for i in range(0, len(test), 3):
    out = test[i:i+3]
    print(out)
    area.append(out)
# b = [lst[i:i+3] for i in range(0, len(lst), 3)]
# print(b)
print(area)
