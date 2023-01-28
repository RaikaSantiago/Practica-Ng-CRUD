import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioModel } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';
import { UsuariosService } from '../../../services/modules/usuarios/usuarios.service';
import { ResponseMessageModel } from '../../../models/usuario.model';
import { AppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as usuariosActions from '../../../ngrx/store/actions/usuarios.actions';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  page: number = 1;
  pageSize: number = 3;
  arrUsers: UsuarioModel[] = [];
  loading: boolean = true;
  dataSelect: UsuarioModel;

  constructor(private _usuarioService: UsuariosService,
    public config: NgbModalConfig,
    private store: Store<AppState>,
    private modalService: NgbModal) {
    config.size = 'lg';
  }

  async ngOnInit() {
    await this.consultaUsuarios();
    this.selectStore();
  }

  async consultaUsuarios() {
    await this._usuarioService.getObtenerUsuarios('usuario').toPromise().then(res => {
      setTimeout(() => {
        this.store.dispatch(usuariosActions.addUsuarios({
          list: res
        }));
        this.loading = false;
      }, 700);
    }, err => {
      console.log(err);
      this.loading = false;
    })
  }

  selectStore() {
    this.store.select('usuarios').subscribe(res => {
      this.arrUsers = [...res.list]
    })
  }

  open(content: any, data?: UsuarioModel) {
    this.dataSelect = data;
    this.modalService.open(content);
  }

  deleteR(id: number) {
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await this._usuarioService.deleteEliminarUsuario('usuario', id).toPromise().then((res: ResponseMessageModel) => {
          if (res.status === 200) {
            Swal.fire(
              'Eliminado!',
              'El registro ha sido eliminado.',
              'success'
            )
            this.store.dispatch(usuariosActions.deleteUsuario({id}));
          }
        }, err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Fallo',
            text: 'Se presento un error inesperado al eliminar el registro.',
            showConfirmButton: true,
          })
        })
      }
    })
  }

}
