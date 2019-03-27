import dashboardStore from './dashboard/index';
import transactionStore from './transaction/index';
import blockStore from './block/index';
import accountStore from './account/index';
import smartContractStore from './smartcontract/index';
import batchStore from './batch/index';
import queryStore from './query/index';

class Stores {
    DashboardStore = dashboardStore;
    TransactionStore = transactionStore;
    BlockStore = blockStore;
    AccountStore = accountStore;
    SmartContractStore = smartContractStore;
    BatchStore = batchStore;
    QueryStore = queryStore;
}

const stores = new Stores();
export default stores;