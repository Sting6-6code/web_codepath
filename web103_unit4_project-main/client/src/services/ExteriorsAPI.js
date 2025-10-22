

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'


export const getExteriors = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/exteriors`)
        if (!response.ok) {
            throw new Error('Failed to fetch exteriors')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching exteriors:', error)
        throw error
    }
}


export const getExteriorById = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/exteriors/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch exterior')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching exterior:', error)
        throw error
    }
}