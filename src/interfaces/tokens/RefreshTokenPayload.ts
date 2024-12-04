import { JwtPayload } from "jsonwebtoken";

interface RefreshTokenPayload extends JwtPayload {
    userId: String
}

export default RefreshTokenPayload;