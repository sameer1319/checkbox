import { Component, Input } from '@angular/core';
import { areAllEquivalent } from '@angular/compiler/src/output/output_ast';
import { Subscription, Subject } from 'rxjs';
import { CohortService, Item } from '../cohort.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pallet',
  templateUrl: './pallet.component.html',
  styleUrls: ['./pallet.component.css'],
})
export class PalletComponent {
  subscription: Subscription;
  cohort: any[] = [];
  // payer: any[] = [];

  public readonly checkCntrl: FormControl;
  @Input() public readonly item: Item;

  private readonly _unsubscribe: Subject<void>;
  public readonly allItems$: Observable<Item[]>;
  constructor(private readonly service: CohortService) {
    this._unsubscribe = new Subject<void>();

    this.checkCntrl = new FormControl(false);

    this.checkCntrl.valueChanges
      .pipe(
        tap((selected: boolean) => {
          if (selected) {
            this.service.selectItem(this.item);
          } else {
            this.service.removeItem(this.item);
          }
        }),
        takeUntil(this._unsubscribe)
      )
      .subscribe({
        error(err: any): void {
          console.error('ItemCheckboxComponent', err);
        },
      });
    this.allItems$ = this.service.items$;
  }
  public getItemId(_indx: number, item: Item): string {
    return item.id;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
