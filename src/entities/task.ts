import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 255,
  })
  description: string;

  @Column({ type: 'timestamptz' })
  from: Date;

  @Column({ type: 'timestamptz' })
  to: Date;

  @Column({ type: 'int' })
  duration: number;

  @Column()
  date: string;

  @ManyToOne(() => Employee, (employee) => employee.tasks)
  employeeId: Employee;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at: Date;
}
