import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayListDTO } from './dtos/create-playlist.dto';
import { PlaylistsService } from './playlists.service';
import { Playlist } from './playlist.entity';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playListService: PlaylistsService) {}
  @Post()
  create(@Body() playListDTO: CreatePlayListDTO): Promise<Playlist> {
    return this.playListService.create(playListDTO);
  }
}
