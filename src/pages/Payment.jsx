import {
  useLocation,
  useNavigate,
} from "react-router-dom";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const booking = location.state;

  if (!booking) {
    return (
      <main className="payment-page">
        <h1>Booking information not found</h1>

        <p>
          Please choose a property and complete the booking
          form again.
        </p>

        <button onClick={() => navigate("/")}>
          Return to Home
        </button>
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
  } = booking;

  function handlePayment() {
  const currentUser = JSON.parse(
    localStorage.getItem("staysphereCurrentUser") ||
      "null"
  );

  if (!currentUser) {
    navigate("/login");
    return;
  }

  const confirmedBooking = {
    ...booking,

    bookingId: `SS-${Date.now()}`,
    status: "Confirmed",
    bookedAt: new Date().toISOString(),

    userId: currentUser.id,
    userEmail: currentUser.email,
    userName: currentUser.fullName,
  };

  const existingBookings = JSON.parse(
    localStorage.getItem("staysphereBookings") ||
      "[]"
  );

  const updatedBookings = [
    ...existingBookings,
    confirmedBooking,
  ];

  localStorage.setItem(
    "staysphereBookings",
    JSON.stringify(updatedBookings)
  );

  navigate("/confirmation", {
    state: confirmedBooking,
  });
}

  return (
    <main className="payment-page">
      <h1>Payment Summary</h1>

      <section className="payment-summary">
        <img
          src={property.image}
          alt={property.title}
        />

        <div>
          <h2>{property.title}</h2>

          <p>{property.location}</p>

          <p>
            Check-in: <strong>{checkIn}</strong>
          </p>

          <p>
            Check-out: <strong>{checkOut}</strong>
          </p>

          <p>
            Guests: <strong>{guests}</strong>
          </p>

          <p>
            Duration:{" "}
            <strong>
              {nights}{" "}
              {nights === 1 ? "night" : "nights"}
            </strong>
          </p>

          <h2>Total: ₹{totalPrice}</h2>

          <button
            type="button"
            onClick={handlePayment}
          >
            Confirm and Pay
          </button>
        </div>
      </section>
    </main>
  );
}

export default Payment;