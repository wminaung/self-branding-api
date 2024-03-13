import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useEffect } from "react";

const fetchData = () => {
  return new Promise((resolve, reject) => {
    const promises = [
      fetch(`http://localhost:3000/api/blogs`).then((resB) => resB.json()),
      fetch(`http://localhost:3000/api/products`).then((resP) => resP.json()),
    ];

    Promise.all(promises)
      .then((results) => {
        resolve(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        reject(error);
      });
  });
};

export default function Home() {
  fetchData()
    .then((result) => {
      console.log("Data fetched successfully:", result);
    })
    .catch((error) => {
      console.error("Error in data fetching:", error);
    });

  return (
    <main>
      <Button variant="contained" color="warning">
        myBtn
      </Button>
    </main>
  );
}
