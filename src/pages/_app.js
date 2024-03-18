import AuthGard from "@/components/Guard/AuthGard";
import Layout from "@/components/Layout";
import { store } from "@/redux/store";
import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Toaster position="top-center" reverseOrder={false} />
			<Layout>
				<AuthGard>
					<Component {...pageProps} />
				</AuthGard>
			</Layout>
		</Provider>
	);
}
