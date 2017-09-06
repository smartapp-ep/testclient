import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ProductInfoService } from './ProductInfo.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-ProductInfo',
	templateUrl: './ProductInfo.component.html',
	styleUrls: ['./ProductInfo.component.css'],
  providers: [ProductInfoService]
})
export class ProductInfoComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      productCode = new FormControl("", Validators.required);
  
      productName = new FormControl("", Validators.required);
  
      description = new FormControl("", Validators.required);
  
      brand = new FormControl("", Validators.required);
  
      manufacturer = new FormControl("", Validators.required);
  


  constructor(private serviceProductInfo:ProductInfoService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          productCode:this.productCode,
        
    
        
          productName:this.productName,
        
    
        
          description:this.description,
        
    
        
          brand:this.brand,
        
    
        
          manufacturer:this.manufacturer
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceProductInfo.getAll()
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
      $class: "org.acme.trading.ProductInfo",
      
        
          "productCode":this.productCode.value,
        
      
        
          "productName":this.productName.value,
        
      
        
          "description":this.description.value,
        
      
        
          "brand":this.brand.value,
        
      
        
          "manufacturer":this.manufacturer.value
        
      
    };

    this.myForm.setValue({
      
        
          "productCode":null,
        
      
        
          "productName":null,
        
      
        
          "description":null,
        
      
        
          "brand":null,
        
      
        
          "manufacturer":null
        
      
    });

    return this.serviceProductInfo.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "productCode":null,
        
      
        
          "productName":null,
        
      
        
          "description":null,
        
      
        
          "brand":null,
        
      
        
          "manufacturer":null 
        
      
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
      $class: "org.acme.trading.ProductInfo",
      
        
          
        
    
        
          
            "productName":this.productName.value,
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "brand":this.brand.value,
          
        
    
        
          
            "manufacturer":this.manufacturer.value
          
        
    
    };

    return this.serviceProductInfo.updateAsset(form.get("productCode").value,this.asset)
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

    return this.serviceProductInfo.deleteAsset(this.currentId)
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

    return this.serviceProductInfo.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "productCode":null,
          
        
          
            "productName":null,
          
        
          
            "description":null,
          
        
          
            "brand":null,
          
        
          
            "manufacturer":null 
          
        
      };



      
        if(result.productCode){
          formObject.productCode = result.productCode;
        }else{
          formObject.productCode = null;
        }
      
        if(result.productName){
          formObject.productName = result.productName;
        }else{
          formObject.productName = null;
        }
      
        if(result.description){
          formObject.description = result.description;
        }else{
          formObject.description = null;
        }
      
        if(result.brand){
          formObject.brand = result.brand;
        }else{
          formObject.brand = null;
        }
      
        if(result.manufacturer){
          formObject.manufacturer = result.manufacturer;
        }else{
          formObject.manufacturer = null;
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
        
      
        
          "productName":null,
        
      
        
          "description":null,
        
      
        
          "brand":null,
        
      
        
          "manufacturer":null 
        
      
      });
  }

}
