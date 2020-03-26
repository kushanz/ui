import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'exceed99'
})
export class Exceed99 implements PipeTransform {
  public transform(value:number, limit?:number) {
    if(!isNaN(value) && value >99) {
        return 99+'+'
    } else {
        return value
    }

  }
}