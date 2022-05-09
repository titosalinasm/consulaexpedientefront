import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/global.service';
import { BusCertificadoService } from 'src/app/servicios/bus-certificado.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BusExpRelacionadoService } from 'src/app/servicios/bus-exp-relacionado.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MessageService } from 'primeng/api';
import { RecaptchaErrorParameters } from "ng-recaptcha";
import { TokenService } from 'src/app/servicios/token.service';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-consulta-certificado',
  templateUrl: './consulta-certificado.component.html',
  styleUrls: ['./consulta-certificado.component.css']
})
export class ConsultaCertificadoComponent implements OnInit {

  //controls
  displayMaximizable: boolean=false;

  lstTipoSolicitud : any[]=[];
  lstCertificados : any[]=[];
  objCertificados : any;

  lstExpedienteRelacionado : any[]=[];
  blLoadinExpReal: boolean=true;

  paginaActualExpRel : any=1;

  filtersForm = this.formBuilder.group({
    vcNroCertificado: ['', [Validators.required]],
    vcTipoSolicitud: ['-1', [Validators.required]],
  });

  constructor(
    private globalService: GlobalService,
    private tokenService : TokenService,
    private configuracionService: ConfiguracionService,
    private busCertificadoService : BusCertificadoService,
    private busExpRelacionadoService: BusExpRelacionadoService,
    private _spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
    ) {
      this.obtenerToken();

    }

    public resolved(captchaResponse: string): void {
      console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    public onError(errorDetails: RecaptchaErrorParameters): void {
      console.log(`reCAPTCHA error encountered; details:`, errorDetails);
    }

  ngOnInit() {

  }

  doSeleccionado(item: any){

    //muestra mensaje si esta en periodo de renovación
    if(item.nuFlagPeriodoRen!=0){
    this.messageService.add({severity:'info', summary: 'Información', detail: 'Este Certificado esta en perido de renovación. Si usted es el titular o representante, ingresa a este enlace.'});
    }

    this.displayMaximizable = false;
    let arrTitulares=(item.vcTitulares).split('; ');
    let titularesLis='<ul>';
    let titularConcat='';
    for(let i=0; i<arrTitulares.length; i++){
      titularConcat=titularConcat+'<li>'+arrTitulares[i]+'</li>'
    }

    titularesLis=titularesLis+titularConcat+'</ul>';

    this.objCertificados=item;
    this.objCertificados.listTitulares=titularesLis;

    this.doCargaExpeRelacionado(item.vcNroCertificado, item.nuAnioRegistro);

  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  doLimpiar(){
    this.blLoadinExpReal=true;
    this.objCertificados=null;
    this.lstCertificados=[];
    this.lstExpedienteRelacionado=[];
  }

  doBuscarCertificado(){

    this._spinner.show();

    this.doLimpiar();

    let param={
      vcNroCertificado : this.filtersForm.value.vcNroCertificado,
      vcTipoSolicitud : this.filtersForm.value.vcTipoSolicitud
    }
    this.busCertificadoService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.lstCertificados=resp.lstCertificado;
        if(this.lstCertificados.length==1){

          this.doSeleccionado(this.lstCertificados[0]);
          this.doCargaExpeRelacionado(this.lstCertificados[0].vcNroCertificado, this.lstCertificados[0].nuAnioRegistro);

        }else{
          if(this.lstCertificados.length>0){
             this.showMaximizableDialog();
          }else{
            this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'No se ha encontrado ningun certificado'});
          }
        }
      },
      error=>{
        this._spinner.hide();
      }
    );
  }

  doCargaExpeRelacionado(vcNroCertificado: string, nuAnioRegistro: number){
    // this._spinner.show();
    this.blLoadinExpReal=true;
    let param={
      vcNroCertificado : vcNroCertificado,
      nuAnioRegistro: nuAnioRegistro
    }
    this.busExpRelacionadoService.getWithPost$(param).subscribe(
      resp=>{
        // this._spinner.hide();
        this.blLoadinExpReal=false;
        this.lstExpedienteRelacionado=resp.lstExpRelacionado;

      },
      error=>{
        this.blLoadinExpReal=true;
        // this._spinner.hide();
      }
    );
  }

  obtenerConfiguracion(){
    this._spinner.show();
    this.configuracionService.getAll$().subscribe(
      resp=>{
        this._spinner.hide();
        // this.globalService._objConfiguracion=resp;
        this.lstTipoSolicitud=resp.lstTipoSolicitud;
      },
      error=>{
        this._spinner.hide();
      }
    );
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

onConfirm() {
    this.messageService.clear('c');
}

onReject() {
    this.messageService.clear('c');
}

clear() {
    this.messageService.clear();
}

}
