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
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Clear corresponding field error
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from("creators")
        .update(formData)
        .eq("id", id);

      if (error) {
        console.error("Error updating creator:", error);
        alert("Failed to update creator. Please try again.");
        return;
      }

      alert("Creator updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${formData.name}? This action cannot be undone.`
      )
    ) {
      setIsSubmitting(true);
      try {
        const { error } = await supabase.from("creators").delete().eq("id", id);

        if (error) {
          console.error("Error deleting creator:", error);
          alert("Error deleting creator!");
        } else {
          alert("Creator deleted successfully!");
          navigate("/");
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="form-container">
      <h1>Edit Creator</h1>

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
          {errors.imageURL && (
            <p className="error-message">{errors.imageURL}</p>
          )}
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Creator"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-secondary"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="btn-danger"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Deleting..." : "Delete Creator"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
