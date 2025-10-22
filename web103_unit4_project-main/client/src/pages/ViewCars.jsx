import React, { useState, useEffect } from 'react'
import { getAllCars, deleteCar } from '../services/CarsAPI'
import CarCard from '../components/CarCard'
import '../App.css'

const ViewCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    useEffect(() => {
        fetchCars()
    }, [])
    
    const fetchCars = async () => {
        try {
            setLoading(true)
            const data = await getAllCars()
            setCars(data)
            setError(null)
        } catch (err) {
            setError('Failed to load cars')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }
    
    const handleDelete = async (id) => {
        try {
            await deleteCar(id)
            // 从状态中移除已删除的汽车
            setCars(cars.filter(car => car.id !== id))
        } catch (err) {
            alert('Failed to delete car')
            console.error(err)
        }
    }
    
    if (loading) return <div className="loading">Loading cars...</div>
    if (error) return <div className="error">{error}</div>
    
    return (
        <div className="view-cars">
            <h1>My Custom Cars</h1>
            {cars.length === 0 ? (
                <div className="empty-state">
                    <p>No cars yet. Create your first custom car!</p>
                    <a href="/" className="btn-primary">Customize a Car</a>
                </div>
            ) : (
                <div className="cars-grid">
                    {cars.map(car => (
                        <CarCard 
                            key={car.id} 
                            car={car} 
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ViewCars