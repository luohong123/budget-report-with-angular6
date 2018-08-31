import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BgrpTaskService } from '../../services/task.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { TaskModalComponent } from './task_modal.compontent';

@Component({
    selector: 'task',     //selector 要更正对应
    templateUrl: './task.compontent.html',   //html 写在这里
    styles: [`
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
    `]
})
export class BgrpTaskComponent {
    
    taskCode_filter: any = "";
    taskName_filter: any = "";

    isVisible = false;
    chooseDeleteParam: any;
    
    rpListOption: any = {
        // 是否显示工具栏
        showToolPanel: true,
        //工具栏按钮
        tools: [
            {
                name: "编辑",
                code: "edit"
            },
            {
                name: "删除",
                code: "remove"
            },
        ],
        //表列头
        fields: [
            {
                headerName: '任务编号',
                field: 'STASKCODE',
                menuTabs: []
            },
            {
                headerName: '任务名称',
                field: 'STASKNAME',
                menuTabs: []
            },
            {
                headerName: '格式说明',
                field: 'SDES',
                menuTabs: []
            }
        ]
    };
    //列表数据
    data: any[] = [];

    constructor(public mainService: BgrpTaskService, public router: Router, public activedRoute: ActivatedRoute, 
        private modalService: NzModalService,private message: NzMessageService) {

        this.queryRowData();
    }
    /**
     * 查询按钮事件
     */
    searchElement(){
        this.queryRowData();
    }
    /**
     * 重置按钮事件
     */
    cleanSelect(){
        this.taskCode_filter = '';
        this.taskName_filter = '';
        this.queryRowData();
    }

    /**
     * 新增
     */
    listAdd(){
        this.showModalForComponent("");
    }
    /**
     * 查询数据
     */
    queryRowData(): any {
        this.data = [];
        const params = {
            STASKCODE : this.taskCode_filter,
            STASKNAME : this.taskName_filter
        }
        const array = [];
        this.mainService.queryData(params).subscribe(result => {
            result.DATA.forEach(element => {
                array.push(element);
            });
            this.data = array;
        });
    }
    showModalForComponent(param: string): void{
        const this_ = this;
        const modal = this.modalService.create({
            nzTitle: '报表任务编辑',
            nzContent: TaskModalComponent,
            nzOnOk(event) {
                //console.log(event);
                this_.insertOrUpdate(event);
            },
            nzOnCancel() {
            },
            nzComponentParams: {
                param: param
            }
        });
      
    }

     /**
     * @description 编辑弹窗
     */
    //showModalForComponent(param: string) {
        // let this_ = this;
        // const subscription = this.modalService.open({
        //     title: '报表格式编辑',
        //     content: TaskModalComponent,
        //     onOk() {
        //     },
        //     onCancel() {
        //     },
        //     footer: false,
        //     componentParams: {
        //         param: param
        //     }
        // });
        // subscription.subscribe(result => {
        //     try {
        //         result=JSON.parse(result);
        //         this_.insertOrUpdate(result);
        //     } catch(e) {
        //     }
        // })
    //}
   
    /**
     * 判断参数是否是json格式
     * @param str 
     */
    isJSON(str: any): Boolean {    
        try {
            var obj=JSON.parse(str);
            return true;
        } catch(e) {
            return false;
        }
    }

    /**
     * 
     * @param param 新增修改调用后台接口
     */
    insertOrUpdate(param: any){
        let this_ = this;
        this.mainService.insertOrUpdate(param).subscribe(result => {
            if(result.CODE === "0"){
                this_.message.success(result.MSG);
                this_.queryRowData();
            }else if(result.CODE === "20001"){
                this_.message.error(result.MSG);
            }else{
                this_.message.error(result.MSG);
            }
        })
    }

    /**
     * 表格操作按钮事件 
     */
    listToolEvent(event) {
        switch (event.eventName) {
            case 'edit':
                this.showModalForComponent(event.param);
                break;
            case 'remove':
                //this.deleteOne(event.param);
                //弹出提示框
                this.chooseDeleteParam = event.param;
                this.isVisible = true;
                break;
            default:
                break;
        }
    }
     /**
     * 
     * @param param 新增修改调用后台接口
     */
    deleteOne(param: any){
        const this_ = this;
        this.mainService.deleteOne(param).subscribe(result => {
            if(result.CODE === "0"){
                this_.message.success(result.MSG);
                this_.queryRowData();
            }else if(result.CODE === "20001"){
                this_.message.error(result.MSG);
            }else{
                this_.message.error(result.MSG);
            }
        })
    }
    /**
     * 删除提示框选择确定
     */
    handleOk(): void {
        this.deleteOne(this.chooseDeleteParam);
        this.isVisible = false;
    }
    /**
     * 删除提示框选择取消
     */
    handleCancel(): void {
        this.chooseDeleteParam = null;
        this.isVisible = false;
    }
}


