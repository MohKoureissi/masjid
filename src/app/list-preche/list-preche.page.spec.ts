import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPrechePage } from './list-preche.page';

describe('ListPrechePage', () => {
  let component: ListPrechePage;
  let fixture: ComponentFixture<ListPrechePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListPrechePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
