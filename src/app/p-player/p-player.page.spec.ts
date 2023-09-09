import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PPlayerPage } from './p-player.page';

describe('PPlayerPage', () => {
  let component: PPlayerPage;
  let fixture: ComponentFixture<PPlayerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
