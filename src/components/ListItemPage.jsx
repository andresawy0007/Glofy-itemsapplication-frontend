import React, { useEffect, useState } from "react";
import ItemController from "../controllers/ItemController";
import { Link } from 'react-router-dom';


const ListItemPage = () => {

    const localPage = localStorage.getItem('page') ? parseInt(localStorage.getItem('page')) : 1;
    const [items, setItems] = useState([{id: 1, email: "george.bluth@reqres.in", first_name: "George", last_name: "Bluth", avatar: "https://reqres.in/img/faces/1-image.jpg"}]);
    const [page, setPage] = useState(localPage);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false)
  

    useEffect(() => {
        
        fetchUsers(page)
    }, [page]);

    const fetchUsers = (page) => {
        const fetchItems = async () => {
            setLoading(true);
            try {
                const data = await ItemController.getItems(page);
                setTotalPages(data.total_pages);
                setItems(data.users);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }

    const handlePageChange = (newPage) => {
        setPage(newPage);
        fetchUsers(newPage)
    };

    return (
        <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Users</h1>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <div>
            {items.map((item) => (
                    <div className="card" key={item.id}>
                    <img src={item.avatar} alt={item.first_name} className="card-image" />
                    <div className="card-details">
                    <h3>{item.first_name} {item.last_name}</h3>
                    <p>E-mail: {item.email}</p>
                    <div className="card-actions">
                        <Link to={`/item/${item.id}`}>
                            <button className="btn primary-btn">View user</button>
                        </Link>
                    </div>
                    </div>
                </div>
            ))}
            </div>
        )}

        {/* Pagination Controls */}
        <div className="pagination">
                <button
                disabled={page === 1}
                onClick={() => handlePageChange(page - 1)}
                >
                Previous
                </button>
                <span>
                Page {page} of {totalPages}
                </span>
                <button
                disabled={page === totalPages}
                onClick={() => handlePageChange(page + 1)}
                >
                Next
                </button>
            </div>
        </div>
    );
};

export default ListItemPage;