import { TestBed } from '@angular/core/testing';

import { PicsumService } from './picsum.service';
import { HttpClientModule } from '@angular/common/http';

describe('PicsumService', () => {
  let service: PicsumService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [PicsumService]
    });
    service = TestBed.inject(PicsumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
