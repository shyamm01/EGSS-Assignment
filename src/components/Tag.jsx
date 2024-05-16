import React from "react";

import "./Tag.css";

const Tag = ({ tagName, selectTag, selected }) => {
    const tagStyle = {
        High: { backgroundColor: "Red", color: '#fff' },
        Medium: { backgroundColor: "yellow", color: '#fff' },
        Low: { backgroundColor: "Orange", color: '#fff' },
    };
    return (
        <button
            type='button'
            className='tag'
            style={selected ? tagStyle[tagName] : tagStyle.default}
            onClick={() => selectTag(tagName)}>
            {tagName}
        </button>
    );
};

export default Tag;
