import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Contact } from '../org.acme.trading';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class ContactService {

	
		private NAMESPACE: string = 'Contact';
	



    constructor(private dataService: DataService<Contact>) {
    };

    public getAll(): Observable<Contact[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Contact> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Contact> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Contact> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Contact> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
