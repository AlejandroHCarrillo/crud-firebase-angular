import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = "https://login-app-a205a.firebaseio.com"
  
  constructor( private http:HttpClient) { }

  crearHeroe(heroe:HeroeModel){
    console.log(`Post url: ${this.url}`);
    
    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(
      map((resp:any) => {
        heroe.id = resp.name;
        return heroe.id;
      })
    );
  }

  ///////////////////////////////////////////
  // getHeroe(): Observable<HeroeModel[ ]> {
  //   return this.http.get(name)
  //     .map((res: Response) => <HeroeModel[ ]>res.json())
  //     .catch(this.handleError);
  // }
  
  // addHeroe(name: string): Observable<HeroeModel>  {
  //   let body = JSON.stringify({ name });
  //   let headers = new Headers({ 'Content-Type': 'application/json'});
  //   let options = new RequestOptions({ headers: headers });
  
  //   return this.http.post(this.url, body, options)
  //     .map(this.handleResponse)
  //   .catch(this.handleError);
  // }
  // private handleError(error: Response) {
  //   console.error(error);
  //   return Observable.throw(error.json().error || 'Server error');
  // }
  

  ///////////////////////////////////////////
}
