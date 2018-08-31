import { Component, OnInit } from '@angular/core';
import { BgrpFormatService } from '../../services/format.service';
import { FormatModalComponent } from './format-modal/format-modal.component';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { BgrpTaskService } from 'src/app/services/task.service';
import { FormatAddModalComponent } from 'src/app/components/format/format-modal/format_modal_add.component';
@Component({
    selector: 'format',
    templateUrl: './format.compontent.html',
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
export class BgrpFormatComponent implements OnInit{
    
    classifyrowData: any[];
    anySelections: any;
    selectValue: any;
    chooseDeleteParam: any;
    isVisible = false;
    listOfOption: any[] = [];
    TASKID: String = "";

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
                name: "设计",
                code: "design"
            },
            {
                name: "删除",
                code: "remove"
            },
        ],
        //表列头
        fields: [
            {
                headerName: '格式编号',
                field: 'SCODE',
                menuTabs: []
            },
            {
                headerName: '格式名称',
                field: 'SNAME',
                menuTabs: []
            },
            {
                headerName: '头属性',
                field: 'H',
                menuTabs: []
            },
            {
                headerName: '数据属性',
                field: 'D',
                menuTabs: []
            },
            {
                headerName: '格式说明',
                field: 'SDES',
                menuTabs: []
            }
        ]
    };

    data: any[] = [
        // {
        //     SNAME    : '1',
        //     SCODE    : '1',
        //     LITLE   : 'John Brown',
        //     ROW    : 32,
        //     LINE: 'New York No. 1 Lake Park',
        //     SDES:123,
        // }
    ];

    constructor(public mainService: BgrpFormatService, private modalService: NzModalService,
         private message: NzMessageService,private taskService: BgrpTaskService) {
        this.isVisible = false;

    }

    ngOnInit(): void {
        const this_ = this;
        //查看cookie中有没有保存taskid;
        //若有,将TASKID取出赋值
        let arrStr = document.cookie.split("; ");
        for (let i = 0; i < arrStr.length; i++) {
            let temp = arrStr[i].split("=");
            if (temp[0] == "TASKID")
                this_.TASKID=temp[1];
        }
        
        //为nz-select赋值,查询任务
        this_.taskService.queryData({
            STASKCODE : "",
            STASKNAME : ""
        }).subscribe(result=>{
            result.DATA.forEach(element => {
                this_.listOfOption.push(element);
            })
        })
        if(this_.TASKID === ""){
            this_.TASKID = this_.listOfOption[0].ID;
        }

        this.queryRowData(this_.TASKID);

    }

    listAdd(): void{
        this.showModalForComponent("");
    }

    queryRowData(e): any {
        this.data = [];
        const array = [];
        this.mainService.queryData(e).subscribe(result => {
            result.DATA.forEach(element => {
                array.push(element);
            });
            this.data = array;
        });

    }
    //表格操作按钮事件
    listToolEvent(event) {
        switch (event.eventName) {
            case 'edit':
                this.showModalForComponent(event.param);
                break;
            case 'design':
                break;
            case 'remove':
                this.chooseDeleteParam = event.param;
                this.isVisible = true;
                break;
            default:
                break;
        }
    }
    /**
     * @description 弹窗
     */
    showModalForComponent(param: string) {
        let task;
        let this_ = this;
        this.listOfOption.forEach(element =>{
            if(element.ID===this_.TASKID){
                task = element; 
            }
        })
        
        console.log();
        const modal = this.modalService.create({
            nzTitle: '新建报表',
            nzContent: FormatAddModalComponent,
            nzFooter: null,
            nzWidth: '700',
            nzOnOk(event) {
                this_.insertOrUpdate(event);
            },
            nzOnCancel() {
            },
            nzComponentParams: {
                param: task
            }
        });
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
                this_.queryRowData("");
            }else if(result.CODE === "20001"){
                this_.message.error(result.MSG);
            }else{
                this_.message.error(result.MSG);
            }
        })
    }

    /**
     * 选择报表任务查询
     */
    selectTask(event): void {
        document.cookie = "TASKID="+event;
        this.TASKID = event;
        this.queryRowData(event);
    }
    /**
     * 删除提示框选择确定
     */
    handleOk(): void {
        //this.deleteOne(this.chooseDeleteParam);
        this.isVisible = false;
    }
    /**
     * 删除提示框选择取消
     */
    handleCancel(): void {
        this.chooseDeleteParam = null;
        this.isVisible = false;
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
                this_.queryRowData("");
            }else if(result.CODE === "20001"){
                this_.message.error(result.MSG);
            }else{
                this_.message.error(result.MSG);
            }
        })
    }
}


