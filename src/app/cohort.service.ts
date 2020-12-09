import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { map } from 'rxjs/operators';

import { BehaviorSubject, Observable, of } from 'rxjs';

export interface Item {
  id: string;
  label: string;
}

const ITEMS: ReadonlyArray<Item> = [
  {
    id: 'pay_001',
    label: 'A',
  },
  {
    id: 'pay_002',
    label: 'B',
  },
  {
    id: 'pay_003',
    label: 'C',
  },
];

@Injectable({ providedIn: 'root' })
export class CohortService implements OnInit {
  public readonly items$: Observable<Item[]>;
  public readonly selectedItems$: BehaviorSubject<Item[]>;

  private _sortItems = (a: Item, b: Item): number => {
    var nameA = a.id.toUpperCase(); // ignore upper and lowercase
    var nameB = b.id.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }

    if (nameA > nameB) {
      return 1;
    }

    // ids must be equal
    return 0;
  };
  private _selectedItems: Item[] = [];

  constructor(private http: HttpClient) {
    // Mock an API response to get the Items
    this.items$ = of([...ITEMS].sort(this._sortItems));

    this.selectedItems$ = new BehaviorSubject<Item[]>(
      this._selectedItems.sort(this._sortItems)
    );
  }

  public selectItem(item: Item) {
    this._selectedItems.push(item);
    this.selectedItems$.next(this._selectedItems.sort(this._sortItems));
  }

  public removeItem(item: Item) {
    const itemFilter = (i: Item): boolean => i.id !== item.id;
    this._selectedItems = this._selectedItems.filter(itemFilter);
    this.selectedItems$.next(this._selectedItems.sort(this._sortItems));
  }

  ngOnInit() {}
}
