import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileGenerateComponent } from './file-generate.component';

describe('FileGenerateComponent', () => {
  let component: FileGenerateComponent;
  let fixture: ComponentFixture<FileGenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileGenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileGenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
