import { IsNumber, Min } from 'class-validator';

export class CreateRecordDto {
  @IsNumber()
  @Min(0)
  WPM: number;
  @IsNumber()
  textId: number;
}
