import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { QuiblaPage } from './quibla.page';

describe('QuiblaPage', () => {
  let component: QuiblaPage;
  let fixture: ComponentFixture<QuiblaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(QuiblaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
