import { Text, Flex } from "@mantine/core";

export default function Tweet({ tweet }) {
  return (
    <>
      <Flex justify="space-between">
        <Text c="dimmed" size="sm">
          {tweet.username}
        </Text>
        <Text c="dimmed" size="sm">
          {tweet.createdAt}
        </Text>
      </Flex>
      <Text c="dimmed" size="xl">
        {tweet.text}
      </Text>
    </>
  );
}
