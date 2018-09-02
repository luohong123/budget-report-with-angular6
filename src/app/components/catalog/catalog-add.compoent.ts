import { Component, OnInit, Input } from '@angular/core';
import { NzTreeNode } from 'ng-zorro-antd';

@Component({
    selector: 'rp-catalog-add',
    template: `
  <div class="form-control clearfix">
  <label>目录名称:</label>
  <input class="form-right" nz-input placeholder="请输入文件名称" [(ngModel)]="name" name="name"/>
</div>
  `,
    styles: [`
  .clearfix{clear:both;}
  .form-control{width:100%;height:32px;line-height:32px;margin-bottom:10px;}
  .form-control label{width:25%;float:left;text-align:right;padding-right:10px;}
  .form-control .form-right{float:left;width:60%;text-align:left;}
  .form-control span.form-right{text-align:left;}
`]
})
export class CatalogAddComponent implements OnInit {
    name: string;
    node: NzTreeNode;
    @Input()
    set param(node: NzTreeNode) {
        this.node = node;
    }

    ngOnInit() {
    }

}
