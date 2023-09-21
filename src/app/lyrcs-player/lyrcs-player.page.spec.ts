import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LyrcsPlayerPage } from './lyrcs-player.page';

describe('LyrcsPlayerPage', () => {
  let component: LyrcsPlayerPage;
  let fixture: ComponentFixture<LyrcsPlayerPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LyrcsPlayerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
