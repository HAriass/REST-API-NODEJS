const z = require('zod')

// Define el esquema para una película utilizando Zod
const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'Movie title must be a string',
        required_error: 'Movie title is required'
    }), // Campo obligatorio: título de la película (string)
    year: z.number().int().min(1900).max(2024), // Año de la película: entero entre 1900 y 2024
    director: z.string(), // Nombre del director: string
    duration: z.number().int().positive(), // Duración de la película: número entero positivo
    rate: z.number().min(0).max(10).default(5.5), // Calificación: número entre 0 y 10, con valor por defecto 5.5
    poster: z.string().url({
        message: 'Poster must be a valid URL'
    }), // Póster: URL válida
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Crime', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi'], {
            required_error: 'Movie genre is required',
            invalid_type_error: 'Movie genre must be an array of enum Genre'
        }) // Género: arreglo de géneros válidos especificados como enumeraciones
    )
})

/**
 * Valida un objeto que representa una película completa contra el esquema definido.
 * Si algún campo requerido falta o es inválido, la validación falla.
 * @param {Object} object - Objeto con los datos de la película a validar.
 * @returns {Object} Resultado de la validación con éxito o errores.
 */
function validateMovie(object) {
    return movieSchema.safeParse(object) // Valida el objeto completo contra el esquema
}

/**
 * Valida un objeto parcial que representa una película.
 * Los campos no son obligatorios, permitiendo la validación de objetos incompletos.
 * Útil para operaciones como actualizaciones parciales.
 * @param {Object} object - Objeto parcial de la película a validar.
 * @returns {Object} Resultado de la validación con éxito o errores.
 */
function validatePartialMovie(object) {
    return movieSchema.partial().safeParse(object) // Valida el objeto parcial contra el esquema parcial
}

// Exporta las funciones de validación para su uso externo
module.exports = {
    validateMovie,
    validatePartialMovie
}
