export interface LolUserPlayers {
  seted_A_Team: PlayerInfos[];
  seted_B_Team: PlayerInfos[];
}


export interface LoLUserPlayer {
  name: string;
  mainRole: string;
  subRole: string[];
  tier: string;
  mmr: number;
}

export interface LoLUserPlayers {
  seted_A_Team: LoLUserPlayer[];
  seted_B_Team: LoLUserPlayer[];
}

export interface newLoLUserPlayers {
  seted_A_Team: PlayerInfos[];
  seted_B_Team: PlayerInfos[];
}

export interface PlayerInfos {
  name: string;
  mainRole: string;
  subRole: string[];
  tier: string; 
  mmr: number;
}

