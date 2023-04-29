import "bootstrap/dist/css/bootstrap.min.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "@/styles/globals.css";
import { MapProvider } from "@/contexts/MapContext";
import { UserProvider } from "@/contexts/UserProvider";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
	return (
		<UserProvider>
			<MapProvider>
				<Toaster />

				<Component {...pageProps} />
			</MapProvider>
		</UserProvider>
	);
}
