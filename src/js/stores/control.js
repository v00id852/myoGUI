import { observable, action } from 'mobx';
import session from "./session"
import chat from "./chat"

class Control {

    // 控制按钮使能状态
    @observable RunMainButtonStatus = true;
    @observable RunMainButtonWithNewModelStatus = true;
    @observable StopMainButtonStatus = false;
    @observable RecoveryButtonStatus = true;

    @observable RunMainStatus = false;

    // 主程序名称指定为main_process
    @action onRunMainButtonClick = () => {
        this.RunMainButtonStatus = false;
        this.RunMainButtonWithNewModelStatus = false;
        this.StopMainButtonStatus = true;
        session.connection.json({
            "type": "kill",
            "name": "main_process",
        });
        session.connection.json({
            "type": "command",
            "name": "main_process",
            "data": "python3 total.py"
        });
        this.RunMainStatus = true;
    };

    @action onRunMainWithNewModelButtonClick = () => {
        this.RunMainButtonStatus = false;
        this.RunMainButtonWithNewModelStatus = false;
        this.StopMainButtonStatus = true;
        session.connection.json({
            "type": "kill",
            "name": "main_process"
        });
        session.connection.json({
            "type": "command",
            "name": "main_process",
            "data": "python3 total.py -n"
        });
        this.RunMainStatus = true;
    };

    @action onStopMainButtonClick = () => {
        this.RunMainButtonStatus = true;
        this.RunMainButtonWithNewModelStatus = true;
        this.StopMainButtonStatus = false;
        session.connection.json({
            "type": "kill",
            "name": "main_process"
        });
        chat.closeChat();
        this.RunMainStatus = false;
    };

    @action onRecovery = () => {

    };

    @action runAdjust = (word, count, hand_type) => {
        if (word === "") return false;
        if (count === 0) return false;
        let command = "python3 GetDataSet/get.py" + " --word ".concat(word) + " -n ".concat(count) + " --hand ".concat(hand_type);
        session.connection.json({
           "type": "kill",
           "name": "main_process"
        });
        session.connection.json({
            "type": "command",
            "name": "judge_process",
            "data": command
        });
        this.RunMainStatus = false;
        this.RunMainButtonStatus = true;
        this.RunMainButtonWithNewModelStatus = true;
        this.StopMainButtonStatus = false;

        return true
    };

    @action stopAdjust = () => {
        session.connection.json({
            "type": "kill",
            "name": "judge_process"
        })
    };

    @action mergeAdjust = () => {
        session.connection.json({
            "type": "command",
            "name": "merge_process",
            "data": "python3 modelUpdate.py"
        })
    };

    @action backAdjust = () => {
        session.connection.json({
            "type": "command",
            "name": "back_process",
            "data": "python3 backup.py"
        })
    }

}

const self = new Control();
export default self;
