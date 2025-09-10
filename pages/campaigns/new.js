import { useState } from "react";
import { useSession } from "next-auth/react";

export default function NewCampaign() {
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        goalAmount,
        creator: session?.user?.email || "anonymous",
        imageUrl,
      }),
    });

    const data = await res.json();
    alert(data.message || "Error creating campaign");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4">Create a Campaign</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="p-2 border rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Goal Amount (₹)"
          className="p-2 border rounded"
          value={goalAmount}
          onChange={(e) => setGoalAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          className="p-2 border rounded"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
}
