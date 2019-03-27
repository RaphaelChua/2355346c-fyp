import hashlib
import base64


def encode ():
    key = "121218"
    filename = base64.urlsafe_b64encode("10mins") + base64.urlsafe_b64encode(key)
    filename2 = base64.urlsafe_b64encode(filename)
    print("filename: " + filename)
    print("key: " + base64.urlsafe_b64encode(key))
    print("filename2: " + filename2)

    return base64.urlsafe_b64encode(filename)


if __name__ == '__main__':    