import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { LolUserPlayers } from 'type.ts/Lol-User-Players';
import { ChangeTierPipe } from 'pipe/tear-pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UsePipes(ChangeTierPipe)
  lolInHouseGame(@Body() lolUserPlayers: LolUserPlayers[]) {
    return this.appService.validateAndProcessPlayers(lolUserPlayers);
  }
  
  @Post('test')
  @UsePipes(ChangeTierPipe)
  inputChecked(@Body() testInput: any) {
    console.log(testInput)
  }

  @Get()
  deployCheck() {
    return 'Deploy On!';
  }
}
