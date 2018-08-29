import { Injectable } from '@angular/core';
import { DaoService  } from 'fccore2';

@Injectable()
export class BgrpFormatService   {
  constructor(private daoService: DaoService) {
   // super(providers, "BG_RP_FORMAT");
  }


  queryData(condition: any){
    return this.daoService.postFromApi('BUDGET/BG_RP_FORMAT/queryFormatData',condition)
  }
  insertOrUpdate(param: any){
    return this.daoService.postFromApi('BUDGET/BG_RP_FORMAT/insertOrUpdate',param)
  }
  deleteOne(param: any){
    return this.daoService.postFromApi('BUDGET/BG_RP_FORMAT/delete',param)
  }
}