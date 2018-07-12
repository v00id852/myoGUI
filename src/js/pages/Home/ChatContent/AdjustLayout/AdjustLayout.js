import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classname';
import classes from "./style.css";

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/Card"
import Typography from "@material-ui/core/Typography"
import Input from "@material-ui/core/Input"
import InputLabel from "@material-ui/core/InputLabel"
import Select from "@material-ui/core/Select"
import MenuItem from "@material-ui/core/MenuItem"
import FormControl from "@material-ui/core/FormControl"



export default class AdjustLayout extends Component {
    static propTypes = {
        adjustLog: PropTypes.string,
        startAdjust: PropTypes.func,
        stopAdjust: PropTypes.func,
        mergeAdjust: PropTypes.func,
        logContent: PropTypes.string,
        backforward: PropTypes.func
        // runAdjust: PropTypes.func,
        // runAdjustStatus: PropTypes.bool,
        // stopAdjust: PropTypes.func,
        // stopAdjustStatus: PropTypes.bool,
        // mergeNewModel: PropTypes.func,
        // mergeNewModelStatus: PropTypes.bool
    };

    state = {
        word: '',
        count: 0,
        adjustState: true,
        stopAdjustState: false,
        mergeNewModel: false,
        backforward: false,
        hand: 1
    };

    handleOnChange = name => event => {
        this.setState({[name]: event.target.value})
    };

    runAdjust = () => {
        let isSuccess = this.props.startAdjust(this.state.word, this.state.count, this.state.hand);
        if (isSuccess) {
            this.setState({adjustState: false});
            this.setState({stopAdjustState: true});
            this.setState({mergeNewModel: false});
        }

    };

    stopAdjust = () => {
        this.setState({adjustState: true});
        this.setState({stopAdjustState: false});
        this.setState({mergeNewModel: true});
        this.props.stopAdjust();
    };

    mergeNewModel = () => {
        this.props.mergeAdjust();
        this.setState({backforward: true})
    };

    backforward = () => {
        this.props.backforward();
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
                    type="text"
                    fullWidth
                >
                </TextField>
                <div className={classes.textFieldContainer}>
                    <TextField
                        id="word"
                        label="矫正次数"
                        value={this.state.count}
                        onChange={this.handleOnChange('count')}
                        margin="normal"
                        type="number"
                    >
                    </TextField>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="hand-helper">矫正词类型</InputLabel>
                        <Select
                            value={this.state.hand}
                            onChange={this.handleOnChange('hand')}
                            input={<Input name="hand" id="hand-helper" />}
                        >
                            <MenuItem value={1}>单手</MenuItem>
                            <MenuItem value={2}>双手</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className={classes.buttonContainer}>
                    <Button variant="contained" color="primary"
                        disabled={!this.state.adjustState}
                        onClick={this.runAdjust}
                    >
                        启动自校准功能
                    </Button>
                    <Button variant="contained" color="primary"
                        disabled={!this.state.stopAdjustState}
                        onClick={this.stopAdjust}
                    >
                        停止自校准功能
                    </Button>
                </div>
                <div className={classes.buttonContainer}>
                    <Button variant="contained" color="primary"
                        disabled={!this.state.mergeNewModel}
                        onClick={this.mergeNewModel}
                    >
                        融合新模型
                    </Button>
                    <Button variant="contained" color="primary"
                        disabled={!this.state.backforward}
                        onClick={this.backforward}
                    >
                        回退新模型
                    </Button>
                </div>
                <Card className={classes.logCard}>
                    <CardContent className={classes.logCardContent}>
                        <Typography variant="headline" component="h2">
                            {this.props.logContent}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    };
}
