import { GoLocation } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";

import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

import ButtonFloatingContainer from "@/components/common/ButtonFloating_Container";
import NavBar from "@/components/common/NavBar";

import { useState } from "react";
import dynamic from "next/dynamic";

const MapView = dynamic(() => import("@/components/MapView/MapView"), {
	ssr: false,
});

const MainMap = () => {
	const [offcanvasActive, setOffcanvasActive] = useState(false);

	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	return (
		<div className="AppView">
			{/* nav customizable */}
			<NavBar
				left={
					<div color="primary" onClick={toggleOffcanvas}>
						<RxHamburgerMenu />
					</div>
				}
				title={"Vista de mapa"}
				right={<></>}
			/>

			{/* contenedor del mapa */}

			<div className="MapView__Container">
				<MapView />
			</div>

			{/* botones inferiores */}

			<ButtonFloatingContainer>
				<Button color="primary">
					<GoLocation />
				</Button>
			</ButtonFloatingContainer>

			{/* panel lateral desplegable */}

			<div>
				<Offcanvas isOpen={offcanvasActive} toggle={toggleOffcanvas}>
					<OffcanvasHeader toggle={toggleOffcanvas}>Offcanvas</OffcanvasHeader>
					<OffcanvasBody>
						<strong>This is the Offcanvas body.</strong>
					</OffcanvasBody>
				</Offcanvas>
			</div>
		</div>
	);
};

export default MainMap;
