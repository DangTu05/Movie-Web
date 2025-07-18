import mongoose from "mongoose";
interface IRefreshToken {
  userId: mongoose.Types.ObjectId;
  token: string;
  createdAt: Date;
}

const tokenSchema = new mongoose.Schema({
  username: {
    type: String,
    ref: "Account",
    required: true
  },
  token: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model<IRefreshToken>("token", tokenSchema);
export { IRefreshToken, tokenSchema };
