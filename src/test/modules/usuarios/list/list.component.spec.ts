import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers, metaReducers } from '../../../../app/app.reducer';
import { ListComponent } from '../../../../app/modules/usuario/list/list.component';
import { UsuariosService } from '../../../../app/services/modules/usuarios/usuarios.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let compiled: HTMLElement;
  let service: UsuariosService;
  let httoMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(appReducers, { metaReducers })
      ],
      providers: [
        UsuariosService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(UsuariosService);
    httoMock = TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Debe hacer match con el snapshot', () => {
    expect(compiled).toMatchSnapshot();
  })

  test('Debe contener el method GET en la consulta usuarios', () => {
    const request = httoMock.expectOne('http://localhost:8080/usuario/get');
    expect(request.request.method).toBe('GET');
  })

});
