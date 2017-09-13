import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { QueryService } from './Query.service';
import 'rxjs/add/operator/toPromise';
import { Hero }    from '../Model/hero';
import { Human }    from '../Model/human';
import{ BarcodeModel } from '../Model/barcode.model';
@Component({
	selector: 'app-Query',
	templateUrl: './Query.component.html',
	styleUrls: ['./Query.component.css'],
  providers: [QueryService]
})
export class QueryComponent implements OnInit {
  private retrieving;
  private allAssets;
  private asset;
  private currentId;
	private errorMessage;
  public model1= new Hero();
  public model2 = new Human();
  public Barcode = new BarcodeModel();
   myForm = new FormGroup({
       EDI: new FormControl(),
       ASN: new FormControl()
    });
  constructor(private serviceShipping:QueryService) {
   
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceShipping.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        
            tempList.push(asset);
      });
      this.allAssets = tempList;
      // console.log(tempList);
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

  powers1 = ['Really Smart', 'Super Flexible',
            'Super Hot', 'Weather Changer'];
  powers2 = ['manufacture', 'wholesaler',
            'retail' ];

  submitted = false;
 
  onSubmit() {  
   this.submitted = true;
    //定义一个临时数组，遍历allAssets，将得到的元素存储到tempList中，在这个过程中进行逻辑
    //判断，如果遍历的prodItemBarcode值等于前端输入的值就把这个元素数组保存在tempList中，不然
    //不保存
    let tempList = [];
    this.allAssets.forEach(asset => {
        if("prodItemBarcode:"+this.Barcode.barcode == asset.prodItemBarcode){
            tempList.push(asset);
       }
    });
    this.retrieving = tempList;
    // console.log(this.retrieving);
    // alert(this.model1.power+" & "+this.model2.power +"  "+this.Barcode.barcode); 
   }
  cancle() {
    this.model1.power = "";
    this.model2.power = "";
    this.Barcode.barcode = "";
  }
 }
  