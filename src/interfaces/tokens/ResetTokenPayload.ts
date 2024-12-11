import { JwtPayload } from "jsonwebtoken";

interface ResetTokenPayload extends JwtPayload {
    email: String
}

export default ResetTokenPayload;