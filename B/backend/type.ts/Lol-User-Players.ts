export class LoLUserPlayers {
  name: string;
  mainRole: string;
  subRole: string[];
  tier: string;
  mmr: number;
}

export class lastLOLUserPlayers {
  seted_A_Team: LoLUserPlayers[];
  seted_B_Team: LoLUserPlayers[];
}

export interface FinalDistribution {
  seted_A_Team: LoLUserPlayers[];
  seted_B_Team: LoLUserPlayers[];
  AB_TEAM_MMR?: number;
}


