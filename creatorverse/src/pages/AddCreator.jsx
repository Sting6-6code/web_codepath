import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";

const AddCreator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // 清除对应字段的错误
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    } else if (!/^https?:\/\/.+/.test(formData.url)) {
      newErrors.url = "Invalid URL format (must start with http:// or https://)";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (formData.imageURL && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(formData.imageURL)) {
      newErrors.imageURL = "Invalid image URL format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 准备要插入的数据，确保没有空字符串
      const dataToInsert = {
        name: formData.name.trim(),
        url: formData.url.trim(),
        description: formData.description.trim(),
        imageURL: formData.imageURL.trim() || null, // 空字符串转为null
      };

      console.log("Attempting to insert:", dataToInsert);

      const { data, error } = await supabase
        .from("creators")
        .insert([dataToInsert])
        .select(); // 添加 select() 来返回插入的数据

      if (error) {
        console.error("Supabase error:", error);
        console.error("Error details:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        });
        
        // 根据错误类型提供更具体的错误信息
        if (error.code === "23505") {
          alert("A creator with this information already exists.");
        } else if (error.code === "42501") {
          alert("Permission denied. Please check your database permissions or Row Level Security settings.");
        } else if (error.message.includes("violates row-level security policy")) {
          alert("Database security policy prevents this action. Please check your RLS settings.");
        } else if (error.message.includes("relation") && error.message.includes("does not exist")) {
          alert("Database table 'creators' does not exist. Please check your database setup.");
        } else {
          alert(`Failed to add creator: ${error.message}`);
        }
        return;
      }

      console.log("Successfully inserted:", data);
      alert("Creator added successfully!");
      navigate("/");

    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 测试数据库连接的函数
  const testConnection = async () => {
    try {
      console.log("Testing database connection...");
      const { data, error } = await supabase.from("creators").select("count").limit(1);
      
      if (error) {
        console.error("Connection test failed:", error);
        alert(`Database connection failed: ${error.message}`);
      } else {
        console.log("Connection test successful:", data);
        alert("Database connection is working!");
      }
    } catch (err) {
      console.error("Connection test error:", err);
      alert("Failed to test database connection");
    }
  };

  return (
    <div className="form-container">
      <h1>Add New Creator</h1>
      
      {/* 调试按钮 */}
      <button 
        type="button" 
        onClick={testConnection}
        className="btn-secondary"
        style={{ marginBottom: "1rem" }}
      >
        Test Database Connection
      </button>

      <form onSubmit={handleSubmit} className="creator-form">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter creator's name"
            disabled={isSubmitting}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="url">Channel URL *</label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            placeholder="https://youtube.com/@creator"
            disabled={isSubmitting}
          />
          {errors.url && <p className="error-message">{errors.url}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe what this creator is known for..."
            rows="4"
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="error-message">{errors.description}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="imageURL">Image URL (optional)</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            disabled={isSubmitting}
          />
          {errors.imageURL && <p className="error-message">{errors.imageURL}</p>}
        </div>

        <div className="form-buttons">
          <button 
            type="submit" 
            className="btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Adding..." : "Add Creator"}
          </button>
          <button 
            type="button" 
            onClick={() => navigate("/")} 
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCreator;