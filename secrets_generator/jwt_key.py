import jwt

encoded = jwt.encode({'toshiba': 'blockchainsecrets'}, 'secret', algorithm='HS256')

print(encoded)
