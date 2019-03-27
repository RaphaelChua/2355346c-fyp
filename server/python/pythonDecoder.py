import hashlib
import base64
import sys

def decoder(filename):
    key = "121218"
    decodingStage1 = base64.urlsafe_b64decode(str(filename))
    decodingStage2 = decodingStage1.replace(base64.urlsafe_b64encode(key),"")
    decodingFinal = base64.urlsafe_b64decode(decodingStage2)
    return decodingFinal


if __name__ == '__main__':
    print(str(decoder(sys.argv[1])))
    # decoder(sys.argv[1])