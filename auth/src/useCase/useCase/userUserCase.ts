import { IuserUseCase } from "../interface/useCsesInterface/IuserUseCase";
import { IUserRepository } from "../interface/repositoryInterface/IuserRepository";
import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IHashPassword } from "../interface/serviceInterface/IHashPassword";
import { IOtpGenerator } from "../interface/serviceInterface/IOtpagenerator";
import { IOtpRepository } from "../interface/repositoryInterface/IOtpRepository";
import { ISentEmail } from "../interface/serviceInterface/ISentEmail";
import { IJwt, IToken } from "../interface/serviceInterface/IJwt";
import { ErrorHandler, StatusCodes } from "@eduhublearning/common";
import { catchError } from "@eduhublearning/common";


export class UserUseCase implements IuserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypt: IHashPassword,
    private otpRepository: IOtpRepository,
    private otpGenerate: IOtpGenerator,
    private sentEmail: ISentEmail,
    private jwtToken: IJwt
  ) {}

  async googleLogin(
    email: string,
    name: string,
    password: string,
    next: NextFunction
  ): Promise<{ user: Iuser; token: IToken } | void> {
    const checkUser = await this.userRepository.findByEmail(email);
    if (!checkUser) {
      password = await this.encrypt.createHash(password);
      const user = await this.userRepository.create({ email, name, password });
      if (user) {
        if (user.isBlock) {
          return next(new ErrorHandler(StatusCodes.FORBIDDEN, "You re Blocked By Admin"));
        } else {
          const token: any = await this.jwtToken.createAccessAndRefreashToken(
            user._id as string
          );
          if (token) {
            return { user, token };
          }
        }
      }
    } else {
      if (checkUser.isBlock) {
        return next(new ErrorHandler(StatusCodes.FORBIDDEN, "You re Blocked By Admin"));
      } else {
        const token: any = await this.jwtToken.createAccessAndRefreashToken(
          checkUser._id as string
        );
        if (token) {
          return { user: checkUser, token };
        }
      }
    }
  }

  async editUser(
    userId: string,
    name: string,
    email: string,
    next: NextFunction
  ): Promise<Iuser | void> {
    const currentUser = await this.userRepository.findById(userId);
    if (currentUser) {
      const checkUser = await this.userRepository.findByEmail(email);
      if (checkUser) {
        
        if (checkUser.email === currentUser.email) {
         
          const updatedUser = await this.userRepository.update(
            userId,
            name,
            email
          );
          if (updatedUser) {
            return updatedUser;
          }
        } else {
          return next(new ErrorHandler(StatusCodes.CONFLICT, "User ALready Fount"));
        }
      } else {
        const updatedUser = await this.userRepository.update(
          userId,
          name,
          email
        );
        if (updatedUser) {
          return updatedUser;
        }
      }
    } else {
      return next(new ErrorHandler(StatusCodes.NOT_FOUND, "User Not Fount"));
    }
  }
  async userSignUp(user: Iuser, next: NextFunction): Promise<string | void> {
    try {
      let checkuser = await this.userRepository.findByEmail(user.email);
      if (checkuser) {
        return next(new ErrorHandler(StatusCodes.CONFLICT, "Email Already Registerd"));
      }

      // hashing password

      const hashPassword = await this.encrypt.createHash(user.password);
      user.password = hashPassword;

      const otp = await this.otpGenerate.createOtp();
      console.log("reg otp", otp);

      await this.otpRepository.createOtp(user.email, otp);
      await this.sentEmail.sentEmailVerification(user.name, user.email, otp);

      const token = await this.jwtToken.createVerificationJwt({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      return token;
    } catch (err) {
      catchError(err, next);
    }
  }

  async sentOtp(email: string, next: NextFunction): Promise<boolean | void> {
    try {
      const data = await this.otpRepository.deleteOtp(email);

      if (data) {
        const otp = await this.otpGenerate.createOtp();
        console.log("new otp", otp);
        await this.otpRepository.createOtp(email, otp);
        return data;
      } else {
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "Somthing went Wrong"));
      }
    } catch (error) {
      catchError(error, next);
    }
  }

  async insertUser(
    token: string,
    otp: string,
    next: NextFunction
  ): Promise<{ user: Iuser; tokens: IToken } | void> {
    try {
      const decoded = (await this.jwtToken.verifyJwt(token)) as Iuser;
      const result = await this.otpRepository.findOtp(decoded.email);
      if (!result) {
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "OTP Expired"));
      }

      if (Number(result.otp) !== Number(otp)) {
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "invalid otp"));
      }

      const user = (await this.userRepository.create(decoded)) as Iuser;
      const tokens = (await this.jwtToken.createAccessAndRefreashToken(
        user._id!
      )) as IToken;

      if (tokens) {
        await this.otpRepository.deleteOtp(decoded.email);
        return { user, tokens };
      }
    } catch (err: any) {
      console.log("error createUser in userusecse", err.message);
    }
  }
  async login(
    email: string,
    password: string,
    next: NextFunction
  ): Promise<{ user: Iuser; token: IToken } | void> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        return next(new ErrorHandler(StatusCodes.NOT_FOUND, "Email Not Registerd"));
      }
      if (user.isBlock == true) {
        return next(new ErrorHandler(StatusCodes.FORBIDDEN, "You are Blocked"));
      }

      const checkPassword = await this.encrypt.comparePassword(
        password,
        user.password
      );

      if (!checkPassword) {
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "incorrect password"));
      }

      const token: any = await this.jwtToken.createAccessAndRefreashToken(
        user._id as string
      );
  
      return { token, user };
    } catch (err) {
      console.error(err);
    }
  }
  async verifyEmail(email: string, next: NextFunction): Promise<any | void> {
    try {
      let checkuser = await this.userRepository.findByEmail(email);
      if (checkuser) {
        const otp = await this.otpGenerate.createOtp();
        console.log("otp to change pass", otp);
        await this.otpRepository.createOtp(checkuser.email, otp);
        await this.sentEmail.sentEmailVerification(
          checkuser.name,
          checkuser.email,
          otp
        );
        return checkuser;
      } else {
        return next(new ErrorHandler(StatusCodes.NOT_FOUND, "Email Not Registerd"));
      }
    } catch (err) {
      console.error(err);
    }
  }
  async verifyOtp(
    email: string,
    otp: string,
    next: NextFunction
  ): Promise<any | void> {
    try {
     
      const user = await this.otpRepository.findOtp(email);
      if (user) {
        if (user.otp == otp) {
          return user;
        } else {
          return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "Invalid OTP"));
        }
      } else {
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "OTP Expired"));
      }
    } catch (err) {
      console.error(err);
    }
  }
  async changePassword(
    email: string,
    password: string,
    next: NextFunction
  ): Promise<any | void> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (user) {
        const newPassword = await this.encrypt.createHash(password);
        user.password = newPassword;

        await this.otpRepository.deleteOtp(email);
        return user;
      } else {
        return next(new ErrorHandler(StatusCodes.NOT_FOUND, "User Not Found"));
      }
    } catch (err) {
      console.error(err);
    }
  }
  async resetPassword(
    userId: string,
    password: string,
    newPassword: string,
    next: NextFunction
  ): Promise<any | void> {
    try {
      const user = await this.userRepository.findById(userId);
      if (user) {
        
        const checkPassword = await this.encrypt.comparePassword(
          password,
          user.password
        );
        if(!checkPassword){
          return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "Current password is not matching"));
        }
        
        const Password = await this.encrypt.createHash(newPassword);
        // user.password = newPassword;
       
        
        const updatedUser = await this.userRepository.updatePassword(userId,Password)
        if(updatedUser){
          return updatedUser;
        }
      
       
      } else {
        return next(new ErrorHandler(StatusCodes.NOT_FOUND, "User Not Found"));
      }
    } catch (err) {
      console.error(err);
    }
  }

  async verifyNewEmail(userId: string, email: string, next: NextFunction): Promise<string | void> {
    try {
     
       const checkuser = await this.userRepository.findById(userId);
       const checkEmail = await this.userRepository.findByEmail(email);
       if(!checkuser){
        return next(new ErrorHandler(StatusCodes.NOT_FOUND, "User Not Found"));
       }
       
       if(checkuser.email == email){
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "You cannot set the old email again"));
       }

       if(checkEmail){
        return next(new ErrorHandler(StatusCodes.CONFLICT, "Email Already exists"));
       }

       const OTP = await this.otpGenerate.createOtp();
        console.log("otp to change email", OTP);
        await this.otpRepository.createOtp(checkuser.email, OTP);
        await this.sentEmail.sentEmailVerification(
          checkuser.name,
          checkuser.email,
          OTP
        );
       return OTP
    } catch (error) {
     console.error(error)
    }
   }
  async changeEmail(userId: string, email: string,otp:string, next: NextFunction): Promise<Iuser | void> {
    try {
   
       const checkUser = await this.userRepository.findById(userId);
       if(!checkUser){
        return next(new ErrorHandler(StatusCodes.NOT_FOUND, "User Not Found"));
       }
       const findOTP=  await this.otpRepository.findOtp(checkUser.email);
       if(!findOTP){
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "OTP expired"));
       }
       if(findOTP.otp !== otp ){
        return next(new ErrorHandler(StatusCodes.BAD_REQUEST, "Invalid OTP"));
       }
      
       const user  = await this.userRepository.changeEmail(userId,email);
       if(user){
          await this.otpRepository.deleteOtp(checkUser.email);
          return user;
       }
    } catch (error) {
     console.error(error)
    }
   }

  async checkTockens(tocken:string,next: NextFunction): Promise<IToken | void> {
    try {
      const decoded = await this.jwtToken.verifyRefreshJwt(tocken)
      
      if(decoded){
       const tockens =  await this.jwtToken.createAccessAndRefreashToken(decoded.id);
       if(tockens){
        return tockens
       }
      }
      
    } catch (error) {
      console.error(error)
    }
  }

}
