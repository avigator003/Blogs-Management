import { default as React, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

import { EDITOR_JS_TOOLS } from "../constants";
import MainCard from 'components/MainCard';

const DEFAULT_INITIAL_DATA = () => {
  return {
    "time": new Date().getTime(),
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "This is my awesome editor!",
          "level": 1
        }
      },
    ]
  }
}
const EDITTOR_HOLDER_ID = 'editorjs';


const SamplePage = (props) => {
  const ejInstance = useRef();
  const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

   useEffect(()=>{
    console.log("data",editorData)
   },[editorData])

  // This will run only once
  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }
    return () => {
      ejInstance.current = null;
    }
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITTOR_HOLDER_ID,
      logLevel: "ERROR",
      data: editorData,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        let content = await editor.saver.save();
        // Put your logic here to save this data to your DB
        setEditorData(content);
      },
      autofocus: true,
      tools:EDITOR_JS_TOOLS
    });
  };

  return (
    <MainCard title="Sample Card">
      <div id={EDITTOR_HOLDER_ID}> </div>
      </MainCard>
  );
}

export default SamplePage;