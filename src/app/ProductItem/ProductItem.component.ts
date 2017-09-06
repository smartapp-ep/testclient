import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductItemService } from './ProductItem.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ProductItem',
	templateUrl: './ProductItem.component.html',
	styleUrls: ['./ProductItem.component.css'],
  providers: [ProductItemService]
})
export class ProductItemComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      productItemBarcode = new FormControl("", Validators.required);
  
      productInfo = new FormControl("", Validators.required);
  
      historyRecord = new FormControl("", Validators.required);
  
      currentOwner = new FormControl("", Validators.required);
  


  constructor(private serviceProductItem:ProductItemService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          productItemBarcode:this.productItemBarcode,
        
    
        
          productInfo:this.productInfo,
        
    
        
          historyRecord:this.historyRecord,
        
    
        
          currentOwner:this.currentOwner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceProductItem.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
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

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.acme.trading.ProductItem",
      
        
          "productItemBarcode":this.productItemBarcode.value,
        
      
        
          "productInfo":this.productInfo.value,
        
      
        
          "historyRecord":this.historyRecord.value,
        
      
        
          "currentOwner":this.currentOwner.value
        
      
    };

    this.myForm.setValue({
      
        
          "productItemBarcode":null,
        
      
        
          "productInfo":null,
        
      
        
          "historyRecord":null,
        
      
        
          "currentOwner":null
        
      
    });

    return this.serviceProductItem.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "productItemBarcode":null,
        
      
        
          "productInfo":null,
        
      
        
          "historyRecord":null,
        
      
        
          "currentOwner":null 
        
      
      });
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


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.acme.trading.ProductItem",
      
        
          
        
    
        
          
            "productInfo":this.productInfo.value,
          
        
    
        
          
            "historyRecord":this.historyRecord.value,
          
        
    
        
          
            "currentOwner":this.currentOwner.value
          
        
    
    };

    return this.serviceProductItem.updateAsset(form.get("productItemBarcode").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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


  deleteAsset(): Promise<any> {

    return this.serviceProductItem.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
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

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceProductItem.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "productItemBarcode":null,
          
        
          
            "productInfo":null,
          
        
          
            "historyRecord":null,
          
        
          
            "currentOwner":null 
          
        
      };



      
        if(result.productItemBarcode){
          formObject.productItemBarcode = result.productItemBarcode;
        }else{
          formObject.productItemBarcode = null;
        }
      
        if(result.productInfo){
          formObject.productInfo = result.productInfo;
        }else{
          formObject.productInfo = null;
        }
      
        if(result.historyRecord){
          formObject.historyRecord = result.historyRecord;
        }else{
          formObject.historyRecord = null;
        }
      
        if(result.currentOwner){
          formObject.currentOwner = result.currentOwner;
        }else{
          formObject.currentOwner = null;
        }
      

      this.myForm.setValue(formObject);

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

  resetForm(): void{
    this.myForm.setValue({
      
        
          "productItemBarcode":null,
        
      
        
          "productInfo":null,
        
      
        
          "historyRecord":null,
        
      
        
          "currentOwner":null 
        
      
      });
  }

}
