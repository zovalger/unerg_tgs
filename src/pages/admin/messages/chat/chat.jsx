import React, { useState, useRef, useEffect, useContext } from "react";
import Link from "next/link";

import Layout from "@/layouts/Layout";
import NavBar from "@/components/common/NavBar";

import { IoIosArrowBack } from "react-icons/io";
import ChatsContext from "@/contexts/Chats.context";

import styleN from "@/styles/Nav/NavStyle.module.css";
import ChatView from "@/components/messagesView/ChatView";

const Chat = () => {
	const { sendMessage, reciveMessage, messages } = useContext(ChatsContext);

	return (
		<Layout>
			<NavBar
				title={"Chat"}
				ViPrincipal={true}
				left={
					<div>
						<Link href={"../map"} className={styleN.btn_return}>
							<IoIosArrowBack />
						</Link>
					</div>
				}
				right={
					<>
						<Link href={"./add"}></Link>
					</>
				}
			/>

			<ChatView
				chat={{}}
				messages={[]}
				sendMessage={(text, image) => console.log(text, image)}
			/>
		</Layout>
	);
};

export default Chat;
