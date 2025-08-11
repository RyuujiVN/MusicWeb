import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from 'src/songs/song.entity';
import { Repository } from 'typeorm';
import { Playlist } from './playlist.entity';
import { User } from 'src/users/user.entity';
import { CreatePlayListDTO } from './dtos/create-playlist.dto';

@Injectable()
export class PlaylistsService {
  constructor(
    @InjectRepository(Song)
    private songRepository: Repository<Song>,
    @InjectRepository(Playlist)
    private playListRepository: Repository<Playlist>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(playListDTO: CreatePlayListDTO): Promise<Playlist> {
    const playList = new Playlist();
    playList.name = playListDTO.name;

    const songs = await this.songRepository.findByIds(playListDTO.songs);
    if (songs.length == 0)
      throw new NotFoundException('Không tìm thấy bài hát!');
    playList.songs = songs;

    const user: User | null = await this.userRepository.findOneBy({
      id: playListDTO.user,
    });

    if (!user) throw new NotFoundException('Không tìm thấy user!');
    playList.user = user;
    return this.playListRepository.save(playList);
  }
}
