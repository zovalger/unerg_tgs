import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";

import "@/styles/globals.css";
import { MapProvider } from "@/contexts/MapContext";

export default function App({ Component, pageProps }) {
	return (
		<MapProvider>
			<Component {...pageProps} />
		</MapProvider>
	);
}
