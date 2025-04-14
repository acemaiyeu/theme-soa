// DescriptionComponent.jsx
import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // nhớ import CSS Quill

const DescriptionComponent = ({ value, onChange, onLoad }) => {
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current && onLoad) {
      const editor = quillRef.current.getEditor();
      onLoad(editor);
    }
  }, [onLoad]);

  return (
    <ReactQuill
      ref={quillRef}
      value={value ?? ""}
      onChange={(content) => {
        if (onChange) {
          onChange(content);
        }
      }}
      theme="snow"
      placeholder="Nhập mô tả ở đây..."
    />
  );
};

export default DescriptionComponent;
