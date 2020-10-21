
import { Router } from 'express'            //1
import multer from 'multer'                 //2

import uploadConfig from './config/upload'  //2
import OrphanageController from './controllers/OrphanageController'


const routes = Router()                     //1
const upload = multer(uploadConfig)         //2

//Routes:
//routes.post('/orphanages', async (req, res) => {      //V1, without controller
routes.post('/orphanages', upload.array('images'), OrphanageController.create)

routes.get('/orphanages', OrphanageController.index)

routes.get('/orphanages/:id', OrphanageController.show)

export default routes