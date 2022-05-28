class Error {

    constructor(code, msg = null){
        this.code = code;
        if(msg){
            this.msg = msg;
        }
        else{
            this.msg = this.getDefaultErrorMsg(code);
        }
    }

    getDefaultErrorMsg(code){
        let msg  = "";
        switch(code){
            case 1:
                msg = "Existing ID";
                break;
            case 404:
                msg = "Not found";
                break;
            default:
                msg = "Unknown error";
                break;
        }
        return msg;
    }
}

module.exports = Error;