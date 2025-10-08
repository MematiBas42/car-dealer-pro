import { auth } from "@/auth";
import { getSourceId } from "@/lib/source-id";
import { redis } from "@/lib/redis-store";
import { Favourites } from "@/config/types";
import ClientHeader from "./ClientHeader";

const Header = async () => {
  const session = await auth();
  const sourceId = await getSourceId();
  const favs = await redis.get<Favourites>(sourceId ?? "");

  return <ClientHeader session={session} favs={favs} />;
};

export default Header;
