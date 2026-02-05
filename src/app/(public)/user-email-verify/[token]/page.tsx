// import SetPasswordPage from "@/components/auth/UserEmailVeirfy";

// export default function Page({ params }: { params: { token: string } }) {
//   console.log("SERVER PARAM TOKEN 👉", params.token);
//   return <SetPasswordPage token={params.token} />;
// }


import SetPasswordPage from "@/components/auth/UserEmailVeirfy";

export default async function Page({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;  // ✅ REQUIRED

  console.log("SERVER PARAM TOKEN 👉", token);

  return <SetPasswordPage token={token} />;
}
