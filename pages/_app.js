import CustomAlert from "../components/common/CustomAlert";
import ProgressSpinner from "../components/common/ProgressSpinner";
import Layout from "../components/layout";
import "../styles/globals.css";
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <ProgressSpinner />
      <CustomAlert />
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
