pragma solidity ^0.5.1;

contract HalalFood{

  address public Owner;                                     // Ownership of the contract**
  address public SupplierAddress;                           // Seller's address
  address public DistributorAddress;                        // Distributor's Address
  address public ThirdPartyLogisticAddress;                 // 3pl's address
  address public RetailerAddress;                           // Retailer's address
  uint DistributorPayments;                                 // Distributor Payments
  uint RetailerDeposits;                                    // Retailer deposits
  uint DeliveryPayments;                                    // Delivery Payments;
  Order[] orderArray;                                       // Order Array
  StatusStruct[] statusArray;                               // Status Array
  StatusInformationStruct[] statusInfoArray;                // Status Information Array
  EnvironmentStruct[] envArray;                             // Environment Status Array
  MovementStruct[] moveArray;                               // Movement Status Array
  State public currentState;                                // Map the State to a variable
  enum State {AWAITING_PAYMENT,AWAITING_DELIVERY,COMPLETE}  // State list for confirming delivery
  mapping (address => Order) orders;                        // The mapping to store orders
  mapping (uint => StatusStruct) status;                    // Map the current status
  mapping (uint => StatusInformationStruct) statusInfo;     // Map the current status information
  mapping (uint => EnvironmentStruct) env_status;           // Map the environment status
  mapping (uint => MovementStruct) move_status;             // Map the movement status

  struct Order {
    uint orderid;
    uint batchid;
    string product;
    uint quantity;
  }
  struct LocationStruct{
    address accountAddress;
    string location;
    uint date;
  }
  struct StatusStruct{
    string remarks;
    string videohash1;
    string videohash2;
    string videohash3;
    string video_encoded_id;
  }
  struct StatusInformationStruct{
    string remarks;
    string temp;
    string pressure;
    string humidity;
    string movement;
    string environment;
    string date;
  } 

  struct EnvironmentStruct{
    string remarks;
    string date;
    string pressure;
    string lat;
    string long;
    string temp;
    string humidity;
  }
  struct MovementStruct{
    string remarks;
    string date;
    string lat;
    string long;
  }

  // The smart contract's constructor
  constructor(
   address _SupplierAddress,
   address _DistributorAddress, 
   address _ThirdPartyLogisticAddress, 
   address _RetailerAddress) public {

    // Distributor deploys the contract after receiving orders from consumer
    DistributorAddress = _DistributorAddress;
    Owner = _DistributorAddress; // Initiallly map the ownership of the contract to supplier
    SupplierAddress = _SupplierAddress; 
    ThirdPartyLogisticAddress = _ThirdPartyLogisticAddress; 
    RetailerAddress = _RetailerAddress; 
  }

  function createOrders(address _DistributorAddress, uint _OrderID, uint _BatchID , string memory _Product, uint _Qty) onlyDistributor(_DistributorAddress) public {
  
    // Supplier will create the orders
    Order storage newOrders = orders[_DistributorAddress];
    newOrders.orderid = _OrderID;
    newOrders.batchid = _BatchID; // BatchID will be consistent
    newOrders.product = _Product; // Product name
    newOrders.quantity = _Qty; // Product quantity
    orderArray.push(newOrders);
   
  }


  function updateStatus(
  // address _address, 
  string memory _remarks,
  string memory _videohash1,
  string memory _videohash2, 
  string memory _videohash3, 
  string memory _video_encoded_id
) public {

    // Update the product status
    StatusStruct storage newStatusUpdates = status[1];
    newStatusUpdates.videohash1 = _videohash1;
    newStatusUpdates.videohash2 = _videohash2;
    newStatusUpdates.videohash3 = _videohash3;
    newStatusUpdates.video_encoded_id = _video_encoded_id;
    newStatusUpdates.remarks = _remarks;
    statusArray.push(newStatusUpdates);

  }

  function updateStatusInformation(
    // address _address,
    string memory _remarks,
    string memory _temp,
    string memory _humidity,
    string memory _pressure,
    string memory _movement,
    string memory _environment,
    string memory _date
  ) public {

    StatusInformationStruct storage newStatusInfoUpdates = statusInfo[1];
    newStatusInfoUpdates.remarks = _remarks;
    newStatusInfoUpdates.temp = _temp;
    newStatusInfoUpdates.pressure = _pressure;
    newStatusInfoUpdates.humidity = _humidity;
    newStatusInfoUpdates.movement = _movement;
    newStatusInfoUpdates.environment = _environment;
    newStatusInfoUpdates.date = _date;
    statusInfoArray.push(newStatusInfoUpdates);

  }

  function updateEnvironmentStatus(
    // address _address,
    string memory _date,
    string memory _remarks,
    string memory _pressure,
    string memory _temp,
    string memory _humidity,
    string memory _lat,
    string memory _long
  ) public {

    EnvironmentStruct storage newEnvUpdates = env_status[1];
    newEnvUpdates.date = _date;
    newEnvUpdates.pressure = _pressure;
    newEnvUpdates.lat = _lat;
    newEnvUpdates.long = _long;
    newEnvUpdates.temp = _temp;
    newEnvUpdates.humidity = _humidity;
    newEnvUpdates.remarks = _remarks;
    envArray.push(newEnvUpdates);
  }


  function updateMovementStatus(
    // address _address,
    string memory _date,
    string memory _lat,
    string memory _long,
    string memory _remarks
  ) public {

    MovementStruct storage newMoveUpdates = move_status[1];
    newMoveUpdates.date = _date;
    newMoveUpdates.lat = _lat;
    newMoveUpdates.long = _long;
    newMoveUpdates.remarks = _remarks;
    moveArray.push(newMoveUpdates);
  }

  // transfer ownership.
  function transferOwnership(address _DistributorAddress, address _newOwner) onlyDistributor(_DistributorAddress) public {
      Owner = _newOwner;
  }

  function confirmDelivery(address _RetailerAddress) onlyRetailer(_RetailerAddress) inState(State.AWAITING_DELIVERY) public {
    DistributorPayments = (RetailerDeposits * 90);
    DeliveryPayments = (RetailerDeposits * 10);
    RetailerDeposits = 0;
    currentState = State.COMPLETE;
  }

  function confirmPayment(address _RetailerAddress,  uint _money) onlyRetailer(_RetailerAddress) inState(State.AWAITING_PAYMENT) public {
    RetailerDeposits = _money;
    currentState = State.AWAITING_DELIVERY;
  }

  // Modifer for Distributor and Retailer
  // Only function that are tagged with the modifier are allow to call the function
  modifier onlyDistributor(address _DistributorAddress) {
    require(_DistributorAddress== DistributorAddress);
    _;
  }
  modifier onlyRetailer(address _RetailerAddress) {
    require(_RetailerAddress== RetailerAddress);
    _;
  }
  // Delivery status
  modifier inState (State incomingState) {
    require(currentState == incomingState);
    _;
  }

}