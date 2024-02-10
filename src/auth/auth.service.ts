import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';

import * as bcrypt from 'bcryptjs';
import { genSalt, hash } from 'bcryptjs';
import { JwtPayload, decode, sign, verify } from 'jsonwebtoken';
import { createTransport } from 'nodeMailer';
import { DataSource } from 'typeorm';

import { Environment } from '@shared/variables/environment';

import { DatabaseService } from '@shared/database/services/database.service';
import { TextService } from 'src/text/text.service';

import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

import { authEmailPage } from './pages/auth-email.page';

@Injectable()
export class AuthService extends DatabaseService {
  constructor(
    @InjectDataSource() datasource: DataSource,
    private readonly textService: TextService,
  ) {
    super(datasource);
  }

  async register(dto: AuthDto) {
    // await this.database.users.checkNotExists({ email: dto.email });
    const salt = await genSalt(10);
    const user = await this.database.users.create({
      ...dto,
      password: await hash(dto.password, salt),
    });
    await this.textService.createText(user.id);
    const html = authEmailPage('http://localhost:5173/confirm/user/' + user.id);

    await this.sendEmail(user.email, html);

    return true;
  }

  async logIn(dto: AuthDto) {
    const { email, password, username } = dto;
    const user = await this.database.users.findOneOrFail({ where: { email, username } });
    const deHashPassword = await bcrypt.compare(password, user.password);
    if (!deHashPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const html = authEmailPage('http://localhost:5173/confirm/user/' + user.id);
    await this.sendEmail(user.email, html);
    const token = await this.issueAccessToken(user.id, user.email);
    return {
      user,
      ...token,
    };
  }

  async sendEmail(toUserEmail: string, html: string) {
    await this.database.users.update({ email: toUserEmail }, { lastLoginAt: new Date() });

    const transporter = await createTransport({
      service: 'gmail',
      auth: {
        user: Environment.NODE_MAILER_AUTH_EMAIL,
        pass: Environment.PASSWORD,
      },
    });

    const mailOptions = {
      from: Environment.SEND_FROM_EMAIL,
      to: toUserEmail,
      subject: 'nodemailer test',
      html,
    };

    transporter.sendMail(mailOptions, (err) => {
      if (err) {
        console.log(err);
      } else {
        return true;
      }
    });
  }

  async confirm(id: number) {
    const user = await this.database.users.findOneOrFail({
      where: { id },
      relations: { currentText: true },
    });
    const currentTime = new Date();
    const createdAtTime = new Date(user.lastLoginAt);
    const timeDifferenceMinutes = Math.floor(
      (currentTime.getTime() - createdAtTime.getTime()) / (1000 * 60),
    );
    if (timeDifferenceMinutes >= 2) {
      await this.database.users.delete({ id });
      throw new BadRequestException('User was created less than 2 minutes ago');
    }
    const token = await this.issueAccessToken(user.id, user.email);
    return {
      user,
      ...token,
    };
  }

  async issueAccessToken(userId: number, userEmail: string) {
    const refreshToken = sign({ userId: userId, email: userEmail }, Environment.JWT_SECRET, {
      expiresIn: '7d',
    });

    const accessToken = sign({ userId: userId }, Environment.JWT_SECRET, {
      expiresIn: '1h',
    });
    return { refreshToken, accessToken };
  }

  async getNewTokens(dto: RefreshTokenDto) {
    const result = (await verify(dto.refreshToken, Environment.JWT_SECRET)) as JwtPayload;
    console.log(result);
    if (!result) {
      console.log(2);
      throw new UnauthorizedException('Invalid refresh token');
    }
    const token = await this.issueAccessToken(result.userId, result.email);

    return { ...token };
  }
}
