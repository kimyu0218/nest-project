import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Cipher,
  Decipher,
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt,
} from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService {
  private cipher: Cipher;
  private decipher: Decipher;

  constructor(private readonly configService: ConfigService) {
    this.init();
  }

  private async init() {
    const iv: Buffer = randomBytes(16);
    const passwd: string =
      this.configService.get('crypto_passwd') || 'crypto_passwd';
    const algorithm: string =
      this.configService.get('crypto_algorithm') || 'crypto_algorithm';
    const key: Buffer = (await promisify(scrypt)(passwd, 'salt', 32)) as Buffer;
    this.cipher = createCipheriv(algorithm, key, iv);
    this.decipher = createDecipheriv(algorithm, key, iv);
  }

  encrypt(text: string): Buffer {
    return Buffer.concat([this.cipher.update(text), this.cipher.final()]);
  }

  decrypt(text: Buffer): Buffer {
    return Buffer.concat([this.decipher.update(text), this.decipher.final()]);
  }
}
