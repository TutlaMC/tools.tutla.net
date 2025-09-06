import { NextRequest } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name") || "Stuwart";
  const avatar = searchParams.get("avatar") || "https://i.pravatar.cc/40";
  const text = searchParams.get("text") || "is this chat always this dead?";

  const html = `
    <html>
    <head>
      <style>
        body { background:#000; margin:0; padding:20px; font-family:Arial, sans-serif; }
        .message { display:flex; align-items:center; font-size:14px; line-height:18px; color:#fff; }
        .avatar { width:28px; height:28px; border-radius:50%; margin-right:8px; }
        .bubble { background:#262626; padding:10px 14px; border-radius:18px; }
        .name { font-size:12px; font-weight:600; margin-bottom:4px; }
      </style>
    </head>
    <body>
      <div class="message">
        <img src="${avatar}" class="avatar"/>
        <div class="bubble">
          <div class="name">${name}</div>
          <div class="text">${text}</div>
        </div>
      </div>
    </body>
    </html>
  `;

  const browser = await puppeteer.launch({
    headless: "new" as unknown as boolean | "shell" | undefined,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const buffer = await page.screenshot({ type: "png" });
  await browser.close();

  return new Response(buffer, {
    headers: { "Content-Type": "image/png" },
  });
}
