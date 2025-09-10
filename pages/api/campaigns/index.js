import dbConnect from "../../../lib/mongodb";
import Campaign from "../../../models/Campaign";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "GET") {
    try {
      const campaigns = await Campaign.find({ isApproved: true });
      return res.status(200).json(campaigns);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch campaigns" });
    }
  }

  if (req.method === "POST") {
    try {
      const { title, description, goalAmount, image, video, templeLocation, category, creator } = req.body;

      const campaign = await Campaign.create({
        title,
        description,
        goalAmount,
        image,
        video,
        templeLocation,
        category,
        creator,
      });

      return res.status(201).json(campaign);
    } catch (error) {
      return res.status(400).json({ error: "Failed to create campaign" });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
