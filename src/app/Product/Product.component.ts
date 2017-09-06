import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductService } from './Product.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Product',
	templateUrl: './Product.component.html',
	styleUrls: ['./Product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      productCode = new FormControl("", Validators.required);
  
      productInfo = new FormControl("", Validators.required);
  
      productItems = new FormControl("", Validators.required);
  
      owner = new FormControl("", Validators.required);
  


  constructor(private serviceProduct:ProductService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          productCode:this.productCode,
        
    
        
          productInfo:this.productInfo,
        
    
        
          productItems:this.productItems,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceProduct.getAll()
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
      $class: "org.acme.trading.Product",
      
        
          "productCode":this.productCode.value,
        
      
        
          "productInfo":this.productInfo.value,
        
      
        
          "productItems":this.productItems.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "productCode":null,
        
      
        
          "productInfo":null,
        
      
        
          "productItems":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceProduct.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "productCode":null,
        
      
        
          "productInfo":null,
        
      
        
          "productItems":null,
        
      
        
          "owner":null 
        
      
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
      $class: "org.acme.trading.Product",
      
        
          
        
    
        
          
            "productInfo":this.productInfo.value,
          
        
    
        
          
            "productItems":this.productItems.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceProduct.updateAsset(form.get("productCode").value,this.asset)
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

    return this.serviceProduct.deleteAsset(this.currentId)
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

    return this.serviceProduct.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "productCode":null,
          
        
          
            "productInfo":null,
          
        
          
            "productItems":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.productCode){
          formObject.productCode = result.productCode;
        }else{
          formObject.productCode = null;
        }
      
        if(result.productInfo){
          formObject.productInfo = result.productInfo;
        }else{
          formObject.productInfo = null;
        }
      
        if(result.productItems){
          formObject.productItems = result.productItems;
        }else{
          formObject.productItems = null;
        }
      
        if(result.owner){
          formObject.owner = result.owner;
        }else{
          formObject.owner = null;
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
      
        
          "productCode":null,
        
      
        
          "productInfo":null,
        
      
        
          "productItems":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
