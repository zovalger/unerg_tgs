import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/globals.css";
import { MapProvider } from "@/contexts/MapContext";

export default function App({ Component, pageProps }) {
	return (
		<MapProvider>
			<Component {...pageProps} />
		</MapProvider>
	);
}
