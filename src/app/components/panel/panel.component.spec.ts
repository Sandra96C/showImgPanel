import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanelComponent } from './panel.component';
import { PicsumService } from '../../services/picsum.service';
import { of } from 'rxjs';
import { ImageObj } from '../../models/image.model';
import { fakeAsync, tick } from '@angular/core/testing';

describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;
  let picsumService: jasmine.SpyObj<PicsumService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PicsumService', ['getImages']);

    // Configuración del TestBed
    await TestBed.configureTestingModule({
      declarations: [PanelComponent],
      providers: [{ provide: PicsumService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    picsumService = TestBed.inject(PicsumService) as jasmine.SpyObj<PicsumService>;

    fixture.detectChanges(); // Llama a ngOnInit()
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Test: Llamar a getImageList en ngOnInit
  it('should call getImageList on ngOnInit', () => {
    const mockImages: ImageObj[] = [{ id: '1', download_url: '', url: '', isLoaded: false }];
    picsumService.getImages.and.returnValue(of(mockImages));

    fixture.detectChanges(); // Llama a ngOnInit()

    expect(picsumService.getImages).toHaveBeenCalled();
    expect(component.images.length).toBe(1);
  });

  // Test: Actualizar imágenes cuando getImageList es llamado
  it('should update images when getImageList is called', () => {
    const mockImages: ImageObj[] = [
      { id: '1', download_url: '', url: '', isLoaded: false },
      { id: '2', download_url: '', url: '', isLoaded: false }
    ];

    picsumService.getImages.and.returnValue(of(mockImages));

    component.getImageList(); // Llama a getImageList() manualmente

    expect(component.images.length).toBe(2);
    expect(component.images[0].id).toBe('1');
  });

  // Test: Actualizar loadedImages y isLoading cuando se carga una imagen
  it('should update loadedImages and isLoading when an image is loaded', () => {
    component.images = [
      { id: '1', download_url: 'url1', url: 'url1', isLoaded: false },
      { id: '2', download_url: 'url2', url: 'url2', isLoaded: false }
    ];

    component.onImageLoad({ target: { style: {} } } as unknown as Event); // Simula la carga de una imagen
    expect(component.loadedImages).toBe(1);

    component.onImageLoad({ target: { style: {} } } as unknown as Event); // Simula la carga de la segunda imagen
    expect(component.loadedImages).toBe(2);
    expect(component.isLoading).toBeFalse(); // La carga termina
  });

  // Test: Eliminar imagen de la lista cuando removeImg es llamado
  it('should remove image from images array when removeImg is called', () => {
    component.images = [
      { id: '1', download_url: '', url: '', isLoaded: false },
      { id: '2', download_url: '', url: '', isLoaded: false }
    ];

    component.removeImg(0); // Elimina la imagen en el índice 0

    expect(component.images.length).toBe(1);
    expect(component.images[0].id).toBe('2'); // La primera imagen se eliminó
  });

  // Test: Cargar más imágenes al hacer scroll con fakeAsync y tick()
  it('should load more images on scroll', fakeAsync(() => {
    const spyGetImageList = spyOn(component, 'getImageList');

    // Simula el evento de scroll
    Object.defineProperty(window, 'innerHeight', { value: 1000 });
    Object.defineProperty(window, 'scrollY', { value: 1000 });
    Object.defineProperty(document.body, 'offsetHeight', { value: 2000 });

    component.onWindowScroll(); // Simula el scroll

    tick(500); // Simula el paso del tiempo (ajusta el tiempo según lo necesario)

    // Verificamos que se haya llamado a getImageList
    expect(spyGetImageList).toHaveBeenCalled();
  }));
});
