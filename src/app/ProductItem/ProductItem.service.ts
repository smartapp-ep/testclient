import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { ProductItem } from '../org.acme.trading';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ProductItemService {

	
		private NAMESPACE: string = 'ProductItem';
	



    constructor(private dataService: DataService<ProductItem>) {
    };

    public getAll(): Observable<ProductItem[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<ProductItem> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<ProductItem> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<ProductItem> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<ProductItem> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
