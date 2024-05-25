import { IsArray, IsString, IsNotEmpty, IsNumber, ValidateNested, IsObject } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class LoLUserPlayers {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  mainRole: string;

  @IsArray()
  @Transform(({ value }) => value || [])
  @IsString({ each: true })
  subRole: string[];

  @IsString()
  @IsNotEmpty()
  tier: string;

  @IsNumber()
  mmr: number;
}

export class LOLInHouseGameInputDTO {
  @IsObject()
  formData: LoLUserPlayers[];
  @IsString()
  @IsNotEmpty()
  balanceSelected?: string;
}
