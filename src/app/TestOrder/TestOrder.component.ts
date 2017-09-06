import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TestOrderService } from './TestOrder.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-TestOrder',
	templateUrl: './TestOrder.component.html',
	styleUrls: ['./TestOrder.component.css'],
  providers: [TestOrderService]
})
export class TestOrderComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      orderId = new FormControl("", Validators.required);
  
      comOrderId = new FormControl("", Validators.required);
  
      prodItems = new FormControl("", Validators.required);
  


  constructor(private serviceTestOrder:TestOrderService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          orderId:this.orderId,
        
    
        
          comOrderId:this.comOrderId,
        
    
        
          prodItems:this.prodItems
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTestOrder.getAll()
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
      $class: "org.acme.trading.TestOrder",
      
        
          "orderId":this.orderId.value,
        
      
        
          "comOrderId":this.comOrderId.value,
        
      
        
          "prodItems":this.prodItems.value
        
      
    };

    this.myForm.setValue({
      
        
          "orderId":null,
        
      
        
          "comOrderId":null,
        
      
        
          "prodItems":null
        
      
    });

    return this.serviceTestOrder.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "orderId":null,
        
      
        
          "comOrderId":null,
        
      
        
          "prodItems":null 
        
      
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
      $class: "org.acme.trading.TestOrder",
      
        
          
        
    
        
          
            "comOrderId":this.comOrderId.value,
          
        
    
        
          
            "prodItems":this.prodItems.value
          
        
    
    };

    return this.serviceTestOrder.updateAsset(form.get("orderId").value,this.asset)
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

    return this.serviceTestOrder.deleteAsset(this.currentId)
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

    return this.serviceTestOrder.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "orderId":null,
          
        
          
            "comOrderId":null,
          
        
          
            "prodItems":null 
          
        
      };



      
        if(result.orderId){
          formObject.orderId = result.orderId;
        }else{
          formObject.orderId = null;
        }
      
        if(result.comOrderId){
          formObject.comOrderId = result.comOrderId;
        }else{
          formObject.comOrderId = null;
        }
      
        if(result.prodItems){
          formObject.prodItems = result.prodItems;
        }else{
          formObject.prodItems = null;
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
      
        
          "orderId":null,
        
      
        
          "comOrderId":null,
        
      
        
          "prodItems":null 
        
      
      });
  }

}
