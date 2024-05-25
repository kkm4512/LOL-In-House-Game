import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoLUserPlayers } from 'DTO/dto';
import { FinalDistribution } from 'type.ts/Lol-User-Players';

function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ES6의 구조 분해 할당을 사용하여 요소를 교환
  }
  return array;
}

@Injectable()
export class AppService {
  teamSplitting(lolUserPlayers: LoLUserPlayers[]): {
    A_Team: LoLUserPlayers[];
    B_Team: LoLUserPlayers[];
  } {
    let score = 0;
    while (true) {
      score += 1;
      const shuffledNumbers = shuffleArray(lolUserPlayers);
      let A_Team = shuffledNumbers.slice(0, 5);
      let B_Team = shuffledNumbers.slice(5, 10);

      let A_Team_score: LoLUserPlayers[] = A_Team.reduce(
        (a: number, b: { mmr: number }) => a + b.mmr,
        0,
      );
      let B_Team_score: LoLUserPlayers[] = B_Team.reduce(
        (a: number, b: { mmr: number }) => a + b.mmr,
        0,
      );
      if (Math.abs(Number(A_Team_score) - Number(B_Team_score)) <= 3000) {
        return { A_Team, B_Team };
      } else if (score === 1000) {
        throw new UnauthorizedException(
          '해당 인원들로 올바른 팀이 나누어 지지않습니다. (티어차이가 매우심함) ',
        );
      }
    }
  }

  /**
   *
   * 1. 팀 라인별로 배분해야함
   */
  teamLineSplitting(lolUserPlayers: LoLUserPlayers[]) {
    while (true) {
      const A_Team_Array: string[] = [];
      const B_Team_Array: string[] = [];
      let { A_Team, B_Team } = this.teamSplitting(lolUserPlayers);

      A_Team.forEach((item) => {
        A_Team_Array.push(item.mainRole);
      });
      B_Team.forEach((item) => {
        B_Team_Array.push(item.mainRole);
      });

      // 중복 제거된 라인 배열 생성
      const set_A_Team_Array = [...new Set(A_Team_Array)];
      const set_B_Team_Array = [...new Set(B_Team_Array)];

      // 이미 선택된 라인을 추적할 Set 생성
      const selected_A_Roles = new Set();
      const selected_B_Roles = new Set();

      // A_Team에서 중복되지 않은 라인의 플레이어만 필터링
      const seted_A_Team = A_Team.filter((item) => {
        // set_A_Team_Array에 포함되어 있고, 아직 선택되지 않은 라인이라면 필터링에 포함
        if (
          set_A_Team_Array.includes(item.mainRole) &&
          !selected_A_Roles.has(item.mainRole)
        ) {
          selected_A_Roles.add(item.mainRole);
          return true;
        }
        return false;
      });

      const seted_B_Team = B_Team.filter((item) => {
        // set_A_Team_Array에 포함되어 있고, 아직 선택되지 않은 라인이라면 필터링에 포함
        if (
          set_B_Team_Array.includes(item.mainRole) &&
          !selected_B_Roles.has(item.mainRole)
        ) {
          selected_B_Roles.add(item.mainRole);
          return true;
        }
        return false;
      });

      // 필요한 로직 수행...
      if (
        seted_A_Team.length === 3 ||
        (seted_A_Team.length === 4 && seted_B_Team.length === 3) ||
        seted_B_Team.length === 4
      ) {
        return { seted_A_Team, seted_B_Team, A_Team, B_Team };
      }
    }
  }

  /**
   * 1. A,B팀에 있는 인원 3~4명씩은 주라인을 맞춤
   * 2. 그럼 나머지 1~2명인원의 subRole을 하나씩 넣어봐줘서
   * 3. 중복되지않은 array 5개가되면 통과
   * 4. 일단 그 나머지 1~2명이 누군지먼저 찾아야할듯
   */
  teamLineMainSubRoleDivision(lolUserPlayers: LoLUserPlayers[]): {
    seted_A_Team: LoLUserPlayers[];
    seted_B_Team: LoLUserPlayers[];
    remaining_A_Team: LoLUserPlayers[];
    remaining_B_Team: LoLUserPlayers[];
  } {
    const { seted_A_Team, seted_B_Team, A_Team, B_Team } =
      this.teamLineSplitting(lolUserPlayers);
    const selected_A_Team_Names = new Set(
      seted_A_Team.map((player) => player.name),
    );
    const selected_B_Team_Names = new Set(
      seted_B_Team.map((player) => player.name),
    );
    const remaining_A_Team = A_Team.filter(
      (player) => !selected_A_Team_Names.has(player.name),
    );
    const remaining_B_Team = B_Team.filter(
      (player) => !selected_B_Team_Names.has(player.name),
    );

    return { seted_A_Team, seted_B_Team, remaining_A_Team, remaining_B_Team };
  }

