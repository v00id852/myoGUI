
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import classes from './style.css';
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
    // choiceDownloadDir() {
    //     this.refs.downloads.click();
    // }
    //
    componentDidMount() {
        this.refs.terminal.focus();
        // this.refs.downloads.webkitdirectory = true;
    }

    render() {
        return (
            <div className={classes.tcontainer}>
                <webview className={classes.terminal} ref="terminal" id="terminal" src="http://192.168.8.101:1122/" autosize="on" />
            </div>
        );
    }
}
