import { useDispatch, useSelector } from "react-redux";
import "./commonComponent.css";
import { toggleFavorite } from "../redux/favoritesSlice";

export const CardHorizontal = ({ data , onClick}) => {
    const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.items);

  const isFavorite = favorites.some((item) => item.id === data.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation(); 
    dispatch(toggleFavorite(data));
  };
  return (
    <div className="card-horizontal" onClick={onClick}>
      <img src={data?.image} alt="img" />
      <p>₹ {data?.price}</p>
      <h4>{data?.title}</h4>
      <button
          className={`favorite-btn`}
          onClick={handleFavoriteClick}
        >
          Add to favorite{isFavorite ? "❤️" : "🤍"}
        </button>
    </div>
  );
};
