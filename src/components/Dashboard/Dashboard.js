// importing modules
import React, { Component } from 'react';
// importing components
import AutoComplete from '../AutoComplete/AutoComplete';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = { // initial state
            locations: [],
            location: null,
            cursor: -1,
            input: ''
        };
    }

    // method: handles api data fetching & user input
    handleLocationData = (e) => {
        e.preventDefault();
        this.setState({ input: e.target.value })
        fetch(`https://coding-challenge.echoandapex.com/locations?q=${this.state.input}`, {
                method: 'GET'
            })
            .then((res) => {
                if (res.status !== 200) {
                    console.log('Error!');
                    throw new Error('Could not reach API endpoint.');
                }
                return res.json();
            })
            .then((data) => {
                this.setState({ locations: [...data.predictions] });
            })
            .catch((err) => console.log(err));
    }

    // method: handles mouse selection
    handleLocationDescription = (id) => {
        const locationToRender = this.state.locations.find((location) => location.id === id);
        this.setState({ location: locationToRender, locations: [],  input: locationToRender.name, cursor: -1 });
    }

    // method: handles arrow keys
    handleKeyDown = (e) => {
        const { cursor, locations } = this.state
        // arrow up/down button should select next/previous list element
        if (e.keyCode === 38 && cursor > 0) {
            this.setState( prevState => ({
                cursor: prevState.cursor - 1,
                input: locations[cursor-1].name
            }))
        } else if (e.keyCode === 40 && cursor < locations.length - 1) {
            this.setState( prevState => ({
                cursor: prevState.cursor + 1,
                input: locations[cursor+1].name
            }))
        }
    }

    // method: handles keyPress "Enter"
    handleEnterPress = (event) => {
        const locationToRender = this.state.locations.find((location, index) => index === this.state.cursor);
        if(event.key === 'Enter') this.setState({ location: locationToRender, locations: [], input: locationToRender.name, cursor: -1 });
    }

    render(){
        const { locations, cursor, input } = this.state; 

        return (
            <div>
                {/*AutoComplete Component version 1*/}
                <AutoComplete
                    handleLocationData={this.handleLocationData}
                    handleKeyDown={this.handleKeyDown}
                    handleEnterPress={this.handleEnterPress}
                    handleLocationDescription={this.handleLocationDescription}
                    cursor={cursor}
                    input={input}
                    locations={locations}
                    inputFieldStyles="autocomplete__input"
                    dropDownItemStyles="dropdown__item"
                    dropDownItemActiveStyles="dropdown__item--active"
                />
                {/*AutoComplete Component version 2*/}
                <AutoComplete
                    handleLocationData={this.handleLocationData}
                    handleKeyDown={this.handleKeyDown}
                    handleEnterPress={this.handleEnterPress}
                    handleLocationDescription={this.handleLocationDescription}
                    cursor={cursor}
                    input={input}
                    locations={locations}
                    inputFieldStyles="autocompleteV2__input"
                    dropDownItemStyles="dropdownV2__item"
                    dropDownItemActiveStyles="dropdownV2__item--active"
                />
            </div>
        )
    }
};

export default Dashboard;



