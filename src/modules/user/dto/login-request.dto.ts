import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  countryCode: string;

  @IsNumber()
  @IsOptional()
  phone: number;

  @IsString()
  @IsOptional()
  firstName: string;
}
