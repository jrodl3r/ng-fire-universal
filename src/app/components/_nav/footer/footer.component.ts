import { PlatformService } from './../../../services/platform.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  isInstallBannerActive;

  constructor(public platform: PlatformService) {
    if (platform.isBrowser()) {
      const isInstallBannerDismissed = localStorage.getItem('pwa-ios-install-banner-dismissed') || false;
      this.isInstallBannerActive = platform.isIOS() && !platform.isInStandaloneMode() && !isInstallBannerDismissed;
    }
  }

  closeInstallBanner() {
    this.isInstallBannerActive = false;
    localStorage.setItem('pwa-ios-install-banner-dismissed', 'true');
  }

}
