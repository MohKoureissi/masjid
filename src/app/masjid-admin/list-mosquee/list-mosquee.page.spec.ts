import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListMosqueePage } from './list-mosquee.page';

describe('ListMosqueePage', () => {
  let component: ListMosqueePage;
  let fixture: ComponentFixture<ListMosqueePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListMosqueePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
