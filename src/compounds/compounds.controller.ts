import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { CompoundsService } from './compounds.service';
import { CreateCompoundDto } from './dtos/create-compound.dto';
import { CreateCompoundInterceptor } from './interceptors/create-compound.interceptor';
import { UseCreateCompound } from './decorators/create-compound.decorator';

@Controller('compounds')
export class CompoundsController {
  constructor(private compoundService: CompoundsService) {}

  @Get()
  getCompounds() {
    return this.compoundService.getCompounds();
  }

  @Get('/search')
  getCompoundSearch(@Query('trivialname') trivialName: string) {
    return this.compoundService.getCompoundSearch(trivialName);
  }

  @Get('/:pk')
  async getCompound(@Param('pk') pk: string) {
    const compound = await this.compoundService.getCompound(pk);
    if (!compound)
      throw new NotFoundException("Couldn't get compound based on given pk!");
    return compound;
  }

  @UseInterceptors(CreateCompoundInterceptor)
  @Post()
  createCompound(@UseCreateCompound() compound: CreateCompoundDto) {
    return this.compoundService.createCompound(compound);
  }

  @Delete('/:pk')
  deleteCompound(@Param('pk') pk: string) {
    return this.compoundService.deleteCompound(pk);
  }
}
