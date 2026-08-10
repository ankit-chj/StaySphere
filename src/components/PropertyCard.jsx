import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useState } from "react";
import "./PropertyCard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";

function PropertyCard({ property, onFavouriteChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const currentUser = JSON.parse(
    localStorage.getItem("staysphereCurrentUser") ||
      "null"
  );

  const [isFavourite, setIsFavourite] =
    useState(() => {
      if (!currentUser) {
        return false;
      }

      const savedFavourites = JSON.parse(
        localStorage.getItem(
          "staysphereFavourites"
        ) || "[]"
      );

      return savedFavourites.some(
        (favourite) =>
          favourite.userId === currentUser.id &&
          favourite.propertyId === property.id
      );
    });

  function handleFavouriteClick(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!currentUser) {
      navigate("/login", {
        state: {
          from: location.pathname,
        },
      });

      return;
    }

    const savedFavourites = JSON.parse(
      localStorage.getItem(
        "staysphereFavourites"
      ) || "[]"
    );

    const favouriteAlreadyExists =
      savedFavourites.some(
        (favourite) =>
          favourite.userId === currentUser.id &&
          favourite.propertyId === property.id
      );

    let updatedFavourites;

    if (favouriteAlreadyExists) {
      updatedFavourites =
        savedFavourites.filter(
          (favourite) =>
            !(
              favourite.userId ===
                currentUser.id &&
              favourite.propertyId ===
                property.id
            )
        );
    } else {
      const newFavourite = {
        userId: currentUser.id,
        propertyId: property.id,
        savedAt: new Date().toISOString(),
      };

      updatedFavourites = [
        ...savedFavourites,
        newFavourite,
      ];
    }

    localStorage.setItem(
      "staysphereFavourites",
      JSON.stringify(updatedFavourites)
    );

    setIsFavourite(!favouriteAlreadyExists);
    if (onFavouriteChange) {
      onFavouriteChange(property.id, !favouriteAlreadyExists);
    }
  }

  return (
    <article className="property-card">
      <button
        type="button"
        className={`favourite-button ${
          isFavourite ? "active" : ""
        }`}
        onClick={handleFavouriteClick}
        aria-label={
          isFavourite
            ? `Remove ${property.title} from favourites`
            : `Add ${property.title} to favourites`
        }
        aria-pressed={isFavourite}
      >
        {isFavourite ? <FaHeart /> : <FaRegHeart />}
      </button>

      <Link
        to={`/property/${property.id}`}
        className="property-link"
      >
        <div className="property-image-wrapper">
          <img
            className="property-image"
            src={property.image}
            alt={property.title}
          />

          <span className="property-rating-badge">
            ★ {property.rating}
          </span>
        </div>

        <div className="property-info">
          <div className="property-heading-row">
            <h2>{property.title}</h2>

            <span className="property-location">
              {property.location}
            </span>
          </div>

          <p className="property-features-text">
            {property.bedrooms}{" "}
            {property.bedrooms === 1
              ? "bedroom"
              : "bedrooms"}
            {" · "}
            Up to {property.guests} guests
          </p>

          <p className="property-price">
            ₹{property.price}
            <span> per night</span>
          </p>
        </div>
      </Link>
    </article>
  );
}

export default PropertyCard;