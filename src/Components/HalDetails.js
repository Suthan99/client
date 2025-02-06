import "./CourseStyles.css";
import { useNavigate } from "react-router-dom";
import DownloadButton from "./core/dowloadbtn";

function HalDetailsCard({ alldata, image, redirectPage, onAddToCart }) {
  const { name, description, category, stock, price } = alldata;
  // "name": "Wireless Headphones",
  // 		"description": "Noise-cancelling over-ear headphones with Bluetooth connectivity.",
  // 		"price": 99.99,
  // 		"stock": 50,
  // 		"category": "Audio",
  // 		"image": "https://example.com/headphones.jpg"
  return (
    <div className="t-card">
      <div className="t-image" onClick={redirectPage}>
        <img src={image} alt={name} />
      </div>
      <h4>{name}</h4>
      <p>{description}</p>
      <p><span>Category:</span> {category}</p>
      <p><span>Stock:</span> {stock}</p>
      <p><span>Price:</span> ${price.toFixed(2)}</p>

      <div className="t-card-footer">
        <button className="add-to-cart-btn" onClick={() => onAddToCart(alldata)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default HalDetailsCard;
