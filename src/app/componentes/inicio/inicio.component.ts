import { Component, OnInit,ViewChild, ɵConsole, Output, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/global.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  vcManual : string;
  constructor(  private router: Router,
                private tokenService : TokenService,
                private route: ActivatedRoute,
                private globalService: GlobalService,
                private configuracionService: ConfiguracionService,
                private _spinner: NgxSpinnerService,
                ) {
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
      case 3:
        this.router.navigate(['/consulta-por-titularidad']);
      break;
      default:
        this.router.navigate(['/inicio']);
      break
    }
  }

}
