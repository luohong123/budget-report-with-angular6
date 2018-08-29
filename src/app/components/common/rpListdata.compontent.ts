import { Component, OnInit, AfterContentInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'rpListdata',
    template: `
    <nz-table #nzTable [nzData]="data" [nzPageSize]="10">
        <thead nz-thead>
            <tr>
                <th nz-th *ngFor="let item of rpListOption.fields">
                    <span>{{item.headerName}}</span>
                </th>
                <th nz-th *ngIf="rpListOption.showToolPanel">
                    <span>操作</span>
                </th>
            </tr>
        </thead>
        <tbody nz-tbody>
            <tr nz-tbody-tr *ngFor="let data of nzTable.data">
            <td nz-td *ngFor="let item of tableField">{{data[item]}}</td>
            <td nz-td *ngIf="rpListOption.showToolPanel">
                <span *ngFor="let item of rpListOption.tools;let i = index">
                    <a  (click)="toolClick(item.code,data)" >{{item.name}}</a>
                    <nz-divider nzType="vertical" *ngIf="rpListOption.tools.length > i+1"></nz-divider>

                </span>
            </td>
            <td nz-td *ngIf="rpListOption.showToolPanel === true && rpListOption.showToolPanel === undefined">
                <span >
                    <a (click)="toolClick('edit',data)" >编辑</a>
                    <nz-divider nzType="vertical"></nz-divider>
                    <a (click)="toolClick('remove',data)" >删除</a>
                </span>
            </td>
            </tr>
        </tbody>
    </nz-table>
    `,
    styles: ['']
})

export class RpListdataComponent implements OnInit, AfterContentInit, OnChanges {
    @Output()
    rpEvent: EventEmitter<Object> = new EventEmitter();
    
    @Input()
    rpListOption: any;
    @Input()
    listdata: any[];

    tableField: any[] = [];
    //表格数据
    data :any[];
    
    constructor() {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if(changes.hasOwnProperty("listdata")){
            this.data = changes.listdata.currentValue;
        }
    }
    ngAfterContentInit(): void {

    }
    ngOnInit(): void {
        this.rpListOption.fields.forEach(element => {
            this.tableField.push(element.field);
        });
        this.data = this.listdata;
    }

    toolClick(code, data) {
        this.rpEvent.emit({ eventName: code, param: data });
    }

}

