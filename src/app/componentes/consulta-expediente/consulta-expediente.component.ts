import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, Output, Renderer2, TemplateRef, ViewChild} from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, Form } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BusExpedienteService } from 'src/app/servicios/bus-expediente.service';
import { DetalleexpedienteService } from 'src/app/servicios/detalleexpediente.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NgForm } from '@angular/forms';
import { RecaptchaErrorParameters } from "ng-recaptcha";
import { TokenService } from 'src/app/servicios/token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-consulta-expediente',
  templateUrl: './consulta-expediente.component.html',
  styleUrls: ['./consulta-expediente.component.css']
})
export class ConsultaExpedienteComponent implements OnInit, AfterViewInit{

  @ViewChild('_templateModal') _templateModal: TemplateRef<any>  ;

  @ViewChild('_templateResolModal') _templateResolModal: TemplateRef<any>  ;

  @ViewChild("myInput1") input1: ElementRef;
  @ViewChild("myInput2") input2: ElementRef;

  lstPersonas : any=[];

  ngAfterViewInit(){

  }


  cambiarFocus(event : any){
    var codigo = event.which || event.keyCode;
    console.log(codigo);
        this.input1.nativeElement.focus()
  }



  lstExpediente : any[]=[];
  paginaActual : any=1;
  activeStateDetalle: boolean[] = [true, true, true];

  modalRef: BsModalRef;


  objDetalleExpediente : any;

  lstResolucion :any =[];

  filtersForm = this.formBuilder.group({
       vcNroExpediente: ['', [Validators.required]],
       nuAnioExpediente :  ['', [Validators.required]],
  });


  keyword = 'name';
  lstAnios : any[] = [];


  constructor(private formBuilder: FormBuilder,
              private tokenService : TokenService,
              private busExpedienteService:  BusExpedienteService,
              private detalleexpedienteService: DetalleexpedienteService,
              private _spinner: NgxSpinnerService,
              private modalService: BsModalService,
              private recaptchaV3Service: ReCaptchaV3Service,
              private renderer: Renderer2,
              private toastr: ToastrService,

    ) {

      this.obtenerToken();
      this.cargarAnioExpediente();
    }

    public resolved(captchaResponse: string): void {
      console.log(`Resolved captcha with response: ${captchaResponse}`);
    }

    public onError(errorDetails: RecaptchaErrorParameters): void {
      console.log(`reCAPTCHA error encountered; details:`, errorDetails);
    }


  ngOnInit() {


  }



	results: any[] = [];
	searchResults: any[] = [];
  searchOnKeyUp(event: any) {
		let input = event.target.value;
		//console.log('event.target.value: ' + input);
		//console.log('this.searchResults: ' + this.searchResults);
		if (input.length > 1) {
			this.results = this.searchFromArray(this.searchResults, input);
		}
	}

  searchFromArray(arr: any, regex: any) {
		let matches = [], i;
		for (i = 0; i < arr.length; i++) {
			if (arr[i].match(regex)) {
				matches.push(arr[i]);
			}
		}
		//console.log('matches: ' + matches);
		return matches;
	};

  cargarAnioExpediente(){

    let d = new Date(); // Por ejemplo 1
    let nuAnioActual =d.getFullYear();

    for(let i=nuAnioActual; i>=1975; i--){
      let obj={
      id: i,
      name: i+'',
      }
      this.lstAnios.push(obj);
    }

  }


  openModal(template: TemplateRef<any>, objClass: any) {
    this.modalRef = this.modalService.show(template, objClass);
  }

  doBuscarExpediente(){
    let d = new Date();
    let nuAnioActualValid =d.getFullYear();

    if(!!this.filtersForm.value.vcNroExpediente){
      if(this.filtersForm.value.vcNroExpediente!=''){
        if(this.filtersForm.value.vcNroExpediente.length>=6){


    this._spinner.show();
    let param={
      vcNroExpediente: this.filtersForm.value.vcNroExpediente,
      nuAnioExpediente: this.filtersForm.value.nuAnioExpediente
    }
    this.busExpedienteService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.lstExpediente=resp.lstExpediente;
        if(this.lstExpediente.length<1){
          this.toastr.warning('No se encontraron resultados para tu busqueda, por favor cambia los parametros e intenta nuevamente.','Resultado');
        }

      },
      error=>{
        this._spinner.hide();
      }
    );


      }else{
        this.toastr.warning('El número de expediente debe tener al menos 6 caracteres.','Validación');
      }
    }else{
      this.toastr.warning('El número de expediente debe tener al menos 6 caracteres.','Validación');
    }
  }else{
    this.toastr.warning('El número de expediente debe tener al menos 6 caracteres.','Validación');
  }

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

  obtenerToken() {

    this._spinner.show();
      this.tokenService.obtenerToken$().subscribe(
        resp => {
          this._spinner.hide();
          if (resp.access_token) {
            //console.log(resp.access_token);
            sessionStorage.setItem("access_token", resp.access_token);
          }
        },
        error => {
          this._spinner.hide();
        },
      );

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


 onlyPhoneNumber(event: any) {
  let result = false;
  var codigo = event.which || event.keyCode;

      if (codigo != 43 && codigo != 35 && codigo != 42) {
        let patt = /^([0-9])$/;
        result = patt.test(event.key);
      } else {
        result = true;
      }
  return result;
}


}


