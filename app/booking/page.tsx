'use client'; 
export const dynamic = "force-dynamic";
import BookingComponent from "./BookingComponent";
import { Suspense } from "react";



export default function Booking() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingComponent />
    </Suspense>
  )
}