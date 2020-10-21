import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image'

@Entity('orphanages')
export default class Orphanage {
    
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    about: string;

    @Column()
    instructions: string;

    @Column()
    opening_hours: string;

    @Column()
    open_on_weekends: boolean;

    @OneToMany(() => Image, image => image.orphanage, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'orphanage_id'})
    images: Image[]
}

//Remove red error underline:
//tsconfig.json:
//"strictPropertyInitialization": false,  /* Enable strict checking of property initialization in classes. */
//Also, uncomment:
// "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
// "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */