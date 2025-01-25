import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div className="single-item">
        <h1>App actions</h1>
        <p>Please, select the action you whant to see:</p>
     
        <div>
            <Link to={`/items`}>
                <button className="btn primary-btn">See users list</button>
            </Link>
        </div>
    </div>
  );
};

export default IndexPage;