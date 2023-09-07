import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfiladminPage } from './profiladmin.page';

describe('ProfiladminPage', () => {
  let component: ProfiladminPage;
  let fixture: ComponentFixture<ProfiladminPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfiladminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
