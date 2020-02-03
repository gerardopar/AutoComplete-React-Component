// importing modules
import React, { Component } from 'react';
// importing components 
import DropDownItem from '../DropDownItem/DropDownItem';

class AutoComplete extends Component {
    constructor(props){
        super(props);
        this.state = { // initial state
            locations: [], // (api) locations array
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
            this.setState({ locations: [], input: locationToRender.name, cursor: -1 });
        } else if (id) { // check if the id is not null
            const locationToRender = this.state.locations.find((location) => location.id === id); // get location selection based on user click & location id
            this.setState({ locations: [],  input: locationToRender.name, cursor: -1 });
        }
    }

    render(){
        const { locations, cursor, input } = this.state; 

        return (
            <div className="autocomplete">
                <input 
                    onChange={this.handleLocationData}
                    onKeyDown={this.handleKeyDown}
                    onKeyPress={this.handleLocationSelection}
                    autoComplete="off"
                    className={`${this.props.inputFieldStyles}`}
                    placeholder="Search Location"
                    value={input}
                    type='text'
                />
                <ul className="dropdown">
                {
                    input.length > 0 
                        ? locations.map((location, index) => (
                        <DropDownItem 
                            cursor={cursor}
                            index={index}
                            key={location.id} 
                            {...location}
                            handleLocationSelection={this.handleLocationSelection}
                            dropDownItemStyles={this.props.dropDownItemStyles}
                            dropDownItemActiveStyles={this.props.dropDownItemActiveStyles}
                        />)) : null
                }
                </ul>
            </div>
        )
    }
}

export default AutoComplete;