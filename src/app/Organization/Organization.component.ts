import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { OrganizationService } from './Organization.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Organization',
	templateUrl: './Organization.component.html',
	styleUrls: ['./Organization.component.css'],
  providers: [OrganizationService]
})
export class OrganizationComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      gs1CompanyPrefix = new FormControl("", Validators.required);
  
      organizationName = new FormControl("", Validators.required);
  
      representatives = new FormControl("", Validators.required);
  
      contacts = new FormControl("", Validators.required);
  
      owner = new FormControl("", Validators.required);
  


  constructor(private serviceOrganization:OrganizationService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          gs1CompanyPrefix:this.gs1CompanyPrefix,
        
    
        
          organizationName:this.organizationName,
        
    
        
          representatives:this.representatives,
        
    
        
          contacts:this.contacts,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceOrganization.getAll()
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
      $class: "org.acme.trading.Organization",
      
        
          "gs1CompanyPrefix":this.gs1CompanyPrefix.value,
        
      
        
          "organizationName":this.organizationName.value,
        
      
        
          "representatives":this.representatives.value,
        
      
        
          "contacts":this.contacts.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "gs1CompanyPrefix":null,
        
      
        
          "organizationName":null,
        
      
        
          "representatives":null,
        
      
        
          "contacts":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceOrganization.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "gs1CompanyPrefix":null,
        
      
        
          "organizationName":null,
        
      
        
          "representatives":null,
        
      
        
          "contacts":null,
        
      
        
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
      $class: "org.acme.trading.Organization",
      
        
          
        
    
        
          
            "organizationName":this.organizationName.value,
          
        
    
        
          
            "representatives":this.representatives.value,
          
        
    
        
          
            "contacts":this.contacts.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceOrganization.updateAsset(form.get("gs1CompanyPrefix").value,this.asset)
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

    return this.serviceOrganization.deleteAsset(this.currentId)
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

    return this.serviceOrganization.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "gs1CompanyPrefix":null,
          
        
          
            "organizationName":null,
          
        
          
            "representatives":null,
          
        
          
            "contacts":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.gs1CompanyPrefix){
          formObject.gs1CompanyPrefix = result.gs1CompanyPrefix;
        }else{
          formObject.gs1CompanyPrefix = null;
        }
      
        if(result.organizationName){
          formObject.organizationName = result.organizationName;
        }else{
          formObject.organizationName = null;
        }
      
        if(result.representatives){
          formObject.representatives = result.representatives;
        }else{
          formObject.representatives = null;
        }
      
        if(result.contacts){
          formObject.contacts = result.contacts;
        }else{
          formObject.contacts = null;
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
      
        
          "gs1CompanyPrefix":null,
        
      
        
          "organizationName":null,
        
      
        
          "representatives":null,
        
      
        
          "contacts":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
