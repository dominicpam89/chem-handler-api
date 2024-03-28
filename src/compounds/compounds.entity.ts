import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
/**
 * @description
 * The name of table in database is "Compounds"
 * So this entity class is match with respectively database table's name
 */
export class Compounds {
  @PrimaryColumn()
  pk: number;

  @Column()
  trivial_name: string;

  @Column()
  cas_number: string;

  @Column()
  inci_name: string;

  @Column()
  smiles: string;

  @Column({ nullable: true })
  comedogenicity_class?: number;
}
