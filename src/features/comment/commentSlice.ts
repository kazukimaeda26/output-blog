import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import firebase from "firebase/app";
import { db } from "../../firebase";


// commentの新規作成
export const createComment = async (
  blog_id: string,
  text: string
): Promise<void> => {
  try {
    const now = new Date();
    const dateTime = firebase.firestore.Timestamp.fromDate(now);
    await db.collection("blogs").doc(blog_id).collection("comments").add({
      text: text,
      createdAt: now.toLocaleString(),
      dateTime: dateTime,
    });
  } catch (err) {
    console.log("Error updating document:", err);
  }
};
