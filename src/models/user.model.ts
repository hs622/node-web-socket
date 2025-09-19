import mongoose, { Schema } from "mongoose";
import { ISession } from "./session.model";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

export interface IUser extends Document {
  username: string; // index
  email: string; // index
  password: string;
  session?: ISession;
  profile: IUserProfile;
  contact: IUserContact;
  address: IUserAddress;

  isPasswordCorrect(): Promise<boolean>;
  generateAccessToken(): string;
  generaterRefreshToken(): string;
}

export interface IUserProfile {
  firstName: string;
  lastName?: string;
  dob?: string;
  gender?: string;
  avatar?: string;
}

export interface IUserContact {
  countryCode: string;
  phoneNumber: number;
  defaultNumber: boolean;
}

export interface IUserAddress {
  country: string;
  state?: string;
  province: string;
  city: string;
  lat: number;
  lng: number;
  postcode?: string;
  ASL1?: string; // street address line
  ASL2?: string; // street address line
}

const Profile = new Schema<IUserProfile>({
  firstName: {
    type: String,
    lowercase: true,
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  avatar: {
    type: String,
  },
});

const Contact = new Schema<IUserContact>({
  countryCode: {
    type: String,
    lowercase: true,
  },
  phoneNumber: {
    type: Number,
    lowercase: true,
    trim: true,
  },
  defaultNumber: {
    type: Boolean,
  },
});

const Address = new Schema<IUserAddress>({
  country: {
    type: String,
    lowercase: true,
    trim: true,
  },
  state: {
    type: String,
    lowercase: true,
    trim: true,
  },
  province: {
    type: String,
    lowercase: true,
    trim: true,
  },
  city: {
    type: String,
    lowercase: true,
    trim: true,
  },
  lat: { type: Number },
  lng: { type: Number },
  postcode: { type: Number },
  ASL1: { type: String, lowercase: true, trim: true },
  ASL2: { type: String, lowercase: true, trim: true },
});

const UserSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    profile: Profile,
    contact: Contact,
    address: Address,
  },
  {
    timestamps: true,
  }
);

// middleware function; auto excucate before saving data into db.
UserSchema.pre("save", async function (next: Function) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password as string, 10);
  next();
});

// user object method function
UserSchema.methods.isPasswordCorrect = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.generateAccessToken = function (): string {
  return jwt.sign(
    {
      _id: this.id,
      username: this.username,
      email: this.email,
      firstName: this.firstName,
    },
    process.env.ACCESS_TOKEN_SECRET as Secret,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    } as SignOptions
  );
};

UserSchema.methods.generaterRefreshToken = function (): string {
  return jwt.sign(
    { _id: this.id },
    process.env.REFRESH_TOKEN_EXPIRY as Secret,
    {
      expiresIn: process.env.REFRESH_TOKEN_SECRET,
    } as SignOptions
  );
};

export const User = mongoose.model<IUser>("User", UserSchema);
