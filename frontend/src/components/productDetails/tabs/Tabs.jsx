import React, { useState } from "react";
import "./Tabs.css";
import Reviews from "../../reviews/Reviews";
const Tabs = ({singleProduct, setSingleProduct}) => {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            href="#"
            className="tab-button "
            onClick={(e) => handleTabClick(e, "desc")}
          >
            Description
          </a>
        </li>
        <li>
          <a
            href="#"
            className="tab-button"
            onClick={(e) => handleTabClick(e, "info")}
          >
            Additional information
          </a>
        </li>
        <li>
          <a
            href="#"
            className="tab-button"
            onClick={(e) => handleTabClick(e, "reviews")}
          >
            Reviews
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className="product-description" 
          dangerouslySetInnerHTML={{ __html: singleProduct.description }}
        ></div>
        <div
          className={`tab-panel-information ${
            activeTab === "info" ? "active" : ""
          } content`}
          id="info"
        >
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Color</th>
                <td>
                  <p>
                    Apple Red, Bio Blue, Sweet Orange, Blue, Green, Pink, Black,
                    White
                  </p>
                </td>
              </tr>
              <tr>
                <th>Size</th>
                <td>
                  <p>{singleProduct.sizes.map((item,i)=>(
                    <span key={i}>{item.toUpperCase()}
                    
                    {i < singleProduct.sizes.length - 1 && ","}
                                         </span>
                  ))}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="tab-panel-reviews content" id="reviews">
          <h3>2 reviews for Basic Colored Sweatpants With Elastic Hems</h3>
          <div className="comments">
            <ol className="comment-list">
              <li className="comment-item">
                <div className="comment-avatar">
                  <img src="/imgimg/avatars/avatar1.jpg" alt="" />
                </div>
                <div className="comment-text">
                  <ul className="comment-star">
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                  </ul>
                  <div className="comment-meta">
                    <strong>admin</strong>
                    <span>-</span>
                    <time>April 23, 2022</time>
                  </div>
                  <div className="comment-description">
                    <p>
                      Sed perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium.
                    </p>
                  </div>
                </div>
              </li>
              <li className="comment-item">
                <div className="comment-avatar">
                  <img src="/imgimg/avatars/avatar1.jpg" alt="" />
                </div>
                <div className="comment-text">
                  <ul className="comment-star">
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                    <li>
                      <i className="bi bi-star-fill"></i>
                    </li>
                  </ul>
                  <div className="comment-meta">
                    <strong>admin</strong>
                    <span>-</span>
                    <time>April 23, 2022</time>
                  </div>
                  <div className="comment-description">
                    <p>
                      Sed perspiciatis unde omnis iste natus error sit
                      voluptatem accusantium doloremque laudantium.
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
      <Reviews
        active={activeTab === "reviews" ? "content active" : "content"}
        singleProduct={singleProduct} setSingleProduct={setSingleProduct}
      />
    </div>
  );
};

export default Tabs;
