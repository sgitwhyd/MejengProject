import "@/styles/globals.css";
import LayoutAdmin from "@/components/layout-admin";
import LayoutMain from "@/components/layout-main";

export default function App({ Component, pageProps, router }) {
  const getLayout = router.pathname.includes("/admin")
    ? (page) => <LayoutAdmin children={page} />
    : (page) => <LayoutMain children={page} />;
  return <>{getLayout(<Component {...pageProps} />, pageProps)}</>;
}
