import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { GlobalModule } from '../global.module';



@NgModule({
  declarations: [
    FormComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    TooltipModule,
    UsuarioRoutingModule,
    GlobalModule
  ],
  exports: [
    FormComponent,
    ListComponent
  ]
})
export class UsuarioModule { }
