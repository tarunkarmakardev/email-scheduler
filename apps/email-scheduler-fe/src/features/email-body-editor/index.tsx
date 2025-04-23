import "./index.css";
import "react-quill-new/dist/quill.snow.css";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

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
