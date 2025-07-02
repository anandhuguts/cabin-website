"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./Auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction({ request }) {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
export async function updateProfileAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  console.log(session);

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID))
    throw new Error("Please provide a valid national ID");

  const updateData = { nationality, countryFlag, nationalId: nationalID };
  console.log(updateData);

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.id);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}
export async function deleteProfileAction(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const guestBooking = await getBookings(session.user.id);

  const guestBookingids = guestBooking.map((booking) => booking.id);

  if (!guestBookingids.includes(bookingId)) {
    throw new Error("You can only delete your own bookings");
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  if (error) {
    throw new Error("Booking could not be deleted");
  }
  revalidatePath("/account/reservations");
}

export async function editBookingAction(formData) {
  const bookingId = formData.get("bookingid");
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBooking = await getBookings(session.user.id);

  const guestBookingids = guestBooking.map((booking) => String(booking.id));

  if (!guestBookingids.includes(bookingId)) {
    throw new Error("You can only delete your own bookings");
  }

  const updatedFields = {
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  };

  const { data, error } = await supabase
    .from("bookings")
    .update(updatedFields)
    .eq("id", bookingId)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  revalidatePath(`/account/reservations/edit/${bookingId}`);
  revalidatePath(`/account/reservations`);

  redirect(`/account/reservations`);
}
