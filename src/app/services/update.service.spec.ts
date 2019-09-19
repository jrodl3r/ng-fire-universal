import { TestBed } from '@angular/core/testing';
import { ServiceWorkerModule } from '@angular/service-worker';

import { UpdateService } from './update.service';

import { environment } from '../../environments/environment';

describe('UpdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    ]
  }));

  it('should be created', () => {
    const service: UpdateService = TestBed.get(UpdateService);
    expect(service).toBeTruthy();
  });
});
