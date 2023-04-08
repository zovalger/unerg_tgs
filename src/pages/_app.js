import { MapProvider } from "@/contexts/MapContext";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
	return (
		<MapProvider>
			<Component {...pageProps} />
		</MapProvider>
	);
}
