import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    goalAmount: {
      type: Number,
      required: true,
    },
    raisedAmount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String, // store image URL (can use Cloudinary later)
    },
    video: {
      type: String, // optional video link
    },
    templeLocation: {
      type: String,
    },
    category: {
      type: String, // e.g. Renovation, Festival, Rituals
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: false, // only admin can approve
    },
  },
  { timestamps: true }
);

export default mongoose.models.Campaign ||
  mongoose.model("Campaign", CampaignSchema);
