"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Modal,
  Stack,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  Card,
  CardContent,
} from "@mui/material";
import type { Book, BookResponse } from "../types/book";
import Link from "next/link";

export default function Home() {
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isNewDialogOpen, setIsNewDialogOpen] = useState(false);

  const [newBook, setNewBook] = useState<Omit<Book, "_id">>({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: new Date().getFullYear(),
    price: 0,
    available: true,
  });

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:3000/api/books");
    if (response.ok) {
      const data: BookResponse = await response.json();
      setBooksData(data.books);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleNewBook = async () => {
    const token = localStorage.getItem("token");
    await fetch("http://localhost:3000/api/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(newBook),
    });
    setIsNewDialogOpen(false);
    setNewBook({
      title: "",
      author: "",
      description: "",
      genre: "",
      year: new Date().getFullYear(),
      price: 0,
      available: true,
    });
    getData();
  };

  return (
    <Container maxWidth="md">
      <Stack direction="column" spacing={2} mt={3}>
        <Typography variant="h3" gutterBottom>
          Books Application
        </Typography>

        <Button variant="contained" onClick={() => setIsNewDialogOpen(true)}>
          ➕ Add New Book
        </Button>

        {isLoading && <Typography>Loading...</Typography>}

        {booksData.map((book) => (
          <Link href={`/book/${book._id}`} key={book._id}>
            <Card sx={{ mb: 2, cursor: "pointer" }}>
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {book.author} | {book.year}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: book.available ? "green" : "red" }}
                >
                  {book.available ? "Available" : "Out of stock"}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Stack>

      {/* Modal Create Book */}
      <Modal open={isNewDialogOpen} onClose={() => setIsNewDialogOpen(false)}>
        <Box
          sx={{
            p: 3,
            bgcolor: "background.paper",
            maxWidth: 500,
            mx: "auto",
            mt: 5,
            borderRadius: 2,
          }}
        >
          <Stack spacing={2}>
            <Typography variant="h5">Add New Book</Typography>
            <TextField
              label="Title"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
            />
            <TextField
              label="Author"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={newBook.description}
              onChange={(e) =>
                setNewBook({ ...newBook, description: e.target.value })
              }
            />
            <TextField
              label="Genre"
              value={newBook.genre}
              onChange={(e) =>
                setNewBook({ ...newBook, genre: e.target.value })
              }
            />
            <TextField
              label="Year"
              type="number"
              value={newBook.year}
              onChange={(e) =>
                setNewBook({ ...newBook, year: parseInt(e.target.value) })
              }
            />
            <TextField
              label="Price"
              type="number"
              value={newBook.price}
              onChange={(e) =>
                setNewBook({ ...newBook, price: parseFloat(e.target.value) })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={newBook.available}
                  onChange={(e) =>
                    setNewBook({ ...newBook, available: e.target.checked })
                  }
                />
              }
              label="Available"
            />

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => setIsNewDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={handleNewBook}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}
