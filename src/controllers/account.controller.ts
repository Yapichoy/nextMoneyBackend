import { Body, Controller, Get, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { EditBillDto } from '../dto/account/edit-bill.dto';

@Controller(`account`)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Get('get')
  getAllWithSum(): any {
    const accountId = 1;
    return this.accountService.get(accountId);
  }

  @Post('decrement')
  decrement(@Body() editBillDto: EditBillDto): any {
    const accountId = 1;
    const res = this.accountService.decrement(accountId, editBillDto.value);
    return res;
  }
}
