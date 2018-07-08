
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Terminal } from 'xterm';

import classes from './style.css';
import Switch from 'components/Switch';
// import Avatar from 'components/Avatar';
// import helper from 'utils/helper';

@inject(stores => ({
    alwaysOnTop: stores.settings.alwaysOnTop,
    setAlwaysOnTop: stores.settings.setAlwaysOnTop,
    showOnTray: stores.settings.showOnTray,
    setShowOnTray: stores.settings.setShowOnTray,
    showNotification: stores.settings.showNotification,
    setShowNotification: stores.settings.setShowNotification,
    startup: stores.settings.startup,
    setStartup: stores.settings.setStartup,
    downloads: stores.settings.downloads,
    setDownloads: stores.settings.setDownloads,
    confirmImagePaste: stores.settings.confirmImagePaste,
    setConfirmImagePaste: stores.settings.setConfirmImagePaste,
    blockRecall: stores.settings.blockRecall,
    setBlockRecall: stores.settings.setBlockRecall,
    remeberConversation: stores.settings.remeberConversation,
    setRemeberConversation: stores.settings.setRemeberConversation,
    showRedIcon: stores.settings.showRedIcon,
    setShowRedIcon: stores.settings.setShowRedIcon,

    user: stores.session.user,
    logout: stores.session.logout,
    plugins: stores.settings.plugins,
}))
@observer
export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.terminal = React.createRef();
    }

    renderPlugins(plugins) {
        return plugins.map((e, index) => {
            return (
                <div
                    className={classes.plugin}
                    key={index}>
                    <img src={e.icon} />

                    <div className={classes.detail}>
                        <p>
                            <span>{e.name}</span>
                            <span className={classes.version}>{e.version}</span>
                        </p>
                        <p>
                            <a
                                href={e.link}
                                target="_bank">
                                View on Github
                            </a>
                        </p>
                        <div className={classes.description}>{e.description}</div>
                    </div>

                    <Switch defaultChecked={e.enabled} />
                </div>
            );
        });
    }

    // choiceDownloadDir() {
    //     this.refs.downloads.click();
    // }
    //
    componentDidMount() {
        this.initTerminal();
        // this.refs.downloads.webkitdirectory = true;
    }

    initTerminal() {
        var term = new Terminal();
        term.open(this.terminal.current);
        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
    }

    render() {
        return (
            <div className={classes.tcontainer}>
                <webview className={classes.terminal} src="http://192.168.1.105:1122/" autosize="on" />
            </div>
        );
    }
}
