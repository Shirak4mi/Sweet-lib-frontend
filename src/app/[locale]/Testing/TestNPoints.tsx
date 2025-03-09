"use client";
import { AnimatedButton } from "@/components/ui/base";
import { useState, type ReactNode } from "react";

export default function TestNPoints(): ReactNode {
  const [userToken, setUserToken] = useState("");

  const ddata = "https://sad.medinet.com.do/files/get-one-by-id/67bf50d81c2d7ede9bf256c8";

  // Functions
  async function getLoginData() {
    try {
      const getTokenData = await fetch(ddata, {
        headers: {
          Authorization:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2JjYjI0NmIzNTI0MzIwNjMyZmVkN2QiLCJhcGlLZXkiOiJIY0w4bkVGbFhuaTRObU1CNXMyWnJNZDdKaFpVak1yUyIsImlhdCI6MTc0MDU5NjE2MywiZXhwIjoxNzcyMTMyMTYzfQ.0lMGENMJ6lqvMbUIErnsH22D0xa8BQCvEI6xOa3tQHo",
        },
      });

      console.log(getTokenData);
    } catch (e) {
      console.log(e);
    }
  }
  async function getFileData() {}
  async function getDownloadData() {}

  return (
    <div className="flex justify-center gap-20">
      <AnimatedButton onClick={getLoginData}>Login</AnimatedButton>
      <AnimatedButton onClick={getFileData}>Get File</AnimatedButton>
      <AnimatedButton onClick={getDownloadData}>Download File</AnimatedButton>
    </div>
  );
}
