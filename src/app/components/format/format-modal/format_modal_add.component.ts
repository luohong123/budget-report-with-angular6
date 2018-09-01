import { Component } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { Input } from '@angular/core';
import { BgrpFormatService } from 'src/app/services/format.service';
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
      <div class="form-control clearfix">
        <label>报表任务:</label>
        <span class="form-right">{{STASKNAME}}</span>
      </div>
      <div class="form-control clearfix">
        <label>报表编码:</label>
        <input class="form-right" nz-input placeholder="请输入报表编码" [(ngModel)]="SCODE" name="SCODE"/>
      </div>
      <div class="form-control clearfix">
        <label>报表简码:</label>
        <input class="form-right" nz-input placeholder="请输入报表简码" />
      </div>
      <div class="form-control clearfix">
        <label>报表名称:</label>
        <input class="form-right" nz-input placeholder="请输入报表名称" [(ngModel)]="SNAME" name="SNAME"/>
      </div>
      <div class="form-control clearfix">
        <label>金额单位:</label>
        <nz-select class="form-right" [(ngModel)]='singleValue' name="SUNIT" nzPlaceHolder="请选择">
          <nz-option nzLabel="元" nzValue="0"></nz-option>
          <nz-option nzLabel="万元" nzValue="4"></nz-option>
          <nz-option nzLabel="亿元" nzValue="8"></nz-option>
        </nz-select>
      </div>
      <div class="form-control clearfix">
        <label>排序码:</label>
        <input class="form-right" nz-input placeholder="请输入排序号" [(ngModel)]="NORDER" name="NORDER"/>
      </div>
      <div class="form-control form-textarea clearfix">
        <label>说明:</label>
        <textarea row="4" class="form-right" nz-input [(ngModel)]="SDES" placeholder="请输入对本报表的说明" name="SDES"></textarea>
      </div>
    </div>
    <div class="steps-content" *ngIf="current === 1">
      <div class="form-control clearfix">
        <label>表头属性:</label>
        <nz-select class="form-right" [(ngModel)]='H' name="H" nzPlaceHolder="请选择" nzMode="tags">
          <nz-option *ngFor="let option of attrList" [nzLabel]="option.SDIM_NAME" [nzValue]="option.SDIM_CODE"></nz-option>
        </nz-select>
      </div>
      <div class="form-control clearfix">
        <label>数据属性:</label>
        <nz-select class="form-right" [(ngModel)]='D' name="D" nzPlaceHolder="请选择" nzMode="tags">
          <nz-option *ngFor="let option of attrList" [nzLabel]="option.SDIM_NAME" [nzValue]="option.SDIM_CODE"></nz-option>
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
        <span class="form-right">数据属性</span>
      </div>
      <div class="form-control form-control3">
        <label>数据属性:</label>
        <span class="form-right">数据属性</span>
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
export class FormatAddModalComponent {
  current = 0;
  SNAME: String;
  SCODE: String;
  SUNIT: String;
  SDES: String;
  NORDER: String;
  H: String;
  D: String;
  attrList: any[] = [];


  STASKNAME: String;
  STASKID: String;

  @Input()
  set param(value: any) {
    this.STASKNAME = value.STASKNAME;
    this.STASKID = value.ID;
    //查询头属性和数据属性
    this.queryAttr();
  }

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    const this_ = this;
    if(this.current === 1){
      //点击下一步前,将数据保存
      this.insertData().subscribe(result=>{
        if(result.CODE === '0'){
          this.current += 1;
        }else{
          this_.message.error(result.MSG);
        }
      })
    }else{
      this.current += 1;
    }
  }

  done(): void {
    console.log('done');

  }

  destroyModal(): void {
    this.modal.destroy({ data: 'refresh' });
  }


  constructor(private modal: NzModalRef,public mainService: BgrpFormatService,private message: NzMessageService) {
  }


  insertData(): any {
    const param = {
      SNAME: this.SNAME,
      SCODE: this.SCODE,
      SUNIT: this.SUNIT,
      SDES: this.SDES,
      STASKID: this.STASKID,
    }

    return this.mainService.insertOrUpdate(param);
  }

  queryAttr(): void {
    const this_ = this;
    this.mainService.queryAttr("").subscribe(result =>{
      if(result.CODE === '0'){
        result.DATA.forEach(element => {
          this_.attrList.push(element);
        });
      }
    })

  }
}