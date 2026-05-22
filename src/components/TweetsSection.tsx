// import { useQuery } from "@tanstack/react-query";
// import { Tweet } from "react-tweet";
// import { useSportFilter } from "../context/SportFilter";
// import { tweetsQueryOptions } from "../lib/sanity.queries";
// import { SectionHeader, EmptyState } from "./TrendingNews";

// type TweetItem = {
//   _id: string;
//   tweetId?: string;
// };

// export default function TweetsSection() {
//   const { sport } = useSportFilter();
//   const { data, isLoading } = useQuery(tweetsQueryOptions(sport));

//   const list: TweetItem[] = data ?? [];

//   return (
//     <section className="container-wide mt-24">
//       <SectionHeader
//         eyebrow="Live on X"
//         title="What people are posting"
//         sub="Verified updates from official accounts and trusted reporters."
//       />

//       <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {list.map((t) => (
//           <div
//             key={t._id}
//             className="rounded-2xl overflow-hidden border border-border bg-card hover:border-foreground/20 transition"
//           >
//             {t.url && t.url.includes("/status/") ? (
//   <Tweet id={String(t.url.split("/status/")[1]?.split("?")[0])} />
// ) : (
//   <div className="p-4 text-sm text-muted-foreground">
//     Tweet not available
//   </div>
// )}
//           </div>
//         ))}

//         {!isLoading && list.length === 0 && <EmptyState />}
//       </div>
//     </section>
//   );

// }



import { useQuery } from "@tanstack/react-query";
import { Tweet } from "react-tweet";
import { useSportFilter } from "../context/SportFilter";
import { tweetsQueryOptions } from "../lib/sanity.queries";
import { SectionHeader, EmptyState } from "./TrendingNews";

type TweetItem = {
  _id: string;
  url?: string;
};

function getTweetId(url?: string) {
  if (!url) return null;
  if (!url.includes("/status/")) return null;

  return url.split("/status/")[1]?.split("?")[0] || null;
}

export default function TweetsSection() {
  const { sport } = useSportFilter();
  const { data, isLoading } = useQuery(tweetsQueryOptions(sport));

  const list: TweetItem[] = data ?? [];

  return (
    <section className="container-wide mt-24">
      <SectionHeader
        eyebrow="Live on X"
        title="What people are posting"
        sub="Verified updates from official accounts and trusted reporters."
      />

      <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.map((t) => {
          const tweetId = getTweetId(t.url);

          return (
            <div
              key={t._id}
              className="rounded-2xl overflow-hidden border border-border bg-card hover:border-foreground/20 transition"
            >
              {tweetId ? (
                <Tweet id={tweetId} />
              ) : (
                <div className="p-4 text-sm text-muted-foreground">
                  Tweet not available
                </div>
              )}
            </div>
          );
        })}

        {!isLoading && list.length === 0 && <EmptyState />}
      </div>
    </section>
  );
}