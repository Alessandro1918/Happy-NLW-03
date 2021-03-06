import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'

import Orphanage from '../models/Orphanage'
import orphanageView from '../views/orphanages_view'

export default {

    async index(req: Request, res: Response) {
        
        const orphanageRepository = getRepository(Orphanage)

        const orphanages = await orphanageRepository.find({
            relations: ['images']
        })
    
        //return res.json(orphanages)   //V1 - Without view
        return res.json(orphanageView.renderMany(orphanages))
    },

    async create(req: Request, res: Response) {
        
        const orphanageRepository = getRepository(Orphanage)
    
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = req.body

        const requestImages = req.files as Express.Multer.File[]
        const images = requestImages.map(image => {
            return {path: image.filename}
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends: open_on_weekends === "true" ? true : false,
            images
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Nome é obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape({
                    path: Yup.string().required()
                })
            )
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const orphanage = orphanageRepository.create(data)
    
        await orphanageRepository.save(orphanage)
    
        return res.status(201).json(orphanage)
    },

    async show(req: Request, res: Response) {
        
        const orphanageRepository = getRepository(Orphanage)

        const {id} = req.params

        const orphanage = await orphanageRepository.findOneOrFail(
            id, 
            {relations: ['images']}
        )
    
        //return res.json(orphanage)
        return res.json(orphanageView.render(orphanage))
    }
}
