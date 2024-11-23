import { JwtPayload } from "jsonwebtoken";

interface ActivationTokenPayload extends JwtPayload {
    id: String
}

export default ActivationTokenPayload;