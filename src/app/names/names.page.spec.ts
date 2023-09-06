import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NamesPage } from './names.page';

describe('NamesPage', () => {
  let component: NamesPage;
  let fixture: ComponentFixture<NamesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NamesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
