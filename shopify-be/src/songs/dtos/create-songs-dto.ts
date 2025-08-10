import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDTO {
  @IsString()
  @IsNotEmpty({ message: 'Tên bài hát không được để trống!' })
  readonly title: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  readonly artists: string[];

  @IsNotEmpty({ message: 'Ngày phát hành không được để trống!' })
  @IsDateString()
  readonly releasedDate: Date;

  @IsMilitaryTime()
  @IsNotEmpty({ message: 'Thời lượng không được để trống!' })
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
