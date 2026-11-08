import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ComingSoonComponent } from './coming-soon.component';

describe('ComingSoonComponent', () => {
  let component: ComingSoonComponent;
  let fixture: ComponentFixture<ComingSoonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComingSoonComponent],
      providers: [provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(ComingSoonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
