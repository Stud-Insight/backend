import { JwtPayload } from "jsonwebtoken";
import IRole from "../IRole";

interface AccessTokenPayload extends JwtPayload {
    id: String,
    firstName: String,
    lastName: String,
    email: String,
    roles: IRole[]
}

export default AccessTokenPayload;