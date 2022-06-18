import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, Form } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/global.service';
import { BusExpedienteService } from 'src/app/servicios/bus-expediente.service';
import { BusTitularesService } from 'src/app/servicios/bus-titulares.service';
import { DetalleexpedienteService } from 'src/app/servicios/detalleexpediente.service';
import { ImagenService } from 'src/app/servicios/imagen.service';
import { ProdservService } from 'src/app/servicios/prodserv.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-consulta-titularidad',
  templateUrl: './consulta-titularidad.component.html',
  styleUrls: ['./consulta-titularidad.component.css']
})
export class ConsultaTitularidadComponent implements OnInit {

  frmPnatural = this.formBuilder.group({
    nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(350)]],
    apellidos: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(350)]],
    denominacion: ['', [Validators.maxLength(300)]],
  });

  frmPjuridica = this.formBuilder.group({
    rsocial: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(350)]],
    denominacion: ['', [Validators.maxLength(300)]],
  });

  constructor(private formBuilder: FormBuilder,
    private tokenService : TokenService,
    private busExpedienteService:  BusExpedienteService,
    private detalleexpedienteService: DetalleexpedienteService,
    private _spinner: NgxSpinnerService,
    private modalService: BsModalService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private renderer: Renderer2,
    private toastr: ToastrService,
    private prodservService : ProdservService,
    private imagenService : ImagenService,
    private globalService: GlobalService,
    private busTitularesService: BusTitularesService) {

  }

  nuIdTipoPersona: number=1;
  objParam : any;
  lstTitulares : any[]=[];

  isShowTable: boolean = false;
  idShow: any = -1;

  nuLimitInf: number=1;
  nuLimitSup: number=50;
  nuIngremental : number=50;

  ngOnInit() {

  }

  onSelect(data:TabDirective, tab: number): void {
    this.frmPnatural.reset();
    this.frmPjuridica.reset();
    this.nuIdTipoPersona=tab;
    this.isShowTable = false;
  }

  buscarTitulares(){
    this._spinner.show();
    switch(this.nuIdTipoPersona){
      case 1:
     this.objParam={
      vcNombres: this.frmPnatural.value.nombres,
      vcApellidos: this.frmPnatural.value.apellidos,
      vcDenominacion: this.frmPnatural.value.denominacion,
      nuTipoPersona : this.nuIdTipoPersona,
      nuLimitInf: this.nuLimitInf,
      nuLimitSup: this.nuLimitSup
    }
    break;

    case 2:
     this.objParam={
        vcRazonSocial: this.frmPjuridica.value.rsocial,
        vcDenominacion: this.frmPjuridica.value.denominacion,
        nuTipoPersona : this.nuIdTipoPersona,
        nuLimitInf: this.nuLimitInf,
        nuLimitSup: this.nuLimitSup
      }

    break;

  }

  this.busTitularesService.getWithPost$(this.objParam).subscribe(
    resp => {
      this._spinner.hide();
      this.isShowTable = true;
      this.lstTitulares=resp.lstTitulares;

  }, error => {

  });
  }

  limpiarPersonaNatural(){
    this.isShowTable = false;
  }

  limpiarPersonaJuridica(){

  }

  imprimir() {
    window.print();
  }

  showOne(id: any) {
    if (this.idShow == id) {
      this.idShow = -1;
    } else {
      this.idShow = id;
    }
  }

  doBuscarMas(){
    this._spinner.show();
  this.busTitularesService.getWithPost$(this.objParam).subscribe(
    resp => {
      this._spinner.hide();
      this.isShowTable = true;
      for(let i=0; i<(resp.lstTitulares.length); i++){
      this.lstTitulares.push(resp.lstTitulares[i]);
      }
  }, error => {

  });
  }

  doVerMas(){
    this.nuLimitInf=this.nuLimitInf+this.nuIngremental;
    this.nuLimitSup=this.nuLimitSup+this.nuIngremental;

    this.objParam.nuLimitInf=this.nuLimitInf;
    this.objParam.nuLimitSup=this.nuLimitSup;

    this.doBuscarMas();
  }

}
