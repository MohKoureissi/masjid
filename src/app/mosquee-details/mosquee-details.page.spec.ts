import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MosqueeDetailsPage } from './mosquee-details.page';

describe('MosqueeDetailsPage', () => {
  let component: MosqueeDetailsPage;
  let fixture: ComponentFixture<MosqueeDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MosqueeDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
