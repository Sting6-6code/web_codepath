export const getWheels = async () => {
    try{
        const response = await fetch (`${API_BASE_URL}/api/wheels`)
        if (!response.ok){
            throw new Error('Failed to fetch wheels data')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching wheels:', error)
        throw error
    }
    }

export const getWheelById = async (id) => {
    try{
        const response = await fetch (`${API_BASE_URL}/api/wheels/${id}`)
        if (!response.ok){
            throw new Error('Failed to fetch wheel')
        }
        return await response.json()
    } catch (error) {
        console.error('Error fetching wheel:', error)
        throw error
    }
    }