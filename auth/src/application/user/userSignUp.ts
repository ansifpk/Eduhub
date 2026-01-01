import { BadRequestError, IUseCase } from "@eduhublearning/common";
import { Iuser } from "../../domain/entities/user";
import { UserRepository } from "../../infrastructure/db/repository/userRepositories";
import { Encrypt } from "../../infrastructure/services/hashPassword";
import { OtpGenerator } from "../../infrastructure/services/otpGenerator";
import { OtpRepository } from "../../infrastructure/db/repository/otpRepostory";
import { NextFunction } from "express";
import { SentEmail } from "../../infrastructure/services/sendMail";
import { JWTtocken } from "../../infrastructure/services/jwt";

export class UserSignUp implements IUseCase<{user:Iuser,next:NextFunction},string|void> {
    constructor(
        private readonly userRepository:UserRepository,
        private readonly encrypt:Encrypt,
        private readonly otpGenerate:OtpGenerator,
        private readonly otpRepository:OtpRepository,
        private readonly sentEmail:SentEmail,
        private readonly jwtToken:JWTtocken,
    ) {
        
    }
    public async execute(input: {user:Iuser,next:NextFunction}): Promise<string | void> {
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
      input.next(err);
    }
    }
}