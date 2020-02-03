// importing modules
import React from 'react';
// importing components 
import DropDownItem from '../DropDownItem/DropDownItem';

const autoComplete = (props) => (
    <div className="autocomplete">
        <input 
            onChange={props.handleLocationData}
            onKeyDown={props.handleKeyDown}
            onKeyPress={props.handleLocationSelection}
            autoComplete="off"
            className={`${props.inputFieldStyles}`}
            placeholder="Search Location"
            value={props.input}
            type='text'
        />
        <ul className="dropdown">
        {
            props.input.length > 0 
                ? props.locations.map((location, index) => (
                <DropDownItem 
                    cursor={props.cursor}
                    index={index}
                    key={location.id} 
                    {...location}
                    handleLocationSelection={props.handleLocationSelection}
                    dropDownItemStyles={props.dropDownItemStyles}
                    dropDownItemActiveStyles={props.dropDownItemActiveStyles}
                />)) : null
        }
        </ul>
    </div>
);

export default autoComplete;