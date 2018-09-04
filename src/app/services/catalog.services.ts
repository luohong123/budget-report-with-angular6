import { Injectable } from '@angular/core';
import { DaoService } from 'fccore2';

@Injectable()
export class CatalogService {
  constructor(private daoService: DaoService) {
  }

  queryCatalogTree() {
    return this.daoService.postFromApi('BUDGET/BG_RP_CATALOG/queryCatalogTree', '');
  }

}
