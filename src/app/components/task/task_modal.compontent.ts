import { Component, OnInit, Input } from '@angular/core';
//import { NzModalSubject } from 'ng-zorro-antd';

@Component({
  selector: 'bgrp-format-modal',
  template: `
  <div>
    <fc-layoutcol fcheader fccontent1>
      <fc-text fccontent1 [(ngModel)]="STASKCODE" fcFieldCode='STASKCODE' name="STASKCODE" fcPlaceHolder="请输入任务代码" 
      fcLabel="任务编码" style="display:block;"></fc-text>
      <fc-text fccontent2 [(ngModel)]="STASKNAME" fcFieldCode='STASKNAME' name="STASKNAME" fcPlaceHolder="请输入任务名称"
      fcLabel="任务名称" style="display:block;" ></fc-text>
      <fc-text fccontent1 [(ngModel)]="NORDER" fcFieldCode='NORDER' name="NORDER" fcPlaceHolder="请输入排序码" fcLabel="排序码 "
      style="display:block;" ></fc-text>
    </fc-layoutcol>
    <fc-textarea fctoolbar  [(ngModel)]="SDES" fcPlaceHolder="描述" fcCol="1" fcRows="2" fcLabel="说明 " name="SDES"></fc-textarea>
    <div class="customize-footer" fccontent2>
      <button fctoolbar nz-button [nzType]="'default'" [nzSize]="'large'" (click)="handleCancel($event)">
      返 回
      </button>
      <button fctoolbar nz-button [nzType]="'primary'" [nzSize]="'large'" (click)="confirm($event)">
        确 认
      </button>
    </div>
  </div>
  `,
  styles: [`
  :host ::ng-deep .customize-footer {
    border-top: 1px solid #e9e9e9;
    padding: 10px 18px 0 10px;
    text-align: right;
    border-radius: 0 0 0px 0px;
    margin: 15px -16px -5px -16px;
  }
  :host ::ng-deep .fc-layoutpanel .fc-content{
  height:100%;
  }
  .list-search {
  width:100%;
  }
  .list-search:after{
  content:'';
  :host ::ng-deep .fc-layoutpanel .fc-content{
  height:100%;
  }
  .list-search {
  width:100%;
  }
  .list-search:after{
  content:'';
  display:block;
  clear:both;
  }
  .list-search-every{
  width:25%;
  float:left;
  }
  :host ::ng-deep .list-search-every .ant-form-item-label{
  min-width:64px;
  }
  
  :host ::ng-deep .fc-layoutpanel .fc-content{
  height:100%;
  }
  .list-search {
  width:100%;
  }
  .list-search:after{
  content:'';
  display:block;
  clear:both;
  }
  .list-search-every{
  width:25%;
  float:left;
  }
  :host ::ng-deep .list-search-every .ant-form-item-label{
  min-width:64px;
  }
  :host ::ng-deep .customize-footer {
    border-top: 1px solid #e9e9e9;
    padding: 10px 18px 0 10px;
    text-align: right;
    border-radius: 0 0 0px 0px;
    margin: 15px -16px -5px -16px;
  }
`]
})
export class TaskModalComponent implements OnInit {
    STASKCODE: String ;
    STASKNAME: String;
    NORDER: any;
    SDES: String;
    ID: String;

    @Input()
    set param(value: any) {
        this.STASKCODE= value.STASKCODE;
        this.STASKNAME= value.STASKNAME;
        this.NORDER= value.NORDER;
        this.SDES= value.SDES;
        this.ID= value.ID;
    }
    // constructor(private subject: NzModalSubject) {
    //     this.subject.on('onDestory', () => {

    //     });
    // }
    

    // confirm() {
    //   const param = {
    //       ID: this.ID,
    //       STASKCODE: this.STASKCODE,
    //       STASKNAME: this.STASKNAME,
    //       NORDER: this.NORDER,
    //       SDES: this.SDES,

    //   };
    //   this.subject.next(JSON.stringify(param));
    //   this.subject.destroy();
    // }

    // handleCancel(e) {
    //     this.subject.destroy('onCancel');
    // }

    ngOnInit() {
    }

}