  /**
   * 1. A팀, B팀 3,4명씩 있고 = seted_A_Team,seted_B_Team
   * 2. A팀, B팀 에대한 나머지 인원 1,2명씩도 이씅 = remaining_A_Team,remaining_B_Team
   * 3. 이제 A팀의 자리에 1,2명의 인원인 subRole을 하나씩 집어넣어봄
   * 4. 그리고 최종적으로 계산했을떄 중복되지않은 length가 5개되면 성공 ( 일단 여기까지 )
   *
   */
  teamLineDistribution(lolUserPlayers: LoLUserPlayers[]) {
    let attempts = 0;
    const maxAttempts = 1000;
    while (attempts < maxAttempts) {
      const { seted_A_Team, seted_B_Team, remaining_A_Team, remaining_B_Team } =
        this.teamLineMainSubRoleDivision(lolUserPlayers);

      // A팀 라인업 완성 로직
      for (let player of remaining_A_Team) {
        let a = player.subRole;
        for (let subRole of player.subRole) {
          if (seted_A_Team.length < 5) {
            if (Array.isArray(player.subRole)) {
            } else {
              if (a.length === 1) {
                subRole = a[0];
              } else if (a.length === 2) {
                subRole = a[0] + a[1];
              }
            }
            //만약 Array값일 경우 ex) ["탑","미드"] ["서폿","미드"]
            const canBeAdded = !seted_A_Team.some(
              (setedPlayer) => setedPlayer.mainRole === subRole,
            );
            if (canBeAdded) {
              seted_A_Team.push({ ...player, mainRole: subRole }); // mainRole을 subRole로 설정하여 추가
              break; // 중복되지 않는 subRole을 찾았으므로 추가 후 반복 중단
            }
          }
        }
      }

      // B팀 라인업 완성 로직
      for (let player of remaining_B_Team) {
        let b = player.subRole;
        for (let subRole of player.subRole) {
          if (seted_B_Team.length < 5) {
            if (Array.isArray(player.subRole)) {
            } else {
              if (b.length === 1) {
                subRole = b[0];
              } else if (b.length === 2) {
                subRole = b[0] + b[1];
              }
            }
            //만약 Array값일 경우 ex) ["탑","미드"] ["서폿","미드"]
            const canBeAdded = !seted_B_Team.some(
              (setedPlayer) => setedPlayer.mainRole === subRole,
            );
            if (canBeAdded) {
              seted_B_Team.push({ ...player, mainRole: subRole }); // mainRole을 subRole로 설정하여 추가
              break; // 중복되지 않는 subRole을 찾았으므로 추가 후 반복 중단
            }
          }
        }
      }

      if (seted_A_Team.length === 5 && seted_B_Team.length === 5) {
        return { seted_A_Team, seted_B_Team };
      }

      attempts++;
    }

    throw new UnauthorizedException(
      '팀 분배를 완성할 수 없습니다. 부라인이 적절하게 설정되지 않았습니다.',
    );
  }

  //맨처음 A팀 멤버의 주라인과, 최종의 A팀 멤버의 주라인이 상이하다면, mmr -400 진행후 팀 다시섞기

  teamMainRoleSubRoleCheckMinusMMR(lolUserPlayers: LoLUserPlayers[]) {
    const { seted_A_Team, seted_B_Team } =
      this.teamLineDistribution(lolUserPlayers);

    // seted_A_Team과 seted_B_Team에 있는 모든 플레이어의 원래 mainRole 추적
    const roleCheckMap = new Map<string, string>();
    seted_A_Team.concat(seted_B_Team).forEach((player) => {
      roleCheckMap.set(player.name, player.mainRole);
    });

    // lolUserPlayers를 순회하며 mainRole이 다르면 mmr을 400 차감하고, 주라인을 배정된 부라인으로 변경
    const adjustedPlayers = lolUserPlayers.map((player) => {
      // 현재 플레이어가 seted_A_Team 또는 seted_B_Team에 배정되었고 mainRole이 다르다면 mmr 차감 및 mainRole 변경
      if (
        roleCheckMap.has(player.name) &&
        roleCheckMap.get(player.name) !== player.mainRole
      ) {
        return {
          ...player,
          mmr: player.mmr - 400,
          mainRole: roleCheckMap.get(player.name),
        }; // mainRole을 배정된 부라인으로 변경
      } else {
        return { ...player };
      }
    });

    return adjustedPlayers;
  }

