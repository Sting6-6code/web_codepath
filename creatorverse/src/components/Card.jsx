import React from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../client';

const Card = ({ creator, onDelete }) => {
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${creator.name}? This action cannot be undone.`)) {
      try {
        const { error } = await supabase
          .from('creators')
          .delete()
          .eq('id', creator.id);
        
        if (error) {
          console.error('Error deleting creator:', error);
          alert('Error deleting creator!');
        } else {
          alert('Creator deleted successfully!');
          // 如果有回调函数，调用它来更新父组件状态
          if (onDelete) {
            onDelete(creator.id);
          } else {
            // 如果没有回调函数，刷新页面
            window.location.reload();
          }
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      }
    }
  };

  return (
    <div className="creator-card">
      <div className="card-image">
        {creator.imageURL ? (
          <img 
            src={creator.imageURL} 
            alt={creator.name}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="placeholder-image">
            <span>📸</span>
          </div>
        )}
      </div>
      
      <div className="card-content">
        <h3 className="creator-name">{creator.name}</h3>
        <p className="creator-description">{creator.description}</p>
        
        <div className="card-actions">
          <a 
            href={creator.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-visit"
          >
            Visit Channel
          </a>
          
          <div className="action-buttons">
            <Link to={`/creator/${creator.id}`} className="btn btn-view">
              View
            </Link>
            <Link to={`/edit/${creator.id}`} className="btn btn-edit">
              Edit
            </Link>
            <button 
              onClick={handleDelete}
              className="btn btn-delete"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;