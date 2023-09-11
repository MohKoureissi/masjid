import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListCoranPage } from './list-coran.page';

describe('ListCoranPage', () => {
  let component: ListCoranPage;
  let fixture: ComponentFixture<ListCoranPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ListCoranPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
