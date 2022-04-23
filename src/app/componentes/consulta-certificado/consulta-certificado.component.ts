import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/global.service';
import { BusCertificadoService } from 'src/app/servicios/bus-certificado.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BusExpRelacionadoService } from 'src/app/servicios/bus-exp-relacionado.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-consulta-certificado',
  templateUrl: './consulta-certificado.component.html',
  styleUrls: ['./consulta-certificado.component.css']
})
export class ConsultaCertificadoComponent implements OnInit {

  //controls
  displayMaximizable: boolean=false;

  lstTipoSolicitud : any[]=[
    {
        "vcCodigoSolicitud": "01",
        "vcDescSolicitud": "MARCA DE PRODUCTO"
    },
    {
        "vcCodigoSolicitud": "02",
        "vcDescSolicitud": "MARCA DE SERVICIO"
    },
    {
        "vcCodigoSolicitud": "03",
        "vcDescSolicitud": "LEMA COMERCIAL"
    },
    {
        "vcCodigoSolicitud": "04",
        "vcDescSolicitud": "NOMBRE COMERCIAL"
    },
    {
        "vcCodigoSolicitud": "05",
        "vcDescSolicitud": "AUTORIZACION DE USO PISCO"
    },
    {
        "vcCodigoSolicitud": "06",
        "vcDescSolicitud": "MARCA COLECTIVA"
    },
    {
        "vcCodigoSolicitud": "07",
        "vcDescSolicitud": "MARCA DE CERTIFICACION"
    },
    {
        "vcCodigoSolicitud": "08",
        "vcDescSolicitud": "MARCA DE GARANTIA"
    },
    {
        "vcCodigoSolicitud": "09",
        "vcDescSolicitud": "DENOMIN. ORIGEN NACIONAL"
    },
    {
        "vcCodigoSolicitud": "10",
        "vcDescSolicitud": "DENOMIN. ORIGEN EXTRANJERA"
    },
    {
        "vcCodigoSolicitud": "11",
        "vcDescSolicitud": "AUTORIZ. CONSEJO REGULADOR"
    },
    {
        "vcCodigoSolicitud": "12",
        "vcDescSolicitud": "AUTORIZACION DE USO CHULUCANAS"
    },
    {
        "vcCodigoSolicitud": "13",
        "vcDescSolicitud": "MULTICLASE MARCA PRODUCTO Y/O SERVICIO"
    },
    {
        "vcCodigoSolicitud": "14",
        "vcDescSolicitud": "LISBOA DENOM. DE ORIGEN"
    },
    {
        "vcCodigoSolicitud": "15",
        "vcDescSolicitud": "MULTICLASE MARCA CERTIFICACION"
    },
    {
        "vcCodigoSolicitud": "16",
        "vcDescSolicitud": "MARCA PAIS"
    }
];
  lstCertificados : any[]=[];
  objCertificados : any;

  lstExpedienteRelacionado : any[]=[];
  blLoadinExpReal: boolean=true;

  paginaActualExpRel : any=1;

  filtersForm = this.formBuilder.group({
    vcNroCertificado: ['T00001232', [Validators.required]],
    vcTipoSolicitud: ['-1', [Validators.required]],
  });

  constructor(
    private globalService: GlobalService,
    private busCertificadoService : BusCertificadoService,
    private busExpRelacionadoService: BusExpRelacionadoService,
    private _spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private messageService: MessageService
    ) {
      // this.lstTipoSolicitud=this.globalService.objConfiguracion.lstTipoSolicitud;

    }

  ngOnInit() {

  }

  doSeleccionado(item: any){

    //muestra mensaje si esta en periodo de renovación
    if(item.nuFlagPeriodoRen!=0){
    this.messageService.add({severity:'info', summary: 'Información', detail: 'Este Certificado en perido de renovación. Si usted es el titular o representante, ingresa a este enlace.'});
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
