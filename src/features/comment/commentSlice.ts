import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import firebase from "firebase/app";
import { db } from "../../firebase";

export interface commentState {
  idCount: number;
  comments: {
    id: string;
    nickname: string;
    text: string;
    createdAt: string;
  }[];
}

const initialState: commentState = {
  idCount: 0,
  comments: [],
};

// commentの全件取得
export const fetchComments = createAsyncThunk(
  "comment/getAllComments",
  async (blogId: string) => {
    const res = await db
      .collection("blogs")
      .doc(blogId)
      .collection("comments")
      .orderBy("dateTime", "desc")
      .get();

    const allComments = res.docs.map((doc) => ({
      id: doc.id,
      nickname: doc.data().nickname,
      text: doc.data().text,
      createdAt: doc.data().createdAt,
    }));

    const commentNumber = allComments.length;
    const passData = { allComments, commentNumber };
    return passData;
  }
);

// commentの新規作成
export const createComment = async (
  blogId: string,
  text: string,
  nickname: string
): Promise<void> => {
  try {
    const now = new Date();
    const dateTime = firebase.firestore.Timestamp.fromDate(now);
    await db.collection("blogs").doc(blogId).collection("comments").add({
      text: text,
      nickname: nickname,
      createdAt: now.toLocaleString(),
      dateTime: dateTime,
    });
  } catch (err) {
    console.log("Error updating document:", err);
  }
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload.allComments;
    });
  },
});

export const allComments = (state: RootState): commentState["comments"] =>
  state.comment.comments;

export default commentSlice.reducer;
