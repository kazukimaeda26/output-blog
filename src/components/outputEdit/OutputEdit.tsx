import React from "react";
import { useParams } from "react-router-dom";

const OutputEdit: React.FC = () => {
  interface paramTypes {
    blogId: string;
  }
  const { blogId } = useParams<paramTypes>();
  console.log(blogId);
  return (
    <>
      <div>blogIdです{blogId}</div>
    </>
  );
};

export default OutputEdit;
