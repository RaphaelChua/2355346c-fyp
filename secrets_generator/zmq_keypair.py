import zmq

zmqLIST = []
zmqLIST = zmq.curve_keypair()
print "PUBLIC KEY  --->  "+ zmqLIST[0]
print "PRIVATE KEY --->  "+ zmqLIST[1]