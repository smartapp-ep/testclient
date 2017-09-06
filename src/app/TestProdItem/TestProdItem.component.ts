import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TestProdItemService } from './TestProdItem.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-TestProdItem',
	templateUrl: './TestProdItem.component.html',
	styleUrls: ['./TestProdItem.component.css'],
  providers: [TestProdItemService]
})
export class TestProdItemComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      prodItemBarcode = new FormControl("", Validators.required);
  
      orderId = new FormControl("", Validators.required);
  
      prodName = new FormControl("", Validators.required);
  
      prodCode = new FormControl("", Validators.required);
  
      description = new FormControl("", Validators.required);
  
      status = new FormControl("", Validators.required);
  
      currentOwner = new FormControl("", Validators.required);
  
      history = new FormControl("", Validators.required);
  


  constructor(private serviceTestProdItem:TestProdItemService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          prodItemBarcode:this.prodItemBarcode,
        
    
        
          orderId:this.orderId,
        
    
        
          prodName:this.prodName,
        
    
        
          prodCode:this.prodCode,
        
    
        
          description:this.description,
        
    
        
          status:this.status,
        
    
        
          currentOwner:this.currentOwner,
        
    
        
          history:this.history
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTestProdItem.getAll()
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
      $class: "org.acme.trading.TestProdItem",
      
        
          "prodItemBarcode":this.prodItemBarcode.value,
        
      
        
          "orderId":this.orderId.value,
        
      
        
          "prodName":this.prodName.value,
        
      
        
          "prodCode":this.prodCode.value,
        
      
        
          "description":this.description.value,
        
      
        
          "status":this.status.value,
        
      
        
          "currentOwner":this.currentOwner.value,
        
      
        
          "history":this.history.value
        
      
    };

    this.myForm.setValue({
      
        
          "prodItemBarcode":null,
        
      
        
          "orderId":null,
        
      
        
          "prodName":null,
        
      
        
          "prodCode":null,
        
      
        
          "description":null,
        
      
        
          "status":null,
        
      
        
          "currentOwner":null,
        
      
        
          "history":null
        
      
    });

    return this.serviceTestProdItem.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "prodItemBarcode":null,
        
      
        
          "orderId":null,
        
      
        
          "prodName":null,
        
      
        
          "prodCode":null,
        
      
        
          "description":null,
        
      
        
          "status":null,
        
      
        
          "currentOwner":null,
        
      
        
          "history":null 
        
      
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
      $class: "org.acme.trading.TestProdItem",
      
        
          
        
    
        
          
            "orderId":this.orderId.value,
          
        
    
        
          
            "prodName":this.prodName.value,
          
        
    
        
          
            "prodCode":this.prodCode.value,
          
        
    
        
          
            "description":this.description.value,
          
        
    
        
          
            "status":this.status.value,
          
        
    
        
          
            "currentOwner":this.currentOwner.value,
          
        
    
        
          
            "history":this.history.value
          
        
    
    };

    return this.serviceTestProdItem.updateAsset(form.get("prodItemBarcode").value,this.asset)
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

    return this.serviceTestProdItem.deleteAsset(this.currentId)
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

    return this.serviceTestProdItem.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "prodItemBarcode":null,
          
        
          
            "orderId":null,
          
        
          
            "prodName":null,
          
        
          
            "prodCode":null,
          
        
          
            "description":null,
          
        
          
            "status":null,
          
        
          
            "currentOwner":null,
          
        
          
            "history":null 
          
        
      };



      
        if(result.prodItemBarcode){
          formObject.prodItemBarcode = result.prodItemBarcode;
        }else{
          formObject.prodItemBarcode = null;
        }
      
        if(result.orderId){
          formObject.orderId = result.orderId;
        }else{
          formObject.orderId = null;
        }
      
        if(result.prodName){
          formObject.prodName = result.prodName;
        }else{
          formObject.prodName = null;
        }
      
        if(result.prodCode){
          formObject.prodCode = result.prodCode;
        }else{
          formObject.prodCode = null;
        }
      
        if(result.description){
          formObject.description = result.description;
        }else{
          formObject.description = null;
        }
      
        if(result.status){
          formObject.status = result.status;
        }else{
          formObject.status = null;
        }
      
        if(result.currentOwner){
          formObject.currentOwner = result.currentOwner;
        }else{
          formObject.currentOwner = null;
        }
      
        if(result.history){
          formObject.history = result.history;
        }else{
          formObject.history = null;
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
      
        
          "prodItemBarcode":null,
        
      
        
          "orderId":null,
        
      
        
          "prodName":null,
        
      
        
          "prodCode":null,
        
      
        
          "description":null,
        
      
        
          "status":null,
        
      
        
          "currentOwner":null,
        
      
        
          "history":null 
        
      
      });
  }

}
