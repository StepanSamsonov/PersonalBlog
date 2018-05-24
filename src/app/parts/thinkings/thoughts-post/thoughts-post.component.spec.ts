import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThinkingsPostComponent } from './thinkings-post.component';

describe('ThinkingsPostComponent', () => {
  let component: ThinkingsPostComponent;
  let fixture: ComponentFixture<ThinkingsPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThinkingsPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThinkingsPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
