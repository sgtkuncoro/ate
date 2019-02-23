import { Entity, PrimaryGeneratedColumn,CreateDateColumn, Column, BaseEntity, OneToOne, JoinColumn } from "typeorm";

import {User} from './User'

@Entity('user_access_token')
export class UserAccessToken extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column("text")
  token: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User;
}