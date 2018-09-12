import { Component } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BgrpFileTemplateService } from 'src/app/services/file-template.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
/**
 * 新增报表格式页面
 */
@Component({
  selector: 'rp-file-template-modal-add',
  template: `
    <nz-steps [nzCurrent]="current">
      <nz-step nzTitle="填写基础信息"></nz-step>
      <nz-step nzTitle="完成"></nz-step>
    </nz-steps>
    <div class="steps-content" *ngIf="current === 0">
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
          <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="STYPE">模板类型</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <nz-select class="form-right" formControlName="STYPE" id="STYPE" nzPlaceHolder="请选择">
              <nz-option nzLabel="单格式" nzValue="S"></nz-option>
              <nz-option nzLabel="多格式" nzValue="M"></nz-option>
            </nz-select>
            <nz-form-explain *ngIf="validateForm.get('STYPE').dirty && validateForm.get('STYPE').
              errors">模板类型不能为空!</nz-form-explain>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="SATTR">文件属性</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <nz-select class="form-right" formControlName="SATTR" id="SATTR" nzPlaceHolder="请选择" nzMode="tags">
              <nz-option *ngFor="let option of attrList"
                [nzLabel]="option.SDIM_NAME" [nzValue]="option.SDIM_CODE"></nz-option>
            </nz-select>
            <nz-form-explain *ngIf="validateForm.get('SATTR').dirty && validateForm.get('SATTR').
              errors">文件属性不能为空!</nz-form-explain>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24"  nzFor="NORDER">排序码</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <input nz-input formControlName="NORDER" placeholder="请输入排序号" id="NORDER"/>
            <nz-form-explain *ngIf="validateForm.get('NORDER').dirty && validateForm.get('NORDER').errors">只能输入数字!</nz-form-explain>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24"  nzFor="SDES">说明</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <textarea row="4" nz-input formControlName="SDES" placeholder="请输入" id="SDES"></textarea>
          </nz-form-control>
        </nz-form-item>
      </form>
    </div>
    <div class="steps-content steps-content3" *ngIf="current === 1">
    <dl class="success_box">
        <dt>
          <div class="ant-steps-item-icon">
            <span class="ant-steps-icon anticon anticon-check ng-star-inserted"></span>
          </div>
        </dt>
        <dd>操作成功，请绘制格式</dd>
    </dl>
    <div class="form-controls">
      <div class="form-control form-control3">
        <label>模板名称:</label>
        <span class="form-right">{{SNAME}}</span>
      </div>
      <div class="form-control form-control3">
        <label>模板属性:</label>
        <span class="form-right">{{attrName}}</span>
      </div>
      <div class="form-control form-control3">
        <label>文件类型:</label>
        <span class="form-right">{{STYPE==='S'?'单格式':'多格式'}}</span>
      </div>
      <div class="form-control form-control3">
        <label>包含格式:</label>
        <span class="form-right"></span>
      </div>
      </div>
    </div>
    <div class="ant-modal-footer steps-action">
      <button nz-button nzType="default" (click)="destroyModal()" *ngIf="current === 0">
        <span>取消</span>
      </button>
      <button nz-button nzType="primary" (click)="next()" *ngIf="current === 0">
        <span>完成</span>
      </button>
      <button nz-button nzType="primary" (click)="done()" *ngIf="current === 1">
        <span>绘制格式</span>
      </button>
      <button nz-button nzType="default" (click)="destroyModal()" *ngIf="current === 1">
        <span>返回</span>
      </button>
    </div>
  `,
  styles: [
    ` .clearfix{clear:both;}
      .steps-content {
        height:auto;
        margin-top: 16px;
        border-radius: 6px;
        text-align: center;
        padding: 10px 20px;
      }
      .form-control{width:100%;height:32px;line-height:32px;margin-bottom:10px;}
      .form-control label{width:25%;float:left;text-align:right;padding-right:10px;}
      .form-control .form-right{float:left;width:60%;text-align:left;}
      .form-control span.form-right{text-align:left;}
      .form-textarea{height:50px;line-height:50px;}
      .steps-action{
        text-align: center;
        margin: 0px -24px;
        padding: 10px 20px 0px;
      }
      .success_box{width:100%;}
      .success_box .ant-steps-item-icon{border:1px solid #52c41a;background:#52c41a;width:40px;height:40px;}
      .success_box .ant-steps-item-icon>.ant-steps-icon{color:#fff;top:3px;}
      .success_box dd{font-size:20px;margin-top:10px;}
      .form-controls{clear:both;height:64px;}
      .form-control3{width:50%;float:left;margin-bottom:0px;}
      .form-control3 label,.form-control3 .form-right{width:50%;}
    `
  ]
})
export class FileTemplateAddModalComponent implements OnInit {
  current = 0;
  STASKNAME: String;
  TASKCODE: String;
  SNAME: String;
  attrList: any[] = [];
  SATTR: any[] = [];
  attrName: any[] = [];
  validateForm: FormGroup;

  @Input()
  set param(value: any) {
    this.STASKNAME = value.STASKNAME;
    this.TASKCODE = value.STASKCODE;
    // 查询头属性和数据属性
    this.queryAttr();
  }

  constructor(
    private modal: NzModalRef,
    private mainService: BgrpFileTemplateService,
    private fb: FormBuilder,
    private message: NzMessageService
    ) {
  }

  next(): void {
    // 表单校验
    let isValidate = true;
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
      if (this.validateForm.controls[ i ].errors !== null) {
        isValidate = false;
      }
    }
    if (!isValidate) {
      return;
    }

    const this_ = this;
    let SDIM_CODE = '';
    let SDIM_NAME = '';
    const attrListInversion = [];
    this_.attrList.forEach(function(e) {
      SDIM_CODE = e.SDIM_CODE;
      SDIM_NAME = e.SDIM_NAME;
      attrListInversion[SDIM_CODE] = SDIM_NAME;
    });
    this_.SATTR.forEach(function(e) {
      this_.attrName.push(attrListInversion[e]);
    });
    // this_.attrName = this_.attrName.substring(0, this_.attrName.length - 1);

    this.insertData().subscribe(result => {
      if (result.CODE === '0') {
        this.current += 1;
      } else {
        this.message.error(result.MSG);
      }
    });
  }

  done(): void {
  }

  destroyModal(): void {
    if (this.current === 0) {
      this.modal.destroy({ data: '' });
    } else if (this.current === 1) {
      this.modal.destroy({ data: 'refresh' });
    }
  }

  /**
   * 保存数据
   */
  insertData(): any {
    const param = this.validateForm.value;
    param['STASKCODE'] = this.TASKCODE;
    param['SATTR'] = this.SATTR;
    this.SNAME = param.SNAME;
    return this.mainService.insertOrUpdate(param);
  }
  /**
   * 查询属性
   */
  queryAttr(): void {
    const this_ = this;
    this.mainService.queryAttr('').subscribe(result => {
      if (result.CODE === '0') {
        result.DATA.forEach(element => {
          this_.attrList.push(element);
        });
      }
    });
  }

  ngOnInit(): void {
    const this_ = this;
    this.validateForm = this.fb.group({
      SNAME: [ null, [ Validators.required ] ],
      STYPE: [ null, [ Validators.required ] ],
      SATTR: [ null, [ Validators.nullValidator ] ],
      NORDER: [ null, [ Validators.pattern(/^[0-9]*$/) ] ],
      SDES: [ null, [ Validators.nullValidator ] ],
    });
  }
}
