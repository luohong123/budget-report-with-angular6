import { Component, OnInit } from '@angular/core';
import { BgrpTaskService } from 'src/app/services/task.service';
import { RpFileGenerateService } from 'src/app/services/file-generate.service';

@Component({
  selector: 'rp-file-generate',
  templateUrl: './file-generate.component.html',
  styles: [
    `
    :host ::ng-deep .ant-table-expanded-row > td:last-child {
      padding: 0 48px 0 8px;
    }

    :host ::ng-deep .ant-table-expanded-row > td:last-child .ant-table-thead th {
      border-bottom: 1px solid #e9e9e9;
    }

    :host ::ng-deep .ant-table-expanded-row > td:last-child .ant-table-thead th:first-child {
      padding-left: 0;
    }

    :host ::ng-deep .ant-table-expanded-row > td:last-child .ant-table-row td:first-child {
      padding-left: 0;
    }

    :host ::ng-deep .ant-table-expanded-row .ant-table-row:last-child td {
      border: none;
    }

    :host ::ng-deep .ant-table-expanded-row .ant-table-thead > tr > th {
      background: none;
    }

    :host ::ng-deep .table-operation a.operation {
      margin-right: 24px;
    }
  `
  ]
})
export class FileGenerateComponent implements OnInit {
  listOfOption: any[] = [];  // 任务select
  TASKCODE: String = '';
  nestedTableData = [];
  innerTableData = [];
  nestedLoading = false;

  /**
   * 选择任务
   */
  selectTask(event: String): void {
    this.TASKCODE = event;
    this.queryRowData();
  }


  // 表格操作按钮事件
  listToolEvent(event) {
    switch (event.eventName) {
      case 'edit':
        break;
      case 'design':
        break;
      case 'remove':
        break;
      default:
        break;
    }
  }

  constructor(public mainService: RpFileGenerateService, private taskService: BgrpTaskService) { }

  /**
      * 根据任务Id查询表格数据
      */
  queryRowData(): void {
    this.nestedLoading = true;
    const array = [];
    this.mainService.queryData(this.TASKCODE).subscribe(result => {
        result.DATA.forEach(element => {
            array.push(element);
        });
        this.nestedTableData = array;
        this.nestedLoading = false;
    });
  }
  ngOnInit() {
    const this_ = this;
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


}
