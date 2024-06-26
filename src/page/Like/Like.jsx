import React,{useEffect} from "react";
import "./Like.css";
import { useDispatch, useSelector } from "react-redux";
import { toogleLike } from "../../context/wishlistSlice";
import { addToCart } from "../../context/cartSlice";
import { FaHeart, FaStar } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import empty from '../../assets/imgs/image copy.png'

const Like = () => {
  const dispatch = useDispatch();
  let like = useSelector((state) => state.wishslice.value);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [window.scrollY]);

  let likes = like?.map((el) => (
    <div className="product_card" key={el.id}>
      <div className="product_img">
      <img src={el.image} alt="" /> 
        <div className="icons_product">
          <button onClick={() => dispatch(toogleLike(el))}>
          {like.some((item) => item.id === el.id) ? (
            <FaHeart style={{ color: "red" }} />
          ) : (
            <CiHeart />
          )}  
          </button>
          <button onClick={() => dispatch(addToCart(el))}>
            <IoCartOutline />
          </button>
        </div>
      </div>
      <NavLink to={`/product/${el.id}`}>
      <div className="product_info">
        <h2 title={el.title}>{el.title}</h2>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={i < el.rating.rate ? "star" : "star-o"}
            />
          ))}
        </div>
        <div className="price_product">
          <p>${el.price}</p>
          <span>$ 150.00</span>
          <b>24% Off </b>
        </div>
      </div>
      </NavLink>
    </div>
  ));

  return (
    <>
      <div className="container">
        <h1 style={{ textAlign: "center",margin:'20px' }}>Wishlist</h1>
      <div className="product_wrapper wrapper_like">{likes.length > 0 ? likes : <div className="empty"> <img src={empty} alt="" /> </div> }</div>
      </div>
    </>
  );
};

export default Like;
