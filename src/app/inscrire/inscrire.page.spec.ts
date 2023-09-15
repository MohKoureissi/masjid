import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InscrirePage } from './inscrire.page';

describe('InscrirePage', () => {
  let component: InscrirePage;
  let fixture: ComponentFixture<InscrirePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(InscrirePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
