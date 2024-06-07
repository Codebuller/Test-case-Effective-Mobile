import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor (private userService: UserService) {}
    @Get('/count')
    async getHello() {
        return await this.userService.getCount();
    }
}
