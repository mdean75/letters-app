import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedLettersComponent } from './saved-letters.component';

describe('SavedLettersComponent', () => {
  let component: SavedLettersComponent;
  let fixture: ComponentFixture<SavedLettersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedLettersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedLettersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
