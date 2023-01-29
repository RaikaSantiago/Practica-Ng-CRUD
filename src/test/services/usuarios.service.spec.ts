import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { UsuariosService } from '../../app/services/modules/usuarios/usuarios.service';
import { UsuarioModel } from '../../app/models/usuario.model';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(UsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('Debe verificar el tipo dato del json usuarios', (done) => {
    service.getObtenerUsuarios('usuario').toPromise().then((usuarios: UsuarioModel[]) => {
      usuarios.forEach(user => {
        expect(typeof user.id).toBe('number');
        expect(typeof user.cedula).toBe('string');
        expect(typeof user.nombres).toBe('string');
        expect(typeof user.apellidos).toBe('string');
        expect(typeof user.correo).toBe('string');
        expect(typeof user.telefono).toBe('string');
        done();
      })
    })
  })
});
