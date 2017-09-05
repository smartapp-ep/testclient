import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { TransactionComponent } from './Transaction/Transaction.component'

import { TestProdItemComponent } from './TestProdItem/TestProdItem.component';
import { TestAsnComponent } from './TestAsn/TestAsn.component';
import { TestOrderComponent } from './TestOrder/TestOrder.component';
import { ProductItemComponent } from './ProductItem/ProductItem.component';
import { ProductInfoComponent } from './ProductInfo/ProductInfo.component';
import { ProductComponent } from './Product/Product.component';
import { ContactComponent } from './Contact/Contact.component';
import { OrganizationComponent } from './Organization/Organization.component';
import { CommodityComponent } from './Commodity/Commodity.component';

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    // TransactionComponent,
    TestProdItemComponent,
		TestAsnComponent,
		TestOrderComponent,
		ProductItemComponent,
		ProductInfoComponent,
		ProductComponent,
		ContactComponent,
		OrganizationComponent,
		
    CommodityComponent
		
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
