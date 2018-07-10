import { observable, action } from 'mobx';
import session from "./session"

class Control {

    // 控制按钮使能状态
    @observable RunMainButtonStatus = true;
    @observable RunMainButtonWithNewModelStatus = true;
    @observable StopMainButtonStatus = false;
    @observable RecoveryButtonStatus = true;

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
            "data": "python3 main.py"
        });
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
            "data": "python3 main.py -n"
        });
    };

    @action onStopMainButtonClick = () => {
        this.RunMainButtonStatus = true;
        this.RunMainButtonWithNewModelStatus = true;
        this.StopMainButtonStatus = false;
        session.connection.json({
            "type": "kill",
            "name": "main_process"
        })
    };

    @action onRecovery = () => {

    };

}

const self = new Control();
export default self;
