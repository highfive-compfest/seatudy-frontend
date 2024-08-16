import React, { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import { Review } from "@/types/reviews/reviews";
import { getUserById } from "@/services/user";
import { UserPayload } from "@/types/user/user";

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const [user, setUser] = useState<UserPayload | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userResponse = await getUserById(review.user_id);
        setUser(userResponse.payload);
      } catch (error) {
        setError("Error fetching user information.");
        console.error("Error fetching user information:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [review.user_id]);

  return (
    <div className="p-3 border border-gray-300 rounded-lg shadow hover:shadow-md transition-shadow duration-300 bg-white">
      <div className="flex items-center mb-4">
        <div className="flex items-center">
          {loading ? (
            <div className="animate-pulse flex items-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
              <div className="h-6 w-32 bg-gray-200 rounded"></div>
            </div>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : user ? (
            <>
              <img src={user.image_url || "/default-profile.png"} alt={`${user.name}'s profile`} className="w-12 h-12 rounded-full mr-4 object-cover" />
              <div>
                <span className="block text-gray-800 font-semibold">{user.name}</span>
              </div>
            </>
          ) : (
            <span className="text-gray-700">Anonymous</span>
          )}
        </div>
        <div className="ml-auto flex items-center">
          <AiFillStar className="text-yellow-500 text-xl mr-1" />
          <span className="text-xl font-semibold text-gray-800">{review.rating}</span>
        </div>
      </div>
      <p className="text-gray-700">{review.feedback}</p>
    </div>
  );
};

export default ReviewItem;
