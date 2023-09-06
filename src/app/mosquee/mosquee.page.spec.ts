import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MosqueePage } from './mosquee.page';

describe('MosqueePage', () => {
  let component: MosqueePage;
  let fixture: ComponentFixture<MosqueePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MosqueePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
