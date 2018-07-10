import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classname';
import classes from "./style.css";

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"


export default class AdjustLayout extends Component {
    static propTypes = {
        shellUrl: PropTypes.string
    };

    state = {
        word: '',
        count: 0
    };

    handleOnChange = name => event => {
        this.setState({[name]: event.target.value})
    };

    render() {
        return (
            <div className={classes.adjustContainer}>
                <TextField
                    id="word"
                    label="要矫正的词"
                    value={this.state.word}
                    onChange={this.handleOnChange('word')}
                    margin="normal"
                    fullWidth
                >
                </TextField>
                <TextField
                    id="word"
                    label="矫正次数"
                    value={this.state.count}
                    onChange={this.handleOnChange('count')}
                    margin="normal"
                >
                </TextField>
                <Button />
            </div>
        );
    };
}
