import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CompoundsService } from './compounds.service';
import { CreateCompoundDto } from './dtos/create-compound.dto';
import { UpdateCompoundDto } from './dtos/update-compound.dto';

@Controller('compounds')
export class CompoundsController {
  constructor(private compoundService: CompoundsService) {}

  @Get()
  getCompounds() {
    return this.compoundService.getCompounds();
  }

  @Get('/search')
  getCompoundSearch(@Query('trivialname') trivialName: string) {
    return this.compoundService.getCompoundsByName(trivialName);
  }

  @Get('/:pk')
  async getCompound(@Param('pk') pk: string) {
    const compound = await this.compoundService.getCompound(pk);
    if (!compound)
      throw new NotFoundException("Couldn't get compound based on given pk!");
    return compound;
  }

  @Post()
  createCompound(@Body() compound: CreateCompoundDto) {
    return this.compoundService.createCompound(compound);
  }

  @Delete('/:pk')
  async deleteCompound(@Param('pk') pk: string) {
    const deletedCompound = await this.compoundService.deleteCompound(pk);
    if (!deletedCompound)
      throw new NotFoundException(
        "Couldn't find compound with given key to delete!",
      );
    return deletedCompound;
  }

  @Patch('/:pk')
  async updateCompound(
    @Param('pk') pk: string,
    @Body() body: UpdateCompoundDto,
  ) {
    const updatedCompound = await this.compoundService.updateCompound(pk, body);
    if (!updatedCompound)
      throw new NotFoundException(
        "Couldn't find compound with given key to update!",
      );
    return updatedCompound;
  }
}
