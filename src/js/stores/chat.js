
import { observable, action } from 'mobx';
import axios from 'axios';
import { ipcRenderer } from 'electron';

import storage from 'utils/storage';
import helper from 'utils/helper';
import contacts from './contacts';
// import settings from './settings';
import session from './session';
// import members from './members';
import snackbar from './snackbar';

// async function resolveMessage(message) {
//     var auth = await storage.get('auth');
//     var isChatRoom = helper.isChatRoom(message.FromUserName);
//     var content = (isChatRoom && !message.isme) ? message.Content.split(':<br/>')[1] : message.Content;
//
//     switch (message.MsgType) {
//         case 1:
//             // Text message and Location
//             if (message.Url && message.OriContent) {
//                 // This message is a location
//                 let parts = message.Content.split(':<br/>');
//                 let location = helper.parseKV(message.OriContent);
//
//                 location.image = `${axios.defaults.baseURL}${parts[(isChatRoom && !message.isme) ? 2 : 1]}`.replace(/\/+/g, '/');
//                 location.href = message.Url;
//
//                 message.location = location;
//             };
//             break;
//         case 3:
//             // Image
//             let image = helper.parseKV(content);
//             image.src = `${axios.defaults.baseURL}cgi-bin/mmwebwx-bin/webwxgetmsgimg?&msgid=${message.MsgId}&skey=${auth.skey}`;
//             message.image = image;
//             break;
//
//         case 34:
//             // Voice
//             let voice = helper.parseKV(content);
//             voice.src = `${axios.defaults.baseURL}cgi-bin/mmwebwx-bin/webwxgetvoice?&msgid=${message.MsgId}&skey=${auth.skey}`;
//             message.voice = voice;
//             break;
//
//         case 47:
//             // External emoji
//             if (!content) break;
//
//             {
//                 let emoji = helper.parseKV(content);
//
//                 emoji.src = `${axios.defaults.baseURL}cgi-bin/mmwebwx-bin/webwxgetmsgimg?&msgid=${message.MsgId}&skey=${auth.skey}`;
//                 message.emoji = emoji;
//             }
//             break;
//
//         case 42:
//             // Contact
//             let contact = message.RecommendInfo;
//
//             contact.image = `${axios.defaults.baseURL}cgi-bin/mmwebwx-bin/webwxgeticon?seq=0&username=${contact.UserName}&skey=${auth.skey}&msgid=${message.MsgId}`;
//             contact.name = contact.NickName;
//             contact.address = `${contact.Province || 'UNKNOW'}, ${contact.City || 'UNKNOW'}`;
//             message.contact = contact;
//             break;
//
//         case 43:
//             // Video
//             let video = {
//                 cover: `${axios.defaults.baseURL}cgi-bin/mmwebwx-bin/webwxgetmsgimg?&MsgId=${message.MsgId}&skey=${auth.skey}&type=slave`,
//                 src: `${axios.defaults.baseURL}cgi-bin/mmwebwx-bin/webwxgetvideo?msgid=${message.MsgId}&skey=${auth.skey}`,
//             };
//
//             message.video = video;
//             break;
//
//         case 49:
//             switch (message.AppMsgType) {
//                 case 2000:
//                     // Transfer
//                     let { value } = helper.parseXml(message.Content, 'des');
//
//                     message.MsgType += 2000;
//                     message.transfer = {
//                         desc: value.des,
//                         money: +value.match(/[\d.]+元/)[0].slice(0, -1),
//                     };
//                     break;
//
//                 case 17:
//                     // Location sharing...
//                     message.MsgType += 17;
//                     break;
//
//                 case 6:
//                     // Receive file
//                     let file = {
//                         name: message.FileName,
//                         size: message.FileSize,
//                         mediaId: message.MediaId,
//                         extension: (message.FileName.match(/\.\w+$/) || [])[0],
//                     };
//
//                     file.uid = await helper.getCookie('wxuin');
//                     file.ticket = await helper.getCookie('webwx_data_ticket');
//                     file.download = `${axios.defaults.baseURL.replace(/^https:\/\//, 'https://file.')}cgi-bin/mmwebwx-bin/webwxgetmedia?sender=${message.FromUserName}&mediaid=${file.mediaId}&filename=${file.name}&fromuser=${file.uid}&pass_ticket=undefined&webwx_data_ticket=${file.ticket}`;
//
//                     message.MsgType += 6;
//                     message.file = file;
//                     message.download = {
//                         done: false,
//                     };
//                     break;
//
//                 case 8:
//                     // Animated emoji
//                     if (!content) break;
//
//                     {
//                         let emoji = helper.parseKV(content) || {};
//
//                         emoji.src = `${axios.defaults.baseURL}cgi-bin/mmwebwx-bin/webwxgetmsgimg?&msgid=${message.MsgId}&skey=${auth.skey}&type=big`;
//                         message.MsgType += 8;
//                         message.emoji = emoji;
//                     }
//                     break;
//
//                 default:
//                     console.error('Unknow app message: %o', Object.assign({}, message));
//                     message.Content = `收到一条暂不支持的消息类型，请在手机上查看（${message.FileName || 'No Title'}）。`;
//                     message.MsgType = 19999;
//                     break;
//             }
//             break;
//
//         case 10002:
//             let text = isChatRoom ? message.Content.split(':<br/>').slice(-1).pop() : message.Content;
//             let { value } = helper.parseXml(text, ['replacemsg', 'msgid']);
//
//             if (!settings.blockRecall) {
//                 self.deleteMessage(message.FromUserName, value.msgid);
//             }
//
//             message.Content = value.replacemsg;
//             message.MsgType = 19999;
//             break;
//
//         case 10000:
//             let userid = message.FromUserName;
//
//             // Refresh the current chat room info
//             if (helper.isChatRoom(userid)) {
//                 let user = await contacts.getUser(userid);
//
//                 if (userid === self.user.UserName) {
//                     self.chatTo(user);
//                 }
//
//                 if (members.show
//                     && members.user.UserName === userid) {
//                     members.toggle(true, user);
//                 }
//             }
//             break;
//
//         default:
//             // Unhandle message
//             message.Content = 'Unknow message type: ' + message.MsgType;
//             message.MsgType = 19999;
//     }
//
//     return message;
// }
//
// function hasUnreadMessage(messages) {
//     var counter = 0;
//
//     messages.keys().map(e => {
//         var item = messages.get(e);
//
//         counter += (item.data.length - item.unread);
//     });
//
//     ipcRenderer.send('message-unread', {
//         counter,
//     });
// }

