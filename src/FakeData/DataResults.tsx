import dog from "../avatar/dog.png";
import nai from "../avatar/nai.png";
import river from "../avatar/river.png";

const avatars = [dog, nai, river];

export const dataResults = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: "This is a title",
  username: "by username",
  image: avatars[i % avatars.length],
}));
