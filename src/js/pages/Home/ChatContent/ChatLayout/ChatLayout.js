import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clazz from 'classname';

import classes from '../style.css';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

export default class ChatLayout extends Component {
    static propTypes = {
        user: PropTypes.object,
        messages: PropTypes.object,
        chatTo: PropTypes.func,
        isCloseChat: PropTypes.bool
    };

    renderMessages(list, from) {
        return list.data.map((e, index) => {
            let message = e;
            let user = from;
            var type = message.MsgType;

            if ([
                // WeChat system message
                10000,
                // Custome message
                19999
            ].includes(type)) {
                return (
                    <div
                        key={index}
                        className={clazz('unread', classes.message, classes.system)}
                        dangerouslySetInnerHTML={{__html: e.Content}} />
                );
            }

            if (!user) {
                return false;
            }

            return (
                <div className={clazz('unread', classes.message, {
                    // File is uploading
                    // [classes.uploading]: message.uploading === true,

                    [classes.isme]: message.isme,
                    [classes.isText]: type === 1,
                    [classes.isLocation]: type === 1 && message.location,
                    [classes.isImage]: type === 3,
                    [classes.isEmoji]: type === 47 || type === 49 + 8,
                    [classes.isVoice]: type === 34,
                    [classes.isContact]: type === 42,
                    [classes.isVideo]: type === 43,

                    // App messages
                    [classes.appMessage]: [49 + 2000, 49 + 17, 49 + 6].includes(type),
                    [classes.isTransfer]: type === 49 + 2000,
                    [classes.isLocationSharing]: type === 49 + 17,
                    [classes.isFile]: type === 49 + 6,
                })} key={index}>
                    <div>
                        {/* <Avatar */}
                        {/* src={message.isme ? message.HeadImgUrl : user.HeadImgUrl} */}
                        {/* className={classes.avatar} */}
                        {/* onClick={ev => this.props.showUserinfo(message.isme, user)}  /> */}

                        <p className={classes.username} dangerouslySetInnerHTML={{__html: message.nickname}} />

                        <div className={classes.content}>
                            <p
                                onContextMenu={e => this.showMessageAction(message)}
                                // dangerouslySetInnerHTML={{__html: this.getMessageContent(message)}}
                                dangerouslySetInnerHTML={{__html: message.Content}} />

                            {/* <span className={classes.times}>{ moment(message.CreateTime * 1000).fromNow() }</span> */}
                        </div>
                    </div>
                </div>
            );
        });
    };

    clearMessages = () => {
        var list = this.props.messages.set(this.props.user.UserName);
        list.data = [];
        this.props.chatTo(this.props.user)

    };

    componentDidUpdate() {
        var viewport = this.refs.viewport;
        var tips = this.refs.tips;

        if (viewport) {
            let newestMessage = this.props.messages.get(this.props.user.UserName).data.slice(-1)[0];

            // Scroll to bottom when you sent message
            if (newestMessage) {
                viewport.scrollTop = viewport.scrollHeight;
            }

            // // Show the unread messages count
            // if (viewport.scrollTop < this.scrollTop) {
            //     let counter = viewport.querySelectorAll(`.${classes.message}.unread`).length;
            //
            //     if (counter) {
            //         tips.innerHTML = `You has ${counter} unread messages.`;
            //         tips.classList.add(classes.show);
            //     }
            //     return;
            // }
            //
            // // Auto scroll to bottom when message has been loaded
            // Array.from(images).map(e => {
            //     on(e, 'load', ev => {
            //         off(e, 'load');
            //         e.classList.remove('unload');
            //         viewport.scrollTop = viewport.scrollHeight;
            //         this.scrollTop = viewport.scrollTop;
            //     });
            //
            //     on(e, 'error', ev => {
            //         var fallback = ev.target.dataset.fallback;
            //
            //         if (fallback === 'undefined') {
            //             fallback = 'assets/images/broken.png';
            //         }
            //
            //         ev.target.src = fallback;
            //         ev.target.removeAttribute('data-fallback');
            //
            //         off(e, 'error');
            //     });
            // });
            //
            // // Hide the unread message count
            // tips.classList.remove(classes.show);
            // viewport.scrollTop = viewport.scrollHeight;
            // this.scrollTop = viewport.scrollTop;
            //
            // // Mark message has been loaded
            // Array.from(viewport.querySelectorAll(`.${classes.message}.unread`)).map(e => e.classList.remove('unread'));
        }
    }


    render() {
        var title = this.props.user.NickName;
        return (
            <div className={classes.chatContainer}>
                <div
                    className={clazz(classes.container, {
                        [classes.hideConversation]: false,
                    })}
                    onClick={e => this.handleClick(e)}>
                    {
                        (!this.props.isCloseChat && this.props.user) ? (
                            <div>
                                <header>
                                    <div className={classes.info}>
                                        <p
                                            dangerouslySetInnerHTML={{__html: title}}
                                            title={title} />
                                    </div>

                                    <i
                                        className="icon-ion-android-more-vertical"
                                        onClick={() => this.showMenu()} />
                                </header>

                                <div
                                    className={classes.messages}
                                    ref="viewport">
                                    {
                                        this.renderMessages(this.props.messages.get(this.props.user.UserName), this.props.user)
                                    }
                                </div>
                            </div>
                        ) : (
                            <div className={clazz({
                                [classes.noselected]: !this.props.user,
                            })}>
                                <img
                                    className="disabledDrag"
                                    src="assets/images/noselected.png" />
                                { this.props.isCloseChat ?
                                    (<h1>对话已关闭</h1>) :
                                    (<h1>没有选择功能</h1>)
                                }
                            </div>
                        )
                    }
                </div>
                <IconButton aria-label="Delete" onClick={this.clearMessages}>
                    <DeleteIcon />
                </IconButton>
            </div>
        );
    }
}
