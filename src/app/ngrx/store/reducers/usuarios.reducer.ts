import { Action, createReducer, on } from '@ngrx/store';
import * as usuariosAction from '../actions/usuarios.actions';
/*Models */
import { UsuarioModel } from '../../../models/usuario.model';



export interface UsuarioState {
    list: UsuarioModel[],
    usuario?: UsuarioModel
}
const initialState: UsuarioState = {
    list: [],
    usuario: new UsuarioModel(),
}

const _usuarioReducer = createReducer(
    initialState,
    on(usuariosAction.addUsuarios, (state, { list }) => ({
        ...state,
        list: [...list]
    })),
    on(usuariosAction.listUsuarios, (state) => ({
        ...state,
    })),
    on(usuariosAction.addUsuario, (state, { usuario }) => ({
        ...state,
        list: [...state.list, usuario]
    })),
    on(usuariosAction.selectUsuario, (state, { id }) => ({
        ...state,
        usuario: state.list.find(el => el.id == id)
    })),
    on(usuariosAction.deleteUsuario, (state, { id }) => ({
        ...state,
        list: state.list.filter(x => x.id != id)
    })),
    on(usuariosAction.updateListUsuarios, (state, { id, usuario }) => ({
        ...state,
        list: state.list.map((el) => {

            if (el.id == id) {
                return el = {
                    ...usuario
                }

            } else {
                return el;
            }
        })
    }))
)


export function usuarioReducer(state: UsuarioState, action: Action) {
    return _usuarioReducer(state, action);
}