async function updateMenus({ conversations = [], contacts = [] }) {
    ipcRenderer.send('menu-update', {
        conversations: conversations.map(e => ({
            id: e.UserName,
            name: e.RemarkName || e.NickName,
            avatar: e.HeadImgUrl,
        })),
        contacts: contacts.map(e => ({
            id: e.UserName,
            name: e.RemarkName || e.NickName,
            avatar: e.HeadImgUrl,
        })),
        cookies: await helper.getCookie(),
    });
}

class Chat {
    menu = [
        {
            'HeadImgUrl': 'comment',
            'RemarkName': '聊天',
            'UserName': '聊天',
            'NickName': '聊天'
        },
        {
            'HeadImgUrl': 'wrench',
            'RemarkName': '矫正',
            'UserName': '矫正'
        },
    ];
    @observable sessions = this.menu;
    @observable messages = new Map();
    @observable user = false;
    @observable showConversation = true;
    @observable isconnected = false;
    @observable isCloseChat = false;

    @action startChat() { self.isCloseChat = false;}
    @action closeChat() { self.isCloseChat = true; }

    @action toggleConversation(show = !self.showConversation) {
        self.showConversation = show;
    }

    @action chatTo(user, onTop) {
        // var sessions = self.sessions;
        // var stickyed = [];
        // var normaled = [];
        // var index = self.sessions.findIndex(e => e.UserName === user.UserName);
        //
        // if (index === -1) {
        //     // User not in chatset
        //     sessions = [user, ...self.sessions];
        //
        //     self.messages.set(user.UserName, {
        //         data: [],
        //         unread: 0,
        //     });
        // } else {
        //     if (onTop === true) {
        //         sessions = [
        //             ...self.sessions.slice(index, index + 1),
        //             ...self.sessions.slice(0, index),
        //             ...self.sessions.slice(index + 1, self.sessions.length)
        //         ];
        //     }
        // }

        // sessions.map(e => {
        //     if (helper.isTop(e)) {
        //         stickyed.push(e);
        //     } else {
        //         normaled.push(e);
        //     }
        // });

        // self.sessions.replace([...stickyed, ...normaled]);
        self.user = undefined;  // 清空原来的user，用于重新渲染聊天界面
        self.user = user;
        // if (!self.isconnected) { ipcRenderer.send('websocket-disconnected'); }
        self.markedRead(user.UserName);

        // hasUnreadMessage(self.messages);
    }

