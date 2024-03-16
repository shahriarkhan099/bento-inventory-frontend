import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchPipe implements PipeTransform {

  transform(arr: any[], prop: string, value: string) {
    if (arr) {
      if (!value) {
        return arr;
      } else {
        return arr.filter(obj => this.filter(obj[prop], value));
      }
    } else {
      return [];
    }
  }

  filter(source: string, target: string): boolean {
    return source.toLowerCase().includes(target.toLowerCase());
  }
}
