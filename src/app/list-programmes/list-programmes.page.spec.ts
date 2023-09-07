import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListProgrammesPage } from './list-programmes.page';

describe('ListProgrammesPage', () => {
  let component: ListProgrammesPage;
  let fixture: ComponentFixture<ListProgrammesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListProgrammesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
