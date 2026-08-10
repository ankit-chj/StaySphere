import {
  useEffect,
  useState,
} from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPropertyById,
} from "../services/api";


function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [loadError, setLoadError] =
    useState("");

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [guests, setGuests] =
    useState("1");

  const [error, setError] =
    useState("");


  useEffect(() => {
    async function loadProperty() {
      try {
        setIsLoading(true);
        setLoadError("");

        const propertyData =
          await getPropertyById(id);

        setProperty(propertyData);
      } catch (requestError) {
        console.error(
          "Failed to load booking property:",
          requestError
        );

        setLoadError(
          "The property could not be loaded."
        );
      } finally {
        setIsLoading(false);
      }
    }

    loadProperty();
  }, [id]);


  function calculateNights() {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const checkInDate =
      new Date(checkIn);

    const checkOutDate =
      new Date(checkOut);

    const differenceInMilliseconds =
      checkOutDate - checkInDate;

    const millisecondsInOneDay =
      1000 * 60 * 60 * 24;

    return Math.ceil(
      differenceInMilliseconds /
        millisecondsInOneDay
    );
  }


  const nights = calculateNights();

  const totalPrice =
    property && nights > 0
      ? nights * property.price
      : 0;


  function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!checkIn || !checkOut) {
      setError(
        "Please select both check-in and check-out dates."
      );

      return;
    }

    if (nights <= 0) {
      setError(
        "Check-out must be after the check-in date."
      );

      return;
    }

    const numberOfGuests =
      Number(guests);

    if (
      numberOfGuests < 1 ||
      numberOfGuests > property.guests
    ) {
      setError(
        `This property allows between 1 and ${property.guests} guests.`
      );

      return;
    }

    navigate(`/payment/${property.id}`, {
      state: {
        property,
        checkIn,
        checkOut,
        guests: numberOfGuests,
        nights,
        totalPrice,
      },
    });
  }


  if (isLoading) {
    return (
      <main className="booking-page">
        <h1>Loading booking details...</h1>

        <p>
          StaySphere is retrieving the property
          from the backend.
        </p>
      </main>
    );
  }


  if (loadError || !property) {
    return (
      <main className="booking-page">
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
    <main className="booking-page">
      <section className="booking-property">
        <img
          src={property.image}
          alt={property.title}
        />

        <div>
          <h1>
            Book {property.title}
          </h1>

          <p>{property.location}</p>

          <p>
            ₹{property.price} per night
          </p>
        </div>
      </section>

      <form
        className="booking-form"
        onSubmit={handleSubmit}
      >
        <h2>Enter Booking Details</h2>

        <label htmlFor="checkIn">
          Check-In Date
        </label>

        <input
          type="date"
          id="checkIn"
          value={checkIn}
          onChange={(event) =>
            setCheckIn(event.target.value)
          }
        />

        <label htmlFor="checkOut">
          Check-Out Date
        </label>

        <input
          type="date"
          id="checkOut"
          value={checkOut}
          min={checkIn || undefined}
          onChange={(event) =>
            setCheckOut(event.target.value)
          }
        />

        <label htmlFor="guests">
          Number of Guests
        </label>

        <input
          type="number"
          id="guests"
          min="1"
          max={property.guests}
          value={guests}
          onChange={(event) =>
            setGuests(event.target.value)
          }
        />

        {nights > 0 && (
          <div className="booking-summary">
            <p>
              {nights}{" "}
              {nights === 1
                ? "night"
                : "nights"}{" "}
              × ₹{property.price}
            </p>

            <strong>
              Total: ₹{totalPrice}
            </strong>
          </div>
        )}

        {error && (
          <p className="booking-error">
            {error}
          </p>
        )}

        <button type="submit">
          Continue to Payment
        </button>
      </form>
    </main>
  );
}


export default Booking;