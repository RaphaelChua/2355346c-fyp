import blocksmith

kg = blocksmith.KeyGenerator()
kg.seed_input('raphael_toshiba')
key = kg.generate_key()

print("private key generated")
print(key)

address = blocksmith.EthereumWallet.generate_address(key)
print("ethereum address")
print(address)


checksum_address = blocksmith.EthereumWallet.checksum_address(address)
print("etherum checksum address")
print(checksum_address)
