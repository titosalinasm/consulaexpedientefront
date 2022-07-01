import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, Form, FormArray } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { TabDirective } from 'ngx-bootstrap/tabs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { GlobalService } from 'src/app/global.service';
import { BusExpedienteService } from 'src/app/servicios/bus-expediente.service';
import { BusTitularesService } from 'src/app/servicios/bus-titulares.service';
import { DetalleexpedienteService } from 'src/app/servicios/detalleexpediente.service';
import { EstadisticaService } from 'src/app/servicios/estadistica.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { ExpedienteXTitularService } from 'src/app/servicios/expediente-x-titular.service';
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

  title: string;
  data : any[]=[];
   columnNames = ['Certificados', 'Porcentaje'];
   options = {
      pieHole:0.4
   };

   p: number[] = [];

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
    private busTitularesService: BusTitularesService,
    private expedienteXTitularService: ExpedienteXTitularService,
    private estadisticaService : EstadisticaService,
    private _excel: ExcelService) {
  }


  nuIdTipoPersona: number=1;
  objParam : any;
  lstTitulares : any[]=[];
  lstSelectTitulares : any[]=[];

  isShowTable: boolean = false;
  idShow: any = -1;

  nuLimitInf: number=1;
  nuLimitSup: number=100;
  nuIngremental : number=100;

  lstFiltroProcedimiento: any[]=[];
  lstFiltroClases: any[]=[];

  modalRef: BsModalRef;

  @ViewChild('_modalFiltro') _modalFiltro: TemplateRef<any>;
  @ViewChild('_modalEstadistica') _modalEstadistica: TemplateRef<any>;

  _spinner_simple : boolean =false;


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
      for(let i=0; i<this.lstTitulares.length; i++){
        let objParam={
          nuRow: i,
          blView: false
          }
        this.lstSelectTitulares.push(objParam);
      }
      this.globalService._lstTitularesBackup=Object.assign([], this.lstTitulares);
      this.lstFiltroProcedimiento=[];
      this.lstFiltroClases=[];

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
    this.lstSelectTitulares[id].blView=!this.lstSelectTitulares[id].blView
  }

  doBuscarMas(){
    this._spinner.show();
  this.busTitularesService.getWithPost$(this.objParam).subscribe(
    resp => {
      this._spinner.hide();
      this.isShowTable = true;
      for(let i=0; i<(resp.lstTitulares.length); i++){
      this.lstTitulares.push(resp.lstTitulares[i]);

      this.globalService._lstTitularesBackup=Object.assign([], this.lstTitulares);
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

  doExpedienteXTitular(vcTitular : string, row : number){
    this._spinner_simple=true;
    if(!this.lstTitulares[row].lstExpedienteTitular){
    let param={
      vcTitular: vcTitular
    }
  this.expedienteXTitularService.getWithPost$(param).subscribe(
    resp => {
       this._spinner_simple=false;

      this.lstTitulares[row].lstExpedienteTitular=resp.lstExpedienteTitular;

      this.globalService._lstTitularesBackup=Object.assign([], this.lstTitulares);

      this.doCargarFiltrosSinModal();

  }, error => {
    this._spinner_simple=false;
  });

}else{
  this._spinner_simple=false;
}
}

doCargarFiltrosSinModal(){
  this.lstTitulares=JSON.parse(JSON.stringify(this.globalService._lstTitularesBackup));

  this.lstFiltroProcedimiento=[];
  this.lstFiltroClases=[];

  let lstProcedimiento=[];
  let lstClases=[];

  // toma la sub lista
  for(let i=0; i<this.lstTitulares.length; i++){
    if(this.lstTitulares[i].lstExpedienteTitular){
     for(let j=0; j<this.lstTitulares[i].lstExpedienteTitular.length; j++){
      lstProcedimiento.push(this.lstTitulares[i].lstExpedienteTitular[j].vcTipoProcedimiento);
      lstClases.push(this.lstTitulares[i].lstExpedienteTitular[j].nuClase);
     }
    }
  }


  const objCantidadxProcedimiento : any[]= [];
  lstProcedimiento.forEach(function (x) {objCantidadxProcedimiento[x] = (objCantidadxProcedimiento[x] || 0) + 1; });//cuenta repetidos

  const objCantidadClases : any[]= [];
  lstClases.forEach(function (x) { objCantidadClases[x] = (objCantidadClases[x] || 0) + 1; });//Cuenta repetidos

  let lstTmpFiltroProcedimiento : any[]= [...new Set(lstProcedimiento)]; //Elimina repetidos
  let lstTmpFiltroClases= [...new Set(lstClases)]; //Elimina repetidos

  lstTmpFiltroProcedimiento.sort(); //Ordena no numerico
  //Se agregan el filtro resultante del tipo de procedimiento
  for(let i=0; i<lstTmpFiltroProcedimiento.length; i++){
    for(let item in objCantidadxProcedimiento){
      if(item==lstTmpFiltroProcedimiento[i]){
        let objProcedimiento={
          vcTipoProcedimiento: lstTmpFiltroProcedimiento[i],
          nuCantidad :  objCantidadxProcedimiento[item],
          blSelected: true
        }
        this.lstFiltroProcedimiento.push(objProcedimiento);
      }
  }
  }

  lstTmpFiltroClases.sort(function(a, b){return a - b}); //Ordena lista númerico
   //Se agregan el filtro resultante de clases
  for(let i=0; i<lstTmpFiltroClases.length;i++){
    for(let item in objCantidadClases){
      if(Number(item)==lstTmpFiltroClases[i]){
        let objClases={
          nuClase: lstTmpFiltroClases[i],
          nuCantidad: objCantidadClases[item],
          blSelected: true
        }
        this.lstFiltroClases.push(objClases);
      }
  }
  }
}

doCargarFiltros(){
  this.lstTitulares=JSON.parse(JSON.stringify(this.globalService._lstTitularesBackup));

  this.lstFiltroProcedimiento=[];
  this.lstFiltroClases=[];

  let lstProcedimiento=[];
  let lstClases=[];

  // toma la sub lista
  for(let i=0; i<this.lstTitulares.length; i++){
    if(this.lstTitulares[i].lstExpedienteTitular){
     for(let j=0; j<this.lstTitulares[i].lstExpedienteTitular.length; j++){
      lstProcedimiento.push(this.lstTitulares[i].lstExpedienteTitular[j].vcTipoProcedimiento);
      lstClases.push(this.lstTitulares[i].lstExpedienteTitular[j].nuClase);
     }
    }
  }


  const objCantidadxProcedimiento : any[]= [];
  lstProcedimiento.forEach(function (x) {objCantidadxProcedimiento[x] = (objCantidadxProcedimiento[x] || 0) + 1; });//cuenta repetidos

  const objCantidadClases : any[]= [];
  lstClases.forEach(function (x) { objCantidadClases[x] = (objCantidadClases[x] || 0) + 1; });//Cuenta repetidos

  let lstTmpFiltroProcedimiento : any[]= [...new Set(lstProcedimiento)]; //Elimina repetidos
  let lstTmpFiltroClases= [...new Set(lstClases)]; //Elimina repetidos

  lstTmpFiltroProcedimiento.sort(); //Ordena no numerico
  //Se agregan el filtro resultante del tipo de procedimiento
  for(let i=0; i<lstTmpFiltroProcedimiento.length; i++){
    for(let item in objCantidadxProcedimiento){
      if(item==lstTmpFiltroProcedimiento[i]){
        let objProcedimiento={
          vcTipoProcedimiento: lstTmpFiltroProcedimiento[i],
          nuCantidad :  objCantidadxProcedimiento[item],
          blSelected: true
        }
        this.lstFiltroProcedimiento.push(objProcedimiento);
      }
  }
  }

  lstTmpFiltroClases.sort(function(a, b){return a - b}); //Ordena lista númerico
   //Se agregan el filtro resultante de clases
  for(let i=0; i<lstTmpFiltroClases.length;i++){
    for(let item in objCantidadClases){
      if(Number(item)==lstTmpFiltroClases[i]){
        let objClases={
          nuClase: lstTmpFiltroClases[i],
          nuCantidad: objCantidadClases[item],
          blSelected: true
        }
        this.lstFiltroClases.push(objClases);
      }
  }
  }


  let objClass = {          id: 0 ,
    class: 'modal-md'
  };
this.openModal(this._modalFiltro, objClass);

}

doQuitaFiltroProcedimiento(row: number) {
  this.lstFiltroProcedimiento[row].blSelected=!this.lstFiltroProcedimiento[row].blSelected;
  this.filtrarListaTitulares();
}

doQuitaFiltroClase(row : number) {
  this.lstFiltroClases[row].blSelected=!this.lstFiltroClases[row].blSelected;
  this.filtrarListaTitulares();
}

doSeleccionarFiltroTipoProcedimiento(row: number) {
  this.lstFiltroProcedimiento[row].blSelected=!this.lstFiltroProcedimiento[row].blSelected;
}

doSeleccionarFiltroClases(row : number) {
  this.lstFiltroClases[row].blSelected=!this.lstFiltroClases[row].blSelected;
}

openModal(template: TemplateRef<any>, objClass: any) {
  this.modalRef = this.modalService.show(template, objClass);
}

filtrarListaTitulares() {
  console.log(this.lstFiltroProcedimiento);
  console.log(this.lstFiltroClases);

  this.lstTitulares=JSON.parse(JSON.stringify(this.globalService._lstTitularesBackup));

  let lstFiltroProcedimiento=this.lstFiltroProcedimiento.filter(x=>x.blSelected);
  let lstFiltroClases=this.lstFiltroClases.filter(x=>x.blSelected);
  for(let i=0; i<this.lstTitulares.length;i++){
    if(this.lstTitulares[i].lstExpedienteTitular){
    this.lstTitulares[i].lstExpedienteTitular=(this.lstTitulares[i].lstExpedienteTitular).filter((f: any) => lstFiltroProcedimiento.some(item => item.vcTipoProcedimiento===f.vcTipoProcedimiento));//Filtra los objetos de array con array
    this.lstTitulares[i].lstExpedienteTitular=(this.lstTitulares[i].lstExpedienteTitular).filter((f: any) => lstFiltroClases.some(item => item.nuClase===f.nuClase));//Filtra los objetos de array con array
    }
  }

  this.modalRef.hide();
}

getEstadistica(item: any){
  this._spinner.show();
  let param={
    vcTitular: item.vcTitular
  }
  this.title= item.vcTitular;
  this.estadisticaService.getWithPost$(param).subscribe(
    resp => {
      console.log(resp)
      this._spinner.hide();
     this.data = [
        ['Certificados en plazo de renovación', resp.nuEnPlazoRenovacion],
        ['Certificados activos', resp.nuActivos],
        ['Otros', resp.nuOtros]
     ];

      let objClass = {          id: 0 ,
        class: 'modal-md'
      };
    this.openModal(this._modalEstadistica, objClass);

  }, error => {
    this._spinner.hide();
  });
}

getDescargaExcel(item: any){
  let lstReporte: any=[];
  for(let objReporte of item.lstExpedienteTitular){
    let objExcel : any={};

     objExcel.DENOMINACION = objReporte.vcDenominacion;
     objExcel.TIPO_SOLICITUD = objReporte.vcTipoSolicitud
     objExcel.TIPO_PRESENTANCION = objReporte.vcTipoPresentacion
     objExcel.TIPO_PROCEDIMIENTO = objReporte.vcTipoProcedimiento
     objExcel.NRO_EXPEDIENTE = objReporte.vcNroExpediente
     objExcel.ANIO_EXPEDIENTE = objReporte.nuAnioExpediente
     objExcel.AREA_EXPEDIENTE = objReporte.vcAreaExpediente
     objExcel.FECHA_PRESENTACION = objReporte.vcFechaPresentacion
     objExcel.CLASE = objReporte.nuClase
     objExcel.NRO_RESOLUCION = objReporte.vcNroResolucion
     objExcel.FECHA_RESOLUCION = objReporte.vcFechaResolucion
     objExcel.FORMA_CONCLUSION = objReporte.vcFormaConclusion
     objExcel.NRO_CERTIFICADO = objReporte.vcNroCertificado
     objExcel.FECHA_EXPIRACION = objReporte.vcFechaExpiracion
     objExcel.TITULAR_EXPEDIENTE = objReporte.vcTitularExpediente
     objExcel.TITULAR_CERTIFICADO = objReporte.vcTitularCertificado
     objExcel.PRODUCTO_O_SERVICIO_1 = objReporte.vcProdServ1
     objExcel.PRODUCTO_O_SERVICIO_2 = objReporte.vcProdServ2
     objExcel.PRODUCTO_O_SERVICIO_3 = objReporte.vcProdServ3
     objExcel.PRODUCTO_O_SERVICIO_4 = objReporte.vcProdServ4
     objExcel.PRODUCTO_O_SERVICIO_5 = objReporte.vcProdServ5
     objExcel.PRODUCTO_O_SERVICIO_6 = objReporte.vcProdServ6
     objExcel.PRODUCTO_O_SERVICIO_7 = objReporte.vcProdServ7
     objExcel.PRODUCTO_O_SERVICIO_8 = objReporte.vcProdServ8
     objExcel.PRODUCTO_O_SERVICIO_9 = objReporte.vcProdServ9
     objExcel.PRODUCTO_O_SERVICIO_10 = objReporte.vcProdServ10
     objExcel.PRODUCTO_O_SERVICIO_11 = objReporte.vcProdServ11
     objExcel.PRODUCTO_O_SERVICIO_12 = objReporte.vcProdServ12
     objExcel.PRODUCTO_O_SERVICIO_13 = objReporte.vcProdServ13
     objExcel.PRODUCTO_O_SERVICIO_14 = objReporte.vcProdServ14
     objExcel.PRODUCTO_O_SERVICIO_15 = objReporte.vcProdServ15
     objExcel.PRODUCTO_O_SERVICIO_16 = objReporte.vcProdServ16

     lstReporte.push(objExcel);
  }

    if(lstReporte.length>0)
    this._excel.exportAsExcelFile(lstReporte, item.vcTitular);
    else
    this.toastr.show('Nada que exportar', 'Información');

}
}