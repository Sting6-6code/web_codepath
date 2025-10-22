import React from "react";
import { useNavigate } from "react-router-dom";

const CarCard = ({ car, onDelete }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/customcars/${car.id}`);
  };

  const handleEdit = () => {
    navigate(`/edit/${car.id}`);
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${car.name}"?`)) {
      onDelete(car.id);
    }
  };

  return (
    <div className="car-card">
      <div
        className="car-preview"
        style={{ backgroundColor: car.exterior_hex }}
        onClick={handleViewDetails}
      >
        <div className="car-visual">
          <div className="car-body">
            <div className="car-headlights"></div>
          </div>
          <div className="car-wheels">
            <div className="car-wheel"></div>
            <div className="car-wheel"></div>
          </div>
        </div>
      </div>

      <div className="car-info">
        <h3>{car.name}</h3>
        <div className="car-specs">
          <p>🎨 {car.exterior_color}</p>
          <p>🏠 {car.roof_type}</p>
          <p>⚙️ {car.wheels_type}</p>
          <p>
            💺 {car.interior_material} ({car.interior_color})
          </p>
        </div>
        <p className="car-price">${car.total_price}</p>

        <div className="car-actions">
          <button onClick={handleEdit} className="btn-edit">
            Edit
          </button>
          <button onClick={handleDelete} className="btn-delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
