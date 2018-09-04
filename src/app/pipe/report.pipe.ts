import { Pipe, PipeTransform } from '@angular/core';
import { CatalogListItem } from 'src/app/interface/report.interface';

@Pipe({
  name: 'catalogListDataFilter',
  pure: true
})
export class ListDataFilter implements PipeTransform {
  transform(value: CatalogListItem[], type: 'folder' | 'file' | 'all', search: string): CatalogListItem[] {
    return value.filter(item => (type === 'all' || item.Type === type)
      && (
        (!search || search === '') ||
        item.Title.indexOf(search) > -1
      )
    );
  }
}
