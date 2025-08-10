import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateSongDTO } from './dtos/create-songs-dto';
import { SongsService } from './songs.service';
import { Song } from './song.entity';
import { DeleteResult } from 'typeorm';

@Controller('songs')
export class SongsController {
  constructor(private readonly songService: SongsService) {}
  @Post()
  create(@Body() createSongDto: CreateSongDTO): Promise<Song> {
    return this.songService.create(createSongDto);
  }

  @Get()
  findAll(): Promise<Song[]> {
    try {
      return this.songService.findAll();
    } catch (error) {
      throw new HttpException(
        'server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<Song | null> {
    return this.songService.findOne(id);
  }

  @Delete(':id')
  deleteOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ): Promise<DeleteResult> {
    return this.songService.deleteOne(id);
  }
}
