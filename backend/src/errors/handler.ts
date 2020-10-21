import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

interface ValidationErrors {
    //["about"]: ["obrigatório", "min caracteres"]   //return default strings for each error, replace them @ OrphanageController/schema
    [key: string]: string[]
}

const errorHandler: ErrorRequestHandler = (error, request, response, next) => {
    
    console.error(error)

    if (error instanceof ValidationError) {
        let errors: ValidationErrors = {}
        error.inner.forEach(err => {
            errors[err.path] = err.errors
        })
        return response.status(400).json({"message": "Validation fails", errors})
    }

    return response.status(500).json({"message": "Internal server error"})
}

export default errorHandler
