// pages/campaigns/[id].js
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function CampaignDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/campaigns/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setCampaign(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!campaign) return <div className="p-8">Campaign not found</div>;

  const percent = campaign.goalAmount ? Math.min(Math.round((campaign.raisedAmount / campaign.goalAmount) * 100), 100) : 0;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <img src={campaign.images?.[0] || "/default-campaign.jpg"} alt={campaign.title} className="w-full h-64 object-cover rounded mb-4" />
        <h1 className="text-2xl font-bold">{campaign.title}</h1>
        <p className="text-gray-700 mt-3">{campaign.description}</p>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div style={{ width: `${percent}%` }} className="h-full bg-green-500" />
          </div>
          <div className="flex justify-between text-sm mt-2">
            <span>₹{campaign.raisedAmount || 0} raised</span>
            <span>Goal: ₹{campaign.goalAmount}</span>
          </div>
        </div>

        <div className="mt-6">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Donate (Razorpay → add later)</button>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Updates</h3>
          {campaign.updates?.length ? (
            <ul className="mt-2 space-y-2">
              {campaign.updates.map((u, idx) => (
                <li key={idx} className="text-sm text-gray-700">{u.text} <span className="text-xs text-gray-400">• {new Date(u.createdAt).toLocaleString()}</span></li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No updates yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

