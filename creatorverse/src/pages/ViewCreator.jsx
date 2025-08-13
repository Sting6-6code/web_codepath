import React, {useEffect, useState} from 'react';
import { useParams,Link } from 'react-router-dom';
import { supabase } from '../client';

const ViewCreator = () => {
    const {id} = useParams();
    const [creator, setCreator] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCreator = async () => {
            setLoading(true);
            setError(null);

            const {data, error} = await supabase
            .from('creators')
            .select('*')
            .eq('id', id)
            .single();

            if (error) {
                console.error('Error fetching creator:', error);
            } else {
                setCreator(data);
            }
        };
        fetchCreator();
    }, [id]);

    if (loading) {
        return (
            <div className="view-container">
                <div className="loading">Loading creator...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="view-container">
                <div className="error-message">
                    <p>{error}</p>
                    <Link to="/" className="btn-primary">Back to Home</Link>
                </div>
            </div>
        );
    }

    if (!creator) {
        return (
            <div className="view-container">
                <div className="error-message">
                    <p>Creator not found.</p>
                    <Link to="/" className="btn-primary">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="view-container">
            <Link to="/" className="back-link">← Back to Home</Link>
            
            <div className="creator-header">
                <h1>{creator.name}</h1>
                {creator.imageURL && (
                    <img 
                        src={creator.imageURL} 
                        alt={creator.name} 
                        className="creator-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                        }}
                    />
                )}
            </div>
            
            <div className="creator-description">
                <p>{creator.description}</p>
            </div>
            
            <div className="creator-actions">
                {creator.url && (
                    <a 
                        href={creator.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-visit"
                    >
                        🔗 Visit Their Channel
                    </a>
                )}
                
                <Link to={`/edit/${creator.id}`} className="btn btn-edit">
                    ✏️ Edit Creator
                </Link>
                
                <Link to="/" className="btn btn-view">
                    🏠 Back to All Creators
                </Link>
            </div>
        </div>
    );
};

export default ViewCreator;