import CardItem from "../general/CardItem";
import CardItemGrid from "../general/CardItemGrid";
import {ShortUser} from "@/types/types";

interface Props {
  users: ShortUser[] | undefined;
}

export default function UserCards({users}: Props) {
  return (
    <CardItemGrid>
      {users?.map((user) => (
        <CardItem
          key={user.id}
          id={user.id}
          artist_slug={user.artist_slug}
          heading={user.display_name}
          image={user.image}
          altTitle={user.display_name}
          subheading={user.type_profile}
          imageRounded
          type={user.type_profile === "User" ? "users" : "artists"}
        />
      ))}
    </CardItemGrid>
  );
}
