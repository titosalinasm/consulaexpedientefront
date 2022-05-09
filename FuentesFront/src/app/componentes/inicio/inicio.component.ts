import { Component, OnInit,ViewChild, ɵConsole, Output, AfterViewInit, AfterContentChecked, AfterViewChecked } from '@angular/core';
import { Router, NavigationStart, ActivatedRoute } from '@angular/router';
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

  constructor(  private router: Router,
                private tokenService : TokenService,
                private route: ActivatedRoute,
                private globalService: GlobalService,
                private configuracionService: ConfiguracionService,
                private _spinner: NgxSpinnerService,
                ) {
            this.obtenerToken()

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

  obtenerToken() {

    this._spinner.show();
      this.tokenService.obtenerToken$().subscribe(
        resp => {
          // this._spinner.hide();
          if (resp.access_token) {
            //console.log(resp.access_token);
            sessionStorage.setItem("access_token", resp.access_token);
            this.obtenerConfiguracion();

          }
        },
        error => {
          this._spinner.hide();
        },
      );

  }

}
