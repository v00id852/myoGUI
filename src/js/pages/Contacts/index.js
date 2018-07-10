
import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { observer, inject } from 'mobx-react';
import randomColor from 'randomcolor';

import classes from './style.css';

@inject(stores => ({
    filter: stores.contacts.filter,
    filtered: stores.contacts.filtered,
    getContats: stores.contacts.getContats,
    showUserinfo: stores.userinfo.toggle,
    onRunMainButtonClick: stores.control.onRunMainButtonClick,
    onRunMainWithNewModelButtonCilck: stores.control.onRunMainWithNewModelButtonClick,
    onStopMainButtonClick: stores.control.onStopMainButtonClick,
    onRecovery: stores.control.onRecovery,
    MainButtonStatus: stores.control.RunMainButtonStatus,
    RunMainButtonWithNewModelStatus: stores.control.RunMainButtonWithNewModelStatus,
    StopButtonStatus: stores.control.StopMainButtonStatus,
    RecoveryButtonStatus: stores.control.RecoveryButtonStatus
}))
@observer
export default class Contacts extends Component {

    onRecovery = () => {

    };

    renderColumns(data, index) {
        var list = data.filter((e, i) => i % 3 === index);

        return list.map((e, index) => {
            return (
                <div
                    className={classes.group}
                    key={index}>
                    <div className={classes.header}>
                        <label>{e.prefix}</label>

                        <span>{e.list.length} people</span>
                        <span style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            height: 4,
                            width: '100%',
                            background: randomColor(),
                        }} />
                    </div>

                    <div className={classes.list}>
                        {
                            e.list.map((e, index) => {
                                return (
                                    <div
                                        className={classes.item}
                                        key={index}
                                        onClick={() => this.props.showUserinfo(true, e)}>
                                        <div className={classes.avatar}>
                                            <img
                                                src={e.HeadImgUrl}
                                                style={{
                                                    height: 32,
                                                    width: 32,
                                                }} />
                                        </div>
                                        <div className={classes.info}>
                                            <p
                                                className={classes.username}
                                                dangerouslySetInnerHTML={{__html: e.RemarkName || e.NickName}} />
                                            <p
                                                className={classes.signature}
                                                dangerouslySetInnerHTML={{__html: e.Signature || 'No Signature'}} />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            );
        });
    }

    componentWillMount() {
        this.props.filter();
    }

    render() {
        var {
            onRunMainButtonClick,
            onRunMainWithNewModelButtonCilck,
            onStopMainButtonClick,
            onRecovery,
            MainButtonStatus,
            RunMainButtonWithNewModelStatus,
            StopButtonStatus,
            RecoveryButtonStatus
        } = this.props;
        // var { query, result } = this.props.filtered;
        //
        // if (query && result.length === 0) {
        //     return (
        //         <div className={clazz(classes.container, classes.notfound)}>
        //             <div className={classes.inner}>
        //                 <img src="assets/images/crash.png" />
        //                 <h1>Can't find any people matching '{query}'</h1>
        //             </div>
        //         </div>
        //     );
        // }

        return (
            <div className={classes.container}>
                <div className={classes.row}>
                    <Button classesName={classes.button} variant="contained" color="primary"
                            onClick={onRunMainButtonClick}
                            disabled={!MainButtonStatus}
                    >
                        运行主项目
                    </Button>

                    <Button classesName={classes.button} variant="contained" color="primary"
                            onClick={onRunMainWithNewModelButtonCilck}
                            disabled={!RunMainButtonWithNewModelStatus}
                    >
                        运行使用新模型的主项目
                    </Button>

                    <Button classesName={classes.button} variant="contained" color="primary"
                            onClick={onStopMainButtonClick}
                            disabled={!StopButtonStatus}
                    >
                        停止主项目
                    </Button>
                </div>
                <div className={classes.row}>
                    <Button classesName={classes.button} variant="contained" color="primary"
                            onClick={onRecovery}
                            disabled={!RecoveryButtonStatus}
                    >
                        恢复出厂设置
                    </Button>
                </div>
            </div>
        );
    }
}
