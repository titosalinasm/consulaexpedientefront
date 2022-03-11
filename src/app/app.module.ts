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
import { BusCertificadoService } from './servicios/bus-certificado.service';


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
    PanelModule
  ],
  providers: [
    ConfiguracionService,
    BusCertificadoService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
