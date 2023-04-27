export interface TokenData {
 role: string;
 username?: string;
 sub?: Date;
 iat?: number;
 exp?: number;
 jti?: string;
}