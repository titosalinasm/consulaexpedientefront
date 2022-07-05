import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaCertificadoComponent } from './componentes/consulta-certificado/consulta-certificado.component';
import { ConsultaDenunciadoComponent } from './componentes/consulta-denunciado/consulta-denunciado.component';
import { ConsultaDenuncianteComponent } from './componentes/consulta-denunciante/consulta-denunciante.component';
import { ConsultaExpedienteComponent } from './componentes/consulta-expediente/consulta-expediente.component';
import { ConsultaSancionadoComponent } from './componentes/consulta-sancionado/consulta-sancionado.component';
import { ConsultaTitularidadComponent } from './componentes/consulta-titularidad/consulta-titularidad.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'consulta-certificado', component: ConsultaCertificadoComponent},
  { path: 'consulta-expediente', component: ConsultaExpedienteComponent },
  { path: 'consulta-por-titularidad', component: ConsultaTitularidadComponent },
  { path: 'consulta-por-denunciante', component: ConsultaDenuncianteComponent},
  { path: 'consulta-por-denunciado', component: ConsultaDenunciadoComponent},
  { path: 'consulta-por-sancionado', component: ConsultaSancionadoComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
