import { createContext, useContext, useEffect, useState } from "react";
import { getUsername } from "../lib/username";
import { supabase } from "../lib/supabaseClient";

const POLL_INTERVAL = 5000;

function rowToTweet(row) {
  return {
    username: row.userName,
    text: row.content,
    createdAt: row.date,
  };
}

function tweetKey(tweet) {
  return `${tweet.username}__${tweet.createdAt}`;
}

function mergeServerTweets(current, incoming) {
  const seen = new Set(current.map(tweetKey));
  const additions = incoming.filter((tweet) => !seen.has(tweetKey(tweet)));
  return additions.length ? [...additions, ...current] : current;
}

const TweetsContext = createContext(null);

export function TweetsProvider({ children }) {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");

  const fetchTweets = async () => {
    const { data, error: fetchError } = await supabase
      .from("Tweets")
      .select("*")
      .order("date", { ascending: false });

    if (fetchError) {
      return { tweets: null, error: fetchError };
    }
    return { tweets: data.map(rowToTweet), error: null };
  };

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const { tweets: fetched, error: fetchError } = await fetchTweets();
      if (cancelled) return;
      if (fetchError) {
        setError("Failed to load tweets.");
      } else {
        setTweets(fetched);
      }
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(async () => {
      const { tweets: fetched, error: fetchError } = await fetchTweets();
      if (!fetchError) {
        setTweets((current) => mergeServerTweets(current, fetched));
      }
    }, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [loading]);

  const addTweet = async (text) => {
    if (!text.trim()) return;

    setPosting(true);
    setError("");

    const tweet = {
      userName: getUsername(),
      content: text,
      date: new Date().toISOString(),
    };

    const { data, error: insertError } = await supabase
      .from("Tweets")
      .insert(tweet)
      .select();

    if (insertError) {
      setError("Failed to post tweet.");
      setPosting(false);
      return;
    }

    setTweets((current) => [rowToTweet(data[0]), ...current]);
    setPosting(false);
  };

  const value = { tweets, loading, posting, error, addTweet };

  return (
    <TweetsContext.Provider value={value}>{children}</TweetsContext.Provider>
  );
}

export function useTweets() {
  const context = useContext(TweetsContext);
  if (!context) {
    throw new Error("useTweets must be used within a TweetsProvider");
  }
  return context;
}