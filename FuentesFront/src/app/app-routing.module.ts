import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultaCertificadoComponent } from './componentes/consulta-certificado/consulta-certificado.component';
import { ConsultaExpedienteComponent } from './componentes/consulta-expediente/consulta-expediente.component';
import { InicioComponent } from './componentes/inicio/inicio.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent },
  { path: 'consulta-certificado', component: ConsultaCertificadoComponent},
  { path: 'consulta-expediente', component: ConsultaExpedienteComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
