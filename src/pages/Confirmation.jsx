import { FaCheckCircle } from "react-icons/fa";
import {
  Link,
  useLocation,
} from "react-router-dom";

function Confirmation() {
  const location = useLocation();

  const booking = location.state;

  if (!booking) {
    return (
      <main className="confirmation-page">
        <h1>Confirmation not found</h1>

        <p>
          Please complete a booking before visiting this
          page.
        </p>

        <Link
          to="/"
          className="confirmation-home-button"
        >
          Return to Home
        </Link>
      </main>
    );
  }

  const {
    property,
    checkIn,
    checkOut,
    guests,
    nights,
    totalPrice,
    bookingId,
    status,
  } = booking;

  return (
    <main className="confirmation-page">
      <FaCheckCircle
        style={{ fontSize: "4rem", color: "green" }}
      />

      <h1 style={{ marginBottom: "2rem" }}>Booking Confirmed!</h1>

      <p className="confirmation-message">
        Your reservation has been successfully completed.
      </p>

      <section className="confirmation-card">
        <img
          src={property.image}
          alt={property.title}
        />

        <div className="confirmation-details">
          <h2>{property.title}</h2>

          <p>{property.location}</p>

          <hr />

          <p>
            Booking ID:
            <strong> {bookingId}</strong>
          </p>

          <p>
            Status:
            <strong> {status}</strong>
          </p>

          <p>
            Check-in:
            <strong> {checkIn}</strong>
          </p>

          <p>
            Check-out:
            <strong> {checkOut}</strong>
          </p>

          <p>
            Guests:
            <strong> {guests}</strong>
          </p>

          <p>
            Duration:
            <strong>
              {" "}
              {nights}{" "}
              {nights === 1 ? "night" : "nights"}
            </strong>
          </p>

          <h3>Total Paid: ₹{totalPrice}</h3>
        </div>
      </section>

      <div className="confirmation-actions">
        <Link
          to="/"
          className="confirmation-home-button"
        >
          Explore More Properties
        </Link>

        <Link
          to="/my-bookings"
          className="my-bookings-button"
        >
          View My Bookings
        </Link>
      </div>
    </main>
  );
}

export default Confirmation;