import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DetalleexpedienteService } from 'src/app/servicios/detalleexpediente.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { LemaService } from 'src/app/servicios/lema.service';

import { ToastrService } from 'ngx-toastr';
import { NombrelogoService } from 'src/app/servicios/nombrelogo.service';
import { ProdservService } from 'src/app/servicios/prodserv.service';


@Component({
  selector: 'app-consulta-certificado',
  templateUrl: './consulta-certificado.component.html',
  styleUrls: ['./consulta-certificado.component.css']
})
export class ConsultaCertificadoComponent implements OnInit {

  @ViewChild('_templateModal') _templateModal: TemplateRef<any>  ;
  modalRef: BsModalRef;
  @ViewChild('_templateResolModal') _templateResolModal: TemplateRef<any> ;

  @ViewChild('_templateProdServicio') _templateProdServicio: TemplateRef<any>  ;

  //controls
  displayMaximizable: boolean=false;
  paginaActual : any=1;

  // lstTipoSolicitud : any[]=[];
  lstCertificados : any[]=[];
  objCertificados : any;

  lstExpediente : any[]=[];
  blLoadinExpReal: boolean=true;

  paginaActualExpRel : any=1;

  filtersForm = this.formBuilder.group({
    vcNroCertificado: ['', [Validators.required]],
    vcTipoSolicitud: ['-1', [Validators.required]],
  });

  objDetalleExpediente : any;
  lstResolucion :any =[];
  objLogoBase64 : any;

  lstLema : any=[];

  lstPersonas : any[]=[];

  objProdServicio : any;

  dismissible :boolean = true;

  constructor(
    public globalService: GlobalService,
    private busCertificadoService : BusCertificadoService,
    private busExpRelacionadoService: BusExpRelacionadoService,
    private _spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private detalleexpedienteService: DetalleexpedienteService,
    private modalService: BsModalService,
    private imagenService : ImagenService,
    private toastr: ToastrService,
    private lemaService : LemaService,
    private nombrelogoService : NombrelogoService,
    private prodservService : ProdservService,
    ) {

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
    // if(item.nuFlagPeriodoRen!=0){
    // this.messageService.add({severity:'info', summary: 'Información', detail: 'Este Certificado esta en perido de renovación. Si usted es el titular o representante, ingresa a este enlace.'});
    // }

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

    // if(item.vcLogo==null){
    // this.obtenerImagenes(item);
    // }

    this.doNombreLogo(item);

    this.doCargaExpeRelacionado(item.vcNroCertificado, item.nuAnioRegistro);

    this.doObtenerLema(item);

  }

  doObtenerLema(item : any){
    let param={
      vcNroCertificado : item.vcNroCertificado,
      nuAnioRegistro : item.nuAnioRegistro
    }
    this.lemaService.getWithPost$(param).subscribe(
      resp=>{
        this.lstLema=resp.lstLema;
      },
      error=>{
        console.log("Ocurrio un error al obtener el lema");
      }
    );
  }

  doNombreLogo(item : any){
    let param={
      vcNroCertificado : item.vcNroCertificado,
      nuAnioRegistro : item.nuAnioRegistro
    }
    this.nombrelogoService.getWithPost$(param).subscribe(
      resp=>{
        // this.lstLema=resp.vcNomLogo;
      this.obtenerImagenes(resp.vcNomLogo);
      },
      error=>{
        console.log("Ocurrio un error al obtener el lema");
      }
    );
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }
  doLimpiar(){
    this.blLoadinExpReal=true;
    this.objCertificados=null;
    this.lstCertificados=[];
    this.lstExpediente=[];
    this.objLogoBase64=null;

    this.filtersForm.controls.vcNroCertificado.setValue('');
    this.filtersForm.controls.vcTipoSolicitud.setValue('-1');

  }

