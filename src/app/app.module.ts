import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { BannerPrincipalComponent } from './componentes/banner-principal/banner-principal.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    FooterComponent,
    MenuComponent,
    BannerPrincipalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
