import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatterPostComponent } from './matter-post.component';

describe('MatterPostComponent', () => {
  let component: MatterPostComponent;
  let fixture: ComponentFixture<MatterPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatterPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatterPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
