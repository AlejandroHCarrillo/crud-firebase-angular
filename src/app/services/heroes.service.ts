import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = "https://login-app-a205a.firebaseio.com"
  
  constructor( private http:HttpClient) { }

  crearHeroe(heroe:HeroeModel){    
    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(
      map((resp:any) => {
        heroe.id = resp.name;
        return heroe.id;
      })
    );
  }

  actualizarHeroe(heroe:HeroeModel){
    let heroeTemp = {...heroe};
    delete heroeTemp.id;
    
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp)
    .pipe(
      map((resp:any) => {
        return resp;
      })
    );
  }
  
  getHeroe(id:string) {
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }

  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
    .pipe(
      map( resp => this.crearArreglo(resp)),
      delay(1500)
    );
  }

  borrarHeroe(id:string){    
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }

  private crearArreglo(heroesObj:object){
    let heroes: HeroeModel[] = [];
    // console.log(heroesObj);

    if(heroesObj === null) { return []; }

    Object.keys( heroesObj ).forEach( key => {
      const heroe : HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });
    
    return heroes;
  }

}
