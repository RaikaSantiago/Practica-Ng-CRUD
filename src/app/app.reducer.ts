import { ActionReducerMap } from "@ngrx/store";
import { MetaReducer } from "@ngrx/store";
import { hydrationMetaReducer } from "./ngrx/store/reducers/hydrations.reducer";
import { usuarioReducer, UsuarioState } from "./ngrx/store/reducers/usuarios.reducer";


export interface AppState {
    usuarios: UsuarioState;
}

export const appReducers: ActionReducerMap<AppState> = {
    usuarios: usuarioReducer,
};

export const metaReducers: MetaReducer<any>[] = [hydrationMetaReducer];


