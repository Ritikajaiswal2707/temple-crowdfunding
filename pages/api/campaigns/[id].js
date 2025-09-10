import dbConnect from "../../../lib/mongodb";
import Campaign from "../../../models/Campaign";

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  if (req.method === "GET") {
    try {
      const campaign = await Campaign.findById(id);
      if (!campaign) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(campaign);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch campaign" });
    }
  }

  if (req.method === "PUT") {
    try {
      const updated = await Campaign.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ error: "Failed to update campaign" });
    }
  }

  if (req.method === "DELETE") {
    try {
      await Campaign.findByIdAndDelete(id);
      return res.status(200).json({ message: "Deleted successfully" });
    } catch (error) {
      return res.status(400).json({ error: "Failed to delete campaign" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
