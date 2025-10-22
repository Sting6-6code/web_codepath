import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getCar, updateCar } from '../services/CarsAPI'
import { getExteriors } from '../services/ExteriorsAPI'
import { getRoofs } from '../services/RoofsAPI'
import { getWheels } from '../services/WheelsAPI'
import { getInteriors } from '../services/InteriorsAPI'
import { calculateTotalPrice, formatPrice } from '../utilities/calcPrice'
import { validateRequiredFields, validateCombination } from '../utilities/validation'
import '../App.css'

const EditCar = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    
    // 配置选项
    const [exteriors, setExteriors] = useState([])
    const [roofs, setRoofs] = useState([])
    const [wheels, setWheels] = useState([])
    const [interiors, setInteriors] = useState([])
    
    // 用户选择
    const [carName, setCarName] = useState('')
    const [selectedExterior, setSelectedExterior] = useState(null)
    const [selectedRoof, setSelectedRoof] = useState(null)
    const [selectedWheels, setSelectedWheels] = useState(null)
    const [selectedInterior, setSelectedInterior] = useState(null)
    
    // UI 状态
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState(null)
    const [validationError, setValidationError] = useState('')
    const [totalPrice, setTotalPrice] = useState(0)
    
    // 加载汽车数据和选项
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [carData, exteriorsData, roofsData, wheelsData, interiorsData] = await Promise.all([
                    getCar(id),
                    getExteriors(),
                    getRoofs(),
                    getWheels(),
                    getInteriors()
                ])
                
                // 设置选项
                setExteriors(exteriorsData)
                setRoofs(roofsData)
                setWheels(wheelsData)
                setInteriors(interiorsData)
                
                // 预填充表单
                setCarName(carData.name)
                setSelectedExterior(exteriorsData.find(e => e.id === carData.exterior_id))
                setSelectedRoof(roofsData.find(r => r.id === carData.roof_id))
                setSelectedWheels(wheelsData.find(w => w.id === carData.wheels_id))
                setSelectedInterior(interiorsData.find(i => i.id === carData.interior_id))
                
                setError(null)
            } catch (err) {
                setError('Failed to load car data')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [id])
    
    // 计算价格
    useEffect(() => {
        if (selectedExterior || selectedRoof || selectedWheels || selectedInterior) {
            const price = calculateTotalPrice(
                selectedExterior,
                selectedRoof,
                selectedWheels,
                selectedInterior
            )
            setTotalPrice(price)
        }
    }, [selectedExterior, selectedRoof, selectedWheels, selectedInterior])
    
    // 提交更新
    const handleSubmit = async () => {
        setValidationError('')
        
        const carData = {
            name: carName,
            exterior_id: selectedExterior?.id,
            roof_id: selectedRoof?.id,
            wheels_id: selectedWheels?.id,
            interior_id: selectedInterior?.id
        }
        
        const requiredValidation = validateRequiredFields(carData)
        if (!requiredValidation.valid) {
            setValidationError(requiredValidation.message)
            return
        }
        
        const combinationValidation = validateCombination({
            roof_id: selectedRoof.id,
            wheels_id: selectedWheels.id
        })
        if (!combinationValidation.valid) {
            setValidationError(combinationValidation.message)
            return
        }
        
        try {
            setSubmitting(true)
            await updateCar(id, {
                ...carData,
                total_price: parseFloat(totalPrice)
            })
            navigate(`/customcars/${id}`)
        } catch (err) {
            setValidationError('Failed to update car: ' + err.message)
        } finally {
            setSubmitting(false)
        }
    }
    
    const handleCancel = () => {
        navigate(`/customcars/${id}`)
    }
    
    if (loading) return <div className="loading">Loading...</div>
    if (error) return <div className="error">{error}</div>
    
    return (
        <div className="edit-car">
            <h1>Edit Car Configuration</h1>
            
            <div className="customizer-layout">
                <div className="car-preview-section">
                    <div 
                        className="car-visual-large"
                        style={{ backgroundColor: selectedExterior?.hex_code || '#ccc' }}
                    >
                        <p>Car Preview</p>
                    </div>
                </div>
                
                <div className="options-section">
                    <h2>Update Configuration</h2>
                    
                    <div className="option-group">
                        <label>Car Name:</label>
                        <input 
                            type="text"
                            value={carName}
                            onChange={(e) => setCarName(e.target.value)}
                        />
                    </div>
                    
                    {/* 复制 CreateCar 中的所有选项组 */}
                    {/* Exteriors, Roofs, Wheels, Interiors */}
                    
                    {validationError && (
                        <div className="error-message">{validationError}</div>
                    )}
                    
                    <div className="price-summary">
                        <h3>Total Price</h3>
                        <p className="total-price">{formatPrice(totalPrice)}</p>
                    </div>
                    
                    <div className="form-actions">
                        <button 
                            className="btn-save"
                            onClick={handleSubmit}
                            disabled={submitting}
                        >
                            {submitting ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button 
                            className="btn-cancel"
                            onClick={handleCancel}
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditCar