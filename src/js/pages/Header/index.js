
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { inject, observer } from 'mobx-react';
import classes from './style.css';

@inject(
    stores => ({
        wsState: stores.session.wsState,
        wsConnection: stores.session.connection,
        connectWs: stores.session.connectWs
    })
)

@observer
export default class Header extends Component {
    getTitle() {
        switch (this.props.location.pathname) {
            case '/contacts':
                return '控制界面';

            case '/settings':
                return '控制终端';

            default:
                return 'Myo手环GUI界面';
        }
    }

    toggleWs = () => {
        // 连接ws或者关闭ws
        console.log("click");
        if (!this.props.wsConnection){
            this.props.connectWs();
            return;
        }

        if (this.props.wsConnection && this.props.wsState === false){
            this.props.wsConnection.open();
            return;
        }
        if (this.props.wsConnection && this.props.wsState === true){
            this.props.wsConnection.close();
        }


    };

    render() {
        return (
            <header>
                <div className={classes.wsheader} onClick={this.toggleWs}>
                    {this.getTitle()}
                    &nbsp;
                    { this.props.wsState ? (
                        <FontAwesomeIcon icon="circle" color="green"/>
                    ) : (
                        <FontAwesomeIcon icon="circle" color="red" />
                    )}
                </div>
            </header>
        );
    }
}
