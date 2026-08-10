import { useState } from "react";
import { Link } from "react-router-dom";

function MyBookings() {
  const currentUser = JSON.parse(
    localStorage.getItem("staysphereCurrentUser") ||
      "null"
  );

  const [bookings, setBookings] = useState(() => {
    const allBookings = JSON.parse(
      localStorage.getItem("staysphereBookings") ||
        "[]"
    );

    return allBookings.filter(
      (booking) =>
        booking.userId === currentUser?.id
    );
  });

  const [bookingToCancel, setBookingToCancel] =
    useState(null);

  function openCancelModal(bookingId) {
    setBookingToCancel(bookingId);
  }

  function closeCancelModal() {
    setBookingToCancel(null);
  }

  function confirmCancellation() {
    if (!bookingToCancel || !currentUser) {
      return;
    }

    const allBookings = JSON.parse(
      localStorage.getItem("staysphereBookings") ||
        "[]"
    );

    const updatedAllBookings = allBookings.map(
      (booking) => {
        const isSelectedBooking =
          booking.bookingId === bookingToCancel;

        const belongsToCurrentUser =
          booking.userId === currentUser.id;

        if (
          isSelectedBooking &&
          belongsToCurrentUser
        ) {
          return {
            ...booking,
            status: "Cancelled",
          };
        }

        return booking;
      }
    );

    localStorage.setItem(
      "staysphereBookings",
      JSON.stringify(updatedAllBookings)
    );

    const currentUserBookings =
      updatedAllBookings.filter(
        (booking) =>
          booking.userId === currentUser.id
      );

    setBookings(currentUserBookings);

    closeCancelModal();
  }

  if (bookings.length === 0) {
    return (
      <main className="my-bookings-page">
        <h1>My Bookings</h1>

        <div className="no-bookings">
          <h2>No bookings found</h2>

          <p>
            You have not booked any properties yet.
          </p>

          <Link
            to="/"
            className="explore-properties-button"
          >
            Explore Properties
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="my-bookings-page">
      <h1>My Bookings</h1>

      <section className="bookings-list">
        {bookings.map((booking, index) => (
          <article
            className="booking-card"
            key={booking.bookingId || index}
          >
            <img
              src={booking.property.image}
              alt={booking.property.title}
            />

            <div className="booking-card-content">
              <div className="booking-card-heading">
                <div>
                  <h2>
                    {booking.property.title}
                  </h2>

                  <p>
                    {booking.property.location}
                  </p>
                </div>

                <span
                  className={`booking-status ${
                    booking.status === "Cancelled"
                      ? "cancelled"
                      : ""
                  }`}
                >
                  {booking.status}
                </span>
              </div>

              <hr />

              <p>
                Booking ID:{" "}
                <strong>
                  {booking.bookingId}
                </strong>
              </p>

              <p>
                Check-in:{" "}
                <strong>
                  {booking.checkIn}
                </strong>
              </p>

              <p>
                Check-out:{" "}
                <strong>
                  {booking.checkOut}
                </strong>
              </p>

              <p>
                Guests:{" "}
                <strong>
                  {booking.guests}
                </strong>
              </p>

              <p>
                Duration:{" "}
                <strong>
                  {booking.nights}{" "}
                  {booking.nights === 1
                    ? "night"
                    : "nights"}
                </strong>
              </p>

              <h3>
                Total Paid: ₹
                {booking.totalPrice}
              </h3>

              {booking.status !== "Cancelled" && (
                <button
                  type="button"
                  className="cancel-booking-button"
                  onClick={() =>
                    openCancelModal(
                      booking.bookingId
                    )
                  }
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </article>
        ))}
      </section>

      {bookingToCancel && (
        <div
          className="modal-overlay"
          onClick={closeCancelModal}
        >
          <div
            className="cancel-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <div className="cancel-modal-icon">
              !
            </div>

            <h2>Cancel this booking?</h2>

            <p>
              Are you sure you want to cancel this
              reservation? The booking will remain
              in your history, but its status will
              change to Cancelled.
            </p>

            <div className="cancel-modal-actions">
              <button
                type="button"
                className="keep-booking-button"
                onClick={closeCancelModal}
              >
                Keep Booking
              </button>

              <button
                type="button"
                className="confirm-cancel-button"
                onClick={confirmCancellation}
              >
                Yes, Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default MyBookings