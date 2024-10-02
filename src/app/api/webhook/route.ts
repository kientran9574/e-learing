import { WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req: Request) {
  const svix_id = headers().get("svix-id") ?? "";
  const svix_timestamp = headers().get("svix-timestamp") ?? "";
  const svix_signature = headers().get("svix-signature") ?? "";

  if (!process.env.WEBHOOK_SECRET) {
    throw new Error("Chỗ webhook này bị lỗi");
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);
  const sivx = new Webhook(process.env.WEBHOOK_SECRET);

  let msg: WebhookEvent;

  try {
    msg = sivx.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.log("🚀 ~ POST ~ err:", err);
    return new Response("Bad Request", { status: 400 });
  }

  const eventType = msg.type;
  if (eventType === "user.created") {
    console.log(msg.data);
  }
  // Rest

  return new Response("OK", { status: 200 });
}
