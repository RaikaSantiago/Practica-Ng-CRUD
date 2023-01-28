import { createAction, props } from '@ngrx/store';
/*Models */
import { UsuarioModel } from '../../../models/usuario.model';



export const listUsuarios = createAction('[USUARIOS] List Usuarios');

export const addUsuarios = createAction('[USUARIOS] Add List Usuarios', props<{ list: UsuarioModel[] }>());

export const addUsuario = createAction('[USUARIOS] Add Usuario', props<{ usuario: UsuarioModel }>());

export const selectUsuario = createAction('[USUARIOS] Select Usuario', props<{ id: number }>())

export const updateListUsuarios = createAction('[USUARIOS] Update List Usuarios', props<{ id: number, usuario: UsuarioModel }>());

export const deleteUsuario = createAction('[USUARIOS] Delete Usuario', props<{ id: number }>());