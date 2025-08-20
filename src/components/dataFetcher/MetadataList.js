import React, { useEffect, useState } from "react";
import './MetadataList.css';
import axios from "axios";
import { API_URL } from "utils/api/Enviroment";

function MetadataList() {
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await axios.get(`${API_URL}/all`);
        console.log("API Response:", res.data);
        setMetadata(res.data.data);
        
       
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };
    fetchMetadata();
  }, []);

  return (
    <>
    

      <div className="metadata-list-container">
        <div className="metadata-list-wrapper">
          {/* Header */}
          <div className="metadata-header">
            <div className="metadata-header-content">
              <div className="metadata-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <div>
                <h2 className="metadata-title">Metadata List</h2>
                <p className="metadata-subtitle">Your digital asset collection</p>
              </div>
            </div>
          </div>

          {metadata.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="empty-state-title">No data found.</p>
              <p className="empty-state-message">Your collection will appear here once loaded</p>
            </div>
          ) : (
            <div className="metadata-grid">
              {metadata.map((item) => (
                <div key={item._id} className="metadata-card">
                  {/* Image */}
                  <div className="metadata-image-container">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="metadata-image"
                    />
                    <div className="metadata-price-overlay">
                      <span className="metadata-price-text">{item.price}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="metadata-content">
                    <h3 className="metadata-name">{item.name}</h3>
                    <p className="metadata-description">{item.description}</p>
                    
                    {/* Price Section */}
                    <div className="price-section">
                      <svg className="price-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                      <span className="price-label">Price:</span>
                      <span className="price-value">{item.price}</span>
                    </div>

                    {/* Attributes */}
                    <div className="attributes-section">
                      <div className="attributes-header">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                        </svg>
                        <h4 className="attributes-title">Attributes</h4>
                      </div>
                      <div className="attributes-list">
                        {item.attributes.map((attr) => (
                          <div key={attr._id} className="attribute-tag">
                            <span className="attribute-trait">{attr.trait_type}:</span>
                            <span className="attribute-value">{attr.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Created Date */}
                    <div className="created-date">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>Created: {new Date(item.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MetadataList;