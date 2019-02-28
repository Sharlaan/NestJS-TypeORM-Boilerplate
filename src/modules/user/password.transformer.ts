import * as crypto from 'crypto';
import { ValueTransformer } from 'typeorm';

export class PasswordTransformer implements ValueTransformer {
  from(value: string) {
    return value;
  }

  to(value: string) {
    return crypto.createHmac('sha256', value).digest('hex');
  }
}
