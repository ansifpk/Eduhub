import { BadRequestError } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { IUserSignUp } from "../../domain/interfaces/user/useCases/IUserSignUp";
import { IJwt } from "../../domain/interfaces/serviceInterfaces/IJwt";
import { IHashPassword } from "../../domain/interfaces/serviceInterfaces/IHashPassword";
import { IOtpGenerator } from "../../domain/interfaces/serviceInterfaces/IOtpagenerator";
import { IOtpRepository } from "../../domain/interfaces/IOtpRepository";
import { ISentEmail } from "../../domain/interfaces/serviceInterfaces/ISentEmail";
import { IUserRepository } from "../../domain/interfaces/user/repository/IuserRepository";

export class UserSignUp implements IUserSignUp {
    constructor(
        private readonly userRepository:IUserRepository,
        private readonly encrypt:IHashPassword,
        private readonly otpGenerate:IOtpGenerator,
        private readonly otpRepository:IOtpRepository,
        private readonly sentEmail:ISentEmail,
        private readonly jwtToken:IJwt,
    ) {
        
    }
    public async execute(input: {user:Iuser}): Promise<string | void> {
        try {
      const {email,password,name} = input.user;
      if(!/^[A-Za-z0-9.%+-]+@gmail\.com$/.test(email)){
        throw new BadRequestError("Invalid Email Structure.");
      }
      if(name.trim().length < 1){
        throw new BadRequestError("Invalid name provided.");
      }
      if(password.trim().length < 6 || password.trim().length > 20  ){
        throw new BadRequestError("Password mustbe inbetween 6 and 20.");
      }

      let checkuser = await this.userRepository.findByEmail(email);
      if (checkuser) {
        throw new BadRequestError("Email Already Registerd");
      }
      
      // hashing password
     
      const hashPassword = await this.encrypt.createHash(password);
      input.user.password = hashPassword;

      const otp = await this.otpGenerate.createOtp();
      console.log("reg otp", otp);

      await this.otpRepository.createOtp(email,otp);
      await this.sentEmail.sentEmailVerification(email, otp);

      const token = await this.jwtToken.createVerificationJwt({
        name: name,
        email: email,
        password: input.user.password,
      });
      return token; 
    } catch (err) {
      console.error(err);
      throw err;
    }
    }
}