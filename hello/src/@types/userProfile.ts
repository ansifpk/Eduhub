import type { IRating } from "./ratingType";

export interface IUserProfile {
  _id: string;
  name: string;
  email: string;
  isVerified: boolean;
  qualification: string;
  experience: string;
  isBlock: boolean;
  isAdmin: boolean;
  about: string;
  thumbnail: string;
  instructorReviews?: IRating[];
  status: string;
  isInstructor: boolean;
  avatar: {
    id: string;
    avatar_url: string;
  };
  certificate: {
    id: string;
    certificate_url: string;
  };
  cv: {
    id: string;
    cv_url: string;
  };
  createdAt: Date;
}
