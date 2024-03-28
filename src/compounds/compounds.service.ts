import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Compounds } from './compounds.entity';
import { Repository } from 'typeorm';
import { CreateCompoundDto } from './dtos/create-compound.dto';

@Injectable()
export class CompoundsService {
  constructor(
    @InjectRepository(Compounds) private repo: Repository<Compounds>,
  ) {}

  getCompounds() {
    return this.repo.find();
  }

  getCompound(pk: string) {
    return this.repo.findOneBy({ pk: parseInt(pk) });
  }

  async getCompoundSearch(trivialName: string) {
    const compounds = await this.getCompounds();
    const regex = new RegExp(trivialName, 'i');
    return compounds.filter((compound) => regex.test(compound.trivial_name));
  }

  createCompound(compound: CreateCompoundDto) {
    const newCompound = this.repo.create(compound);
    return this.repo.save(newCompound);
  }

  async deleteCompound(pk: string) {
    const compound = await this.getCompound(pk);
    if (!compound)
      throw new NotFoundException("Couldn't found given compound pk");
    return this.repo.remove(compound);
  }
}
