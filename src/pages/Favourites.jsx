import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../services/api";

import "./Favourites.css";


function Favourites() {
  const currentUser = JSON.parse(
    localStorage.getItem(
      "staysphereCurrentUser"
    ) || "null"
  );


  const [
    favouriteProperties,
    setFavouriteProperties,
  ] = useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState("");


  useEffect(() => {
    async function loadFavouriteProperties() {
      try {
        setIsLoading(true);
        setLoadError("");


        const allProperties =
          await getProperties();


        const savedFavourites = JSON.parse(
          localStorage.getItem(
            "staysphereFavourites"
          ) || "[]"
        );


        const currentUserFavouriteIds =
          savedFavourites
            .filter(
              (favourite) =>
                favourite.userId ===
                currentUser?.id
            )
            .map(
              (favourite) =>
                favourite.propertyId
            );


        const matchingProperties =
          allProperties.filter(
            (property) =>
              currentUserFavouriteIds.includes(
                property.id
              )
          );


        setFavouriteProperties(
          matchingProperties
        );
      } catch (error) {
        console.error(
          "Failed to load favourite properties:",
          error
        );

        setLoadError(
          "Your favourite properties could not be loaded."
        );
      } finally {
        setIsLoading(false);
      }
    }


    loadFavouriteProperties();
  }, [currentUser?.id]);


  function handleFavouriteChange(
    propertyId,
    isFavourite
  ) {
    if (!isFavourite) {
      setFavouriteProperties(
        (currentProperties) =>
          currentProperties.filter(
            (property) =>
              property.id !== propertyId
          )
      );
    }
  }


  if (isLoading) {
    return (
      <main className="favourites-page">
        <section className="favourites-empty">
          <h1>Loading favourites...</h1>

          <p>
            StaySphere is retrieving your saved
            properties.
          </p>
        </section>
      </main>
    );
  }


  if (loadError) {
    return (
      <main className="favourites-page">
        <section className="favourites-empty">
          <h1>Unable to load favourites</h1>

          <p>{loadError}</p>

          <Link
            to="/"
            className="explore-favourites-button"
          >
            Return Home
          </Link>
        </section>
      </main>
    );
  }


  if (favouriteProperties.length === 0) {
    return (
      <main className="favourites-page">
        <section className="favourites-empty">
          <div className="empty-heart">
            ♡
          </div>

          <h1>No favourites yet</h1>

          <p>
            Save properties you love, and they
            will appear here for easy access.
          </p>

          <Link
            to="/"
            className="explore-favourites-button"
          >
            Explore Properties
          </Link>
        </section>
      </main>
    );
  }


  return (
    <main className="favourites-page">
      <section className="favourites-heading">
        <div>
          <p>YOUR SAVED STAYS</p>

          <h1>My Favourites</h1>
        </div>

        <span>
          {favouriteProperties.length}{" "}
          {favouriteProperties.length === 1
            ? "property"
            : "properties"}
        </span>
      </section>


      <section className="property-grid">
        {favouriteProperties.map(
          (property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onFavouriteChange={
                handleFavouriteChange
              }
            />
          )
        )}
      </section>
    </main>
  );
}


export default Favourites;