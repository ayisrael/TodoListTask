import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('task')
class Task {
  @Column()
  name!: string;

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  iscompleted!: boolean;
}

export { Task };
