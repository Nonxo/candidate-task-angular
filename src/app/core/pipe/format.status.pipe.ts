import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatStatus',
  standalone: true
})
export class FormatStatusPipe implements PipeTransform {

  transform(value: boolean | null | undefined): string {
    return value ? 'Active' : 'Inactive';
  }

}
