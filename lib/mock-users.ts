import { MockUser } from "@/types";

export const MOCK_USERS: MockUser[] = [
  {
    id: "user-1",
    name: "Sophia Chen",
    username: "sophiac",
    avatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=80",
    bio: "Fashion enthusiast. Coffee addict. Finding beauty in everyday things.",
    gumiCount: 342,
    followers: 12400,
    following: 891,
    hasStory: true,
  },
  {
    id: "user-2",
    name: "Liam Park",
    username: "liampark",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&q=80",
    bio: "Interior design nerd. Minimalist with maximalist taste.",
    gumiCount: 218,
    followers: 8900,
    following: 445,
    hasStory: true,
  },
  {
    id: "user-3",
    name: "Olivia Rose",
    username: "oliviarose",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80",
    bio: "Skincare obsessed. Plant mom. Eternally browsing home decor.",
    gumiCount: 567,
    followers: 23100,
    following: 632,
    hasStory: true,
  },
  {
    id: "user-4",
    name: "Noah Kim",
    username: "noahkim",
    avatar: "https://images.unsplash.com/photo-1618077360395-f3068be8e001?w=200&q=80",
    bio: "Tech + design. Building things that look good and work well.",
    gumiCount: 156,
    followers: 5600,
    following: 312,
    hasStory: false,
  },
  {
    id: "user-5",
    name: "Emma Liu",
    username: "emmaliu",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80",
    bio: "Art director by day, pottery hobbyist by night.",
    gumiCount: 423,
    followers: 15800,
    following: 528,
    hasStory: true,
  },
  {
    id: "user-6",
    name: "Ava Martinez",
    username: "avamtz",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    bio: "Sustainable fashion advocate. Thrift queen.",
    gumiCount: 289,
    followers: 11200,
    following: 401,
    hasStory: true,
  },
  {
    id: "user-7",
    name: "James Wright",
    username: "jamesw",
    avatar: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=200&q=80",
    bio: "Outdoor gear reviewer. Weekend warrior. Coffee snob.",
    gumiCount: 198,
    followers: 7300,
    following: 267,
    hasStory: false,
  },
  {
    id: "user-8",
    name: "Isabella Torres",
    username: "isabellat",
    avatar: "https://images.unsplash.com/photo-1596215143922-eedeaba0d91c?w=200&q=80",
    bio: "Beauty editor. Testing products so you don't have to.",
    gumiCount: 612,
    followers: 34500,
    following: 789,
    hasStory: true,
  },
  {
    id: "user-9",
    name: "Lucas Andersen",
    username: "lucasa",
    avatar: "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=200&q=80",
    bio: "Scandinavian design lover. Less is more.",
    gumiCount: 134,
    followers: 4200,
    following: 198,
    hasStory: false,
  },
  {
    id: "user-10",
    name: "Charlotte Ng",
    username: "charlotteng",
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=80",
    bio: "Foodie. Kitchen gadget hoarder. Recipe developer.",
    gumiCount: 345,
    followers: 19800,
    following: 567,
    hasStory: true,
  },
  {
    id: "user-11",
    name: "Ethan Brooks",
    username: "ethanb",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&q=80",
    bio: "Sneakerhead turned fashion enthusiast.",
    gumiCount: 267,
    followers: 9100,
    following: 345,
    hasStory: true,
  },
  {
    id: "user-12",
    name: "Mia Johnson",
    username: "miaj",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
    bio: "Wellness coach. Yoga + skincare + good vibes.",
    gumiCount: 478,
    followers: 27600,
    following: 412,
    hasStory: true,
  },
];

// The current "logged in" user
export const CURRENT_USER: MockUser = {
  id: "user-me",
  name: "Tyler",
  username: "tyler",
  avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&q=80",
  bio: "Discovering beautiful things.",
  gumiCount: 89,
  followers: 2400,
  following: 156,
  hasStory: false,
};

// Get random friends who Gumied a product
export function getRandomGumiFriends(count: number = 3): string[] {
  const shuffled = [...MOCK_USERS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, Math.floor(Math.random() * 4))).map((u) => u.id);
}

// Lookup user by ID
export function getUserById(id: string): MockUser | undefined {
  if (id === CURRENT_USER.id) return CURRENT_USER;
  return MOCK_USERS.find((u) => u.id === id);
}

// Get users with stories (for the stories row)
export function getStoryUsers(): MockUser[] {
  return MOCK_USERS.filter((u) => u.hasStory);
}
