import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCar, deleteCar } from "../services/CarsAPI";
import { formatPrice } from "../utilities/calcPrice";
import "../App.css";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCar();
  }, [id]);

  const fetchCar = async () => {
    try {
      setLoading(true);
      const data = await getCar(id);
      setCar(data);
      setError(null);
    } catch (err) {
      setError("Failed to load car details");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${car.name}"?`)) {
      try {
        await deleteCar(id);
        navigate("/customcars");
      } catch (err) {
        alert("Failed to delete car");
        console.error(err);
      }
    }
  };

  const handleBack = () => {
    navigate("/customcars");
  };

  if (loading) return <div className="loading">Loading car details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!car) return <div className="error">Car not found</div>;

  return (
    <div className="car-details">
      <button onClick={handleBack} className="btn-back">
        ← Back to List
      </button>

      <h1>{car.name}</h1>

      <div className="details-layout">
        <div className="details-preview">
          <div
            className="car-visual-large"
            style={{ backgroundColor: car.exterior_hex }}
          >
            <div className="car-body-3d">
              <div className="car-headlights"></div>
            </div>
            <div className="car-wheels">
              <div className="car-wheel"></div>
              <div className="car-wheel"></div>
            </div>
            <p>3D Car Preview</p>
          </div>
        </div>

        <div className="details-info">
          <h2>Specifications</h2>

          <div className="spec-item">
            <span className="spec-label">Exterior:</span>
            <span className="spec-value">
              <span
                className="color-dot"
                style={{ backgroundColor: car.exterior_hex }}
              ></span>
              {car.exterior_color} (${car.exterior_price})
            </span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Roof:</span>
            <span className="spec-value">
              {car.roof_type} (${car.roof_price})
            </span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Wheels:</span>
            <span className="spec-value">
              {car.wheels_type} (${car.wheels_price})
            </span>
          </div>

          <div className="spec-item">
            <span className="spec-label">Interior:</span>
            <span className="spec-value">
              <span
                className="color-dot"
                style={{ backgroundColor: car.interior_hex }}
              ></span>
              {car.interior_material} - {car.interior_color} ($
              {car.interior_price})
            </span>
          </div>

          <div className="total-price-display">
            <h3>Total Price</h3>
            <p className="price-large">{formatPrice(car.total_price)}</p>
          </div>

          <div className="details-actions">
            <button onClick={handleEdit} className="btn-edit">
              Edit
            </button>
            <button onClick={handleDelete} className="btn-delete">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
