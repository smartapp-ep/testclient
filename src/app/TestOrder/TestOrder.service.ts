import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { TestOrder } from '../org.acme.trading';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class TestOrderService {

	
		private NAMESPACE: string = 'TestOrder';
	



    constructor(private dataService: DataService<TestOrder>) {
    };

    public getAll(): Observable<TestOrder[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<TestOrder> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<TestOrder> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<TestOrder> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<TestOrder> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
