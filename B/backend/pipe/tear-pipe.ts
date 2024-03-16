import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ChangeTierPipe implements PipeTransform {
  transform(value: any[], metadata: ArgumentMetadata): any {
    if (!value || !Array.isArray(value)) {
      return value;
    }

    return value.map(item => {
      // 티어와 등급 분리 (예: "아이언 1" -> ["아이언", "1"])
      const [tier, division] = item.tier.split(' ');

      // MMR 계산
      const mmr = this.calculateMMR(tier, parseInt(division));
      return { ...item, mmr };
    });
  }

  calculateMMR(tier: string, division: number): number {
    const tiers = ["아이언", "브론즈", "실버", "골드", "플래티넘", "에메랄드", "다이아몬드", "마스터", "그랜드마스터", "챌린저"];
    const divisions = [4, 3, 2, 1];
    let mmrStart = 0;
    const mmrIncrease = 100;

    // 티어 인덱스 찾기
    const tierIndex = tiers.findIndex(t => t === tier);
    // 등급에 따른 MMR 계산 (등급이 4부터 시작하기 때문에 4에서 division을 빼고 1을 더함)
    const divisionIndex = 4 - division + 1;

    if (tierIndex === -1) {
      throw new Error('Invalid tier');
    }

    // 전체 MMR 계산
    for (let i = 0; i < tierIndex; i++) {
      mmrStart += divisions.length * mmrIncrease; // 각 티어마다의 총 MMR 증가
    }

    // 해당 등급에 대한 MMR 추가
    mmrStart += (divisionIndex - 1) * mmrIncrease;

    return mmrStart;
  }
}
