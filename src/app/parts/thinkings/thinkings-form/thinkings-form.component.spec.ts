import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkingsFormComponent } from './thinkings-form.component';

describe('ThinkingsFormComponent', () => {
  let component: ThinkingsFormComponent;
  let fixture: ComponentFixture<ThinkingsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkingsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
