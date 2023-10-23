import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RPlayerPage } from './r-player.page';

describe('RPlayerPage', () => {
  let component: RPlayerPage;
  let fixture: ComponentFixture<RPlayerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