    @action async addMessage(message, username) {
        let list = self.messages.get(username);
        if (list) { list.data.push(message); } else {
            list = {
                data: [message]
            };
            self.messages.set(username, list);
        }
    }

    // @action async addMessage(message, sync = false) {
    //     /* eslint-disable */
    //     var from = message.FromUserName;
    //     var user = await contacts.getUser(from);
    //     var list = self.messages.get(from);
    //     var sessions = self.sessions;
    //     var stickyed = [];
    //     var normaled = [];
    //     /* eslint-enable */
    //
    //     if (!user) {
    //         return console.error('Got an invalid message: %o', message);
    //     }
    //
    //     // Add the messages of your sent on phone to the chat sets
    //     if (sync) {
    //         list = self.messages.get(message.ToUserName);
    //         from = message.ToUserName;
    //         user = contacts.memberList.find(e => e.UserName === from);
    //
    //         message.isme = true;
    //         message.HeadImgUrl = session.user.User.HeadImgUrl;
    //         message.FromUserName = message.ToUserName;
    //         message.ToUserName = user.UserName;
    //     }
    //
    //     // User is already in the chat set
    //     if (list) {
    //         // Swap the chatset order
    //         let index = self.sessions.findIndex(e => e.UserName === from);
    //
    //         if (index !== -1) {
    //             sessions = [
    //                 ...self.sessions.slice(index, index + 1),
    //                 ...self.sessions.slice(0, index),
    //                 ...self.sessions.slice(index + 1, self.sessions.length)
    //             ];
    //         } else {
    //             // When user has removed should add to chat set
    //             sessions = [user, ...self.sessions];
    //         }
    //
    //         // Drop the duplicate message
    //         if (!list.data.find(e => e.NewMsgId === message.NewMsgId)) {
    //             let title = user.RemarkName || user.NickName;
    //
    //             message = await resolveMessage(message);
    //
    //             if (!helper.isMuted(user)
    //                 && !sync
    //                 && settings.showNotification) {
    //                 let notification = new window.Notification(title, {
    //                     icon: user.HeadImgUrl,
    //                     body: helper.getMessageContent(message),
    //                     vibrate: [200, 100, 200],
    //                 });
    //
    //                 notification.onclick = () => {
    //                     ipcRenderer.send('show-window');
    //                 };
    //             }
    //             list.data.push(message);
    //         }
    //     } else {
    //         // User is not in chat set
    //         sessions = [user, ...self.sessions];
    //         list = {
    //             data: [message],
    //             unread: 0,
    //         };
    //         self.messages.set(from, list);
    //     }
    //
    //     if (self.user.UserName === from) {
    //         // Message has readed
    //         list.unread = list.data.length;
    //     }
    //
    //     sessions = sessions.map(e => {
    //         // Catch the contact update, eg: MsgType = 10000, chat room name has changed
    //         var user = contacts.memberList.find(user => user.UserName === e.UserName);
    //
    //         // Fix sticky bug
    //         if (helper.isTop(user)) {
    //             stickyed.push(user);
    //         } else {
    //             normaled.push(user);
    //         }
    //     });
    //
    //     self.sessions.replace([...stickyed, ...normaled]);
    //
    //     hasUnreadMessage(self.messages);
    //     updateMenus({
    //         conversations: self.sessions.slice(0, 10),
    //     });
    // }


    @action markedRead(userid) {
        var list = self.messages.get(userid);

        // Update the unread message need the chat in chat list
        if (!self.sessions.map(e => e.UserName).includes(userid)) {
            return;
        }

        if (list) {
            list.unread = list.data.length;
        } else {
            list = {
                data: [],
                unread: 0,
            };
        }

        self.messages.set(userid, list);
    }

}

const self = new Chat();
export default self;
