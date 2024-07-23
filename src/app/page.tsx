/**
 * v0 by Vercel.
 * @see https://v0.dev/t/E1UAHTek8A7
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  return (
    <div className="w-full max-w-6xl mx-auto py-12 px-4 md:px-6">
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <img
          src="/placeholder.svg"
          alt="Game Cover"
          width={600}
          height={400}
          className="rounded-lg w-full md:w-[600px] h-auto"
        />
        <div className="grid gap-4">
          <h1 className="text-4xl font-bold">Legendary Adventure</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5"></div>
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
            <div className="grid gap-4 p-4 rounded-lg bg-muted">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">John Doe</div>
                    <div className="flex items-center gap-0.5"></div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    2 days ago
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground">
                This game is an absolute masterpiece! The visuals are stunning,
                the gameplay is smooth and engaging, and the story is truly
                captivating. I highly recommend it to anyone who loves adventure
                games.
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Dislike</span>
                </Button>
              </div>
            </div>
            <div className="grid gap-4 p-4 rounded-lg bg-muted">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>SA</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Sarah Anderson</div>
                    <div className="flex items-center gap-0.5"></div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    1 week ago
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground">
                I absolutely loved this game! The story was engaging, the
                characters were well-developed, and the gameplay was incredibly
                fun and challenging. I couldn't put it down and can't wait to
                play it again.
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Dislike</span>
                </Button>
              </div>
            </div>
            <div className="grid gap-4 p-4 rounded-lg bg-muted">
              <div className="flex items-center gap-4">
                <Avatar className="w-10 h-10 border">
                  <AvatarImage src="/placeholder-user.jpg" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Michael Johnson</div>
                    <div className="flex items-center gap-0.5"></div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    3 weeks ago
                  </div>
                </div>
              </div>
              <div className="text-muted-foreground">
                I had a lot of fun with this game, but there were a few issues
                that kept it from being a 5-star experience for me. The controls
                felt a bit clunky at times, and I encountered a few bugs that
                were frustrating. Overall, it's a solid adventure game that I'd
                recommend with some caveats.
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Like</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">Dislike</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <h2 className="text-2xl font-bold">Write a Review</h2>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="rating">Rating</Label>
              <Select id="rating" defaultValue="3">
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
