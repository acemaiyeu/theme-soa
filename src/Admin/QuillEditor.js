import { type } from "@testing-library/user-event/dist/type";
import React, { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import CSS theme
// import dynamic from "next/dynamic"; // nếu bạn dùng Next.js
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
    ["clean"],
  ],
};
function QuillEditor({ sendValue, getValue, type_code, onChange }) {
  const [value, setValue] = useState("");
  const quillRef = useRef(null); // 👈 thêm dòng này

  useEffect(() => {
    setValue(sendValue);
    handleEditorChange();
  });
  const handleEditorChange = () => {
    let check_val = localStorage.getItem("check_val");
    console.log("CHECKKKKKKKKKKKKKKK:", value);
    if (value != "" && check_val != value) {
      if (type_code == "DESCRIPTION") {
        getValue(value, type_code);
        console.log("Value gửi", value);
        localStorage.setItem("check_val", value);
      }
      if (type_code == "USED") {
        // getValue(value, type_code);
      }
    }
  };

  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={setValue}
      modules={modules}
    />
  );
}

export default QuillEditor;
