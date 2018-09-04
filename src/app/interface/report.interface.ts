/**
 * @description 目录管理数据列表接口定义
 */
export interface CatalogListItem {
  Title: String;
  ID: String;
  Type: 'folder'|'file';
  Description: String;
}
