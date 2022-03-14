import { Injectable } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { AccountEntity } from '../entities/account.entity';
import { GetAccountDto } from '../dto/account/get-account.dto';

@Injectable()
export class AccountService {
  async get(accountId: number): Promise<GetAccountDto> {
    const account = await getRepository(AccountEntity).findOne({
      where: { id: accountId },
    });
    return account;
  }

  async decrement(accountId: number, value: number): Promise<number> {
    let account = await getRepository(AccountEntity).findOne({
      where: { id: accountId },
    });
    account.bill -= value;
    account = await getRepository(AccountEntity).save(account);
    return account.bill;
  }
}
