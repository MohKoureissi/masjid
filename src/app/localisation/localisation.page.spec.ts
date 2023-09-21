import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Localisation } from './localisation.page';

describe('Localisation', () => {
  let component: Localisation;
  let fixture: ComponentFixture<Localisation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Localisation],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Localisation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
