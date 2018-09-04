import { Injectable } from '@angular/core';
import { DaoService } from 'fccore2';

@Injectable()
export class BgrpFileTemplateService {
  constructor(private daoService: DaoService) {
  }

  queryData(condition: any) {
    return this.daoService.postFromApi('BUDGET/BG_RP_FileTemplate/queryFileTemplateData', condition);
  }
  insertOrUpdate(param: any) {
    return this.daoService.postFromApi('BUDGET/BG_RP_FileTemplate/insertOrUpdate', param);
  }
  deleteOne(param: any) {
    return this.daoService.postFromApi('BUDGET/BG_RP_FileTemplate/delete', param);
  }
}
