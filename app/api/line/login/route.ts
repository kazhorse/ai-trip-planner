export async function GET() {
    const clientId = process.env.LINE_LOGIN_CHANNEL_ID!;
    const redirectUri = encodeURIComponent("http://localhost:3000/api/line/callback"); // 本番は書き換え
    const state = "yourCustomState"; // 必要に応じてCSRF対策
  
    const url = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}&scope=profile%20openid`;
  
    return Response.redirect(url, 302);
  }
  