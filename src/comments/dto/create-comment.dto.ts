/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  body!: string;

  @IsString()
  @IsNotEmpty()
  author!: string;
}
