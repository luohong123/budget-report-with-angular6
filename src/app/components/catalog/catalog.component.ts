import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import {
  NzDropdownService, NzFormatEmitEvent, NzTreeNode, NzDropdownContextComponent,
  NzModalService, NzMessageService
} from 'ng-zorro-antd';
import { CatalogAddComponent } from './catalog-add.compoent';
import { HttpClient } from '@angular/common/http';
import { CatalogService } from 'src/app/services/catalog.services';
import { CatalogListItem } from 'src/app/interface/report.interface';

@Component({
  selector: 'rp-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: [`./catalog.component.css`]
})
export class CatalogComponent implements OnInit {
  data: any[] = [];
  loading = false;
  hasMore = true;

  dropdown: NzDropdownContextComponent;
  // can active only one node
  activedNode: NzTreeNode;
  dragNodeElement;
  isVisible = false;
  nodes = [
  ];
  // 右侧数据
  listData: CatalogListItem[] = [
    {
      Title: '目录',
      Type: 'file',
      Description: '这是一段描述',
      ID: '1'
    },
    {
      Title: '目录2',
      Type: 'folder',
      Description: '这是一段描述',
      ID: '1'
    }
  ];

  @HostListener('mouseleave', ['$event'])
  mouseLeave(event: MouseEvent): void {
    event.preventDefault();
    if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
      this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    }
  }

  @HostListener('mousedown', ['$event'])
  mouseDown(): void {
    // do not prevent
    if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
      this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
    }
  }

  /**
   * important:
   * if u want to custom event/node properties, u need to maintain the selectedNodesList/checkedNodesList yourself
   * @param {} data
   */
  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    // do something if u want
    if (data instanceof NzTreeNode) {
      // change node's expand status
      if (!data.isExpanded) {
        // close to open
        data.origin.isLoading = true;
        setTimeout(() => {
          data.isExpanded = !data.isExpanded;
          data.origin.isLoading = false;
        }, 500);
      } else {
        data.isExpanded = !data.isExpanded;
      }
    } else {
      // change node's expand status
      if (!data.node.isExpanded) {
        // close to open
        data.node.origin.isLoading = true;
        setTimeout(() => {
          data.node.isExpanded = !data.node.isExpanded;
          data.node.origin.isLoading = false;
        }, 500);
      } else {
        data.node.isExpanded = !data.node.isExpanded;
      }
    }
  }

  // 选中节点
  activeNode(data: NzFormatEmitEvent): void {
    console.log(data);
    if (this.activedNode) {
      this.activedNode = null;
    }
    data.node.isSelected = true;
    this.activedNode = data.node;
  }

  dragStart(event: NzFormatEmitEvent): void {
    // disallow drag if root or search
    this.activedNode = null;
    this.dragNodeElement = event.event.srcElement;
    if (this.dragNodeElement.className.indexOf('is-dragging') === -1) {
      this.dragNodeElement.className = event.event.srcElement.className + ' is-dragging';
    }
  }

  contextMenu($event: MouseEvent, template: TemplateRef<void>, node: NzTreeNode): void {
    this.dropdown = this.nzDropdownService.create($event, template);
    this.activedNode = node;
  }

  selectDropdown(eventName: string, event): void {
    switch (eventName) {
      case 'add':
        const node = this.activedNode;
        const modal = this.modalService.create({
          nzTitle: '新建目录',
          nzContent: CatalogAddComponent,
          nzMaskClosable: false,
          nzOnOk(componentParam) {
            console.log(componentParam);
            node.isLeaf = false;
            node.addChildren([{
              title: componentParam.name,
              key: (new Date()).getTime(),
              isLeaf: true
            }]);
          },
          nzOnCancel(componentParam) {
          },
          nzComponentParams: {
            node: node
          }
        });
        modal.afterClose.subscribe((result) => {
          modal.destroy();
        });
        break;
      case 'edit':
        break;
      case 'remove':
        this.isVisible = true;
        break;
      default:
        break;
    }
    this.dropdown.close();
  }
  /**
   * 删除数据
   */
  handleOk() {

    this.nodes = [];
    this.isVisible = false;
  }

  constructor(private mainService: CatalogService, private nzDropdownService: NzDropdownService,
    private modalService: NzModalService, private http: HttpClient, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    const this_ = this;
    this.mainService.queryCatalogTree().subscribe(result => {
      this_.nodes.push(new NzTreeNode(result.DATA));
    });
  }
  // list双击事件
  dbclick(event) {
  }
  onScroll(): void {
    if (this.loading) { return; }
    this.loading = true;
    if (this.data.length > 14) {
      this.msg.warning('Infinite List loaded all');
      this.hasMore = false;
      this.loading = false;
      return;
    }
  }
}

