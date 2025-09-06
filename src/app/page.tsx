"use client";
import { useState } from "react";

export default function Home() {
  const [platform, setPlatform] = useState("discord");
  const [name, setName] = useState("AuraFarmer69");
  const [color, setColor] = useState("white");
  const [time, setTime] = useState("Today at 9:24 PM");
  const [avatar, setAvatar] = useState("https://cdn.discordapp.com/avatars/1377292227373437069/d257140e413707700606a507520f2952.png?size=512");
  const [text, setText] = useState("those who know");

  const [previewUrl, setPreviewUrl] = useState("");

  const handleGenerate = () => {
    const url =
      platform === "discord"
        ? `/api/message?name=${encodeURIComponent(name)}&color=${encodeURIComponent(color)}&time=${encodeURIComponent(time)}&avatar=${encodeURIComponent(avatar)}&text=${encodeURIComponent(text)}`
        : `/api/insta?name=${encodeURIComponent(name)}&avatar=${encodeURIComponent(avatar)}&text=${encodeURIComponent(text)}`;
    setPreviewUrl(url);
  };

  return (
    <div className="min-h-screen bg-[#2b2d31] text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Fake Message Generator</h1>

      <div className="space-y-3 mb-6">
        <select
          className="w-full p-2 rounded bg-[#1e1f22]"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option value="discord">Discord</option>
          <option value="insta">Instagram</option>
        </select>
        <input className="w-full p-2 rounded bg-[#1e1f22]" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input className="w-full p-2 rounded bg-[#1e1f22]" value={color} onChange={e => setColor(e.target.value)} placeholder="Color" />
        <input className="w-full p-2 rounded bg-[#1e1f22]" value={time} onChange={e => setTime(e.target.value)} placeholder="Time" />
        <input className="w-full p-2 rounded bg-[#1e1f22]" value={avatar} onChange={e => setAvatar(e.target.value)} placeholder="Avatar URL" />
        <textarea className="w-full p-2 rounded bg-[#1e1f22]" value={text} onChange={e => setText(e.target.value)} placeholder="Message text" />
      </div>

      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 mb-4"
      >
        Generate it
      </button>

      {previewUrl && (
        <>
          <h2 className="text-xl font-semibold mb-2">Preview</h2>
          <img src={previewUrl} alt="preview" className="rounded bg-[#313338] p-4" />
        </>
      )}
    </div>
  );
}
