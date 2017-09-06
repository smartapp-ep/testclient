import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.acme.trading{
   export class TestComProdItem {
      prodItemBarcode: string;
      orderId: string;
      prodName: string;
      prodCode: string;
      description: string;
   }
   export class TestProdItem extends Asset {
      prodItemBarcode: string;
      orderId: string;
      prodName: string;
      prodCode: string;
      description: string;
      status: string;
      currentOwner: TestChainPart;
      history: TestChainTran[];
   }
   export class TestChainPart extends Participant {
      partId: string;
      organName: string;
      asns: TestAsn[];
      orders: TestOrder[];
   }
   export class TestComAsn {
   }
   export class TestAsn extends Asset {
      asnId: string;
      comAsnId: string;
      containers: TestContainer[];
      customerName: string;
      customerCode: string;
   }
   export class TestContainer {
      containerId: string;
      prodItems: TestComProdItem[];
   }
   export class TestProd {
      prodCode: string;
      prodName: string;
      orderId: string;
      prodItems: TestComProdItem[];
   }
   export class TestOrder extends Asset {
      orderId: string;
      comOrderId: string;
      prodItems: TestComProdItem[];
   }
   export abstract class TestChainTran extends Transaction {
      sender: TestChainPart;
      comTransType: string;
      comTransId: string;
   }
   export class TestAsnShip extends TestChainTran {
      receiver: TestChainPart;
      asn: TestAsn;
   }
   export class TestRetailShip extends TestChainTran {
      order: TestOrder;
      prodItemBarcodes: string[];
   }
   export class ProductItem extends Asset {
      productItemBarcode: string;
      productInfo: ProductInfo;
      historyRecord: transactionRecord[];
      currentOwner: ChainParticipant;
   }
   export class transactionRecord {
      senderChainId: string;
      senderId: string;
      senderName: string;
      receiverChainId: string;
      receiverId: string;
      receiverName: string;
      transactionType: string;
      transactionId: string;
      chainTransationId: string;
   }
   export class ProductInfo extends Asset {
      productCode: string;
      productName: string;
      description: string;
      brand: string;
      manufacturer: ChainParticipant;
   }
   export class Product extends Asset {
      productCode: string;
      productInfo: ProductInfo;
      productItems: ProductItem[];
      owner: ChainParticipant;
   }
   export class Contact extends Asset {
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
      owner: ChainParticipant;
   }
   export class Organization extends Asset {
      gs1CompanyPrefix: string;
      organizationName: string;
      representatives: Contact[];
      contacts: Contact[];
      owner: ChainParticipant;
   }
   export class ChainParticipant extends Participant {
      gs1CompanyPrefix: string;
      organization: Organization;
   }
   export abstract class ChainTransaction extends Transaction {
      type: string;
      id: string;
      sender: ChainParticipant;
      receiver: ChainParticipant;
   }
   export class Commodity extends Asset {
      tradingSymbol: string;
      description: string;
      mainExchange: string;
      quantity: number;
      owner: Trader;
   }
   export class Trader extends Participant {
      tradeId: string;
      firstName: string;
      lastName: string;
   }
   export class Trade extends Transaction {
      commodity: Commodity;
      newOwner: Trader;
   }
   export class TradeNotification extends Event {
      commodity: Commodity;
   }
   export class RemoveHighQuantityCommodities extends Transaction {
   }
   export class RemoveNotification extends Event {
      commodity: Commodity;
   }
// }
