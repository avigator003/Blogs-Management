import api from '../../axios/api';
import React, { useEffect, useState } from 'react';

const ViewBlog = () => {

    const [blocks, setBlocks] = useState()
    const[loading, setLoading] =useState(false)

    useEffect(()=>{
        getBlogData();
    },[])

    const getBlogData = () => {
        api
            .get(`/blog/list`)
            .then((response) => {
                setLoading(true);
                console.log("het",response.data.data[0].blog_data)
                setBlocks(response.data.data[0].blog_data)
                return response.data;
            })
            .catch((error) => {
                throw new Error(error);
            });
    }


    const renderBlocks = () => {
        return blocks.map((block) => {
            switch (block.type) {
                case 'header':
                    return <h1>{block.data.text}</h1>;
                case 'paragraph':
                    return <p>{block.data.text}</p>;
                case 'table':
                    return renderTable(block.data);
                case 'code':
                    return <pre>{block.data.code}</pre>;
                default:
                    return null;
            }
        });
    };

    const renderTable = (tableData) => {
        const rows = tableData.content.map((row, rowIndex) => {
            const cells = row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ));
            return <tr key={rowIndex}>{cells}</tr>;
        });

        return <table>{rows}</table>;
    };

    return  loading && <div>{renderBlocks()}</div>;
      
};

export default ViewBlog;
