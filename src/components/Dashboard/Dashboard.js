// importing modules
import React, { Component } from 'react';
// importing components
import AutoComplete from '../AutoComplete/AutoComplete';

const Dashboard = () => (
    <div className="dashboard">
        <div className="dashboard__col">
            {/*AutoComplete Component version 1*/}
            <AutoComplete
                inputFieldStyles="autocomplete__input"
                dropDownItemStyles="dropdown__item"
                dropDownItemActiveStyles="dropdown__item--active"
            />
        </div>
        <div className="dashboard__col">
            {/*AutoComplete Component version 2*/}
            <AutoComplete
                inputFieldStyles="autocompleteV2__input"
                dropDownItemStyles="dropdownV2__item"
                dropDownItemActiveStyles="dropdownV2__item--active"
            />
        </div>
    </div>
)
export default Dashboard;



