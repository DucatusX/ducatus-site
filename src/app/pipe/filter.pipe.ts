import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
   name: 'filter',
   pure: false
})
export class FilterPipe implements PipeTransform {
   transform(items: any[], search: string): any {
      const fullFind = items.find(item => item.tx_hash === search);
      return fullFind ?
         [fullFind]
         : search ?
            items.filter(item => item.tx_hash.indexOf(search) !== -1)
            : items;
   }
}
