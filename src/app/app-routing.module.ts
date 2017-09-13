import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { TransactionComponent } from './Transaction/Transaction.component'
import { HomeComponent } from './home/home.component';

import { TestProdItemComponent } from './TestProdItem/TestProdItem.component';
import { TestAsnComponent } from './TestAsn/TestAsn.component';
import { TestOrderComponent } from './TestOrder/TestOrder.component';
import { ProductItemComponent } from './ProductItem/ProductItem.component';
import { ProductInfoComponent } from './ProductInfo/ProductInfo.component';
import { ProductComponent } from './Product/Product.component';
import { ContactComponent } from './Contact/Contact.component';
import { OrganizationComponent } from './Organization/Organization.component';
import { CommodityComponent } from './Commodity/Commodity.component';
import { ShippingComponent } from './Shipping/Shipping.component';
import { QueryComponent } from './Query/Query.component';

const routes: Routes = [
    // { path: 'transaction', component: TransactionComponent },
    {path: '', component: HomeComponent},
		
		{ path: 'TestProdItem', component: TestProdItemComponent},
		
		{ path: 'TestAsn', component: TestAsnComponent},
		
		{ path: 'TestOrder', component: TestOrderComponent},
		
		{ path: 'ProductItem', component: ProductItemComponent},
		
		{ path: 'ProductInfo', component: ProductInfoComponent},
		
		{ path: 'Product', component: ProductComponent},
		
		{ path: 'Contact', component: ContactComponent},
		
		{ path: 'Organization', component: OrganizationComponent},
		
		{ path: 'Commodity', component: CommodityComponent},
		
		{ path: 'Shipping', component: ShippingComponent},
		
		{ path: 'Query', component: QueryComponent},

		{path: '**', redirectTo:''}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
