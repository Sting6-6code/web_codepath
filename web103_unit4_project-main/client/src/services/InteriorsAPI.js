export const getInteriors = async() => {
    try{
        const response = await fetch (`${API_BASE_URL}/api/interiors`)
        if (!response.ok){
            throw new Error('Failed to fetch interiors')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching interiors:', error)
        throw error
    }
    }

export const getInteriorById = async (id) => {
    try{
        const response = await fetch (`${API_BASE_URL}/api/interiors/${id}`)
        if (!response.ok){
            throw new Error('Failed to fetch interior')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching interior:', error)
        throw error
    }
    }
