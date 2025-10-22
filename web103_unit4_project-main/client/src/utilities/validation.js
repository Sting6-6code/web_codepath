export const validateRequiredFields = (carData) => {
    const { name, exterior_id, roof_id, wheels_id, interior_id } = carData
    if (!name || name.trim() === '') {
        return { valid: false, message: 'Car name is required' }
    }
    if (!exterior_id) {
        return { valid: false, message: 'Please select an exterior color' }
    }
    if (!roof_id) {
        return { valid: false, message: 'Please select a roof type' }
    }
    if (!wheels_id) {
        return { valid: false, message: 'Please select wheel type' }
    }
    if (!interior_id) {
        return { valid: false, message: 'Please select an interior' }
    }
    return { valid: true }
}

export const validateCombination = (selections) => {
    const { roof_id, wheels_id } = selections
    if (roof_id === 3 && wheels_id === 1) {
        return { valid: false, message: 'Convertible roof requires upgraded wheels (Sport or better)' }
    }
    return { valid: true }
}