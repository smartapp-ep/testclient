import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ProductInfo } from '../org.acme.trading';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ProductInfoService {

	
		private NAMESPACE: string = 'ProductInfo';
	



    constructor(private dataService: DataService<ProductInfo>) {
    };

    public getAll(): Observable<ProductInfo[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<ProductInfo> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<ProductInfo> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<ProductInfo> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<ProductInfo> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
