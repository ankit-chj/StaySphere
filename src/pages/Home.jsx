import {
  useEffect,
  useState,
} from "react";

import PropertyCard from "../components/PropertyCard";
import { getProperties } from "../services/api";


function Home() {
  const [properties, setProperties] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState("");

  const [searchText, setSearchText] =
    useState("");

  const [guestCount, setGuestCount] =
    useState("0");

  const [maxPrice, setMaxPrice] =
    useState("10000");

  const [minimumRating, setMinimumRating] =
    useState("0");


  useEffect(() => {
    async function loadProperties() {
      try {
        setIsLoading(true);
        setLoadError("");

        const propertyData =
          await getProperties();

        setProperties(propertyData);
      } catch (error) {
        console.error(
          "Failed to load properties:",
          error
        );

        setLoadError(
          "The properties could not be loaded. Make sure the backend is running."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProperties();
  }, []);


  const filteredProperties =
    properties.filter((property) => {
      const searchValue = searchText
        .trim()
        .toLowerCase();

      const matchesSearch =
        property.location
          .toLowerCase()
          .includes(searchValue) ||
        property.title
          .toLowerCase()
          .includes(searchValue);

      const matchesGuests =
        guestCount === "0" ||
        property.guests >= Number(guestCount);

      const matchesPrice =
        property.price <= Number(maxPrice);

      const matchesRating =
        property.rating >=
        Number(minimumRating);

      return (
        matchesSearch &&
        matchesGuests &&
        matchesPrice &&
        matchesRating
      );
    });


  function clearFilters() {
    setSearchText("");
    setGuestCount("0");
    setMaxPrice("10000");
    setMinimumRating("0");
  }


  return (
    <main className="main-content">
      <section className="hero">
        <p className="hero-label">
          Discover your next escape
        </p>

        <h1>Find Your Perfect Stay</h1>

        <p className="hero-description">
          Explore memorable homes, cabins, villas
          and apartments across India.
        </p>

        <div className="search-panel">
          <div className="filter-group search-field">
            <label htmlFor="destination">
              Destination
            </label>

            <input
              type="text"
              id="destination"
              placeholder="Try Goa, Manali or Mumbai"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
            />
          </div>

          <div className="filter-group">
            <label htmlFor="guestCount">
              Guests
            </label>

            <select
              id="guestCount"
              value={guestCount}
              onChange={(event) =>
                setGuestCount(event.target.value)
              }
            >
              <option value="0">
                Any guests
              </option>

              <option value="1">
                1 guest
              </option>

              <option value="2">
                2 guests
              </option>

              <option value="3">
                3 guests
              </option>

              <option value="4">
                4 guests
              </option>

              <option value="5">
                5 guests
              </option>

              <option value="6">
                6 guests
              </option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="maxPrice">
              Maximum price
            </label>

            <select
              id="maxPrice"
              value={maxPrice}
              onChange={(event) =>
                setMaxPrice(event.target.value)
              }
            >
              <option value="10000">
                Any price
              </option>

              <option value="3000">
                Up to ₹3,000
              </option>

              <option value="4000">
                Up to ₹4,000
              </option>

              <option value="5000">
                Up to ₹5,000
              </option>

              <option value="6000">
                Up to ₹6,000
              </option>

              <option value="7500">
                Up to ₹7,500
              </option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="minimumRating">
              Rating
            </label>

            <select
              id="minimumRating"
              value={minimumRating}
              onChange={(event) =>
                setMinimumRating(
                  event.target.value
                )
              }
            >
              <option value="0">
                Any rating
              </option>

              <option value="4.5">
                4.5 and above
              </option>

              <option value="4.7">
                4.7 and above
              </option>

              <option value="4.8">
                4.8 and above
              </option>

              <option value="4.9">
                4.9 only
              </option>
            </select>
          </div>

          <button
            type="button"
            className="clear-filters-button"
            onClick={clearFilters}
          >
            Clear
          </button>
        </div>
      </section>

      <section className="properties-section">
        {isLoading ? (
          <div className="no-results">
            <h2>Loading stays...</h2>

            <p>
              StaySphere is retrieving properties
              from the backend.
            </p>
          </div>
        ) : loadError ? (
          <div className="no-results">
            <h2>Unable to load stays</h2>

            <p>{loadError}</p>
          </div>
        ) : (
          <>
            <div className="results-heading">
              <div>
                <p className="results-label">
                  Available stays
                </p>

                <h2>
                  {filteredProperties.length}{" "}
                  {filteredProperties.length === 1
                    ? "property"
                    : "properties"}{" "}
                  found
                </h2>
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <section className="property-grid">
                {filteredProperties.map(
                  (property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                    />
                  )
                )}
              </section>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">
                  ⌕
                </div>

                <h2>
                  No matching stays found
                </h2>

                <p>
                  Try changing the destination,
                  guest count, price or rating.
                </p>

                <button
                  type="button"
                  onClick={clearFilters}
                >
                  Clear all filters
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default Home;