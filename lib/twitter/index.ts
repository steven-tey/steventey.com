import { getTweet } from "./get-tweet";

export default function getTweets(ids: string[]) {
  return Promise.all(ids.map((id) => getTweet(id)));
}
