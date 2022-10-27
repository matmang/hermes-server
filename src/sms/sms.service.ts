import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import { SmsModuleOptions } from './sms.interface';
import * as CryptoJS from 'crypto-js';
import axios from 'axios';

@Injectable()
export class SmsService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: SmsModuleOptions,
  ) {}
  // sms 전송에 필요한 signature 생성
  private makeSignature(): string {
    const space = ' ';
    const newLine = '\n';
    const uri = `/sms/v2/services/${this.options.service_id}/messages`;
    const method = 'POST';
    const timestamp = Date.now().toString();

    const hmac = CryptoJS.algo.HMAC.create(
      CryptoJS.algo.SHA256,
      this.options.secretkey,
    );
    hmac.update(method);
    hmac.update(space);
    hmac.update(uri);
    hmac.update(newLine);
    hmac.update(timestamp);
    hmac.update(newLine);
    hmac.update(this.options.accesskey);

    const hash = hmac.finalize();

    return hash.toString(CryptoJS.enc.Base64);
  }

  async sendSMS(phoneNumber: string, password: number): Promise<string> {
    try {
      let authCode = '';
      for (let i = 0; i < 6; i++) {
        authCode += Math.floor(Math.random() * 10);
      }
      const body = {
        type: 'SMS',
        contentType: 'COMM',
        countryCode: '82',
        from: '01072441542',
        content: `요청하신 배달이 시작되었습니다. 로봇이 도착하면 비밀번호 ${password}를 입력해주세요.`,
        messages: [
          {
            to: phoneNumber,
          },
        ],
      };
      const options = {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'x-ncp-apigw-timestamp': Date.now().toString(),
          'x-ncp-iam-access-key': this.options.accesskey,
          'x-ncp-apigw-signature-v2': this.makeSignature(),
        },
      };
      axios
        .post(
          `https://sens.apigw.ntruss.com/sms/v2/services/${this.options.service_id}/messages`,
          body,
          options,
        )
        .then(async (res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err.response.data);
          authCode = 'error';
          throw new InternalServerErrorException();
        });
      return authCode;
    } catch (err) {
      console.log(err);
    }
  }
}
