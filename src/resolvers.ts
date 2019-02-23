import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import * as uuidv1 from "uuid/v1";

import * as jwt from "jsonwebtoken";

import { User } from "./entity/User";
import { UserAccessToken } from "./entity/UserAccessToken";

export const resolvers: IResolvers = {
  Query: {
    login: async (_, { email, password }) => {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return { message: "Unregistered email", code: 401 };
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return { message: "Password incorect", code: 401 };
      }

      const userData = await UserAccessToken.findOne({
        relations: ["user"],
        where: {
          user_id: user.id
        }
      });

      if (!userData) {
        return { message: "Server error", code: 500 };
      }
      return {
        uuid: userData.user.uuid,
        first_name: userData.user.first_name,
        last_name: userData.user.last_name,
        token: userData.token
      };
    }
  },
  Mutation: {
    userCreation: async (_, { first_name, last_name, email, password }) => {
      const generateUUID = await uuidv1();
      const generateToken = await jwt.sign({ email: email }, "jlalkdemadma");
      const hashedPassword = await bcrypt.hash(password, 10);

      const checkDuplicateEmail = await User.findOne({where: {email}})
      if (checkDuplicateEmail) {
        return {
          message: "Email already used by another user",
          code: 409
        }        
      }

      const users = await User.create({
        uuid: generateUUID,
        first_name,
        last_name,
        email,
        password: hashedPassword
      }).save();

      const uat = await UserAccessToken.create({
        token: generateToken,
        user_id: users.id
      }).save();

      if (users && uat) {
        return {
          uuid: users.uuid,
          first_name,
          last_name,
          token: uat.token
        };
      } else {
        return {
          message: "Unprocessable Entity",
          code: 422
        };
      }
    }
  }
};
