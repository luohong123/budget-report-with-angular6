import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTemplateComponent } from './file-template.component';

describe('FileTemplateComponent', () => {
  let component: FileTemplateComponent;
  let fixture: ComponentFixture<FileTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
