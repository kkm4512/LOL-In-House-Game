import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SplitSubRolePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value || !Array.isArray(value)) {
      return value;
    }

    console.log(value)

    return value.map(item => {
      if (item.subRole) {
        // subRole을 공백 기준으로 나누어 배열로 변환
        item.subRole = item.subRole.split(',');
      }
      return item;
    });
  }
}
