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
  fileType: String = 'all';
  listLoading = true;
  dropdown: NzDropdownContextComponent;
  // can active only one node
  activedNode: NzTreeNode;
  // dragNodeElement;
  isVisible = false;
  btnType: String[] = ['primary', 'default', 'default'];
  nodes = [];
  // 右侧数据
  listData: CatalogListItem[] = [];

  // @HostListener('mouseleave', ['$event'])
  // mouseLeave(event: MouseEvent): void {
  //   event.preventDefault();
  //   if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
  //     this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
  //   }
  // }

  // @HostListener('mousedown', ['$event'])
  // mouseDown(): void {
  //   // do not prevent
  //   if (this.dragNodeElement && this.dragNodeElement.className.indexOf('is-dragging') > -1) {
  //     this.dragNodeElement.className = this.dragNodeElement.className.replace(' is-dragging', '');
  //   }
  // }

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
  activeNode(data: NzFormatEmitEvent | NzTreeNode): void {
    if (data instanceof NzTreeNode) {
      if (data === this.activedNode) {
        return;
      }
      if (this.activedNode) {
        this.activedNode = null;
      }
      // data.isExpanded = true;
      data.isSelected = true;
      this.activedNode = data;
      this.queryCatalogAndINS(data.key);
    } else {
      if (data.node === this.activedNode) {
        return;
      }
      if (this.activedNode) {
        this.activedNode = null;
      }
      // data.node.isExpanded = true;
      data.node.isSelected = true;
      this.activedNode = data.node;
      // 查询当前目录下的文件
      this.queryCatalogAndINS(data.node.key);
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
    this.mainService.removeCatalogNode({ ID: this.activedNode.key }).subscribe(result => {
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
    for (let i = 0; i < nodeChildren.length; i++) {
      if (nodeChildren[i].key === key) {
        nodeChildren.splice(i, 1);
        break;
      } else {
        this.findRemoveNode(nodeChildren[i].children, key);
      }
    }
  }

  /**
   * list单击事件
   */
  fileListClick(event: any): void {
    const key = event.ID;
    if (event.Type === 'folder') {
      this.findNodeSelect(this.activedNode, key);
    }
  }

  /**
   * @description 寻找下级目录并选中打开
   * @param node
   * @param key
   */
  findNodeSelect(node: NzTreeNode, key: String): void {
    if (node.key === key) {
      this.activeNode(node);
      if (node.parentNode && !node.parentNode.isExpanded) {
        node.parentNode.isExpanded = !node.parentNode.isExpanded;
      }
      node.isExpanded = true;
    } else {
      for (let i = 0; i < node.children.length; i++) {
        this.findNodeSelect(node.children[i], key);
      }
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
      NAME: componentParam.name,
      ID: componentParam.node.key,
      PATH: componentParam.node.spath
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
      } else {
        this_.msg.error(result.MSG);
      }
    });
  }
  /**
   * 查询目录节点下的所有文件
   * @param id
   */
  queryCatalogAndINS(id: String): void {
    this.listData = [];
    this.listLoading = true;
    this.mainService.queryCatalogAndINS({ ID: id }).subscribe(result => {
      if (result.CODE === '0') {
        this.listData = result.DATA;
        this.listLoading = false;
      }
    });
  }
  /**
   *  全部/目录/文件 点击事件 进行文件筛选
   */
  btnClick(event: String): void {
    switch (event) {
      case 'all':
        this.btnType = ['primary', 'default', 'default'];
        this.fileType = 'all';
        break;
      case 'folder':
        this.fileType = 'folder';
        this.btnType = ['default', 'primary', 'default'];
        break;
      case 'file':
        this.fileType = 'file';
        this.btnType = ['default', 'default', 'primary'];
        break;
    }
  }

  constructor(private mainService: CatalogService, private nzDropdownService: NzDropdownService,
    private modalService: NzModalService, private http: HttpClient, private msg: NzMessageService) {
  }

  ngOnInit(): void {
    // const this_ = this;
    this.mainService.queryCatalogTree().subscribe(result => {
      this.nodes.push(new NzTreeNode(result.DATA));
      this.activeNode(this.nodes[0]);
      this.nodes[0].isExpanded = true;
    });
  }

}

