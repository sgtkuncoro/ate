import {Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Column, BaseEntity} from "typeorm";

@Entity('users')
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid: string;

    @Column({
        type: "varchar",
        length: 150,
        unique: true
    })
    
    email: string;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column("text")
    password: string;
    
    @CreateDateColumn()
    created_at: Date;
    
    @UpdateDateColumn()
    updated_at: Date;

}
