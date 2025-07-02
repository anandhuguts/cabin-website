"use client";

import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { deleteProfileAction } from "../_lib/action";

function ReservationList({ bookings }) {
  const [optimitsticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter((booking) => booking.id !== bookingId);
    }
  );
  async function handleDelete(bookingId) {
    optimisticDelete(bookingId);
    await deleteProfileAction(bookingId);
  }
  return (
    <ul className="space-y-6">
      {optimitsticBookings.map((booking) => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  );
}

export default ReservationList;
