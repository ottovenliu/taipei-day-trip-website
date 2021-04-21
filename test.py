a = [1, 2, 3]
b = ["a", "b", 5, 4, 5, 6]

if len(b) % 3 == 0:
    split_ = len(b)//3+1
    print("%")
else:
    split_ = len(b)//3
    print(len(b)//3)
    print("o")

for i in range(0, split_):
    print("i=", i)
    for k in a:
        print("i=", i, "k=", i+k)
