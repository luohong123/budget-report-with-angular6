import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BgrpFileTemplateService } from 'src/app/services/file-template.service';
import { OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
/**
 * 新增报表格式页面
 */
@Component({
  selector: 'rp-file-template-modal-edit',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24">报表任务</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <span>{{STASKNAME}}</span>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="SNAME">模板名称</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="SNAME" placeholder="请输入模板名称" id="SNAME"/>
          <nz-form-explain *ngIf="validateForm.get('SNAME').dirty && validateForm.get('SNAME').
            errors">模板名称不能为空!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24">模板类型</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <span>{{STYPE}}</span>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24">文件属性</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <span>{{SATTRCODE}}</span>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24"  nzFor="SDES">说明</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <textarea row="4" nz-input formControlName="SDES" placeholder="请输入" id="SDES"></textarea>
        </nz-form-control>
      </nz-form-item>
    </form>
  `,
  styles: [
    ``
  ]
})
export class FileTemplateEditModalComponent implements OnInit {
  STMPLID: String;
  SNAME: String;
  STYPE: String;
  SATTRCODE: String;
  SDES: String;
  NORDER: number;
  STASKNAME: String;

  validateForm: FormGroup;
  @Input()
  set param(value: any) {
    this.STASKNAME = value.TASK.STASKNAME;
    this.SNAME = value.PARAM.SNAME;
    this.STYPE = value.PARAM.STYPE;
    this.SATTRCODE = value.PARAM.SATTRCODE;
    this.SDES = value.PARAM.SDES;
    this.STMPLID = value.PARAM.STMPLID;
  }
  constructor(
    private fb: FormBuilder) {
  }
  ngOnInit(): void {
    const this_ = this;
    this.validateForm = this.fb.group({
      SNAME: [ this_.SNAME, [ Validators.required ] ],
      SDES: [ this_.SDES, [ Validators.nullValidator ] ],
    });
  }
}
