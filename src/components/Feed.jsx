import { useState } from "react";
import { Textarea, Stack, Flex, Button, Alert, Loader } from "@mantine/core";
import "./Feed.css";
import Tweet from "./Tweet";
import { useTweets } from "../context/TweetsContext";

export default function Feed() {
  const { tweets, loading, posting, error, addTweet } = useTweets();
  const [value, setValue] = useState("");
  const maxLength = 140;

  const isTooLong = value.length > maxLength;
  const canTweet = value.trim().length > 0 && !isTooLong && !loading && !posting;

  const handleTweet = () => {
    if (!canTweet) return;
    addTweet(value);
    setValue("");
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
            onClick={handleTweet}
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