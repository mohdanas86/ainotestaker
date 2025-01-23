// import Razorpay from "razorpay";
// import { NextResponse } from "next/server";

// export function GET() {
//   return NextResponse.json("hello");
// }

// const razorpay = new Razorpay({
//   key_id:
//     process.env.NEXT_PUBLIC_RAZOR_CLIENT_ID || process.env.RAZOR_CLIENT_ID,
//   key_secret:
//     process.env.NEXT_PUBLIC_RAZOR_CLIENT_SECRET ||
//     process.env.NEXT_PUBLIC_RAZOR_CLIENT_SECRET,
// });

// export async function POST(req) {
//   try {
//     const createOrder = await razorpay.orders.create({
//       amount: (await req.amount) * 100,
//       currency: "INR",
//       receipt: "receipt_" + Math.random().toString(36).substring(7),
//     });

//     return NextResponse.json({ status: 200 }, { orderId: createOrder.id });
//   } catch (error) {
//     return NextResponse.json(
//       { status: 500 },
//       { error: "failed to create order" }
//     );
//   }
// }

// Server-Side Code for Razorpay
import Razorpay from "razorpay";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id:
    process.env.NEXT_PUBLIC_RAZOR_CLIENT_ID || process.env.RAZOR_CLIENT_ID,
  key_secret:
    process.env.NEXT_PUBLIC_RAZOR_CLIENT_SECRET ||
    process.env.RAZOR_CLIENT_SECRET,
});

export async function POST(req) {
  try {
    const { amount } = await req.json();

    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ status: 400, error: "Invalid amount." });
    }

    const createOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });

    return NextResponse.json({ orderId: createOrder });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json({ status: 500, error: "Failed to create order." });
  }
}
