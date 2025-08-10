import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dtos/create-songs-dto';
import { DeleteResult } from 'typeorm/browser';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
  ) {}

  create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.artists = songDTO.artists;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releasedDate;
    song.lyrics = songDTO.lyrics;

    return this.songsRepository.save(song);
  }

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song | null> {
    return this.songsRepository.findOneBy({ id });
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }
}
