import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import {
  NzDropdownService, NzFormatEmitEvent, NzTreeNode, NzDropdownContextComponent,
  NzModalService, NzMessageService
} from 'ng-zorro-antd';
import { CatalogAddComponent } from './catalog-add.compoent';
import { HttpClient } from '@angular/common/http';
import { CatalogService } from 'src/app/services/catalog.services';

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
  listData = [
    {
      title: '目录 1',
      content: `文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。
      使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能`,
      flag: true,
    },
    {
      title: '目录 2',
      content: '文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能',
      flag: false,
    },
    {
      title: '目录 3',
      content: '文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能',
      flag: true,
    },
    {
      title: '目录 4',
      content: '文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能',
      flag: true,
    },
    {
      title: '目录 5',
      content: '文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能',
      flag: false,
    },
    {
      title: '目录 6',
      content: '文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能',
      flag: true,
    },
    {
      title: '目录 7',
      content: '文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能',
      flag: false,
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
            console.log(componentParam);
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
    // do something
    console.log('dropdown clicked ' + eventName);
    console.log(this.activedNode);
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
  // getData(callback: (res: any) => void): void {
  //   this.http.get(fakeDataUrl).subscribe((res: any) => callback(res));
  // }
  onScroll(): void {
    if (this.loading) { return; }
    this.loading = true;
    if (this.data.length > 14) {
      this.msg.warning('Infinite List loaded all');
      this.hasMore = false;
      this.loading = false;
      return;
    }
    // this.getData((res: any) => {
    //   this.data = this.data.concat(res.results);
    //   this.loading = false;
    // });
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
}
