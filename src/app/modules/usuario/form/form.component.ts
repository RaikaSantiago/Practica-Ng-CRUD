import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseMessageModel, UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from '../../../services/modules/usuarios/usuarios.service';
import Swal from 'sweetalert2';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as usuariosActions from '../../../ngrx/store/actions/usuarios.actions';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Input() dismiss: any;
  @Input() data: UsuarioModel;

  formg: FormGroup;
  isMode: boolean = false;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private store: Store<AppState>,
    private _usuarios: UsuariosService) {

  }

  ngOnInit(): void {
    this.form();

    if (this.data !== undefined) {
      this.isMode = true;
      this.formg.patchValue({
        id: this.data.id,
        cedula: this.data.cedula,
        nombres: this.data.nombres,
        apellidos: this.data.apellidos,
        correo: this.data.correo,
        telefono: this.data.telefono
      })
    }

  }

  form() {
    this.formg = this.fb.group({
      id: [''],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      cedula: ['', [Validators.required, Validators.pattern(/^([0-9])*$/)]],
      correo: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$')]],
      telefono: ['', [Validators.required, Validators.pattern(/^([0-9])*$/)]]
    })
  }

  async submit() {
    if (this.formg.invalid) {
      return;
    }
    this.loading = true;
    /**Mode Edition */
    if (this.data !== undefined) {
      await this._usuarios.putActualizarUsuario('usuario', this.formg.value).toPromise().then((res: ResponseMessageModel) => {

        if (res.status !== 400) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro actualizado correctamente.',
            showConfirmButton: false,
            timer: 2500
          })
          this.store.dispatch(usuariosActions.updateListUsuarios({ id: res.usuario.id, usuario: res.usuario }));
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: res.descripcion,
            showConfirmButton: true,
          })
        }
        this.loading = false;
      }, err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Fallo',
          text: 'Se presento un error inesperado al actualizar el registro.',
          showConfirmButton: true,
        })
        this.loading = false;
      })
      /**Mode Create */
    } else {
      await this._usuarios.postGuardarUsuario('usuario', this.formg.value).toPromise().then((res: ResponseMessageModel) => {
        if (res.status !== 400) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Registro guardado correctamente.',
            showConfirmButton: false,
            timer: 2000
          })
          this.store.dispatch(usuariosActions.addUsuario({ usuario: res.usuario }));
          setTimeout(() => {
            this.dismiss();
          }, 2000);
        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: res.descripcion,
            showConfirmButton: true,
          })
        }
        this.loading = false;
      }, err => {
        console.error(err);
        Swal.fire({
          icon: 'error',
          title: 'Fallo',
          text: 'Se presento un error inesperado al guardar el registro.',
          showConfirmButton: true,
        })
        this.loading = false;
      })
    }
  }


  get validTelefono() {
    return this.formg.get('telefono').invalid && this.formg.get('telefono').dirty;
  }
  get validCorreo() {
    return this.formg.get('correo').invalid && this.formg.get('correo').dirty;
  }
  get validNombre() {
    return this.formg.get('nombres').invalid && this.formg.get('nombres').dirty;
  }
  get validApellidos() {
    return this.formg.get('apellidos').invalid && this.formg.get('apellidos').dirty;
  }
  get validCedula() {
    return this.formg.get('cedula').invalid && this.formg.get('cedula').dirty;
  }
  get validNumCed() {
    return this.formg.get('cedula').hasError('pattern');
  }
  get validNumTel() {
    return this.formg.get('telefono').hasError('pattern');
  }

}
