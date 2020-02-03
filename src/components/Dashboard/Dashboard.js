// importing modules
import React, { Component } from 'react';
// importing components
import AutoComplete from '../AutoComplete/AutoComplete';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.state = { // initial state
            locations: [], // (api) locations array
            location: null, // location object (if needed for rendering)
            cursor: -1, // key press 
            input: '' // user input
        };
    }

    // method: handles api data fetching & user input
    handleLocationData = (e) => {
        e.preventDefault();
        this.setState({ input: e.target.value }) // set/get user input
        fetch(`https://coding-challenge.echoandapex.com/locations?q=${this.state.input}`, { // fetch data from api
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
                this.setState({ locations: [...data.predictions] }); // update state with api data
            })
            .catch((err) => console.log(err));
    }

    // method: handles arrow keys
    handleKeyDown = (e) => {
        const { cursor, locations } = this.state
        if (e.keyCode === 38 && cursor > 0) { // check if arrow key was pressed UP
            this.setState( prevState => ({ 
                cursor: prevState.cursor - 1, // update state to reflect current position of cursor
                input: locations[cursor-1].name // update input field (value) to current cursor selection
            }))
        } else if (e.keyCode === 40 && cursor < locations.length - 1) { // check if arrow key was pressed DOWN
            this.setState( prevState => ({
                cursor: prevState.cursor + 1, // update state to reflect current position of cursor
                input: locations[cursor+1].name // update input field (value) to current cursor selection
            }))
        }
    }

    // method: handles selection by "Enter" key or Mouse click
    handleLocationSelection = (e, id = null) => {
        if(e.key === 'Enter') { // check if the "Enter" key was pressed
            const locationToRender = this.state.locations.find((location, index) => index === this.state.cursor); // get location selection based on cursor position/key press 
            this.setState({ location: locationToRender, locations: [], input: locationToRender.name, cursor: -1 });
        } else if (id) { // check if the id is not null
            const locationToRender = this.state.locations.find((location) => location.id === id); // get location selection based on user click & location id
            this.setState({ location: locationToRender, locations: [],  input: locationToRender.name, cursor: -1 });
        }
    }

    render(){
        const { locations, cursor, input } = this.state; 

        return (
            <div>
                {/*AutoComplete Component version 1*/}
                <AutoComplete
                    handleLocationData={this.handleLocationData}
                    handleKeyDown={this.handleKeyDown}
                    handleLocationSelection={this.handleLocationSelection}
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
                    handleLocationSelection={this.handleLocationSelection}
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



