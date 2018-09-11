import { Component } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { Input } from '@angular/core';
import { BgrpFormatService } from 'src/app/services/format.service';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
/**
 * 新增报表格式页面
 */
@Component({
  selector: 'rp-format-modal-add',
  template: `
    <nz-steps [nzCurrent]="current">
      <nz-step nzTitle="填写基础信息"></nz-step>
      <nz-step nzTitle="设置报表属性"></nz-step>
      <nz-step nzTitle="绘制"></nz-step>
    </nz-steps>
    <div class="steps-content" *ngIf="current === 0">
      <form nz-form [formGroup]="validateForm" (ngSubmit)="submitForm()">
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired>报表任务</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <span>{{STASKNAME}}</span>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="SCODE">报表编码</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input formControlName="SCODE" placeholder="请输入报表编码" id="SCODE"/>
          <nz-form-explain *ngIf="validateForm.get('SCODE').dirty && validateForm.get('SCODE').
            errors">报表编码不能为空!</nz-form-explain>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="SBREVITYCODE">报表简码</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <input nz-input formControlName="SBREVITYCODE" placeholder="请输入报表简码" id="SBREVITYCODE"/>
            <nz-form-explain *ngIf="validateForm.get('SBREVITYCODE').dirty && validateForm.get('SBREVITYCODE').
              errors">报表简码不能为空!</nz-form-explain>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="SNAME">报表名称</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <input nz-input formControlName="SNAME" placeholder="请输入报表名称" id="SNAME"/>
            <nz-form-explain *ngIf="validateForm.get('SNAME').dirty && validateForm.get('SNAME').
              errors">报表名称不能为空!</nz-form-explain>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="NUNIT">金额单位</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <nz-select class="form-right" formControlName="NUNIT" id="NUNIT">
              <nz-option nzLabel="元" nzValue="0"></nz-option>
              <nz-option nzLabel="万元" nzValue="4"></nz-option>
              <nz-option nzLabel="亿元" nzValue="8"></nz-option>
            </nz-select>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="SSBXZ">上报性质</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <nz-select class="form-right" formControlName="SSBXZ" id="SSBXZ" nzPlaceHolder="请选择">
              <nz-option nzLabel="年度" nzValue="1"></nz-option>
              <nz-option nzLabel="季度" nzValue="2"></nz-option>
              <nz-option nzLabel="月度" nzValue="3"></nz-option>
            </nz-select>
            <nz-form-explain *ngIf="validateForm.get('SSBXZ').dirty && validateForm.get('SSBXZ').errors">请选择上报性质!</nz-form-explain>
          </nz-form-control>
        </nz-form-item>
        <nz-form-item>
          <nz-form-label [nzSm]="6" [nzXs]="24" nzRequired nzFor="STYPE">报表类型</nz-form-label>
          <nz-form-control [nzSm]="14" [nzXs]="24">
            <nz-radio-group formControlName="STYPE" id="STYPE" >
              <label nz-radio nzValue="1">固定</label>
              <label nz-radio nzValue="2">浮动</label>
            </nz-radio-group>
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
    <div class="steps-content" *ngIf="current === 1">
      <div class="form-control clearfix">
        <label>表头属性:</label>
        <nz-select class="form-right" [(ngModel)]='H' name="H" nzPlaceHolder="请选择"
         nzMode="tags" (ngModelChange)="selectChange('disH',$event)">
          <nz-option *ngFor="let option of attrList" [nzLabel]="option.SDIM_NAME"
           [nzValue]="option.SDIM_CODE" [nzDisabled]="option.disH"></nz-option>
        </nz-select>
      </div>
      <div class="form-control clearfix">
        <label>数据属性:</label>
        <nz-select class="form-right" [(ngModel)]='D' name="D"
         nzPlaceHolder="请选择" nzMode="tags" (ngModelChange)="selectChange('disD',$event)">
          <nz-option *ngFor="let option of attrList"
           [nzLabel]="option.SDIM_NAME" [nzValue]="option.SDIM_CODE" [nzDisabled]="option.disD"></nz-option>
        </nz-select>
      </div>
    </div>
    <div class="steps-content steps-content3" *ngIf="current === 2">
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
        <label>报表编码:</label>
        <span class="form-right">{{SCODE}}</span>
      </div>
      <div class="form-control form-control3">
        <label>报表名称:</label>
        <span class="form-right">{{SNAME}}</span>
      </div>
      <div class="form-control form-control3">
        <label>表头属性:</label>
        <span class="form-right">{{HNAME}}</span>
      </div>
      <div class="form-control form-control3">
        <label>数据属性:</label>
        <span class="form-right">{{DNAME}}</span>
      </div>
      </div>
    </div>
    <div class="ant-modal-footer steps-action">
      <button nz-button nzType="default" (click)="pre()" *ngIf="current === 1">
        <span>上一步</span>
      </button>
      <button nz-button nzType="default" (click)="next()" *ngIf="current === 1 || current === 0">
        <span>下一步</span>
      </button>
      <button nz-button nzType="primary" (click)="done()" *ngIf="current === 2">
        <span>绘制格式</span>
      </button>
      <button nz-button nzType="default" (click)="destroyModal()" *ngIf="current === 2">
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
export class FormatAddModalComponent implements OnInit {
  current = 0;
  SNAME: String;
  SCODE: String;
  H: any[] = [];
  D: any[] = [];
  attrList: any[] = [];
  HNAME: any[] = [];
  DNAME: any[] = [];
  validateForm: FormGroup;

  STASKNAME: String;
  STASKCODE: String;

  @Input()
  set param(value: any) {
    this.STASKNAME = value.STASKNAME;
    this.STASKCODE = value.STASKCODE;
    // 查询头属性和数据属性
    this.queryAttr();
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    const this_ = this;
    if (this.current === 1) {
      // 点击下一步前,将数据保存
      this.insertData().subscribe(result => {
        if (result.CODE === '0') {
          this.current += 1;
        } else {
          this_.message.error(result.MSG);
        }
      });
      let SDIM_CODE = '';
      let SDIM_NAME = '';
      const attrListInversion = [];
      this_.attrList.forEach(function(e) {
        SDIM_CODE = e.SDIM_CODE;
        SDIM_NAME = e.SDIM_NAME;
        attrListInversion[SDIM_CODE] = SDIM_NAME;
      });
      this_.H.forEach(function(e) {
        this_.HNAME.push(attrListInversion[e]);
      });
      this_.D.forEach(function(e) {
        this_.DNAME.push(attrListInversion[e]);
      });
    } else {
      if (this.current === 0) {
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
      }
      this.current += 1;
    }
  }

  submitForm() {
  }

  done(): void {
  }

  destroyModal(): void {
    this.modal.destroy({ data: 'refresh' });
  }


  constructor(
    private modal: NzModalRef,
    public mainService: BgrpFormatService,
    private message: NzMessageService,
    private fb: FormBuilder) {
  }


  insertData(): any {
    const param = this.validateForm.value;
    param['STASKCODE'] = this.STASKCODE;
    param['H'] = this.H;
    param['D'] = this.D;
    this.SNAME = param.SNAME;
    this.SCODE = param.SCODE;
    return this.mainService.insertOrUpdate(param);
  }

  queryAttr(): void {
    const this_ = this;
    this.mainService.queryAttr('').subscribe(result => {
      if (result.CODE === '0') {
        result.DATA.forEach(element => {
          element.disH = false;
          element.disD = false;
          this_.attrList.push(element);
        });
      }
    });
  }

  selectChange(mark: String, event: any[]): void {
    this.attrList.forEach(i => {
      if (mark === 'disH') {
        if (event.indexOf(i.SDIM_CODE) !== -1) {
          i.disD = true;
        } else {
          i.disD = false;
        }
      } else if (mark === 'disD') {
        if (event.indexOf(i.SDIM_CODE) !== -1) {
          i.disH = true;
        } else {
          i.disH = false;
        }
      }
    });
  }
  ngOnInit(): void {
    const this_ = this;
    this.validateForm = this.fb.group({
      SNAME: [ null, [ Validators.required ] ],
      SCODE: [ null, [ Validators.required ] ],
      SBREVITYCODE: [ null, [ Validators.required ] ],
      NUNIT: [ '0', [ Validators.required ] ],
      STYPE: [ '1', [ Validators.required ] ],
      SSBXZ: [ null, [ Validators.required ] ],
      NORDER: [ null, [ Validators.pattern(/^[0-9]*$/) ] ],
      SDES: [ null, [ Validators.nullValidator ] ],
    });
  }
}
