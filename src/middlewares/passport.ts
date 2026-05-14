import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../db/user.js";
import bcrypt from "bcryptjs";

const strategy = new LocalStrategy(async function vefify(
    username,
    password,
    done,
) {
    try {
        const user = await userModel.get(username);

        if (!user) {
            return done(null, false);
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return done(null, false);
        }

        done(null, user);
    } catch (error) {
        return done(error);
    }
});

passport.use(strategy);

passport.serializeUser(function serializeUserFunction(user, done) {
    return done(null, user);
});

passport.deserializeUser(async function deserializeUserFunction(
    user: { id: number },
    done,
) {
    try {
        const u = await userModel.get(user.id);
        return done(null, u);
    } catch (error) {
        return done(error);
    }
});
