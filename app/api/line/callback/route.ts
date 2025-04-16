export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
  
    const res = await fetch("https://api.line.me/oauth2/v2.1/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code!,
        redirect_uri: "http://localhost:3000/api/line/callback",
        client_id: process.env.LINE_LOGIN_CHANNEL_ID!,
        client_secret: process.env.LINE_LOGIN_CHANNEL_SECRET!,
      }),
    });
  
    const data = await res.json();
    const accessToken = data.access_token;
  
    const profileRes = await fetch("https://api.line.me/v2/profile", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    const profile = await profileRes.json();
  
    // この userId を使って Messaging API 経由で送信できるようになる
    const userId = profile.userId;
  
    // ここでは簡単のため、cookieに保存してトップページにリダイレクト
    const response = new Response(null, {
      status: 302,
      headers: {
        Location: "/",
        "Set-Cookie": `lineUserId=${userId}; Path=/; HttpOnly`,
      },
    });
  
    return response;
  }
  