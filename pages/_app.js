import Layout from "../components/layout";
import "../styles/globals.css";
// test commit !
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
