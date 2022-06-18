import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/global.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  vcManual : string;

  constructor( private router: Router,
               private globalService: GlobalService,
               private tokenService : TokenService,
               private route: ActivatedRoute,
               private configuracionService: ConfiguracionService,
               private _spinner: NgxSpinnerService,
    ) {
      this.repeat();
    }

  ngOnInit(): void {

  }


  doManual(){
    let lstDoc=this.globalService._objConfiguracion.lstDocumentos

    this.vcManual = lstDoc[0].vcLink; //Manual
  }

  obtenerToken() {

    this.tokenService.obtenerToken$().subscribe(
      resp => {
        // this._spinner.hide();
        if (resp.access_token) {
          //console.log(resp.access_token);
          sessionStorage.setItem("access_token", resp.access_token);
          // sessionStorage.setItem("expire", resp.expires_in)
          this.globalService._expire=resp.expires_in;
          if(!this.globalService._objConfiguracion){
          this.obtenerConfiguracion();
          }

        }
      },
      error => {
        this._spinner.hide();
      },
    );


}

repeat(){
  setTimeout(()=>{
    // console.log("Expire: "+this.globalService._expire);
    this.globalService._expire=this.globalService._expire-1;
    if(!this.globalService._expire){
      this.globalService._expire=10;
       this.obtenerToken();
      }else{
        if(this.globalService._expire<=0){
          this.globalService._expire=10;
          this.obtenerToken();
        }
      }
    this.repeat();
}, 1000);
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

}
