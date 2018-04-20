import {Pipe} from "@angular/core";

@Pipe({name: "sortBy"})
export class SortPipe {
  transform(array: Array<any>, args: string): Array<any> {
    if (array != undefined) {
      array.sort((a: any, b: any) => {
        if (a[args] >= b[args]) {
          return 1;
        }
        else {
          return 0;
        }
      });
    }
    return array;
  }
}
