import { useState } from "react";
import { Text, Textarea, Stack, Flex, Button, Alert } from "@mantine/core";
import "./Feed.css";

const STORAGE_KEY = "tweeter-tweets";

function loadTweets() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) ?? [];
  } catch {
    return [];
  }
}

export default function Feed() {
  const [tweets, setTweets] = useState(loadTweets);
  const [value, setValue] = useState("");
  const userName = "yosef";
  const maxLength = 140;

  const isTooLong = value.length > maxLength;
  const canTweet = value.trim().length > 0 && !isTooLong;

  const addTweet = () => {
    if (!canTweet) return;

    const updated = [
      { username: userName, text: value, createdAt: new Date().toISOString() },
      ...tweets,
    ];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setTweets(updated);
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
          <Button
            className="add_tweet_button"
            variant="filled"
            onClick={addTweet}
            disabled={!canTweet}
            ml="auto"
          >
            Tweet
          </Button>
        </Flex>
      </div>
      <Stack
        align="stretch"
        justify="center"
        gap="md"
        className="tweetsContainer"
      >
        {tweets.map((tweet, index) => (
          <div className="tweet" key={index}>
            <Flex justify="space-between">
              <Text c="dimmed" size="sm">
                {tweet.username}
              </Text>
              <Text c="dimmed" size="sm">
                {tweet.createdAt}
              </Text>
            </Flex>
            <Text>{tweet.text}</Text>
          </div>
        ))}
      </Stack>
    </Flex>
  );
}
