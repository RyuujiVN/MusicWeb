import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Song } from './song.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSongDTO } from './dtos/create-songs.dto';
import { DeleteResult } from 'typeorm/browser';
import { UpdateSongDTO } from './dtos/update-songs.dto';
import { UpdateResult } from 'typeorm/browser';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song)
    private songsRepository: Repository<Song>,
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  findAll(): Promise<Song[]> {
    return this.songsRepository.find();
  }

  findOne(id: number): Promise<Song | null> {
    return this.songsRepository.findOneBy({ id });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
    // Thêm query builder
    const queryBuilder = this.songsRepository.createQueryBuilder('song');

    // Áp dụng sort(sắp xếp)
    queryBuilder.orderBy('song.releasedDate', 'DESC');

    return paginate<Song>(queryBuilder, options);
  }

  async create(songDTO: CreateSongDTO): Promise<Song> {
    const song = new Song();
    song.title = songDTO.title;
    song.duration = songDTO.duration;
    song.releasedDate = songDTO.releasedDate;
    song.lyrics = songDTO.lyrics;

    // Tìm tất cả artist dựa trên id
    const artists = await this.artistsRepository.findByIds(songDTO.artists);
    song.artists = artists;

    return this.songsRepository.save(song);
  }

  updateOne(id: number, recordToUpdate: UpdateSongDTO): Promise<UpdateResult> {
    return this.songsRepository.update(id, recordToUpdate);
  }

  deleteOne(id: number): Promise<DeleteResult> {
    return this.songsRepository.delete(id);
  }
}
