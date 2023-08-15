import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'company' })
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column({ default: true })
  isActive: boolean;
}
