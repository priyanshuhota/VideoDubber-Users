"use client";
import cx from "clsx";
import { useEffect, useState } from "react";
import {
  Table,
  Checkbox,
  ScrollArea,
  Group,
  Avatar,
  Text,
  rem,
  Button,
} from "@mantine/core";
import classes from "./Table.module.css";
import axios from "axios";

// const data = [
//   {
//     id: '1',
//     avatar:
//       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
//     name: 'Robert Wolfkisser',
//     job: 'Engineer',
//     email: 'rob_wolf@gmail.com',
//   },
//   {
//     id: '2',
//     avatar:
//       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
//     name: 'Jill Jailbreaker',
//     job: 'Engineer',
//     email: 'jj@breaker.com',
//   },
//   {
//     id: '3',
//     avatar:
//       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-2.png',
//     name: 'Henry Silkeater',
//     job: 'Designer',
//     email: 'henry@silkeater.io',
//   },
//   {
//     id: '4',
//     avatar:
//       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-3.png',
//     name: 'Bill Horsefighter',
//     job: 'Designer',
//     email: 'bhorsefighter@gmail.com',
//   },
//   {
//     id: '5',
//     avatar:
//       'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-10.png',
//     name: 'Jeremy Footviewer',
//     job: 'Manager',
//     email: 'jeremy@foot.dev',
//   },
// ];

export default function TableSelection() {
  const [selection, setSelection] = useState(["1"]);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users")
      .then(function (response) {
        console.log(response.data), setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const toggleRow = (id) =>
    setSelection((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  const toggleAll = () =>
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);
    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        <Table.Td>
          <Checkbox
            checked={selection.includes(item.id)}
            onChange={() => toggleRow(item.id)}
          />
        </Table.Td>
        <Table.Td>
          <Group gap="sm">
            <Avatar size={26} src={item.avatar} radius={26} />
            <Text size="sm" fw={500}>
              {item.name || item.email.split("@")[0]}
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.email}</Table.Td>
        {/* <Table.Td>{item.job}</Table.Td> */}
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={800} verticalSpacing="sm">
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: rem(40) }}>
              <Checkbox
                onChange={toggleAll}
                checked={selection.length === data.length}
                indeterminate={
                  selection.length > 0 && selection.length !== data.length
                }
              />
            </Table.Th>
            <Table.Th>User</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>
              <Button component="a" href="/" style={{display: "inline", position: "absolute", right: 10, top: 8, backgroundColor: "white", borderColor: "black", color: "black", height: 30}}>
                Home
              </Button>
            </Table.Th>
            {/* <Table.Th>Job</Table.Th> */}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
