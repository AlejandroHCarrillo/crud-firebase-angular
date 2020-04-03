import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe.model';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();

  constructor( private heroesService: HeroesService,
                private route: ActivatedRoute
                ) { }

  ngOnInit() {
     const id = this.route.snapshot.paramMap.get('id');

     if (id !== 'nuevo'){
        this.heroesService.getHeroe(id)
        .subscribe( (resp:HeroeModel) => {
          console.log(resp);
          this.heroe = resp;
          this.heroe.id = id;
        })
     }
    }

  guardar(form: NgForm){
    if( form.invalid ){
      console.log('Invalid form');
      return;      
    }

    Swal.fire({
      title: 'Espere', 
      text: 'Guardado informacion', 
      icon: 'info', 
      confirmButtonText: "OK",
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion : Observable<any>;

    let alerttext = "";
    if( this.heroe.id ){
      alerttext = 'Se actualizo correctamente';
      peticion = this.heroesService.actualizarHeroe(this.heroe);
    } else { 
      alerttext = 'Se creo correctamente';
      peticion = this.heroesService.crearHeroe(this.heroe);
    }

    peticion.subscribe( resp => {
      Swal.fire({
        title: this.heroe.nombre, 
        text: alerttext, 
        icon: 'success', 
        confirmButtonText: "OK",
        allowOutsideClick: false
      });
    })

  }
}
