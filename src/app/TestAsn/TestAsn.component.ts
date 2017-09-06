import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { TestAsnService } from './TestAsn.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-TestAsn',
	templateUrl: './TestAsn.component.html',
	styleUrls: ['./TestAsn.component.css'],
  providers: [TestAsnService]
})
export class TestAsnComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      asnId = new FormControl("", Validators.required);
  
      comAsnId = new FormControl("", Validators.required);
  
      containers = new FormControl("", Validators.required);
  
      customerName = new FormControl("", Validators.required);
  
      customerCode = new FormControl("", Validators.required);
  


  constructor(private serviceTestAsn:TestAsnService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          asnId:this.asnId,
        
    
        
          comAsnId:this.comAsnId,
        
    
        
          containers:this.containers,
        
    
        
          customerName:this.customerName,
        
    
        
          customerCode:this.customerCode
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceTestAsn.getAll()
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
      $class: "org.acme.trading.TestAsn",
      
        
          "asnId":this.asnId.value,
        
      
        
          "comAsnId":this.comAsnId.value,
        
      
        
          "containers":this.containers.value,
        
      
        
          "customerName":this.customerName.value,
        
      
        
          "customerCode":this.customerCode.value
        
      
    };

    this.myForm.setValue({
      
        
          "asnId":null,
        
      
        
          "comAsnId":null,
        
      
        
          "containers":null,
        
      
        
          "customerName":null,
        
      
        
          "customerCode":null
        
      
    });

    return this.serviceTestAsn.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "asnId":null,
        
      
        
          "comAsnId":null,
        
      
        
          "containers":null,
        
      
        
          "customerName":null,
        
      
        
          "customerCode":null 
        
      
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
      $class: "org.acme.trading.TestAsn",
      
        
          
        
    
        
          
            "comAsnId":this.comAsnId.value,
          
        
    
        
          
            "containers":this.containers.value,
          
        
    
        
          
            "customerName":this.customerName.value,
          
        
    
        
          
            "customerCode":this.customerCode.value
          
        
    
    };

    return this.serviceTestAsn.updateAsset(form.get("asnId").value,this.asset)
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

    return this.serviceTestAsn.deleteAsset(this.currentId)
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

    return this.serviceTestAsn.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "asnId":null,
          
        
          
            "comAsnId":null,
          
        
          
            "containers":null,
          
        
          
            "customerName":null,
          
        
          
            "customerCode":null 
          
        
      };



      
        if(result.asnId){
          formObject.asnId = result.asnId;
        }else{
          formObject.asnId = null;
        }
      
        if(result.comAsnId){
          formObject.comAsnId = result.comAsnId;
        }else{
          formObject.comAsnId = null;
        }
      
        if(result.containers){
          formObject.containers = result.containers;
        }else{
          formObject.containers = null;
        }
      
        if(result.customerName){
          formObject.customerName = result.customerName;
        }else{
          formObject.customerName = null;
        }
      
        if(result.customerCode){
          formObject.customerCode = result.customerCode;
        }else{
          formObject.customerCode = null;
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
      
        
          "asnId":null,
        
      
        
          "comAsnId":null,
        
      
        
          "containers":null,
        
      
        
          "customerName":null,
        
      
        
          "customerCode":null 
        
      
      });
  }

}
