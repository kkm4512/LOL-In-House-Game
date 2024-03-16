import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { LolUserPlayers } from 'type.ts/Lol-User-Players';
import { SplitSubRolePipe } from 'pipe/subRole-pipe';
import { ChangeTierPipe } from 'pipe/tear-pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UsePipes(SplitSubRolePipe)
  @UsePipes(ChangeTierPipe)
  lolInHouseGame(
    @Body() lolUserPlayers:LolUserPlayers[]
  ) {
    return this.appService.createBalancedTeams(lolUserPlayers) 
  }
}
