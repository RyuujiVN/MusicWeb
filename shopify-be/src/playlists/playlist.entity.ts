import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('playlists')
export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  // Quan hệ một nhiều với song
  @OneToMany(() => Song, (song) => song.playList, { cascade: true })
  songs: Song[];

  @ManyToOne(() => User, (user) => user.playLists)
  user: User;
}
