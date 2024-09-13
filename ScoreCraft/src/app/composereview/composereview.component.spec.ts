import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposereviewComponent } from './composereview.component';

describe('ComposereviewComponent', () => {
  let component: ComposereviewComponent;
  let fixture: ComponentFixture<ComposereviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComposereviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComposereviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
