
import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { TestChainPart } from '../org.acme.trading';
import { TestAsnShipAuto } from '../org.acme.trading';
import 'rxjs/Rx';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
// Can be injected into a constructor
@Injectable()
export class ShippingService {

 
    private NAMESPACE: string = 'TestChainPart';
    private ADDASNSHIP:string = 'TestAsnShipAuto';

    constructor(private dataService: DataService<any>,private http: Http) {
    };
    
 
    public getAll(): Observable<TestChainPart[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    // public getAsset(id: any): Observable<TestAsn> {
    //   return this.dataService.getSingle(this.NAMESPACE, id);
    // }

    // public addAsset(itemToAdd: any): Observable<TestAsn> {
    //   return this.dataService.add(this.NAMESPACE, itemToAdd);
    // }
    public addTestAsnShipAuto(itemToAdd: any): Observable<TestAsnShipAuto> {
      return this.dataService.add(this.ADDASNSHIP, itemToAdd);
    }
    // public updateAsset(id: any, itemToUpdate: any): Observable<TestAsn> {
    //   return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    // }

    // public deleteAsset(id: any): Observable<TestAsn> {
    //   return this.dataService.delete(this.NAMESPACE, id);
    // }

}
