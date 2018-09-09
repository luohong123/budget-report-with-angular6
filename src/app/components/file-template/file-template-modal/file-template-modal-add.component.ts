import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BgrpFileTemplateService } from 'src/app/services/file-template.service';
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
      <div class="form-control clearfix">
        <label>报表任务:</label>
        <span class="form-right">{{STASKNAME}}</span>
      </div>
      <div class="form-control clearfix">
        <label>模板名称:</label>
        <input class="form-right" nz-input placeholder="请输入模板名称" [(ngModel)]="SNAME" name="SNAME"/>
      </div>
      <div class="form-control clearfix">
        <label>模板类型:</label>
        <nz-select class="form-right" [(ngModel)]='STYPE' name="STYPE" nzPlaceHolder="请选择">
          <nz-option nzLabel="单格式" nzValue="S"></nz-option>
          <nz-option nzLabel="多格式" nzValue="M"></nz-option>
        </nz-select>
      </div>
      <div class="form-control clearfix">
        <label>文件属性:</label>
        <nz-select class="form-right" [(ngModel)]='SATTR' name="SATTR" nzMode="tags" nzPlaceHolder="请选择">
          <nz-option nzLabel="属性一" nzValue="0"></nz-option>
          <nz-option nzLabel="属性二" nzValue="4"></nz-option>
          <nz-option nzLabel="属性三" nzValue="8"></nz-option>
        </nz-select>
      </div>
      <div class="form-control clearfix">
        <label>排序号:</label>
        <input class="form-right" nz-input placeholder="请输入排序号" [(ngModel)]="NORDER" name="NORDER"/>
      </div>
      <div class="form-control form-textarea clearfix">
        <label>说明:</label>
        <textarea row="4" class="form-right" nz-input [(ngModel)]="SDES" placeholder="请输入对本文件模板的说明" name="SDES"></textarea>
      </div>
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
        <span class="form-right">{{SATTR}}</span>
      </div>
      <div class="form-control form-control3">
        <label>文件类型:</label>
        <span class="form-right">{{STYPE}}</span>
      </div>
      <!--<div class="form-control form-control3">
        <label>包含格式:</label>
        <span class="form-right">数据属性</span>
      </div>-->
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
export class FileTemplateAddModalComponent {
  current = 0;
  SNAME: String;
  STYPE: String;
  SATTR: String;
  SDES: String;
  NORDER: number;
  STASKNAME: String;
  TASKCODE: String;

  @Input()
  set param(value: any) {
    this.STASKNAME = value.STASKNAME;
    this.TASKCODE = value.STASKCODE;
  }

  next(): void {
    this.insertData().subscribe(result => {
      if (result.CODE === '0') {
        this.current += 1;
      }
    });
  }

  done(): void {
    console.log('done');
  }

  destroyModal(): void {
    if (this.current === 0) {
      this.modal.destroy({ data: '' });
    } else if (this.current === 1) {
      this.modal.destroy({ data: 'refresh' });
    }
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {

        break;
      }
      case 1: {

        break;
      }
      default: {

      }
    }
  }

  constructor(private modal: NzModalRef, private http: HttpClient, private mainService: BgrpFileTemplateService) {
  }

  /**
   * 保存数据
   */
  insertData(): any {
    const param: any = {
      SNAME: this.SNAME,
      STYPE: this.STYPE,
      SDES: this.SDES,
      STASKCODE: this.TASKCODE,
      NORDER: this.NORDER
    };
    return this.mainService.insertOrUpdate(param);
  }

}