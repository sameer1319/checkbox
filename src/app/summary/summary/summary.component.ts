import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { CohortService, Item } from '../../cohort.service';
@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.css'],
})
export class SummaryComponent implements OnInit {
  public readonly allItems$: Observable<Item[]>;
  public readonly selectedItemsList$: Observable<Item[]>;

  constructor(private readonly service: CohortService) {
    this.allItems$ = this.service.items$;
    this.selectedItemsList$ = this.service.selectedItems$;
  }

  public getItemId(_indx: number, item: Item): string {
    return item.id;
  }

  ngOnInit() {}
}
