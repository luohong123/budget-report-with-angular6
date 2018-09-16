import { Injectable } from '@angular/core';
import { DaoService } from 'fccore2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RpFileGenerateService {
  constructor(private daoService: DaoService) {
  }

  queryData(condition: any): Observable<any> {
    return this.daoService.postFromApi('BUDGET/BG_RP_FileTemplate/queryFileTemplateData', condition);
  }
  generate(param: any) {
  }
}
