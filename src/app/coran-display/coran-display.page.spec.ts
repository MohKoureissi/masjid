import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoranDisplayPage } from './coran-display.page';

describe('CoranDisplayPage', () => {
  let component: CoranDisplayPage;
  let fixture: ComponentFixture<CoranDisplayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoranDisplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
