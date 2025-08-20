import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "utils/api/Enviroment";

function MetadataList() {
  const [metadata, setMetadata] = useState([]);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const res = await axios.get(`${API_URL}/all`);
        console.log("API Response:", res.data);

        // save the array into state
        setMetadata(res.data.data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    };

    fetchMetadata();
  }, []);

  return (
    <div>
      <h2>Metadata List</h2>

      {metadata.length === 0 ? (
        <p>No data found.</p>
      ) : (
        metadata.map((item) => (
          <div key={item._id} style={{ border: "1px solid #ccc", margin: 10, padding: 10 }}>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p><b>Price:</b> {item.price}</p>
            <img src={item.image} alt={item.name} width="200" />

            <h4>Attributes:</h4>
            <ul>
              {item.attributes.map((attr) => (
                <li key={attr._id}>
                  {attr.trait_type}: {attr.value}
                </li>
              ))}
            </ul>

            <small>Created At: {new Date(item.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default MetadataList;
