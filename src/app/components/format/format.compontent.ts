import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BgrpFormatService } from '../../services/format.service';
import { FormatModalComponent } from './format-modal/format-modal.component';
import { NzModalService, NzMessageService, NzModalRef } from 'ng-zorro-antd';
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
export class BgrpFormatComponent {
    classifyrowData: any[];
    anySelections: any;
    selectValue: any;
    chooseDeleteParam: any;
    isVisible = false;

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
                headerName: '行属性',
                field: 'R',
                menuTabs: []
            },
            {
                headerName: '列属性',
                field: 'C',
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

    constructor(public mainService: BgrpFormatService, public router: Router, public activedRoute: ActivatedRoute
        , private modalService: NzModalService, private message: NzMessageService) {
        this.queryRowData("");
    }


    //按钮事件
    tlblistEvent(event: any){
        switch (event.eventName){
            case 'listAdd' :
                this.showModalForComponent("");
                break;
        }
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
            case 'delete':
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
        let this_ = this;
        
        const subscription: NzModalRef = this.modalService.create({
            nzTitle: '报表格式编辑',
            nzContent: FormatModalComponent,
            nzOnOk(event) {
                console.log(event);
            },
            nzOnCancel() {
            },
            nzFooter: null,
            nzComponentParams: {
                param: param
            }
        });
        // subscription.getContentComponent().subscribe(result => {
        //     console.log(result);
        //     try {
        //         result=JSON.parse(result);
        //         this_.insertOrUpdate(result);
        //     } catch(e) {
        //     }
        // })
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
    selectTask(event) {
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


