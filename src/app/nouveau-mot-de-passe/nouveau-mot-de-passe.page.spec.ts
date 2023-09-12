import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NouveauMotDePassePage } from './nouveau-mot-de-passe.page';

describe('NouveauMotDePassePage', () => {
  let component: NouveauMotDePassePage;
  let fixture: ComponentFixture<NouveauMotDePassePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NouveauMotDePassePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
