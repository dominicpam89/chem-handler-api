import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';
import { CompoundModel } from './compound.model';
import { CreateCompoundDto } from './dtos/create-compound.dto';
import { UpdateCompoundDto } from './dtos/update-compound.dto';

@Injectable()
export class CompoundsRepository {
  path: string = 'db.json';
  async getCompounds(): Promise<CompoundModel[]> {
    try {
      const data = await readFile(this.path, 'utf-8');
      return JSON.parse(data) as CompoundModel[];
    } catch (error) {
      throw new Error('Unable to read compounds data');
    }
  }

  async getCompound(pk: number): Promise<CompoundModel> {
    const compounds = await this.getCompounds();
    const compound = compounds.find((comp) => comp.pk === pk);
    return compound;
  }

  async getCompoundsByName(trivial_name: string): Promise<CompoundModel[]> {
    const searchTerm = new RegExp(trivial_name);
    const data = await this.getCompounds();
    const compounds = data.filter((comp) => searchTerm.test(comp.trivial_name));
    return compounds;
  }

  async createCompound(body: CreateCompoundDto) {
    const data = await this.getCompounds();
    const newPk = data.at(-1).pk + 1;
    const newCompound: CompoundModel = {
      pk: newPk,
      trivial_name: body.trivial_name ?? '',
      inci_name: body.inci_name ?? '',
      cas_number: body.cas_number ?? '',
      smiles: body.smiles,
      comedogenicity_class: (body.comedogenicity_class ??= null),
    };
    data.push(newCompound);
    try {
      await writeFile(this.path, JSON.stringify(data), 'utf-8');
      return newCompound;
    } catch (error) {
      throw new Error("Couldn't write to db");
    }
  }

  async deleteCompound(pk: number) {
    const data = await this.getCompounds();
    const compound = data.find((comp) => comp.pk == pk);
    const index = data.findIndex((comp) => comp.pk == pk);
    if (index) data.splice(index, 1);
    try {
      await writeFile(this.path, JSON.stringify(data), 'utf-8');
    } catch (error) {
      throw new Error("Couldn't delete db");
    }
    return compound;
  }

  async updateCompound(pk: number, body: UpdateCompoundDto) {
    const data = await this.getCompounds();
    const compound = data.find((comp) => comp.pk == pk);
    if (compound) {
      Object.assign(compound, body);
      const index = data.findIndex((comp) => comp.pk == pk);
      data.splice(index, 1, compound);
      await writeFile(this.path, JSON.stringify(data), 'utf-8');
    }
    return compound;
  }
}
