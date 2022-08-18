import { RecoilRoot } from "recoil";
import AuthProvider from "@/context/authContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </RecoilRoot>
  );
}

export default MyApp;
// https://sazxxiuhaalmfuqhbrgc.supabase.co