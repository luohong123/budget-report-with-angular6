import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

/**
 * 新增报表格式页面
 */
@Component({
  selector: 'rp-format-modal-edit',
  template: `
    <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24">报表任务</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <span>{{STASKNAME}}</span>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="SNAME">格式名称</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="SNAME" placeholder="请输入格式名称" id="SNAME"/>
          <nz-form-explain *ngIf="validateForm.get('SNAME').dirty && validateForm.get('SNAME').
            errors">格式名称不能为空!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24">格式编号</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <span>{{SCODE}}</span>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24">头属性</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <span class="form-right">{{H}}</span>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24">数据属性</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <span class="form-right">{{D}}</span>
        </nz-form-control>
      </nz-form-item>
      <!--<div class="form-control clearfix">
        <label>排序号:</label>
        <input class="form-right" nz-input placeholder="请输入排序号" [(ngModel)]="NORDER" name="NORDER"/>
      </div>-->
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
export class FormatEditModalComponent implements OnInit {
  ID: String;
  SNAME: String;
  SCODE: String;
  H: String;
  D: String;
  SDES: String;
  NORDER: number;
  STASKNAME: String;
  TASKID: String;
  validateForm: FormGroup;
  @Input()
  set param(value: any) {
    this.STASKNAME = value.TASK.STASKNAME;
    this.SNAME = value.PARAM.SNAME;
    this.SCODE = value.PARAM.SCODE;
    this.H = value.PARAM.H;
    this.D = value.PARAM.D;
    this.SDES = value.PARAM.SDES;
    this.ID = value.PARAM.ID;
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
