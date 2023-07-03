import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as jwksClient from 'jwks-rsa';
import * as jsonwebtoken from 'jsonwebtoken';

@Controller('solution')
export class SolutionController {
  protected readonly REALM_OIDC_URL = 'http://localhost:8080/realms/solution/protocol/openid-connect/';
  protected readonly REDIRECT_URL = 'http://localhost:3000/solution/oidc-redirect';
  protected readonly CLIENT_ID = 'demo-client';
  protected readonly CLIENT_SECRET = '2DA74cJxhKiGQAz7ezoevBatG9MxRuVu';
  protected readonly jwksClient = jwksClient({
    jwksUri: this.REALM_OIDC_URL + 'certs',
  });

  @Get('hello')
  public async getHello(@Req() request: Request, @Res() response: Response) {
    if (!(await this.isLoggedIn(request))) {
      this.redirectToLogin(response);
      return;
    }
    const token = jsonwebtoken.decode(request.cookies.token);
    response.send(`Hello ${token['name']}!`);
  }

  protected async isLoggedIn(request: Request): Promise<boolean> {
    if (!('token' in request.cookies)) {
      return false;
    }

    // Get the public key to validate against
    const key = await this.jwksClient.getSigningKey();
    const publicKey = key.getPublicKey();

    // Validate the JWT
    try {
      jsonwebtoken.verify(request.cookies.token, publicKey);
    } catch (e) {
      return false;
    }
    return true;
  }

  protected redirectToLogin(response: Response) {
    const redirectUrl = new URL(this.REALM_OIDC_URL + 'auth');
    redirectUrl.searchParams.append('client_id', this.CLIENT_ID);
    redirectUrl.searchParams.append('redirect_uri', this.REDIRECT_URL);
    redirectUrl.searchParams.append('response_type', 'code');
    redirectUrl.searchParams.append('scope', 'openid');

    response.status(302).header('Location', redirectUrl.href).send('Redirecting to login...');
  }

  @Get('oidc-redirect')
  public async handleOidcRedirect(@Req() request: Request, @Res() response: Response) {
    if (!('code' in request.query)) {
      response.status(500).send('Expected response to contain a code');
      return;
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', String(request.query.code));
    params.append('client_id', this.CLIENT_ID);
    params.append('client_secret', this.CLIENT_SECRET);
    params.append('redirect_uri', this.REDIRECT_URL);

    const tokenRequest = await fetch(this.REALM_OIDC_URL + 'token', {
      method: 'POST',
      body: params,
    });
    const tokenResponse = await tokenRequest.json();

    if (!('id_token' in tokenResponse)) {
      response.status(500).send('Expected token response to id_token');
      return;
    }

    response.cookie('token', tokenResponse.id_token).send('Login successful!');
  }
}
