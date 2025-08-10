import { Body, Controller, Post } from '@nestjs/common';
import { CreateSongDTO } from './dtos/create-songs-dto';
import { SongsService } from './songs.service';

@Controller('songs')
export class SongsController {
  constructor(private readonly songService: SongsService) {}
  @Post()
  create(@Body() createSongDto: CreateSongDTO) {
    return this.songService.create(createSongDto);
  }
}
