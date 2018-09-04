import { Injectable } from '@angular/core';
import { DaoService } from 'fccore2';

@Injectable()
export class BgrpTaskService {
  constructor(public daoService: DaoService) {
  }

  queryData(condition: any) {
    return this.daoService.postFromApi('BUDGET/BG_RP_TASK/queryTaskData', condition);
  }
  insertOrUpdate(param: any) {
    return this.daoService.postFromApi('BUDGET/BG_RP_TASK/insertOrUpdate', param);
  }
  deleteOne(param: any) {
    return this.daoService.postFromApi('BUDGET/BG_RP_TASK/delete', param);
  }
}
