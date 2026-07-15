import { useEffect, useState } from "react";
import { Textarea, Stack, Flex, Button, Alert, Loader } from "@mantine/core";
import "./Feed.css";
import Tweet from "./Tweet";
import { getUsername } from "../lib/username";
import dummyData from "../data/dummyData.js";

const NETWORK_DELAY = 2000;

// stands in for a remote server's tweet storage
let serverTweets = dummyData.map(({ userName, content, date }) => ({
  username: userName,
  text: content,
  createdAt: date,
}));

export default function Feed() {
  const [tweets, setTweets] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [error, setError] = useState("");
  const maxLength = 140;

  useEffect(() => {
    setTimeout(() => {
      setTweets(serverTweets);
      setLoading(false);
    }, NETWORK_DELAY);
  }, []);

  const isTooLong = value.length > maxLength;
  const canTweet = value.trim().length > 0 && !isTooLong && !loading && !posting;

  const addTweet = () => {
    if (!canTweet) return;

    setPosting(true);
    setError("");

    setTimeout(() => {
      if (!value.trim()) {
        setError("Tweet can't be empty.");
        setPosting(false);
        return;
      }

      const tweet = {
        username: getUsername(),
        text: value,
        createdAt: new Date().toISOString(),
      };
      serverTweets = [tweet, ...serverTweets];
      setTweets(serverTweets);
      setValue("");
      setPosting(false);
    }, NETWORK_DELAY);
  };

  return (
    <Flex
      mih={50}
      gap="md"
      justify="flex-start"
      align="center"
      direction="column"
      wrap="nowrap"
      className="feed"
    >
      <div className="addTweetContainer">
        <Textarea
          size="lg"
          placeholder="What you have in mind..."
          autosize
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
        <Flex justify="space-between" align="center" gap="md" mt="sm">
          {isTooLong && (
            <Alert color="red" variant="light" py={6}>
              The tweet can't contain more then {maxLength} chars.
            </Alert>
          )}
          {error && (
            <Alert color="red" variant="light" py={6}>
              {error}
            </Alert>
          )}
          <Button
            className="add_tweet_button"
            variant="filled"
            onClick={addTweet}
            disabled={!canTweet}
            loading={posting}
            ml="auto"
          >
            Tweet
          </Button>
        </Flex>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <Stack
          align="stretch"
          justify="center"
          gap="md"
          className="tweetsContainer"
        >
          {tweets.map((tweet, index) => (
            <div className="tweet" key={index}>
              <Tweet tweet={tweet} />
            </div>
          ))}
        </Stack>
      )}
    </Flex>
  );
}