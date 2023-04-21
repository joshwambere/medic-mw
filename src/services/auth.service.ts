
import {CreateUserDto} from "@dtos/user.dto";
import {SECRET_KEY, TOKEN_EXPIRES_IN} from "@config";


class AuthService{
   

    public async signup(userData:CreateUserDto, otp:string){
        return "not implemented"
    }

    public async verifyAccount(otp:string, token:string) {
        return "not implemented"
    }
    /*
    * login
    * */

    public async login(loginDetails){
        return "not implemented"
    }

    /*
    * generate token for password reset
    * */
    public async generateResetPasswordToken(email:string){
        return "not implemented"
    }
    /*
    * reset old password
    * */
    public async resetPassword(token:string, password:string){
        return "not implemented"
    }




}

export default  AuthService;
