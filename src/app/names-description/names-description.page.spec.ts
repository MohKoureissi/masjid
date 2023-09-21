import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NamesDescriptionPage } from './names-description.page';

describe('NamesDescriptionPage', () => {
  let component: NamesDescriptionPage;
  let fixture: ComponentFixture<NamesDescriptionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NamesDescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
