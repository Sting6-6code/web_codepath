import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getExteriors } from "../services/ExteriorsAPI";
import { getRoofs } from "../services/RoofsAPI";
import { getWheels } from "../services/WheelsAPI";
import { getInteriors } from "../services/InteriorsAPI";
import { createCar } from "../services/CarsAPI";
import { calculateTotalPrice, formatPrice } from "../utilities/calcPrice";
import {
  validateRequiredFields,
  validateCombination,
} from "../utilities/validation";
import "../App.css";

const CreateCar = () => {
  const navigate = useNavigate();

  //配置选择
  const [exteriors, setExteriors] = useState([]);
  const [roofs, setRoofs] = useState([]);
  const [wheels, setWheels] = useState([]);
  const [interiors, setInteriors] = useState([]);

  //用户选择

  const [carName, setCarName] = useState("");
  const [selectedExterior, setSelectedExterior] = useState(null);
  const [selectedRoof, setSelectedRoof] = useState(null);
  const [selectedWheels, setSelectedWheels] = useState(null);
  const [selectedInterior, setSelectedInterior] = useState(null);

  const [totalPrice, setTotalPrice] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [validationError, setValidationError] = useState("");
  //ui状态
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [exteriorsData, roofsData, wheelsData, interiorsData] =
          await Promise.all([
            getExteriors(),
            getRoofs(),
            getWheels(),
            getInteriors(),
          ]);

        setExteriors(exteriorsData);
        setRoofs(roofsData);
        setWheels(wheelsData);
        setInteriors(interiorsData);
        setError(null);
      } catch (err) {
        setError("Failed to load options");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOptions();
  }, []);

  useEffect(() => {
    if (
      selectedExterior ||
      selectedRoof ||
      selectedWheels ||
      selectedInterior
    ) {
      const price = calculateTotalPrice(
        selectedExterior,
        selectedRoof,
        selectedWheels,
        selectedInterior
      );
      setTotalPrice(price);
    }
  }, [selectedExterior, selectedRoof, selectedWheels, selectedInterior]);

  const handleSubmit = async () => {
    // 清除之前的错误
    setValidationError("");

    // 验证必填字段
    const carData = {
      name: carName,
      exterior_id: selectedExterior?.id,
      roof_id: selectedRoof?.id,
      wheels_id: selectedWheels?.id,
      interior_id: selectedInterior?.id,
    };

    const requiredValidation = validateRequiredFields(carData);
    if (!requiredValidation.valid) {
      setValidationError(requiredValidation.message);
      return;
    }

    // 验证组合
    const combinationValidation = validateCombination({
      roof_id: selectedRoof.id,
      wheels_id: selectedWheels.id,
    });
    if (!combinationValidation.valid) {
      setValidationError(combinationValidation.message);
      return;
    }

    // 提交创建
    try {
      setSubmitting(true);
      const newCar = await createCar({
        ...carData,
        total_price: parseFloat(totalPrice),
      });

      // 跳转到详情页
      navigate(`/customcars/${newCar.id}`);
    } catch (err) {
      setValidationError("Failed to create car: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return <div className="loading">Loading options...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="create-car">
      <h1>Customize Your Car</h1>

      <div className="customizer-layout">
        {/* 汽车预览区域 */}
        <div className="car-preview-section">
          <div
            className="car-visual-large"
            style={{ backgroundColor: selectedExterior?.hex_code || "#ccc" }}
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
        </div>

        {/* 配置选项区域 */}
        <div className="options-section">
          <h2>Configuration</h2>

          <div className="option-group">
            <label>Car Name:</label>
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              placeholder="Enter car name"
            />
          </div>

          <div className="option-group">
            <h3>Exterior Color</h3>
            <div className="options-grid">
              {exteriors.map((exterior) => (
                <div
                  key={exterior.id}
                  className={`option-card ${
                    selectedExterior?.id === exterior.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedExterior(exterior)}
                >
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: exterior.hex_code }}
                  ></div>
                  <p>{exterior.color}</p>
                  <p>${exterior.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="option-group">
            <h3>Roof Type</h3>
            <div className="options-grid">
              {roofs.map((roof) => (
                <div
                  key={roof.id}
                  className={`option-card ${
                    selectedRoof?.id === roof.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedRoof(roof)}
                >
                  <p>{roof.type}</p>
                  <p>${roof.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="option-group">
            <h3>Wheels</h3>
            <div className="options-grid">
              {wheels.map((wheel) => (
                <div
                  key={wheel.id}
                  className={`option-card ${
                    selectedWheels?.id === wheel.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedWheels(wheel)}
                >
                  <p>{wheel.type}</p>
                  <p>${wheel.price}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="option-group">
            <h3>Interior</h3>
            <div className="options-grid">
              {interiors.map((interior) => (
                <div
                  key={interior.id}
                  className={`option-card ${
                    selectedInterior?.id === interior.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedInterior(interior)}
                >
                  <div
                    className="color-swatch"
                    style={{ backgroundColor: interior.hex_code }}
                  ></div>
                  <p>{interior.material}</p>
                  <p>{interior.color}</p>
                  <p>${interior.price}</p>
                </div>
              ))}
            </div>
          </div>

          {validationError && (
            <div className="error-message">{validationError}</div>
          )}

          <div className="price-summary">
            <h3>Total Price</h3>
            <p className="total-price">{formatPrice(totalPrice)}</p>

            <div className="price-breakdown">
              {selectedExterior && <p>Exterior: ${selectedExterior.price}</p>}
              {selectedRoof && <p>Roof: ${selectedRoof.price}</p>}
              {selectedWheels && <p>Wheels: ${selectedWheels.price}</p>}
              {selectedInterior && <p>Interior: ${selectedInterior.price}</p>}
            </div>
          </div>

          <button
            className="btn-create"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create Car"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCar;
