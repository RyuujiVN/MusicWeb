import { PartialType } from '@nestjs/mapped-types';
import { CreateSongDTO } from './create-songs-dto';

export class UpdateSongDTO extends PartialType(CreateSongDTO) {}
