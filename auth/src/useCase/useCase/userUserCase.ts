import { IuserUseCase } from "../interface/useCsesInterface/IuserUseCase";
import { IUserRepository } from "../interface/repositoryInterface/IuserRepository";
import { NextFunction } from "express";
import { Iuser } from "../../entities/user";
import { IHashPassword } from "../interface/serviceInterface/IHashPassword";
import { IOtpGenerator } from "../interface/serviceInterface/IOtpagenerator";
import { IOtpRepository } from "../interface/repositoryInterface/IOtpRepository";
import { ISentEmail } from "../interface/serviceInterface/ISentEmail";
import { IJwt, IToken } from "../interface/serviceInterface/IJwt";
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  StatusCodes,
  UserCreatedPublisher,
} from "@eduhublearning/common";
import kafkaWrapper from "../../framework/webServer/config/kafka/kafkaWrapper";
import { Producer } from "kafkajs";

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
    try {
      const checkUser = await this.userRepository.findByEmail(email);
      if (!checkUser) {
        password = await this.encrypt.createHash(password);
        const user = await this.userRepository.create({
          email,
          name,
          password,
        });
        if (user) {
          await new UserCreatedPublisher(
            kafkaWrapper.producer as Producer
          ).produce({
            _id: user._id! as string,
            name: user.name as string,
            email: user.email as string,
            isInstructor: user.isInstructor! as boolean,
            password: user.password,
            createdAt: user.createdAt!,
          });
          const token: any = await this.jwtToken.createAccessAndRefreashToken(
            user._id as string
          );
          if (token) {
            return { user, token };
          }
        }
      } else {
        if (checkUser.isBlock) {
          throw new ForbiddenError();
        } else {
          const token: any = await this.jwtToken.createAccessAndRefreashToken(
            checkUser._id as string
          );
          if (token) {
            return { user: checkUser, token };
          }
        }
      }
    } catch (error) {
      console.error(error);

      next(error);
    }
  }

  async editUser(
    userId: string,
    name: string,
    email: string,
    next: NextFunction
  ): Promise<Iuser | void> {
    try {
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
            throw new BadRequestError("User ALready Fount");
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
        throw new BadRequestError("User Not Fount");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async userSignUp(user: Iuser, next: NextFunction): Promise<string | void> {
    try {
      const {email,password,name} = user;
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
      user.password = hashPassword;

      const otp = await this.otpGenerate.createOtp();
      console.log("reg otp", otp);

      await this.otpRepository.createOtp(email, otp);
      await this.sentEmail.sentEmailVerification(email, otp);

      const token = await this.jwtToken.createVerificationJwt({
        name: name,
        email: email,
        password: password,
      });
      return token;
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async sentOtp(email: string, next: NextFunction): Promise<boolean | void> {
    try {
      const data = await this.otpRepository.deleteOtp(email);
      const otp = await this.otpGenerate.createOtp();
      console.log("new otp", otp);
      await this.otpRepository.createOtp(email, otp);
      await this.sentEmail.sentEmailVerification(email, otp);
      return data;
    } catch (error) {
      next(error);
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
      console.log(decoded);
      console.log(result);

      if (!result) {
        throw new BadRequestError("OTP Expired");
      }

      if (Number(result.otp) !== Number(otp)) {
        throw new BadRequestError("invalid otp");
      }

      const user = (await this.userRepository.create(decoded)) as Iuser;
      const tokens = (await this.jwtToken.createAccessAndRefreashToken(
        user._id!
      )) as IToken;

      if (tokens) {
        await this.otpRepository.deleteOtp(decoded.email);
        return { user, tokens };
      }
    } catch (err) {
      console.error(err);
      next(err);
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
        throw new BadRequestError("Invalid credentials");
      }
      if (user.isBlock == true) {
        throw new ForbiddenError();
      }

      const checkPassword = await this.encrypt.comparePassword(
        password,
        user.password
      );

      if (!checkPassword) {
        throw new BadRequestError("incorrect password");
      }

      const token: any = await this.jwtToken.createAccessAndRefreashToken(
        user._id as string
      );

      return { token, user };
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  async verifyEmail(email: string, next: NextFunction): Promise<any | void> {
    try {
      let checkuser = await this.userRepository.findByEmail(email);
      if (!checkuser) {
        throw new BadRequestError("Email Not Registerd");
      }
      const otp = await this.otpGenerate.createOtp();
      console.log("otp to change pass", otp);
      await this.otpRepository.createOtp(checkuser.email, otp);
      await this.sentEmail.sentEmailVerification(checkuser.email, otp);
      return checkuser;
    } catch (err) {
      next(err);
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
      console.log(user?.otp);

      if (!user) {
        throw new BadRequestError("OTP Expired");
      }
      if (user.otp == otp) {
        await this.otpRepository.deleteOtp(email);
        return user;
      } else {
        throw new BadRequestError("Invalid OTP");
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  async changePassword(
    email: string,
    password: string,
    confirmPassword: string,
    next: NextFunction
  ): Promise<any | void> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        throw new BadRequestError("User Not Found");
      }
      if (!password) {
        throw new BadRequestError("New Password is Required");
      }
      if (!confirmPassword) {
        throw new BadRequestError("Confirm Password is Required");
      }
      if (confirmPassword !== password) {
        throw new BadRequestError(
          "Confirm Password and password is not maching"
        );
      }
      const compare = await this.encrypt.comparePassword(
        password,
        user.password
      );
      if (compare) {
        throw new BadRequestError("You Cannot Set Old Password Again");
      }
      const newPassword = await this.encrypt.createHash(password);
      await this.userRepository.updatePassword(user._id!, newPassword);
      await this.otpRepository.deleteOtp(email);
      return user;
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
  async resetPassword(
    userId: string,
    password: string,
    newPassword: string,
    conPassword: string,
    next: NextFunction
  ): Promise<Iuser | void> {
    try {
      const user = await this.userRepository.findById(userId);
      if (!user) {
        throw new BadRequestError("User Not Found");
      }
      if (newPassword.length < 6 || newPassword.length > 20) {
        throw new BadRequestError("Password should be in between 6 and 20");
      }
      const checkPassword = await this.encrypt.comparePassword(
        password,
        user.password
      );
      if (!checkPassword) {
        throw new BadRequestError("Current password is not matching");
      }
      if (password == newPassword) {
        throw new BadRequestError("You cannot set the old password again");
      }
      if (newPassword !== conPassword) {
        throw new BadRequestError("Confirm password is not matching");
      }
      const Password = await this.encrypt.createHash(newPassword);
      const updatedUser = await this.userRepository.updatePassword(
        userId,
        Password
      );
      if (updatedUser) {
        return updatedUser;
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }

  async verifyNewEmail(
    userId: string,
    email: string,
    next: NextFunction
  ): Promise<string | void> {
    try {
      if(!/^[A-Za-z0-9.%+-]+@gmail\.com$/.test(email)){
        throw new BadRequestError("Invalid Email Structure.");
      }
      const checkuser = await this.userRepository.findById(userId);
      if (!checkuser) {
        throw new BadRequestError("User Not Found");
      }
      if (checkuser.email == email) {
        throw new BadRequestError("You cannot set the old email again");
      }
      const checkEmail = await this.userRepository.findByEmail(email);
      if (checkEmail) {
        throw new BadRequestError("Email Already exists");
      }

      const OTP = await this.otpGenerate.createOtp();
      console.log("otp to change email", OTP);
      await this.otpRepository.createOtp(checkuser.email, OTP);
      await this.sentEmail.sentEmailVerification(checkuser.email, OTP);
      return OTP;
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  async changeEmail(
    userId: string,
    email: string,
    otp: string,
    next: NextFunction
  ): Promise<Iuser | void> {
    try {
      
      const checkUser = await this.userRepository.findById(userId);
      if (!checkUser) {
        throw new BadRequestError("User Not Found");
      }

      const findOTP = await this.otpRepository.findOtp(checkUser.email);
      if (!findOTP) {
        throw new BadRequestError("OTP expired");
      }
      if (findOTP.otp !== otp) {
        throw new BadRequestError("Invalid OTP");
      }

      const user = await this.userRepository.changeEmail(userId, email);
      if (user) {
        await this.otpRepository.deleteOtp(checkUser.email);
        return user;
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async checkTockens(
    tocken: string,
    next: NextFunction
  ): Promise<IToken | void> {
    try {
      const decoded = await this.jwtToken.verifyRefreshJwt(tocken);
      console.log("check", decoded);

      if (decoded) {
        const tockens = await this.jwtToken.createAccessAndRefreashToken(
          decoded.id
        );
        if (tockens) {
          return tockens;
        }
      } else {
        throw new BadRequestError("Invalid token");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
}
