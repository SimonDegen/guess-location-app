export type GameLocation = {
  _id: GameLocationsEnum;
  winsSpy: number;
  winsResistance: number;
  gamesFinished: number;
  ongoingGames: number;
};

export enum GameLocationsEnum {
  PARK = "Park",
  RESTAURANT = "Restaurant",
  LIBRARY = "Library",
  SCHOOL = "School",
  COFFEE_SHOP = "Coffee Shop",
  SHOPPING_MALL = "Shopping Mall",
  HOSPITAL = "Hospital",
  MOVIE_THEATER = "Movie Theater",
  GYM = "Gym",
  BEACH = "Beach",
  AIRPORT = "Airport",
  TRAIN_STATION = "Train Station",
  MUSEUM = "Museum",
  STADIUM = "Stadium",
  ZOO = "Zoo",
  CAMPGROUND = "Campground",
  FARM = "Farm",
  OFFICE_BUILDING = "Office Building",
  MOUNTAIN = "Mountain",
  LAKE = "Lake",
}
