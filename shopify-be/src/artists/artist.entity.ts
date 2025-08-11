import { Song } from 'src/songs/song.entity';
import { User } from 'src/users/user.entity';
import {
  Entity,
  JoinColumn,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  // Quan hệ một một với user, tạo khoá ngoại
  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  // Quan hệ nhiều nhiều với song
  @ManyToMany(() => Song, (song) => song.artists)
  songs: Song[];
}
