import { Component, OnInit } from '@angular/core';
import { DemoService } from '../../services/demo.service';
@Component({
  selector: 'rp-table',
  templateUrl: './table.component.html',
  styles: []
})
export class TableComponent implements OnInit {
  dataSet = [];
  constructor(public mainService: DemoService) {

  }
  ngOnInit(): void {
    for (let i = 0; i < 100; i++) {
      this.dataSet.push({
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`
      });
    }
    this.mainService.test();
  }
}
