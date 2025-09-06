import { NextRequest } from "next/server";
import puppeteer from "puppeteer";
export async function GET(req: NextRequest) {
  
  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name") || "User";
  const color = searchParams.get("color") || "white";
  const time = searchParams.get("time") || "9/3/25, 9:24 PM";
  const avatar = searchParams.get("avatar") || "https://cdn.discordapp.com/embed/avatars/0.png";
  const text = searchParams.get("text") || "Hello, world!";

  const html = `
    <html>
    <head>
      <style>
        body { background:#313338; margin:0; padding:20px; font-family:sans-serif; color:#dbdee1; }
        .message { display:flex; align-items:flex-start; font-size:16px; line-height:22px; }
        .avatar { width:40px; height:40px; border-radius:50%; margin-right:12px; }
        .content { display:flex; flex-direction:column; margin-top:-2px; }
        .header { display:flex; align-items:baseline; margin-bottom:2px; }
        .username { color:${color}; font-weight:600; font-size:16px; margin-right:6px; }
        .timestamp { font-size:12px; color:#a3a6aa; }
        .text { font-size:16px; color:#dbdee1; white-space:pre-wrap; }
      </style>
    </head>
    <body>
      <div class="message">
        <img src="${avatar}" class="avatar"/>
        <div class="content">
          <div class="header">
            <span class="username">${name}</span>
            <span class="timestamp">${time}</span>
          </div>
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
  return new Response(new Blob([buffer], { type: "image/png" }));

}
