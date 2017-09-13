import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Page }  from './page';
// import { Observable } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {
  // Resolve HTTP using the constructor
  constructor (private http: Http) {} 
  private pagesUrl = "http://localhost:4200/assets/json/test.json";

   // Fetch all existing comments 
    getPages() : Observable<Page[]>{
        return this.http.get(this.pagesUrl)
          .map(this.extractData)
          .catch(this.handleErrorObservable);
    }

    private extractData(res: Response) {
  let body = res.json();
        return body;
    }
      private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
      }
        private handleErrorPromise (error: Response | any) {
      console.error(error.message || error);
      return Promise.reject(error.message || error);
        }  
}