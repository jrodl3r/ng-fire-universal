import { TestBed } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';

import { SwService } from './sw.service';

import { environment } from 'src/environments/environment';

describe('SwService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })]
  }));

  it('should be created', () => {
    const service: SwService = TestBed.get(SwService);
    expect(service).toBeTruthy();
  });
});
