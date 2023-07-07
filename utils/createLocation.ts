import { prisma } from "@/lib/prisma";
import { GameLocationsEnum } from "@/types/gameLocation";

export default async function updateLocationStats(location: GameLocationsEnum) {
  const locationExists = await prisma.locations.findFirst({
    where: {
      id: location,
    },
  });
  if (locationExists) {
    incrementGameLocation(location);
  } else {
    insertNewGameLocation(location);
  }
}

const incrementGameLocation = async (location: GameLocationsEnum) => {
  await prisma.locations.update({
    where: {
      id: location,
    },
    data: {
      ongoingGames: {
        increment: 1,
      },
    },
  });
};

const insertNewGameLocation = async (location: GameLocationsEnum) => {
  await prisma.locations.create({
    data: {
      id: location,
      gamesFinished: 0,
      ongoingGames: 1,
      winsResistance: 0,
      winsSpy: 0,
    },
  });
};
