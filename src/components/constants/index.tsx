export type FeedImage = {
  location: string;
  image: number;
  user: string;
  userProfile: number | string;
  description: string;
};

export const feedImages: FeedImage[] = [
  {
    location: "Bali, Indonesia",
    image: require("../../../assets/mockdata/image-1.jpg"),
    user: "Susanna Winther",
    userProfile: "",
    description:
      "Cruising through the lush paradise on two wheels 🚴‍♂️🌴 #TropicalTravels #BikeAdventures",
  },
  {
    location: "Bali, Indonesia",
    image: require("../../../assets/mockdata/image-2.jpg"),
    user: "Susanna Winther",
    userProfile: require("../../../assets/mockdata/profile.image.jpg"),
    description:
      "Adventure awaits where the map ends and the stories begin. Pack light, live large! 🌏✈️ #WanderlustMagic #ExploreDreamDiscover",
  },
  {
    location: "Venice, Italy",
    image: require("../../../assets/mockdata/image-3.jpg"),
    user: "Susanna Winther",
    userProfile: require("../../../assets/mockdata/profile.image.jpg"),
    description:
      "Lost in the timeless allure of winding canals and whispered serenades. 🚣‍♂️💫 #VenetianRomance #RiversideMagic",
  },
  {
    location: "Monument Valley, USA",
    image: require("../../../assets/mockdata/image-4.jpg"),
    user: "Susanna Winther",
    userProfile: require("../../../assets/mockdata/profile.image.jpg"),
    description:
      "Chasing the sun through the mesmerizing hues of the American Southwest, where every mile is a masterpiece. 🏜️🚐 #DesertRoadTrippin #GoldenHourAdventures",
  },
  {
    location: "Oia, Greece",
    image: require("../../../assets/mockdata/image-5.jpg"),
    user: "Susanna Winther",
    userProfile: require("../../../assets/mockdata/profile.image.jpg"),
    description: "Living in a palette of dreams amidst the vibrant charm of a seaside haven.",
  },
  {
    location: "Dubrovnik, Croatia",
    image: require("../../../assets/mockdata/image-7.jpg"),
    user: "Susanna Winther",
    userProfile: require("../../../assets/mockdata/profile.image.jpg"),
    description:
      "Wandering through narrow cobblestone streets, where every step echoes tales of history. 🍂🎒 #AutumnStrolls #CroatianWhispers",
  },
];
