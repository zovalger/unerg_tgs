import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

import "@/styles/globals.css";
import { MapProvider } from "@/contexts/Map.context";
import { UserProvider } from "@/contexts/User.context";
import { Toaster } from "react-hot-toast";
import { DriverProvider } from "@/contexts/Driver.context";
import { SocketProvider } from "@/contexts/Socket.context";
import { WaypointProvider } from "@/contexts/Waypoint.context";
import { RutaProvider } from "@/contexts/Ruta.context";
import { BusProvider } from "@/contexts/Bus.context";
import { ToastProvider } from "@/contexts/Toast.context";

export default function App({ Component, pageProps }) {
	return (
		<ToastProvider>
			<MapProvider>
				<SocketProvider>
					<UserProvider>
						<DriverProvider>
							<WaypointProvider>
								<RutaProvider>
									<BusProvider>
									
										<Component {...pageProps} />
									</BusProvider>
								</RutaProvider>
							</WaypointProvider>
						</DriverProvider>
					</UserProvider>
				</SocketProvider>
			</MapProvider>
		</ToastProvider>
	);
}