  doBuscarCertificado(){


    this.blLoadinExpReal=true;
    this.objCertificados=null;
    this.lstCertificados=[];
    this.lstExpediente=[];
    this.objLogoBase64=null;

    let param={
      vcNroCertificado : this.filtersForm.value.vcNroCertificado,
      vcTipoSolicitud : this.filtersForm.value.vcTipoSolicitud
    }
    if(this.filtersForm.value.vcNroCertificado){
      if(this.filtersForm.value.vcNroCertificado!='' && this.filtersForm.value.vcNroCertificado!=null){
        this._spinner.show();
    this.busCertificadoService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.lstCertificados=resp.lstCertificado;

        if(this.lstCertificados.length<1){
          this.toastr.warning('No se encontraron resultados para tu busqueda, por favor cambia los parametros e intenta nuevamente.','Resultado');
        }

        if(this.lstCertificados.length==1){

          this.doSeleccionado(this.lstCertificados[0]);
          this.doCargaExpeRelacionado(this.lstCertificados[0].vcNroCertificado, this.lstCertificados[0].nuAnioRegistro);

        }else{
          if(this.lstCertificados.length>0){
             this.showMaximizableDialog();
          }
        }
      },
      error=>{
        this._spinner.hide();
      }
    );
      }else{
        this.toastr.warning('Por favor ingrese algún valor', 'Advertencia');
      }

    }else{
      this.toastr.warning('Por favor ingrese algún valor', 'Advertencia');
    }
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
        this.lstExpediente=resp.lstExpediente;

        for(let i=0; i<this.lstExpediente.length; i++){
          this.obtenerFigura(this.lstExpediente[i], i);
        }

      },
      error=>{
        this.blLoadinExpReal=true;
        // this._spinner.hide();
      }
    );
  }


  doBuscarExpedienteDetalle(item :any){
    this._spinner.show();
    let param={
      vcIdExpediente: item.vcIdExpediente,
      nuAnioExpediente : item.nuAnioExpediente,
      vcIdAreaExpediente: item.vcIdAreaExpediente,
      vcIdTipoExpediente : item.vcIdTipoExpediente
    }
    this.detalleexpedienteService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.objDetalleExpediente=resp;
        let lstPersonaTmp1 : any[]=resp.lstTitulares;
        let lstPersonaTmp2=resp.lstTitulares;


        let lstTitulares=lstPersonaTmp1.filter(p => p.vcIdRepresentado==null);
        let lstRepresentantes=lstPersonaTmp1.filter(p => p.vcIdRepresentado!=null);

        let k=0
        for(let i=0; i<lstTitulares.length; i++){
          lstTitulares[k].lstRepresentes=lstRepresentantes.filter(p => p.vcIdRepresentado==lstTitulares[i].vcIdPersona);
          k++;
        }

        this.lstPersonas=lstTitulares;

        console.log(this.lstPersonas);

        let objClass = {          id: 0 ,
          class: 'modal-lg'
        };
      this.openModal(this._templateModal, objClass);

      },
      error=>{
        this._spinner.hide();
      }
    );
  }

  doAbrirResolucion(item : any){
    this.lstResolucion=item;
    let objClass = {
      id: 1 ,
      class: 'modal-lg'
    };
  this.openModal(this._templateResolModal, objClass);
  }

  obtenerImagenes(vcLogo : any) {
      if (vcLogo!='null') {
        let param={
          vcNombreLogo: vcLogo
        }
        this.imagenService.getWithPost$(param).subscribe(
          resp => {

            if(resp.nuFlagResult==0){
              this.objLogoBase64='data:image/gif;base64,'+resp.recurso;
            }else{
              this.objLogoBase64=null;
            }



        }, error => {

        });
      }

  }

  obtenerFigura(item : any, index: number) {
    if (item.logo!='null') {
      let param={
        vcNombreLogo: item.vcLogo
      }
      this.imagenService.getWithPost$(param).subscribe(
        resp => {

          if(resp.nuFlagResult==0){
            // this.objLogoBase64='data:image/gif;base64,'+resp.recurso;
            this.lstExpediente[index].vcFigura='data:image/gif;base64,'+resp.recurso;
          }else{
            this.lstExpediente[index].vcFigura=null;
          }



      }, error => {

      });
    }
  }

doValidacionInputDoc(event: any) {
  let flag = false;
  var codigo = event.which || event.keyCode;
  console.log(codigo)
  if (codigo != 9 && codigo != 16 && codigo != 17 && codigo != 13 && codigo!=32) {
      // let regx = /^[^<>*@#$&%+{}'°¬!/"()´.,;-_$]*$/;
      let regx =/^[a-zA-Z0-9 ]+$/;
      let result = regx.test(event.key);
      if (result) {
        flag = true;
      }
  }
  return flag;
}

doCargarProdServ(item : any){
  let param={
    vcIdExpediente: item.vcIdExpediente,
    nuAnioExpediente: item.nuAnioExpediente,
    vcIdAreaExpediente: item.vcIdAreaExpediente
  }
  this._spinner.show();
  this.prodservService.getWithPost$(param).subscribe(
    resp=>{
        this.objProdServicio=resp.vcProductoServicio;
        this._spinner.hide();
        let objClass = {
          id: 1 ,
          class: 'modal-lg'
        };
      this.openModal(this._templateProdServicio, objClass);
    },
    error=>{
      this._spinner.hide();
    }
  );

}

  openModal(template: TemplateRef<any>, objClass: any) {
    this.modalRef = this.modalService.show(template, objClass);
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

onClosed(dismissedAlert: any): void {
  dismissedAlert=!dismissedAlert;
}

}
