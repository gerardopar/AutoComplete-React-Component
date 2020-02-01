// importing modules
import React from 'react';

const dropDownItem = ({ 
    cursor, description, 
    id, index, 
    name, handleLocationDescription,
    dropDownItemActiveStyles, dropDownItemStyles
}) => (
    <li
    onClick={() => handleLocationDescription(id)}
    className={cursor === index 
        ? `${dropDownItemActiveStyles}` 
        : `${dropDownItemStyles}`}
    key={index}
    >
        <p>{name}</p>
        <p>{description}</p>
    </li>
);

export default dropDownItem;