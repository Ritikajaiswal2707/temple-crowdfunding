// components/CampaignCard.js
import Link from "next/link";

export default function CampaignCard({ c }) {
  const percent = c.goalAmount ? Math.min(Math.round((c.raisedAmount / c.goalAmount) * 100), 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="h-44 w-full bg-gray-100">
        <img
          src={c.images && c.images.length ? c.images[0] : "/default-campaign.jpg"}
          alt={c.title}
          className="w-full h-44 object-cover"
        />
      </div>

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold">{c.title}</h3>
        <p className="text-sm text-gray-600 mt-2 line-clamp-3">{c.description}</p>

        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div style={{ width: `${percent}%` }} className="h-full bg-green-500" />
          </div>
          <div className="flex justify-between text-xs mt-2 text-gray-700">
            <span>₹{c.raisedAmount || 0} raised</span>
            <span>Goal: ₹{c.goalAmount}</span>
          </div>
        </div>

        <div className="mt-4">
          <Link href={`/campaigns/${c._id}`}>
            <a className="inline-block bg-blue-600 text-white px-3 py-1 rounded">View & Donate</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
