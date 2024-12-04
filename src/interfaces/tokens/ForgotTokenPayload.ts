import { JwtPayload } from "jsonwebtoken";

interface ForgotTokenPayload extends JwtPayload {
    email: String
}

export default ForgotTokenPayload;