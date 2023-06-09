import "@/styles/globals.css";
import { useEffect } from "react";
import LayoutAdmin from "@/components/layouts/layout-admin";
import LayoutMain from "@/components/layouts/layout-main";
import LayoutLogReg from "@/components/layouts/layout-log-reg";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function App({ Component, pageProps, router }) {
  useEffect(() => {
    AOS.init({ once: true });
  }, []);

  const getLayout = router.pathname.includes("/admin")
    ? (page) => <LayoutAdmin children={page} />
    : router.pathname.match(/^\/auth\/.*$/)
    ? (page) => <LayoutLogReg children={page} />
    : (page) => <LayoutMain children={page} />;

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {getLayout(<Component {...pageProps} />, pageProps)}
      </PersistGate>
    </Provider>
  );
}
