import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { UtilModule } from './util/util.module';
import { GlobalModule } from './modules/global.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    UtilModule,
    UsuarioModule,
    GlobalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
