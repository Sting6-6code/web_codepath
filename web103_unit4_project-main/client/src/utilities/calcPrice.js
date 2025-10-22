export const calculateTotalPrice = (exterior, roof, wheels, interior) => {
    const exteriorPrice = exterior ? parseFloat(exterior.price) : 0
    const roofPrice = roof ? parseFloat(roof.price) : 0
    const wheelsPrice = wheels ? parseFloat(wheels.price) : 0
    const interiorPrice = interior ? parseFloat(interior.price) : 0
    
    const total = exteriorPrice + roofPrice + wheelsPrice + interiorPrice
    return total.toFixed(2)
}

// 获取单个选项价格
export const getOptionPrice = (option) => {
    return option ? parseFloat(option.price) : 0
}

// 格式化价格显示
export const formatPrice = (price) => {
    return `$${parseFloat(price).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`
}