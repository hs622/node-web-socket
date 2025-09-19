import mongoose, { Document, Schema } from "mongoose";

export interface ISession extends Document {
  userId: Schema.Types.ObjectId;
  refreshToken: string;
  expiresIn: Date;
  userIP: string;
  device: string;
}

const SessionSchema = new Schema<ISession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    refreshToken: {
      type: String,
      required: true,
    },
    expiresIn: {
      type: Date,
      required: true,
    },
    userIP: {
      type: String,
      required: true,
    },
    device: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Session = mongoose.model<ISession>("Session", SessionSchema);
