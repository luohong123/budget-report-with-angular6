import { Component, OnInit } from '@angular/core';
import { BgrpFileTemplateService } from 'src/app/services/file-template.service';
import { BgrpTaskService } from 'src/app/services/task.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { FileTemplateAddModalComponent } from 'src/app/components/file-template/file-template-modal/file-template-modal-add.component';
import { FileTemplateEditModalComponent } from 'src/app/components/file-template/file-template-modal/file-template-modal-edit.component';

@Component({
    selector: 'rp-file-template',
    templateUrl: './file-template.component.html',
    styleUrls: ['./file-template.component.css']
})
export class FileTemplateComponent implements OnInit {


    // 任务select
    listOfOption: any[] = [];
    TASKID: String = '';

    isVisible = false;
    chooseDeleteParam: any;

    rpListOption: any = {
        // 是否显示工具栏
        showToolPanel: true,
        // 工具栏按钮
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
        // 表列头
        fields: [
            {
                headerName: '文件名称',
                field: 'SNAME',
                menuTabs: []
            },
            {
                headerName: '文件属性',
                field: 'SATTR',
                menuTabs: []
            },
            {
                headerName: '文件类型',
                field: 'STYPE',
                menuTabs: []
            },
            // {
            //     headerName: '包含格式',
            //     field: 'D',
            //     menuTabs: []
            // },
            {
                headerName: '格式说明',
                field: 'SDES',
                menuTabs: []
            }
        ]
    };

    data: any[] = [];

    constructor(public mainService: BgrpFileTemplateService, private taskService: BgrpTaskService,
        private modalService: NzModalService, private message: NzMessageService) { }

    ngOnInit() {
        const this_ = this;
        this_.taskService.queryData({
            STASKCODE: "",
            STASKNAME: ""
        }).subscribe(result => {
            result.DATA.forEach(element => {
                this_.listOfOption.push(element);
            })
            if (this_.TASKID === "") {
                this_.TASKID = this_.listOfOption[0].ID;
            }

            this.queryRowData();
        })
    }
    /**
     * 根据任务Id查询表格数据
     * @param e 
     */
    queryRowData(): void {
        this.data = [];
        const array = [];
        this.mainService.queryData(this.TASKID).subscribe(result => {
            result.DATA.forEach(element => {
                array.push(element);
            });
            this.data = array;
        });
    }
    /**
     * 选择任务
     */
    selectTask(event: String): void {
        this.TASKID = event;
        this.queryRowData();
    }

    /**
     * 新增按钮点击事件
     */
    addClick(): void {
        //弹出新增对话框
        this.showAddModal("");
    }
    //表格操作按钮事件
    listToolEvent(event) {
        switch (event.eventName) {
            case 'edit':
                this.showEidtModal(event.param);
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
     * @description 新增弹窗
     */
    showAddModal(param: string) {
        let task;
        let this_ = this;
        this.listOfOption.forEach(element => {
            if (element.ID === this_.TASKID) {
                task = element;
            }
        })
        const modal = this.modalService.create({
            nzTitle: '新建模板',
            nzContent: FileTemplateAddModalComponent,
            nzFooter: null,
            nzWidth: '550',
            nzOnOk(componentParam) {
            },
            nzOnCancel(componentParam) {
                //点击弹框右上角❌,回调事件
                if (componentParam.current === 1) {
                    this_.queryRowData();
                }
            },
            nzComponentParams: {
                param: task
            }
        });
        //当关闭对话框时判断是否已经新增了数据,若已新增则更新表格数据
        modal.afterClose.subscribe((result) => {
            modal.destroy();
            if (result !== undefined && result.data === 'refresh') {
                //更新表格数据
                this_.queryRowData();
            }
        })
    }
    /**
     * @description 编辑弹窗
     */
    showEidtModal(param: string) {
        let task;
        let this_ = this;
        this.listOfOption.forEach(element => {
            if (element.ID === this_.TASKID) {
                task = element;
            }
        })
        const modal = this.modalService.create({
            nzTitle: '编辑模板',
            nzContent: FileTemplateEditModalComponent,
            nzWidth: '550',
            nzOnOk(componentParam) {
                const condition = {
                    ID: componentParam.ID,
                    SNAME: componentParam.SNAME,
                    SDES: componentParam.SDES,
                }
                this_.updateData(condition);
            },
            nzOnCancel(componentParam) {
            },
            nzComponentParams: {
                param: {
                    TASK: task,
                    PARAM: param
                }
            }
        });
    }

    updateData(param: any): void {
        const this_ = this;
        this.mainService.insertOrUpdate(param).subscribe(result => {
            if (result.CODE === "0") {
                this_.message.success(result.MSG);
                //刷新列表数据
                this_.queryRowData();
            } else {
                this_.message.error(result.MSG);
            }
        })
    }
    /**
     * 删除数据
     */
    handleOk() {
        this.deleteOne(this.chooseDeleteParam);
        this.isVisible = false;
    }
    /**
    * 
    * @param param 新增修改调用后台接口
    */
    deleteOne(param: any): void {
        const this_ = this;
        this.mainService.deleteOne(param).subscribe(result => {
            if (result.CODE === "0") {
                this_.message.success(result.MSG);
                //刷新列表数据
                this_.queryRowData();
            } else {
                this_.message.error(result.MSG);
            }
        })
    }
}
