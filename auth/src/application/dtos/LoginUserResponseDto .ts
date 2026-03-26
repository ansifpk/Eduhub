export interface LoginUserResponseDto {
  id: string;
  email: string;
  name?: string;
  isBlock?: boolean;
}