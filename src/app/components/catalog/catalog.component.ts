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
  nodes = [];
  // 右侧数据
  listData: CatalogListItem[] = [];

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

    // 查询当前目录下的文件
    this.queryCatalogAndINS(data.node.key);
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
    const this_ = this;
    switch (eventName) {
      case 'add':
        const node = this.activedNode;
        const modal = this.modalService.create({
          nzTitle: '新建目录',
          nzContent: CatalogAddComponent,
          nzMaskClosable: false,
          nzOnOk(componentParam) {
            // 调取后台新增节点接口
            this_.addCatalogNode(componentParam);
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
        if (this.activedNode.title === '预算报表') {
          this.msg.error('根目录禁止删除!');
          break;
        }
        this.isVisible = true;

        break;
      default:
        break;
    }
    this.dropdown.close();
  }
  /**
   * 删除菜单节点
   */
  handleOk() {
    this.isVisible = false;
    const this_ = this;
    const level = this_.activedNode.level;
    const key = this.activedNode.key;
    const nodeChildren: any[] = this.nodes[0].children;
    this.mainService.removeCatalogNode({ID : this.activedNode.key}).subscribe(result => {
      if (result.CODE === '0') {
        this_.msg.success(result.MSG);
        this.findRemoveNode(nodeChildren, key);
      } else {
        this_.msg.error(result.MSG);
      }
    });
  }
  /**
   * 递归查找删除的节点并删除
   * @param nodeChildren 当前节点的子节点
   * @param key 要删除节点的key
   */
  findRemoveNode(nodeChildren: any, key: String): void {
    for ( let i = 0; i < nodeChildren.length; i ++ ) {
      if (nodeChildren[i].key === key) {
        nodeChildren.splice(i, 1);
        break;
      } else {
        this.findRemoveNode(nodeChildren[i].children, key);
      }
    }
  }

  constructor(private mainService: CatalogService, private nzDropdownService: NzDropdownService,
    private modalService: NzModalService, private http: HttpClient, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    const this_ = this;
    this.mainService.queryCatalogTree().subscribe(result => {
      this_.nodes.push(new NzTreeNode(result.DATA));
    });
    this.queryCatalogAndINS('0');
  }
  // list双击事件
  dbclick(event) {
    console.log(event);
  }
  /**
   * list单击事件
   */
  fileListClick(event: any): void {
    console.log(event);
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

  /**
   * 添加新菜单节点
   * @param componentParam
   */
  addCatalogNode(componentParam: any): void {
    const this_ = this;
    const node = this.activedNode;
    const param = {
      NAME : componentParam.name,
      ID : componentParam.node.key,
      PATH : componentParam.node.spath
    };
    this.mainService.addCatalogNode(param).subscribe(result => {
      if (result.CODE === '0') {
        this_.msg.success(result.MSG);
        // 添加节点
        node.isLeaf = false;
        node.addChildren([{
          title: componentParam.name,
          key: result.DATA,
          isLeaf: true
        }]);
      }  else {
        this_.msg.error(result.MSG);
      }
    });
  }
  queryCatalogAndINS(id: String): void {
    this.mainService.queryCatalogAndINS({ID : id}).subscribe(result => {
      if (result.CODE === '0') {
        this.listData = result.DATA;
      }
    });
  }
}

