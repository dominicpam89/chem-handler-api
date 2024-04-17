import { Injectable } from '@nestjs/common';
import { CreateCompoundDto } from './dtos/create-compound.dto';
import { CompoundsRepository } from './compounds.repository';
import { UpdateCompoundDto } from './dtos/update-compound.dto';

@Injectable()
export class CompoundsService {
  constructor(private repo: CompoundsRepository) {}

  async getCompounds() {
    const compounds = await this.repo.getCompounds();
    return compounds;
  }

  getCompound(key: string) {
    const pk = parseInt(key);
    if (isNaN(pk)) throw new Error('key must be number after /compounds');
    return this.repo.getCompound(pk);
  }

  async getCompoundsByName(trivial_name: string) {
    return this.repo.getCompoundsByName(trivial_name);
  }

  createCompound(compound: CreateCompoundDto) {
    return this.repo.createCompound(compound);
  }

  async deleteCompound(key: string) {
    const pk = parseInt(key);
    if (isNaN(pk)) throw new Error('key must be number after /compounds');
    return this.repo.deleteCompound(pk);
  }

  async updateCompound(key: string, body: UpdateCompoundDto) {
    const pk = parseInt(key);
    if (isNaN(pk)) throw new Error('key must be number after /compounds');
    return this.repo.updateCompound(pk, body);
  }
}
