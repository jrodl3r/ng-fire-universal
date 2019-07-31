import { TestBed } from '@angular/core/testing';

import { ToastrTestingModule } from './../../testing/toastr';

import { NotifyService } from './notify.service';
import { PlatformService } from './platform.service';

describe('NotifyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrTestingModule],
    providers: [PlatformService]
  }));

  it('should be created', () => {
    const service: NotifyService = TestBed.get(NotifyService);
    expect(service).toBeTruthy();
  });
});
