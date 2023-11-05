import { IsInt, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsString()
  nickname: string;

  @IsInt()
  age: number;
}
