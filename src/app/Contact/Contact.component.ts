import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ContactService } from './Contact.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Contact',
	templateUrl: './Contact.component.html',
	styleUrls: ['./Contact.component.css'],
  providers: [ContactService]
})
export class ContactComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      email = new FormControl("", Validators.required);
  
      firstName = new FormControl("", Validators.required);
  
      lastName = new FormControl("", Validators.required);
  
      phoneNumber = new FormControl("", Validators.required);
  
      owner = new FormControl("", Validators.required);
  


  constructor(private serviceContact:ContactService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          email:this.email,
        
    
        
          firstName:this.firstName,
        
    
        
          lastName:this.lastName,
        
    
        
          phoneNumber:this.phoneNumber,
        
    
        
          owner:this.owner
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceContact.getAll()
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
      $class: "org.acme.trading.Contact",
      
        
          "email":this.email.value,
        
      
        
          "firstName":this.firstName.value,
        
      
        
          "lastName":this.lastName.value,
        
      
        
          "phoneNumber":this.phoneNumber.value,
        
      
        
          "owner":this.owner.value
        
      
    };

    this.myForm.setValue({
      
        
          "email":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "phoneNumber":null,
        
      
        
          "owner":null
        
      
    });

    return this.serviceContact.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "email":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "phoneNumber":null,
        
      
        
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
      $class: "org.acme.trading.Contact",
      
        
          
        
    
        
          
            "firstName":this.firstName.value,
          
        
    
        
          
            "lastName":this.lastName.value,
          
        
    
        
          
            "phoneNumber":this.phoneNumber.value,
          
        
    
        
          
            "owner":this.owner.value
          
        
    
    };

    return this.serviceContact.updateAsset(form.get("email").value,this.asset)
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

    return this.serviceContact.deleteAsset(this.currentId)
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

    return this.serviceContact.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "email":null,
          
        
          
            "firstName":null,
          
        
          
            "lastName":null,
          
        
          
            "phoneNumber":null,
          
        
          
            "owner":null 
          
        
      };



      
        if(result.email){
          formObject.email = result.email;
        }else{
          formObject.email = null;
        }
      
        if(result.firstName){
          formObject.firstName = result.firstName;
        }else{
          formObject.firstName = null;
        }
      
        if(result.lastName){
          formObject.lastName = result.lastName;
        }else{
          formObject.lastName = null;
        }
      
        if(result.phoneNumber){
          formObject.phoneNumber = result.phoneNumber;
        }else{
          formObject.phoneNumber = null;
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
      
        
          "email":null,
        
      
        
          "firstName":null,
        
      
        
          "lastName":null,
        
      
        
          "phoneNumber":null,
        
      
        
          "owner":null 
        
      
      });
  }

}
