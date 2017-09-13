import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ShippingService } from './Shipping.service';
import 'rxjs/add/operator/toPromise';
import { Hero }    from '../Model/hero';
import { Human }    from '../Model/human';
import{ BarcodeModel } from '../Model/barcode.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Page } from './page';
import { Observable } from 'rxjs/Observable';
@Component({
	selector: 'app-Shipping',
	templateUrl: './Shipping.component.html',
	styleUrls: ['./Shipping.component.css'],
  providers: [ShippingService]
})
export class ShippingComponent implements OnInit {
  private allAssets;
  private asset;
  private currentId;
	private errorMessage;
  private model1= new Hero();
  private model2 = new Human();
  private Barcode = new BarcodeModel();
  private JsonObj;
  myForm = new FormGroup({
       EDI: new FormControl(),
       ASN: new FormControl()
    });

  constructor(private http: Http,private serviceShipping:ShippingService) {
    var JsonObj;
  };
  // pages: Page[];
    
  ngOnInit(): void {
    console.log("hzl");
    this.loadAll();
    // this.getPages();
  }

   loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceShipping.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset.organName);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
        this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

 handleFileSelect(evt) {
     var files = evt.target.files; // FileList object
     var f = files[0];  //f是文件的详细信息
     var reader = new FileReader();
     var Json;
    
       reader.readAsText(f);
      // Closure to capture the file information.
      reader.onload = (f => {
        return e => {
          // Render thumbnail.
        this.JsonObj = JSON.parse(e.target.result);//e.target.result返回的是json文件中的详细内容
         // console.log(this.JsonObj.containers);         //JsonObj返回的是内容的缩略图
         console.log(this.JsonObj);
         // ()=>{this.JsonObj = Json};
        };
      })(f) ;
       
      // Read in the image file as a data URL.

           if(Json!=null){
         
              console.log(Json);
            }else{
              console.log("hzl");
            }
      
    }


  powers1 = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
   // powers2 = ['manufacture', 'wholesaler',
   //          'retail' ];

 

  submitted = false;
 
  onSubmit() {   
     // console.log(this.Barcode.barcode);
    this.submitted = true; 
    // if(form.barcode === this.allAssets[0].asnId){
     
    //  }
    console.log(this.JsonObj);
     this.addTestAsnShipAuto();
    alert(this.model1.power+" & "+this.model2.power +"  "+this.Barcode.barcode); }
  cancle() {
    this.model1.power = "";
    this.model2.power = "";
    this.Barcode.barcode = "";
  }
  addTestAsnShipAuto(): Promise<any> {
     console.log(this.JsonObj);
    return this.serviceShipping.addTestAsnShipAuto(this.JsonObj)
    .toPromise()
    .then(() => {
			this.errorMessage = null
      
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


  //  updateAsset(form: any): Promise<any> {
  //   this.asset = {
  //     $class: "org.acme.trading.Shipping",
      
        
          
        
    
        
          
  //           "description":this.description.value,
          
        
    
        
          
  //           "mainExchange":this.mainExchange.value,
          
        
    
        
          
  //           "quantity":this.quantity.value,
          
        
    
        
          
  //           "owner":this.owner.value
          
        
    
  //   };

  //   return this.serviceShipping.updateAsset(form.get("tradingSymbol").value,this.asset)
		// .toPromise()
		// .then(() => {
		// 	this.errorMessage = null;
		// })
		// .catch((error) => {
  //           if(error == 'Server error'){
		// 		this.errorMessage = "Could not connect to REST server. Please check your configuration details";
		// 	}
  //           else if(error == '404 - Not Found'){
		// 		this.errorMessage = "404 - Could not find API route. Please check your available APIs."
		// 	}
		// 	else{
		// 		this.errorMessage = error;
		// 	}
  //   });
  // }


  // deleteAsset(): Promise<any> {

  //   return this.serviceShipping.deleteAsset(this.currentId)
		// .toPromise()
		// .then(() => {
		// 	this.errorMessage = null;
		// })
		// .catch((error) => {
  //           if(error == 'Server error'){
		// 		this.errorMessage = "Could not connect to REST server. Please check your configuration details";
		// 	}
		// 	else if(error == '404 - Not Found'){
		// 		this.errorMessage = "404 - Could not find API route. Please check your available APIs."
		// 	}
		// 	else{
		// 		this.errorMessage = error;
		// 	}
  //   });
  // }

  // setId(id: any): void{
  //   this.currentId = id;
  // }

  // getForm(id: any): Promise<any>{

  //   return this.serviceShipping.getAsset(id)
  //   .toPromise()
  //   .then((result) => {
		// 	this.errorMessage = null;
  //     let formObject = {
        
          
  //           "tradingSymbol":null,
          
        
          
  //           "description":null,
          
        
          
  //           "mainExchange":null,
          
        
          
  //           "quantity":null,
          
        
          
  //           "owner":null 
          
        
  //     };



      
  //       if(result.tradingSymbol){
  //         formObject.tradingSymbol = result.tradingSymbol;
  //       }else{
  //         formObject.tradingSymbol = null;
  //       }
      
  //       if(result.description){
  //         formObject.description = result.description;
  //       }else{
  //         formObject.description = null;
  //       }
      
  //       if(result.mainExchange){
  //         formObject.mainExchange = result.mainExchange;
  //       }else{
  //         formObject.mainExchange = null;
  //       }
      
  //       if(result.quantity){
  //         formObject.quantity = result.quantity;
  //       }else{
  //         formObject.quantity = null;
  //       }
      
  //       if(result.owner){
  //         formObject.owner = result.owner;
  //       }else{
  //         formObject.owner = null;
  //       }
      

  //     this.myForm.setValue(formObject);

    // })
    // .catch((error) => {
    //     if(error == 'Server error'){
    //         this.errorMessage = "Could not connect to REST server. Please check your configuration details";
    //     }
    //     else if(error == '404 - Not Found'){
				// this.errorMessage = "404 - Could not find API route. Please check your available APIs."
    //     }
    //     else{
    //         this.errorMessage = error;
    //     }
    // });

  // }

  // resetForm(): void{
  //   this.myForm.setValue({
      
        
  //         "tradingSymbol":null,
        
      
        
  //         "description":null,
        
      
        
  //         "mainExchange":null,
        
      
        
  //         "quantity":null,
        
      
        
  //         "owner":null 
        
      
  //     });
  // }

}
