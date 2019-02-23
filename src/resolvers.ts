import { IResolvers } from "graphql-tools";
import * as bcrypt from "bcryptjs";
import * as uuidv1 from "uuid/v1";

import * as jwt from "jsonwebtoken";

import { User } from "./entity/User";
import { UserAccessToken } from "./entity/UserAccessToken";

export const resolvers: IResolvers = {
  Query: {
    hello: () => "hallo"
  },

  Mutation: {
    userCreation: async (_, { first_name, last_name, email, password }) => {
      const generateUUID = await uuidv1()
      const generateToken = await jwt.sign({ email: email  }, 'jlalkdemadma');
      const hashedPassword = await bcrypt.hash(password, 10);

      const users = await User.create({
        uuid: generateUUID,
        first_name,
        last_name,
        email,
        password: hashedPassword
      }).save()
      
      const uat = await UserAccessToken.create({
        token: generateToken,
        user_id: users.id,
      }).save()

      if (users && uat) {
        return {
          uuid: users.uuid,
          first_name,
          last_name,
          token: uat.token
        }        
      } else {
        return {
          message: "Unprocessable Entity",
          code: 422
        }
      }
    }
  }
};
