import { Entity, PrimaryGeneratedColumn, Column, Generated } from "typeorm"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @Generated("uuid")
    id: string

    @Column()
    email: string

    @Column()
    username: string

    @Column()
    password: string

    // @Column({
    //     nullable: true
    // })
    // access_token: string

    @Column({
        nullable: true
    })
    token: string

    @Column({
        nullable: true
    })
    avatar: string

}
