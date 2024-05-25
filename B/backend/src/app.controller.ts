import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ChangeTierPipe } from 'pipe/tear-pipe';
import { LOLInHouseGameInputDTO } from 'DTO/dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UsePipes(ChangeTierPipe)
  lolInHouseGame(
    @Body() lolUserPlayers: LOLInHouseGameInputDTO,
  ) {
    const {lolplayer,balance} = {lolplayer:lolUserPlayers.formData,balance:lolUserPlayers.balanceSelected}
    return this.appService.validateAndProcessPlayers(lolplayer,balance);
  }
  
  @Post('test')
  @UsePipes(ChangeTierPipe)
  inputChecked(
    @Body() a:LOLInHouseGameInputDTO
) {
  
  }

  @Get()
  deployCheck() {
    return 'Deploy On!';
  }
}
