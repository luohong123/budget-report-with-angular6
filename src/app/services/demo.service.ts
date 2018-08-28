import { Injectable } from '@angular/core';
import { DaoService, ProvidersService } from 'fccore2';
@Injectable({
  providedIn: 'root'
})
export class DemoService {

  constructor(private daoService: DaoService) {

  }
  test() {
    this.daoService.postFromApi('BUDGET/BG_RP_TASK/queryTaskData', {
      STASKCODE : '',
      STASKNAME : ''
  }).subscribe(res => {
      console.log(res);
    });
  }
}
