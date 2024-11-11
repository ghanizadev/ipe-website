import { APIService } from '@/services/api.service';

export default class UserService extends APIService<UserDTO> {
  constructor() {
    super('users');
  }

  public async verifyEmail(args: VerifyEmailArgs): Promise<boolean> {
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(this.baseUrl + '/verify/' + args.token, init);
    return response.ok;
  }

  public async forgotPassword(email: string) {
    const init: RequestInit = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    };

    const response = await fetch(this.baseUrl + '/forgot-password', init);
    return response.ok;
  }

  public async updatePassword(args: UpdatePasswordArgs): Promise<boolean> {
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: args.token,
        password: args.password,
      }),
    };

    const response = await fetch(this.baseUrl + '/reset-password', init);
    console.log(await response.text());
    return response.ok;
  }
}
