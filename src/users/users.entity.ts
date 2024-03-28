import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
/**
 * @description
 * The name of table in database is "User"
 * So this entity class is match with respectively database table's name
 */
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  first_name?: string;

  @Column({ nullable: true })
  last_name?: string;

  @Column({ nullable: true })
  username?: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
