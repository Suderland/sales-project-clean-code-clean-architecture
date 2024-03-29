import User from "../../domain/entity/User";

export default interface UserRepository {
  save (user: User): Promise<void>;
  get (user: string): Promise<User>;
}