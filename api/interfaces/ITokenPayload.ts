import { JwtPayload } from 'jsonwebtoken';


interface ITokenPayload extends JwtPayload {
  id: string;
}


export default ITokenPayload;