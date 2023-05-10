import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";

@Entity()
export class Board extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title : string;

    @Column()
    description: string;

    //Date로 하면 보통 데이터베이스 서버가 존재하는 시간 기준으로 설정됨.
    @CreateDateColumn()
    createdAt: Date;

}

