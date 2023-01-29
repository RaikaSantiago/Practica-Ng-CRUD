import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ResponseMessageModel, UsuarioModel } from 'src/app/models/usuario.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private headers: any;

  constructor(public http: HttpClient) {
    this.create_headers();
  }

  private create_headers() {
    this.headers = new HttpHeaders();
    this.headers.set('Content-type', 'application/json');
    this.headers.set('Access-Control-Allow-Origin', '*');
  }

  getObtenerUsuarios(module: string): Observable<UsuarioModel[]> {
    this.create_headers();
    return this.http.get<UsuarioModel[]>(`${environment.urlGlobal}/${module}/get`, { headers: this.headers });
  }

  getBuscarUsuarioId(module: string, id: number): Observable<UsuarioModel> {
    this.create_headers();
    return this.http.get<UsuarioModel>(`${environment.urlGlobal}/${module}/search/${id}`, { headers: this.headers });
  }

  putActualizarUsuario(module: string, body: any): Observable<ResponseMessageModel> {
    return this.http.put<ResponseMessageModel>(`${environment.urlGlobal}/${module}/put`, body, { headers: this.headers });
  }

  postGuardarUsuario(module: string, body: any): Observable<ResponseMessageModel> {
    return this.http.post<ResponseMessageModel>(`${environment.urlGlobal}/${module}/post`, body, { headers: this.headers });
  }

  deleteEliminarUsuario(module: string, id: number): Observable<ResponseMessageModel> {
    return this.http.delete<ResponseMessageModel>(`${environment.urlGlobal}/${module}/delete/${id}`, { headers: this.headers });
  }

}
