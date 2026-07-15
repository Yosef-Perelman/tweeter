import { createContext, useContext, useEffect, useState } from "react";
import { getUsername } from "../lib/username";
import dummyData from "../data/dummyData.js";

const NETWORK_DELAY = 2000;
const POLL_INTERVAL = 5000;

// stands in for a remote server's tweet storage
let serverTweets = dummyData.map(({ userName, content, date }) => ({
  username: userName,
  text: content,
  createdAt: date,
}));

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

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTweets(serverTweets);
      setLoading(false);
    }, NETWORK_DELAY);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (loading) return;
    const interval = setInterval(() => {
      setTweets((current) => mergeServerTweets(current, serverTweets));
    }, POLL_INTERVAL);
    return () => clearInterval(interval);
  }, [loading]);

  const addTweet = (text) => {
    if (!text.trim()) return;

    setPosting(true);
    setError("");

    setTimeout(() => {
      const tweet = {
        username: getUsername(),
        text,
        createdAt: new Date().toISOString(),
      };
      serverTweets = [tweet, ...serverTweets];
      setTweets((current) => [tweet, ...current]);
      setPosting(false);
    }, NETWORK_DELAY);
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