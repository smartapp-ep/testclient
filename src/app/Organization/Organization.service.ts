import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Organization } from '../org.acme.trading';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class OrganizationService {

	
		private NAMESPACE: string = 'Organization';
	



    constructor(private dataService: DataService<Organization>) {
    };

    public getAll(): Observable<Organization[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Organization> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Organization> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Organization> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Organization> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
