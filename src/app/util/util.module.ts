import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { ButtonFloatComponent } from './button-float/button-float.component';



@NgModule({
  declarations: [
    TopbarComponent,
    ButtonFloatComponent
  ],
  imports: [
    CommonModule
  ], 
  exports:[
    TopbarComponent,
    ButtonFloatComponent
  ]
})
export class UtilModule { }
