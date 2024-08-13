/**
 * v0 by Vercel.
 * @see https://v0.dev/t/TCopU5kXuXR
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { createClient } from '@/utils/supabase/client';

export default function Component() {
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('reviews') // Replace with your actual table name
          .select(`
            id,
            content,
            rating,
            createdat,
            likes,
            dislikes,
            user:users (name, initials, avatar_url)
          `);

        if (error) {
          throw new Error(error.message);
        }

        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img
          src="#"
          alt="Game Cover"
          width="600"
          height="400"
          className="rounded-lg w-full md:w-[600px] h-auto"
          style={{ aspectRatio: '600/400', objectFit: 'cover' }}
        />
        <div className="grid gap-4">
          <h1 className="text-4xl font-bold">Legendary Adventure</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-primary" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
            </div>
            <span className="text-muted-foreground">4.2 (1,234 reviews)</span>
          </div>
          <p className="text-muted-foreground">
            Embark on an epic journey through a vast and immersive world.
            Explore stunning landscapes, battle fierce enemies, and uncover the
            secrets of an ancient civilization.
          </p>
        </div>
      </div>
      <div className="grid gap-8">
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div className="grid gap-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="grid gap-4 p-4 rounded-lg bg-muted"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="w-10 h-10 border">
                    <AvatarImage
                      src={review.user.avatar_url}
                      alt={review.user.name}
                    />
                    <AvatarFallback>{review.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{review.user.name}</div>
                      <div className="flex items-center gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <StarIcon className="w-5 h-5 fill-primary" />
                        ))}
                        {[...Array(5 - review.rating)].map((_, i) => (
                          <StarIcon className="w-5 h-5 fill-muted stroke-muted-foreground" />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {review.createdAt}
                    </div>
                  </div>
                </div>
                <div className="text-muted-foreground">{review.content}</div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <ThumbsUpIcon className="w-5 h-5 fill-primary" />
                    <span className="sr-only">Like</span>
                  </Button>
                  <div className="text-muted-foreground">{review.likes}</div>
                  <Button variant="ghost" size="icon">
                    <ThumbsDownIcon className="w-5 h-5 fill-muted-foreground" />
                    <span className="sr-only">Dislike</span>
                  </Button>
                  <div className="text-muted-foreground">{review.dislikes}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Write a Review</h2>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <Select defaultValue="3">
                <SelectTrigger>
                  <SelectValue placeholder="Select a rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 star</SelectItem>
                  <SelectItem value="2">2 stars</SelectItem>
                  <SelectItem value="3">3 stars</SelectItem>
                  <SelectItem value="4">4 stars</SelectItem>
                  <SelectItem value="5">5 stars</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="review">Review</Label>
              <Textarea
                id="review"
                placeholder="Share your thoughts on the game..."
              />
            </div>
            <Button type="submit">Submit Review</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function ThumbsDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 14V2" />
      <path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88Z" />
    </svg>
  );
}

function ThumbsUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}
