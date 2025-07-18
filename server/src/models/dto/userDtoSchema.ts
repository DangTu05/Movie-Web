import { IUserDTO } from "../../interfaces/dto/userDTO";
export class UserResponseDto {
  readonly user_id: string;
  readonly username: string;
  readonly email: string;
  readonly reward_points: number;
  readonly role_id: string;
  readonly user_image: string;

  constructor(userDto: IUserDTO) {
    this.user_id = userDto.user_id;
    this.username = userDto.username;
    this.email = userDto.email;
    this.reward_points = userDto.reward_points;
    this.role_id = userDto.role_id;
    this.user_image = userDto.user_image;
  }
}
