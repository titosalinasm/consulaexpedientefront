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

  lstTipoSolicitud : any[]=[];
  lstCertificados : any[]=[];

  filtersForm = this.formBuilder.group({
    vcNroCertificado: ['', [Validators.required]],
    vcTipoSolicitud: ['', [Validators.required]],
  });

  constructor(
    private globalService: GlobalService,
    private busCertificadoService : BusCertificadoService,
    private _spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    ) {
      this.lstTipoSolicitud=this.globalService.objConfiguracion.lstTipoSolicitud;

    }

  ngOnInit() {

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
        this.showMaximizableDialog();
      },
      error=>{
        this._spinner.hide();
      }
    )
  }

}
