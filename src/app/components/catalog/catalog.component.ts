import { Component, HostListener, OnInit, TemplateRef } from '@angular/core';
import { NzDropdownService, NzFormatEmitEvent, NzTreeNode, NzDropdownContextComponent, NzModalService } from 'ng-zorro-antd';
import { CatalogAddComponent } from './catalog-add.compoent';

@Component({
  selector: 'rp-catalog',
  templateUrl: './catalog.component.html',
  styles: [`
    :host ::ng-deep .ant-tree {
      overflow: hidden;
      margin: 0 -24px;
      padding: 0 24px;
    }

    :host ::ng-deep .ant-tree li {
      padding: 4px 0 0 0;
    }

    @keyframes shine {
      0% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 1;
      }
    }

    .shine-animate {
      animation: shine 2s ease infinite;
    }

    .custom-node {
      cursor: pointer;
      line-height: 26px;
      margin-left: 4px;
      display: inline-block;
      margin: 0 -1000px;
      padding: 0 1000px;
    }

    .active {
      background: #1890FF;
      color: #fff;
    }

    .is-dragging {
      background-color: transparent !important;
      color: #000;
      opacity: 0.7;
    }

    .file-name, .folder-name, .file-desc, .folder-desc {
      margin-left: 4px;
    }

    .file-desc, .folder-desc {
      padding: 2px 8px;
      background: #87CEFF;
      color: #FFFFFF;
    }
  ` ]
})
export class CatalogComponent implements OnInit {
  dropdown: NzDropdownContextComponent;
  // can active only one node
  activedNode: NzTreeNode;
  dragNodeElement;
  isVisible = false;
  nodes = [
    new NzTreeNode({
      title: '预算报表',
      key: '1001',
      // author: 'ANGULAR',
      expanded: true,
      children: [
        {
          title: '目录 1',
          key: '10001',
          author: 'ZORRO',
          children: [
            {
              title: '目录 1.1',
              key: '100011',
              // author: 'ZORRO',
              children: []
            },
            {
              title: '目录 1.2',
              key: '100012',
              author: 'ZORRO',
              children: [
                {
                  title: '目录 1.2.1',
                  key: '1000121',
                  // author: 'ZORRO-FANS',
                  isLeaf: true,
                  // checked: true,
                  // disabled: true
                },
                {
                  title: '目录 1.2.2',
                  key: '1000122',
                  // author: 'ZORRO-FANS',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ]
    })
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
    // do something
    console.log('dropdown clicked ' + eventName);
    console.log(this.activedNode);
  }
  /**
   * 删除数据
   */
  handleOk() {
    
    this.nodes = [
      new NzTreeNode({
        title: '预算报表',
        key: '1001',
        // author: 'ANGULAR',
        expanded: true,
        children: [
          {
            title: '目录 1',
            key: '10001',
            author: 'ZORRO',
            children: [
              {
                title: '目录 1.1',
                key: '100011',
                // author: 'ZORRO',
                children: []
              },
              {
                title: '目录 1.2',
                key: '100012',
                author: 'ZORRO',
                children: [
                  {
                    title: '目录 1.2.1',
                    key: '1000121',
                    // author: 'ZORRO-FANS',
                    isLeaf: true,
                    // checked: true,
                    // disabled: true
                  },
                  {
                    title: '目录 1.2.2',
                    key: '1000122',
                    // author: 'ZORRO-FANS',
                    isLeaf: true
                  }
                ]
              }
            ]
          }
        ]
      })
    ];  
    this.isVisible = false;
  }

  constructor(private nzDropdownService: NzDropdownService, private modalService: NzModalService) {
  }

  ngOnInit(): void {

  }
}