  sortTeamByMainRole(team: LoLUserPlayers[]): LoLUserPlayers[] {
    const positionPriority = {
      탑: 1,
      정글: 2,
      미드: 3,
      원딜: 4,
      서폿: 5,
    };

    return team.sort(
      (a, b) => positionPriority[a.mainRole] - positionPriority[b.mainRole],
    );
  }

  validateAndProcessPlayers(
    lolUserPlayers: LoLUserPlayers[],
    balance?: string,
  ): any {
    const validRoles = ['탑', '정글', '미드', '원딜', '서폿'];
    let allRolesValid = true;

    // 모든 플레이어의 mainRole 검증
    lolUserPlayers.forEach((player) => {
      if (!validRoles.includes(player.mainRole)) {
        allRolesValid = false;
        // 여기서 올바르지 않은 mainRole을 가진 플레이어를 처리할 수 있습니다.
        // 예: player.mainRole = 'Unknown'; // 또는 올바른 로직으로 수정
      }
    });

    if (!allRolesValid) {
      throw new UnauthorizedException(
        '플레이어 중에 잘못된 주 역할(mainRole)을 가진 사람이 있습니다.',
      );
    }

    // 모든 플레이어의 mainRole이 유효하면, 팀을 생성하는 로직을 실행
    while (true) {
      const haved = this.createBalancedTeams(lolUserPlayers, balance);
      if (haved) {
        return haved
      } else {
        continue
      }
    }
  }

  createBalancedTeams(lolUserPlayers: LoLUserPlayers[], balance?: string) {

    const balances = {
      '매우 잘맞음' : 1000,
      '적당히 잘맞음' : 2000,
      '걍 내맘대로 짬 ㅅㄱ' : 4000,
    }
    lolUserPlayers.forEach((player) => {
      if (player.mmr < 0) {
        console.error(`Player ${player.name} has negative MMR, setting to 0.`);
        player.mmr = 0; // MMR을 0으로 설정하여 음수 값을 방지
      }
    });

    let count = 0;
    let players = new Map<number, FinalDistribution>();
    let compareCount = 1000;

    while (count < compareCount) {
      count++
      // 초기 팀 분배 수행
      let { seted_A_Team, seted_B_Team } =
        this.teamLineDistribution(lolUserPlayers);

      // MMR 조정 로직 실행
      const adjustedPlayers =
        this.teamMainRoleSubRoleCheckMinusMMR(lolUserPlayers);

      // 조정된 MMR을 반영한 팀 재분배
      let finalDistribution: FinalDistribution = this.teamLineDistribution(adjustedPlayers);

      // A팀 멤버의 mainRole에 따라 순서 조정
      finalDistribution.seted_A_Team = this.sortTeamByMainRole(
        finalDistribution.seted_A_Team,
      );
      finalDistribution.seted_B_Team = this.sortTeamByMainRole(
        finalDistribution.seted_B_Team,
      );

      let A_TEAM_MMR = 0;
      let B_TEAM_MMR = 0;
      const rank: {score:number | undefined; id:number | undefined}[] = [];

      for ( let i=0; i < finalDistribution.seted_A_Team.length; i++){
        A_TEAM_MMR += finalDistribution.seted_A_Team[i].mmr;
        B_TEAM_MMR += finalDistribution.seted_B_Team[i].mmr;
      }

      const AB_TEAM_MMR = Math.abs(A_TEAM_MMR - B_TEAM_MMR)

      finalDistribution = {...finalDistribution,AB_TEAM_MMR}

      if ( AB_TEAM_MMR >= balances[balance] ) continue
      players.set(count,finalDistribution)
      if (count === compareCount) {
        for ( let i=1; i<=compareCount; i++ ) {
          const has = players.has(i)
          const get = players.get(i)
          if (has) {
            rank.push({score:get.AB_TEAM_MMR,id:i})
          }
        }
        const minScoreObject = rank.reduce((min, item) => item.score < min.score ? item : min, rank[0]);
        const minScoreId = minScoreObject.id;
        return players.get(minScoreId)
      }
    }
  }
}
