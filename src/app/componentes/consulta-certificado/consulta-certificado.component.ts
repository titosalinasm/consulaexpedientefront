import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GlobalService } from 'src/app/global.service';
import { BusCertificadoService } from 'src/app/servicios/bus-certificado.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

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

  filtersForm = this.formBuilder.group({
    vcNroCertificado: ['T00001232', [Validators.required]],
    vcTipoSolicitud: ['', [Validators.required]],
  });

  constructor(
    private globalService: GlobalService,
    private busCertificadoService : BusCertificadoService,
    private _spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    ) {
      // this.lstTipoSolicitud=this.globalService.objConfiguracion.lstTipoSolicitud;

    }

  ngOnInit() {

  }
  doSeleccionado(item: any){
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

  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  doBuscarCertificado(){
    this._spinner.show();
    let param={
      vcNroCertificado : this.filtersForm.value.vcNroCertificado
    }
    this.busCertificadoService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.lstCertificados=resp.lstCertificado;
        if(this.lstCertificados.length==1){
          // this.objCertificados=this.lstCertificados[0];
          this.doSeleccionado(this.lstCertificados[0]);
        }else{
        this.showMaximizableDialog();
        }
      },
      error=>{
        this._spinner.hide();
      }
    )
  }

}
