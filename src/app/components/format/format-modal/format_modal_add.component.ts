import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Input } from '@angular/core';
/**
 * 新增报表格式页面
 */
@Component({
  selector: 'bgrp-format-modal',
  template: `
    <nz-steps [nzCurrent]="current">
      <nz-step nzTitle="填写基础信息"></nz-step>
      <nz-step nzTitle="设置报表属性"></nz-step>
      <nz-step nzTitle="绘制"></nz-step>
    </nz-steps>

    <div class="steps-content" *ngIf="current === 0">
      <div >
        <span>报表任务:</span>
        <span>{{STASKNAME}}</span>
      </div>
      <div >
        <span>报表编码:</span>
        <input nz-input placeholder="请输入报表编码" [(ngModel)]="SCODE" name="SCODE"/>
      </div>
      <div>
        <span>报表简码:</span>
        <input nz-input placeholder="请输入报表简码" />
      </div>
      <div>
        <span>报表名称:</span>
        <input nz-input placeholder="请输入报表名称" [(ngModel)]="SNAME" name="SNAME"/>
      </div>
      <div>
        <span>金额单位:</span>
        <nz-select style="width: 200px;" [(ngModel)]='singleValue' name="SUNIT" nzPlaceHolder="请选择">
          <nz-option nzLabel="元" nzValue="0"></nz-option>
          <nz-option nzLabel="万元" nzValue="4"></nz-option>
          <nz-option nzLabel="亿元" nzValue="8"></nz-option>
        </nz-select>
      </div>
      <div>
        <span>说明:</span>
        <textarea row="4" nz-input [(ngModel)]="SDES" placeholder="请输入对本报表的说明" name="SDES"></textarea>
      </div>
    </div>
    <div class="steps-content" *ngIf="current === 1">
      <div>
        <span>表头属性:</span>
        <nz-select style="width: 200px;" [(ngModel)]='H' name="H" nzPlaceHolder="请选择">
          <nz-option nzLabel="元" nzValue="0"></nz-option>
          <nz-option nzLabel="万元" nzValue="4"></nz-option>
          <nz-option nzLabel="亿元" nzValue="8"></nz-option>
        </nz-select>
      </div>
      <div>
        <span>数据属性:</span>
        <nz-select style="width: 200px;" [(ngModel)]='D' name="D" nzPlaceHolder="请选择">
          <nz-option nzLabel="元" nzValue="0"></nz-option>
          <nz-option nzLabel="万元" nzValue="4"></nz-option>
          <nz-option nzLabel="亿元" nzValue="8"></nz-option>
        </nz-select>
      </div>
    </div>
    <div class="steps-content" *ngIf="current === 2">
      <div>
        <span>报表编码:</span>
        <span>报表名称:</span>
      </div>
      <div>
        <span>表头属性:</span>
        <span>数据属性:</span>
      </div>
    </div>
    <div class="steps-action">
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
  styles  : [
      `
      .steps-content {
        margin-top: 16px;
        border: 1px dashed #e9e9e9;
        border-radius: 6px;
        background-color: #fafafa;
        min-height: 200px;
        text-align: center;
        padding-top: 80px;
      }

      .steps-action {
        margin-top: 24px;
      }
      

      button {
        margin-right: 8px;
      }
    `
  ]
})
export class FormatAddModalComponent {
  current = 0;
  SNAME: String;
  SCODE: String;
  SUNIT: String;
  SDES: String;
  H: String;
  D: String;

  STASKNAME: String;

  @Input()
  set param(value: any) {
    this.STASKNAME = value.STASKNAME;
    
  }

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
    
  }

  destroyModal(): void {
    this.modal.destroy({ data: 'this the result data' });
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        
        break;
      }
      case 1: {
        
        break;
      }
      case 2: {
        
        break;
      }
      default: {
        
      }
    }
  }

  constructor(private modal: NzModalRef) {
  }
}