"use-client";

const Editor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

import dynamic from "next/dynamic";
import { useRef, useState } from "react";

interface TextEditorProps {
  onChange: (content: string) => void;
}

const TextEditor: React.FC<TextEditorProps> = ({ onChange }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    onChange(newContent);
  };

  // const config2 = {
  //   useSearch: false,
  //   spellcheck: false,
  //   enter: "p" as const,
  //   defaultMode: 1,
  //   toolbarAdaptive: false,
  //   toolbarSticky: false,
  //   showCharsCounter: false,
  //   showWordsCounter: false,
  //   showXPathInStatusbar: false,
  //   askBeforePasteHTML: false,
  //   askBeforePasteFromWord: false,
  //   minHeight: 100,

  //   // buttons:
  //   //   'paragraph,bold,strikethrough,underline,italic,|,superscript,subscript,|,ul,ol,|,|,font,fontsize,brush,,link,|,align,undo,redo',
  //   buttons: "bold,underline,italic,|,ul,ol",
  //   editorCssClass: "alic",
  //   placeHolder: "",
  //   controls: {
  //     fontsize: {
  //       list: [
  //         "8",
  //         "9",
  //         "10",
  //         "11",
  //         "12",
  //         "14",
  //         "16",
  //         "18",
  //         "24",
  //         "30",
  //         "36",
  //         "48",
  //         "60",
  //         "72",
  //         "96",
  //         "100",
  //       ],
  //     },
  //     font: {
  //       command: "fontname",
  //       list: {
  //         "": "Default",
  //         "'Open Sans',sans-serif": "Open Sans",
  //         "Helvetica,sans-serif": "Helvetica",
  //         "Arial,Helvetica,sans-serif": "Arial",
  //         "Georgia,serif": "Georgia",
  //         "Impact,Charcoal,sans-serif": "Impact",
  //         "Tahoma,Geneva,sans-serif": "Tahoma",
  //         "'Times New Roman',Times,serif": "Times New Roman",
  //         "Verdana,Geneva,sans-serif": "Verdana",
  //       },
  //     },
  //   },
  // };

  return <Editor value={content} onChange={handleContentChange} />;
};
export default TextEditor;
