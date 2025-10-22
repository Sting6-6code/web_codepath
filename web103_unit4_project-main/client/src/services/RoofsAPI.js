
export const getRoofs = async () => {
    try{
        const response = await fetch (`${API_BASE_URL}/api/roofs`)
        if (!response.ok){
            throw new Error('Failed to fetch roofs')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching roofs:', error)
        throw error
    }
}

export const getRoofById = async (id) => {
    try{
        const response = await fetch (`${API_BASE_URL}/api/roofs/${id}`)
        if (!response.ok){
            throw new Error('Failed to fetch roof')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching roof:', error)
        throw error
    }
    }