"use client";
import { TextInput, Checkbox, Button, Group, Box, Center } from "@mantine/core";
import { useForm } from "@mantine/form";
import axios from "axios";

function Form() {
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      avatar: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const postData = (data) => {
    console.log(data);
    axios
      .post("https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
        <Button component="a" href="/" style={{display: "inline", position: "absolute", right: 15, top: 12, backgroundColor: "white", borderColor: "black", color: "black", height: 30. }}>
                Home
        </Button>
      <Box
        maw={340}
        mx="auto"
        mt={200}
        style={{
          border: "2px solid black",
          padding: 20,
          borderRadius: 10,
          backgroundColor: "rgb(251 207 232)",
        }}
      >
        <form onSubmit={form.onSubmit((values) => postData(values))}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="Enter your name"
            {...form.getInputProps("name")}
            m={10}
          />

          <TextInput
            withAsterisk
            label="Email"
            placeholder="Enter your email"
            {...form.getInputProps("email")}
            m={10}
          />

          <TextInput
            withAsterisk
            label="Avatar"
            placeholder="Enter the link to your avatar"
            {...form.getInputProps("avatar")}
            m={10}
          />

          <Group justify="center" mt={20}>
            <Button
              type="submit"
              style={{ backgroundColor: "rgb(219 39 119)" }}
            >
              Create User
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  );
}

export default Form;
