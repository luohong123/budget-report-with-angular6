import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'rp-format-modal',
  template: `
  <div>
    <fc-layoutcol fcheader fccontent1>
      <fc-text fccontent1 [(ngModel)]="SCODE"  fcPlaceHolder="请输入报表编码" 
        fcLabel="报表编码" style="display:block;"></fc-text>
      <fc-text fccontent2  [(ngModel)]="SNAME" fcPlaceHolder="请输入报表名称"
        fcLabel="报表名称" style="display:block;" ></fc-text>
    </fc-layoutcol>
    <fc-textarea fctoolbar  [(ngModel)]="SDES" fcPlaceHolder="描述" fcCol="1" fcRows="2" fcLabel="说明 " name="SDES"></fc-textarea>
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
export class FormatModalComponent implements OnInit {

  SCODE: String;
  SNAME: String;
  SDES: String;
  ID: String;

  @Input()
  set param(value: any) {
    this.SCODE = value.SCODE;
    this.SNAME = value.SNAME;
    this.SDES = value.SDES;
    this.ID = value.ID;
  }

  // confirm() {
  //   const param = {
  //     ID: this.ID,
  //     SCODE: this.SCODE,
  //     SNAME: this.SNAME,
  //     SDES: this.SDES,
  //   };
  //   this.subject.next(JSON.stringify(param));
  //   this.subject.destroy();
  // }

  
  constructor() {
    
  }

  ngOnInit() {
  }

}
