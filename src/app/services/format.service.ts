import { Injectable } from '@angular/core';
import { DaoService } from 'fccore2';

@Injectable()
export class BgrpFormatService {
  constructor(private daoService: DaoService) {
    // super(providers, "RP_FORMAT");
  }


  queryData(condition: any) {
    return this.daoService.postFromApi('BUDGET/RP_FORMAT/queryFormatData', condition);
  }
  insertOrUpdate(param: any) {
    return this.daoService.postFromApi('BUDGET/RP_FORMAT/insertOrUpdate', param);
  }
  deleteOne(param: any) {
    return this.daoService.postFromApi('BUDGET/RP_FORMAT/delete', param);
  }
  queryAttr(param: any) {
    return this.daoService.postFromApi('BUDGET/RP_FORMAT/queryAttr', param);
  }
}
