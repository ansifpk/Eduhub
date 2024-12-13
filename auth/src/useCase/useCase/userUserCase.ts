import { IuserUseCase } from "../interface/useCsesInterface/IuserUseCase";
import { IUserRepository } from "../interface/repositoryInterface/IuserRepository";
import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IHashPassword } from "../interface/serviceInterface/IHashPassword";
import { IOtpGenerator } from "../interface/serviceInterface/IOtpagenerator";
import { IOtpRepository } from "../interface/repositoryInterface/IOtpRepository";
import { ISentEmail } from "../interface/serviceInterface/ISentEmail";
import { IJwt, IToken } from "../interface/serviceInterface/IJwt";
import ErrorHandler from "../middlewares/errorHandler";
import { catchError } from "../middlewares/catchError";

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
          return next(new ErrorHandler(400, "You re Blocked By Admin"));
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
        return next(new ErrorHandler(400, "You re Blocked By Admin"));
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
        // console.log(checkUser._id,currentUser._id,checkUser._id === currentUser._id)
        if (checkUser.email === currentUser.email) {
          // console.log(checkUser.email === currentUser.email)
          const updatedUser = await this.userRepository.update(
            userId,
            name,
            email
          );
          if (updatedUser) {
            return updatedUser;
          }
        } else {
          return next(new ErrorHandler(400, "User ALready Fount"));
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
      return next(new ErrorHandler(400, "User Not Fount"));
    }
  }
  async userSignUp(user: Iuser, next: NextFunction): Promise<string | void> {
    try {
      let checkuser = await this.userRepository.findByEmail(user.email);
      if (checkuser) {
        return next(new ErrorHandler(400, "Email Already Registerd"));
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
        return next(new ErrorHandler(400, "Somthing went Wrong"));
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
        return next(new ErrorHandler(400, "OTP Expired"));
      }

      if (Number(result.otp) !== Number(otp)) {
        return next(new ErrorHandler(400, "invalid otp"));
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
        return next(new ErrorHandler(400, "Email Not Registerd"));
      }
      if (user.isBlock == true) {
        return next(new ErrorHandler(400, "You are Blocked"));
      }

      const checkPassword = await this.encrypt.comparePassword(
        password,
        user.password
      );

      if (!checkPassword) {
        return next(new ErrorHandler(400, "incorrect password"));
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
        return next(new ErrorHandler(400, "Email Not Registerd"));
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
      console.log("verify ot");
      
      const user = await this.otpRepository.findOtp(email);
      if (user) {
        if (user.otp == otp) {
          return user;
        } else {
          return next(new ErrorHandler(400, "Invalid OTP"));
        }
      } else {
        return next(new ErrorHandler(400, "OTP Expired"));
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
        return next(new ErrorHandler(400, "User Not Found"));
      }
    } catch (err) {
      console.error(err);
    }
  }
}
