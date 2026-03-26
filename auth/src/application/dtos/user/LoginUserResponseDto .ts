export interface ILoginUserResponseDto {
  _id: string;
  email: string;
  name?: string;
  isBlock?: boolean;
  isInstructor?:boolean;
}