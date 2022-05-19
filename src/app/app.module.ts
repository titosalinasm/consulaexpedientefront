import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { BannerPrincipalComponent } from './componentes/banner-principal/banner-principal.component';
import { TooltipComponent } from './componentes/tooltip/tooltip.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ConsultaCertificadoComponent } from './componentes/consulta-certificado/consulta-certificado.component';
import { ConsultaExpedienteComponent } from './componentes/consulta-expediente/consulta-expediente.component';
import { ConfiguracionService } from './servicios/configuracion.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './utils/auth-interceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {ProgressBarModule} from 'primeng/progressbar';
import {ToastModule} from 'primeng/toast';
// import {AutoCompleteModule} from 'primeng/autocomplete';
import { BusCertificadoService } from './servicios/bus-certificado.service';
import { BusExpRelacionadoService } from './servicios/bus-exp-relacionado.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommonModule } from '@angular/common';
import { BusExpedienteService } from './servicios/bus-expediente.service';
import { MessageService } from 'primeng/api';
import { DetalleexpedienteService } from './servicios/detalleexpediente.service';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { environment } from '../environments/environment';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { ImagenService } from './servicios/imagen.service';
import {
  ToastrModule,
  ToastNoAnimation,
  ToastNoAnimationModule
} from 'ngx-toastr';
import { LemaService } from './servicios/lema.service';
import { NombrelogoService } from './servicios/nombrelogo.service';
import { TooltipModule } from 'ngx-bootstrap/tooltip';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    MenuComponent,
    BannerPrincipalComponent,
    TooltipComponent,
    ConsultaCertificadoComponent,
    ConsultaExpedienteComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopoverModule.forRoot(),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    ProgressBarModule,
    CommonModule,
    NgxPaginationModule,
    ToastModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    RecaptchaV3Module,
    BsDropdownModule.forRoot(),
    AutocompleteLibModule,
    ToastNoAnimationModule.forRoot(),
    TooltipModule.forRoot(),
  ],
  providers: [
    ConfiguracionService,
    BusCertificadoService,
    BusExpRelacionadoService,
    BusExpedienteService,
    MessageService,
    DetalleexpedienteService,
    ImagenService,
    LemaService,
    NombrelogoService,
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  exports:[CommonModule,
           NgxPaginationModule,

           ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {  }
