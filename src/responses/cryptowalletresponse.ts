export interface CryptoWalletResponse<T> {

  success: boolean;
  message: string;
  data: T;
}