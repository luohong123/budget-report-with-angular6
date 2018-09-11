import { Component, OnInit } from '@angular/core';
import { BgrpFormatService } from '../../services/format.service';
import { NzModalService, NzMessageService } from 'ng-zorro-antd';
import { BgrpTaskService } from 'src/app/services/task.service';
import { FormatAddModalComponent } from './format-modal/format-modal-add.component';
import { FormatEditModalComponent } from './format-modal/format-modal-eidt.component';
@Component({
    selector: 'rp-format',
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
export class BgrpFormatComponent implements OnInit {
    classifyrowData: any[];
    anySelections: any;
    selectValue: any;
    chooseDeleteParam: any;
    isVisible = false;
    listOfOption: any[] = [];
    TASKCODE: String = '';

    rpListOption: any = {
        // 是否显示工具栏
        showToolPanel: true,
        // 工具栏按钮
        tools: [
            {
                name: '编辑',
                code: 'edit'
            },
            {
                name: '设计',
                code: 'design'
            },
            {
                name: '删除',
                code: 'remove'
            },
        ],
        // 表列头
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

    data: any[] = [];

    constructor(public mainService: BgrpFormatService, private modalService: NzModalService,
        private message: NzMessageService, private taskService: BgrpTaskService) {
        this.isVisible = false;

    }

    ngOnInit(): void {
        const this_ = this;
        // 查看cookie中有没有保存TASKCODE;
        // 若有,将TASKCODE取出赋值
        const arrStr = document.cookie.split('; ');
        for (let i = 0; i < arrStr.length; i++) {
            const temp = arrStr[i].split('=');
            if (temp[0] === 'TASKCODE') { this_.TASKCODE = temp[1]; }
        }

        // 为nz-select赋值,查询任务
        this_.taskService.queryData({
            STASKCODE: '',
            STASKNAME: ''
        }).subscribe(result => {
            result.DATA.forEach(element => {
                this_.listOfOption.push(element);
            });
            if (this_.TASKCODE === '') {
                this_.TASKCODE = this_.listOfOption[0].STASKCODE;
            }

            this.queryRowData();
        });
    }

    listAdd(): void {
        this.showAddModal();
    }

    queryRowData(): void {
        this.data = [];
        const array = [];
        this.mainService.queryData(this.TASKCODE).subscribe(result => {
            result.DATA.forEach(element => {
                array.push(element);
            });
            this.data = array;
        });
    }
    // 表格操作按钮事件
    listToolEvent(event): void {
        switch (event.eventName) {
            case 'edit':
                this.showEditModal(event.param);
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
    showAddModal(): void {
        let task;
        const this_ = this;
        this.listOfOption.forEach(element => {
            if (element.STASKCODE === this_.TASKCODE) {
                task = element;
            }
        });

        const modal = this.modalService.create({
            nzTitle: '新建报表',
            nzContent: FormatAddModalComponent,
            nzFooter: null,
            nzWidth: '700',
            nzOnOk(event) {
                this_.insertOrUpdate(event);
            },
            nzOnCancel(componentParam) {
                // 点击弹框右上角❌,回调事件
                if (componentParam.current === 2) {
                    this_.queryRowData();
                }
            },
            nzComponentParams: {
                param: task
            }
        });
        // 当关闭对话框时判断是否已经新增了数据,若已新增则更新表格数据
        modal.afterClose.subscribe((result) => {
            if (result !== undefined && result.data === 'refresh') {
                // 更新表格数据
                this_.queryRowData();
            }
        });
    }

    /**
     * @param param 新增修改调用后台接口
     */
    insertOrUpdate(param: any): void {
        const this_ = this;
        this.mainService.insertOrUpdate(param).subscribe(result => {
            if (result.CODE === '0') {
                this_.message.success(result.MSG);
                // 刷新列表数据
                this_.queryRowData();
            } else {
                this_.message.error(result.MSG);
            }
        });
    }

    /**
     * 选择报表任务查询
     */
    selectTask(event): void {
        // 将选择的任务id保存入cookie
        document.cookie = 'TASKCODE=' + event;
        this.TASKCODE = event;
        this.queryRowData();
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
    /**
     * @param param 新增修改调用后台接口
     */
    deleteOne(param: any): void {
        const this_ = this;
        this.mainService.deleteOne(param).subscribe(result => {
            if (result.CODE === '0') {
                this_.message.success(result.MSG);
                // 刷新列表数据
                this_.queryRowData();
            } else {
                this_.message.error(result.MSG);
            }
        });
    }

    /**
     * @description 编辑弹窗
     */
    showEditModal(param: string): void {
        const this_ = this;
        let task;
        this.listOfOption.forEach(element => {
            if (element.STASKCODE === this_.TASKCODE) {
                task = element;
            }
        });
        const modal = this.modalService.create({
            nzTitle: '编辑格式',
            nzContent: FormatEditModalComponent,
            nzWidth: '550',
            nzOnOk(componentParam) {
                const condition = {
                    ID: componentParam.ID,
                    SNAME: componentParam.SNAME,
                    SCODE: componentParam.SCODE,
                    SDES: componentParam.SDES,
                };
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
            if (result.CODE === '0') {
                this_.message.success(result.MSG);
                // 刷新列表数据
                this_.queryRowData();
            } else if (result.CODE === '20001') {
                this_.message.success(result.DATA);
            } else {
                this_.message.error(result.MSG);
            }
        });
    }
}


