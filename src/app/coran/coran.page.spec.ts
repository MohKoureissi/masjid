import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoranPage } from './coran.page';

describe('CoranPage', () => {
  let component: CoranPage;
  let fixture: ComponentFixture<CoranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CoranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
