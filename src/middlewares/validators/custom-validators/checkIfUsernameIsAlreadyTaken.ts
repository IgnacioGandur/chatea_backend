import userModel from "../../../db/user.js";

export default async function checkIfUsernameIsAlreadyTaken(username: string) {
    const user = await userModel.get(username);

    if (user) {
        throw new Error(
            `User: "${username}" already exists, please choose another username.`,
        );
    }

    return true;
}
