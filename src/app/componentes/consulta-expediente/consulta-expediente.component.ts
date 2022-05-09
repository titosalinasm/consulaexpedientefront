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

@Component({
  selector: 'app-consulta-expediente',
  templateUrl: './consulta-expediente.component.html',
  styleUrls: ['./consulta-expediente.component.css']
})
export class ConsultaExpedienteComponent implements OnInit, AfterViewInit{

  @ViewChild('_templateModal') _templateModal: TemplateRef<any>  ;

  @ViewChild('_templateResolModal') _templateResolModal: TemplateRef<any>  ;

  ngAfterViewInit(){

  }


  lstExpediente : any[]=[];
  paginaActual : any=1;
  activeStateDetalle: boolean[] = [true, true, true];

  modalRef: BsModalRef;


  objDetalleExpediente : any;

  lstResolucion :any =[];

  filtersForm = this.formBuilder.group({
       vcNroExpediente: ['', [Validators.required]],
       nuAnioExpediente :  [(new Date()).getFullYear()+'', [Validators.required]],
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
              private renderer: Renderer2

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
    this._spinner.show();
    let param={
      vcNroExpediente: this.filtersForm.value.vcNroExpediente+'-'+this.filtersForm.value.nuAnioExpediente
    }
    this.busExpedienteService.getWithPost$(param).subscribe(
      resp=>{
        this._spinner.hide();
        this.lstExpediente=resp.lstExpediente;

      },
      error=>{
        this._spinner.hide();
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


}


