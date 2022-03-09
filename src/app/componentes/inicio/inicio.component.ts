import { Component, OnInit,ViewChild, ɵConsole, Output, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/global.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(  private router: Router,
                private route: ActivatedRoute,
                private globalService: GlobalService,
                private configuracionService: ConfiguracionService,
                private _spinner: NgxSpinnerService,
                ) {
    this.obtenerConfiguracion();
                }

  ngOnInit(): void {

  }

  obtenerConfiguracion(){
    this._spinner.show();
    this.configuracionService.getAll$().subscribe(
      resp=>{
        this._spinner.hide();
        this.globalService._objConfiguracion=resp;
      },
      error=>{
        this._spinner.hide();
      }
    );
  }

  doNavigate(form: number){
    switch(form){
      case 1:
        this.router.navigate(['/consulta-expediente']);
      break;
      case 2:
        this.router.navigate(['/consulta-certificado']);
      break;
      default:
        this.router.navigate(['/inicio']);
      break
    }
  }

}
