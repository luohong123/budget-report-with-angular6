import { Component, OnInit, Input } from '@angular/core';
import { BgrpTaskService } from 'src/app/services/task.service';

@Component({
  selector: 'rp-file-generate-subtable',
  template: `
  <nz-table #innerTable [nzData]="data" nzSize="middle" [nzShowPagination]="false">
      <thead nz-thead>
          <tr>
              <th nz-th *ngFor="let item of file">
                  <span>{{item.Name}}</span>
              </th>
          </tr>
      </thead>
      <tbody nz-tbody>
          <tr nz-tbody-tr *ngFor="let data of innerTable.data">
              <td nz-td *ngFor="let item of file">{{data[item.Code]}}</td>
          </tr>
      </tbody>
  </nz-table>
  `,
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
export class FileGenerateSubtableComponent implements OnInit {
  @Input() fileTmpID: String;
  file: { Code: String, Name: String }[] = [];
  data: any[] = [];
  constructor() { }
  ngOnInit() {
    const random = Math.floor(Math.random() * 5 + 1);
    let code = '', name = '';
    const a = {};
    for (let i = 1; i <= random; i++) {
      code = 'code' + i;
      name = '属性' + i + '名称';
      this.file.push({ Code: code, Name: name });
      a[code] = '属性' + i + '值';
      this.data.push(a);
    }
  }


}
