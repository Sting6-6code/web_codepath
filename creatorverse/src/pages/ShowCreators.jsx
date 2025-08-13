import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../client";
import Card from "../components/Card";

const ShowCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCreators();
  }, []);

  const fetchCreators = async () => {
    setLoading(true);
    setError(null);

    const { data, error } = await supabase.from("creators").select();
    if (error) {
      console.error("Error fetching creators:", {
        message: error.message,
        code: error.code,
        details: error.details,
      });
      setError("Failed to fetch creators. Please try again later.");
      setLoading(false);
      return;
    }

    setCreators(data || []);
    setLoading(false);
  };

  // 处理删除后更新列表
  const handleDelete = (deletedId) => {
    setCreators(prev => prev.filter(creator => creator.id !== deletedId));
  };

  return (
    <div className="main-container">
      <header className="main-header">
        <h1>🌟 Creatorverse</h1>
        <p>Discover amazing content creators worth following!</p>
        <Link to="/add" className="btn-add-creator">
          ➕ Add New Creator
        </Link>
      </header>

      <main className="creators-section">
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading creators...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchCreators} className="btn-retry">
              Try Again
            </button>
          </div>
        ) : creators.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🎭</div>
            <h2>No creators yet!</h2>
            <p>Be the first to add some amazing content creators to the verse!</p>
            <Link to="/add" className="btn-primary">
              Add Your First Creator
            </Link>
          </div>
        ) : (
          <div className="creators-grid">
            {creators.map((creator) => (
              <Card 
                key={creator.id} 
                creator={creator} 
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default ShowCreators;