import { GoLocation } from "react-icons/go";
import { Button, Offcanvas, OffcanvasBody, OffcanvasHeader } from "reactstrap";

import ButtonFloatingContainer from "@/components/common/ButtonFloating_Container";
import NavBar from "@/components/common/NavBar";
import MapView from "@/components/MapView";
import { useState } from "react";

const MainMap = () => {
	const [offcanvasActive, setOffcanvasActive] = useState(false);

	const toggleOffcanvas = () => setOffcanvasActive(!offcanvasActive);

	return (
		<div className="AppView">
			<NavBar title={"Vista de mapa"}></NavBar>

			<div className="MapView__Container">
				<MapView />

				<ButtonFloatingContainer>
					<Button color="primary">
						<GoLocation />
					</Button>
				</ButtonFloatingContainer>
			</div>

			<div>
				<Button color="primary" onClick={toggleOffcanvas}>
					Open
				</Button>
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
