import { Body, Controller, Post } from '@nestjs/common';
import { CreateSongDTO } from './dtos/create-songs-dto';
import { SongsService } from './songs.service';
import { Song } from './song.entity';

@Controller('songs')
export class SongsController {
  constructor(private readonly songService: SongsService) {}
  @Post()
  create(@Body() createSongDto: CreateSongDTO): Promise<Song> {
    return this.songService.create(createSongDto);
  }
}
