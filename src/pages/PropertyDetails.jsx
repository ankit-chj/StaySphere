import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import {
  getPropertyById,
} from "../services/api";
import { FaStar } from "react-icons/fa";


function PropertyDetails() {
  const { id } = useParams();

  const [property, setProperty] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState("");


  useEffect(() => {
    async function loadProperty() {
      try {
        setIsLoading(true);
        setLoadError("");

        const propertyData =
          await getPropertyById(id);

        setProperty(propertyData);
      } catch (error) {
        console.error(
          "Failed to load property:",
          error
        );

        setLoadError(
          "This property could not be loaded."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProperty();
  }, [id]);


  if (isLoading) {
    return (
      <main className="property-details-page">
        <h1>Loading property...</h1>

        <p>
          StaySphere is retrieving the property
          details from the backend.
        </p>
      </main>
    );
  }


  if (loadError || !property) {
    return (
      <main className="property-details-page">
        <h1>Property not found</h1>

        <p>
          {loadError ||
            "The requested property does not exist."}
        </p>

        <Link
          to="/"
          className="back-home-button"
        >
          Return to Home
        </Link>
      </main>
    );
  }


  return (
    <main className="property-details-page">
      <section className="property-details-container">
        <img
          className="property-details-image"
          src={property.image}
          alt={property.title}
        />

        <div className="property-details-content">
          <p className="property-location">
            {property.location}
          </p>

          <h1>{property.title}</h1>

          <p className="property-rating">
            <FaStar fontSize={14}/> {property.rating} rating
          </p>

          <div className="property-features">
            <span>
              {property.bedrooms}{" "}
              {property.bedrooms === 1
                ? "bedroom"
                : "bedrooms"}
            </span>

            <span>•</span>

            <span>
              Up to {property.guests} guests
            </span>
          </div>

          <p className="property-description">
            Enjoy a comfortable and relaxing stay
            at {property.title} in{" "}
            {property.location}. This property is
            ideal for travellers looking for
            comfort, privacy and a memorable
            experience.
          </p>

          <div className="property-booking-box">
            <p>
              <strong>
                ₹{property.price}
              </strong>{" "}
              per night
            </p>

            <Link
              to={`/booking/${property.id}`}
              className="book-now-button"
            >
              Book Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PropertyDetails;