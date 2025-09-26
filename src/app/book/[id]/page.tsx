"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
} from "@mui/material";
import type { Book } from "../../../types/book";

export default function BookDetailPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const getBook = async () => {
    const response = await fetch(`http://localhost:3000/api/books/${bookId}`);
    if (response.ok) {
      const data = await response.json();
      setBook(data.book);
    }
  };

  useEffect(() => {
    if (bookId) getBook();
  }, [bookId]);

  const handleUpdate = async () => {
    if (!book) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/books/${bookId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
      body: JSON.stringify(book),
    });
    setIsEditDialogOpen(false);
    getBook();
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this book?")) return;
    const token = localStorage.getItem("token");
    await fetch(`http://localhost:3000/api/books/${bookId}`, {
      method: "DELETE",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
    router.push("/");
  };

  if (!book) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="sm" sx={{ mt: 3 }}>
      <Stack spacing={2}>
        <Typography variant="h4">{book.title}</Typography>
        <Typography>{book.author}</Typography>
        <Typography>{book.description}</Typography>
        <Typography>Genre: {book.genre}</Typography>
        <Typography>Year: {book.year}</Typography>
        <Typography>Price: ${book.price}</Typography>
        <Typography color={book.available ? "green" : "red"}>
          {book.available ? "Available" : "Out of stock"}
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={() => setIsEditDialogOpen(true)}
          >
            Edit
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </Stack>
      </Stack>

      {/* Modal Edit Book */}
      <Modal
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
      >
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
            <Typography variant="h5">Edit Book</Typography>
            <TextField
              label="Title"
              value={book.title}
              onChange={(e) => setBook({ ...book, title: e.target.value })}
            />
            <TextField
              label="Author"
              value={book.author}
              onChange={(e) => setBook({ ...book, author: e.target.value })}
            />
            <TextField
              label="Description"
              multiline
              rows={3}
              value={book.description}
              onChange={(e) =>
                setBook({ ...book, description: e.target.value })
              }
            />
            <TextField
              label="Genre"
              value={book.genre}
              onChange={(e) => setBook({ ...book, genre: e.target.value })}
            />
            <TextField
              label="Year"
              type="number"
              value={book.year}
              onChange={(e) =>
                setBook({ ...book, year: parseInt(e.target.value) })
              }
            />
            <TextField
              label="Price"
              type="number"
              value={book.price}
              onChange={(e) =>
                setBook({ ...book, price: parseFloat(e.target.value) })
              }
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={book.available}
                  onChange={(e) =>
                    setBook({ ...book, available: e.target.checked })
                  }
                />
              }
              label="Available"
            />

            <Stack direction="row" spacing={2}>
              <Button
                variant="outlined"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </Container>
  );
}
