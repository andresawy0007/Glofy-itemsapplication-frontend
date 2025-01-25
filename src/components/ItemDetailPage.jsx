import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemController from "../controllers/ItemController";
import { Link } from 'react-router-dom';

const ItemDetailPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const data = await ItemController.getItemById(id);
        setItem(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  return (
    <div className="single-item">
      {loading ? (
        <p>Loading...</p>
      ) : item ? (
        <div>
          <img
            src={item.avatar}
            alt={item.first_name}
          />
          <h1>{item.first_name} {item.last_name}</h1>
          <p>E-mail: {item.email}</p>
          <br />
          <div className="card-actions">
              <Link to={`/items`}>
                  <button className="btn">Go back to user list</button>
              </Link>
              <Link to={`/item/${id}/video-record`}>
                  <button className="btn primary-btn">Record a video</button>
              </Link>
          </div>
        </div>
      ) : (
        <p>Item not found</p>
      )}
    </div>
  );
};

export default ItemDetailPage;