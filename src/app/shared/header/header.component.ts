import { afterNextRender, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, inject, NgZone, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SocialLinksComponent } from '../index';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { bookingLink, notReadyServices, services } from '../../models/constants';

@Component({
    selector: 'app-acropolis-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [CommonModule, RouterModule, NzIconModule, SocialLinksComponent, NzBadgeModule]
})
export class AcropolisHeaderComponent {
  isMobileMenuOpen = signal(false);
  isServicesDropdownOpen = signal(false);

  // Services submenu items
  services = services;
  notReadyServices = notReadyServices;
  bookingLink = bookingLink;

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly zone = inject(NgZone);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    // Scroll distance (px) over which the header fades from transparent to solid.
    const range = 60;

    afterNextRender(() => {
      let frame = 0;

      // Writes a 0..1 value to a CSS variable; the stylesheet turns it into
      // background, shadow and padding. Runs once per animation frame.
      const update = () => {
        frame = 0;
        const progress = Math.min(Math.max(window.scrollY / range, 0), 1);
        this.host.nativeElement.style.setProperty('--header-progress', progress.toFixed(3));
      };
      const onScroll = () => {
        if (!frame) {
          frame = requestAnimationFrame(update);
        }
      };

      // Outside Angular so scrolling does not trigger change detection for the whole app.
      this.zone.runOutsideAngular(() => window.addEventListener('scroll', onScroll, {passive: true}));
      this.destroyRef.onDestroy(() => {
        window.removeEventListener('scroll', onScroll);
        cancelAnimationFrame(frame);
      });
      update();
    });
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update(v => !v);
    // Close service-card dropdown when mobile menu is closed
    if (!this.isMobileMenuOpen()) {
      this.isServicesDropdownOpen.set(false);
    }
  }

  toggleServicesDropdown() {
    this.isServicesDropdownOpen.update(v => !v);

  }

  closeMenus() {
    this.isMobileMenuOpen.set(false);
    this.isServicesDropdownOpen.set(false);
  }

}
