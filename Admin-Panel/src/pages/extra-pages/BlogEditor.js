import { default as React, useEffect, useRef } from 'react';
import EditorJS from '@editorjs/editorjs';

import { EDITOR_JS_TOOLS } from "../constants";
import MainCard from 'components/MainCard';

import { Button } from '../../../node_modules/@mui/material/index';
import api from '../../axios/api';

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


const BlogEditor = (props) => {
  const ejInstance = useRef();
  const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

   const submitBlog = (status) =>{
    console.log("data",status,editorData)
    api
    .post(`/blog/create`,{blogData:editorData.blocks,status:status})
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw new Error(error);
    });

   } 

  useEffect(() => {
    console.log("data", editorData)
  }, [editorData])

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
      tools: EDITOR_JS_TOOLS
    });
  };

  return (
    <MainCard title="Chinu's Blog">
      <div id={EDITTOR_HOLDER_ID}> </div>
      <div>
        <Button
          disableElevation
          size="large"
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginRight: 10 }}
          onClick={()=>submitBlog("Draft")}
        >
          Save Draft
        </Button>
        <Button
          disableElevation
          size="large"
          type="submit"
          variant="contained"
          color="success"
          style={{ marginRight: 10 }}
          onClick={()=>submitBlog("Publish")}
        >
          Publish
        </Button>
        <Button
          disableElevation
          size="large"
          type="submit"
          variant="contained"
          color="warning"
          style={{ marginRight: 10 }}
        >
          Preview
        </Button>
      </div>
    </MainCard>
  );
}

export default BlogEditor;