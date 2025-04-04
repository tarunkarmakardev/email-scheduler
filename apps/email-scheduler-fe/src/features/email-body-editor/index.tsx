import ReactQuill from "react-quill";
import "./index.css";
import "react-quill/dist/quill.snow.css";

type EmailBodyEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function EmailBodyEditor({
  value,
  onChange,
}: EmailBodyEditorProps) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      className={`h-[300px] block editor`}
    />
  );
}
