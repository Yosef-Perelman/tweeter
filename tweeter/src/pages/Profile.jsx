import { useState } from "react";
import { Title, Text, TextInput, Button, Stack, Flex } from "@mantine/core";
import { getUsername, setUsername } from "../lib/username";
import "./Profile.css";

export default function Profile() {
  const [value, setValue] = useState(getUsername());

  const save = () => {
    if (!value.trim()) return;
    setUsername(value.trim());
  };

  return (
    <Stack className="profile" gap="md">
      <Title order={1}>Profile</Title>
      <Stack gap={4}>
        <Text>User Name</Text>
        <TextInput
          size="lg"
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
        />
      </Stack>
      <Flex justify="flex-end">
        <Button onClick={save} disabled={!value.trim()}>
          Save
        </Button>
      </Flex>
    </Stack>
  );
}
