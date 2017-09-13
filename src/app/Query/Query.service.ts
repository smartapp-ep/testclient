import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { TestProdItem } from '../org.acme.trading';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class QueryService {

  
    private NAMESPACE: string = 'TestProdItem';
  



    constructor(private dataService: DataService<TestProdItem>) {
    };

    public getAll(): Observable<TestProdItem[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<TestProdItem> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<TestProdItem> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<TestProdItem> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<TestProdItem> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
