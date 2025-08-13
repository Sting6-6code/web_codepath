import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
        alert("Failed to fetch creator. Please try again.");
        return;
      }

      setFormData(data);
    };

    fetchCreator();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.url.trim()) {
      newErrors.url = "URL is required";
    } else if (!/^https?:\/\/.+/i.test(formData.url)) {
      newErrors.url = "Invalid URL format";
    }
    if (formData.imageURL && formData.imageURL.trim()) {
      if (!/^https?:\/\/.+/i.test(formData.imageURL)) {
        newErrors.imageURL = "Invalid image URL format";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const { error } = await supabase
      .from("creators")
      .update(formData)
      .eq("id", id);

    if (error) {
      console.error("Error updating creator:", error);
      alert("Failed to update creator. Please try again.");
      return;
    }

    navigate("/");
  };

  return (
    <div>
      <h1>Edit Creator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <p style={{ color: "red" }}>{errors.description}</p>
          )}
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
          />
          {errors.url && <p style={{ color: "red" }}>{errors.url}</p>}
        </div>
        <div>
          <label htmlFor="imageURL">Image URL (optional):</label>
          <input
            type="text"
            id="imageURL"
            name="imageURL"
            value={formData.imageURL}
            onChange={handleChange}
          />
          {errors.imageURL && <p style={{ color: "red" }}>{errors.imageURL}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditCreator;
