import express from 'express'
import { getWheels,getWheelById } from '../controllers/wheels.js'

const router = express.Router()

router.get('/',getWheels)
router.get('/:id',getWheelById)

export default router