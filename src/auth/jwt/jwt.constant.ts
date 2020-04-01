import { ExtractJwt } from 'passport-jwt';

export const jwtConstants = {
  secret: 'lear4all',
};

export const jwtConfig = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: jwtConstants.secret
};