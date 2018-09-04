import { Component } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BgrpFileTemplateService } from 'src/app/services/file-template.service';
/**
 * 新增报表格式页面
 */
@Component({
  selector: 'rp-file-template-modal-edit',
  template: `
    <div class="steps-content">
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
        <span class="form-right">{{STYPE}}</span>
      </div>
      <div class="form-control clearfix">
        <label>文件属性:</label>
        <span class="form-right">{{SATTR}}</span>
      </div>
      <!--<div class="form-control clearfix">
        <label>排序号:</label>
        <input class="form-right" nz-input placeholder="请输入排序号" [(ngModel)]="NORDER" name="NORDER"/>
      </div>-->
      <div class="form-control form-textarea clearfix">
        <label>说明:</label>
        <textarea row="4" class="form-right" nz-input [(ngModel)]="SDES" placeholder="请输入对本文件模板的说明" name="SDES"></textarea>
      </div>
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
export class FileTemplateEditModalComponent {
  ID: String;
  SNAME: String;
  STYPE: String;
  SATTR: String;
  SDES: String;
  NORDER: number;
  STASKNAME: String;
  TASKID: String;

  @Input()
  set param(value: any) {
    this.STASKNAME = value.TASK.STASKNAME;
    this.SNAME = value.PARAM.SNAME;
    this.STYPE = value.PARAM.STYPE;
    this.SATTR = value.PARAM.SATTR;
    this.SDES = value.PARAM.SDES;
    this.ID = value.PARAM.ID;
  }
  constructor() {
  }
}