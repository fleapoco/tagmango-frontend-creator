"use-client";

const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

const TextEditor = ({
  onChange,
}: {
  onChange: (newContent: string) => void;
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config2 = {
    useSearch: false,
    spellcheck: false,
    enter: "p" as const,
    defaultMode: 1,
    toolbarAdaptive: false,
    toolbarSticky: false,
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    minHeight: 100,

    // buttons:
    //   'paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,|,font,fontsize,brush,,link,|,align,undo,redo',
    buttons: "bold,underline,italic,|,ul,ol",
    editorCssClass: "alic",
    placeHolder: "",
    controls: {
      fontsize: {
        list: [
          "8",
          "9",
          "10",
          "11",
          "12",
          "14",
          "16",
          "18",
          "24",
          "30",
          "36",
          "48",
          "60",
          "72",
          "96",
          "100",
        ],
      },
      font: {
        command: "fontname",
        list: {
          "": "Default",
          "'Open Sans',sans-serif": "Open Sans",
          "Helvetica,sans-serif": "Helvetica",
          "Arial,Helvetica,sans-serif": "Arial",
          "Georgia,serif": "Georgia",
          "Impact,Charcoal,sans-serif": "Impact",
          "Tahoma,Geneva,sans-serif": "Tahoma",
          "'Times New Roman',Times,serif": "Times New Roman",
          "Verdana,Geneva,sans-serif": "Verdana",
        },
      },
    },
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config2}
      // tabIndex={1}  -- Commented as it doesn't exist and build failed
      onBlur={(newContent) => setContent(newContent)}
      // buttons={false}  -- Commented as it doesn't exist and build failed
      onChange={(newContent) => onChange(newContent)}
    />
  );
};
export default TextEditor;
