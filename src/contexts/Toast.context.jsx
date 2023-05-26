import toast, { Toaster } from "react-hot-toast";
import { createContext, useState, useEffect } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
	// Función para mostrar un toast de éxito
	function showSuccessToast(message) {
		return toast.success(message);
	}

	// Función para mostrar un toast de error
	function showErrorToast(message) {
		return toast.error(message, {
			duration: 2500,
		});
	}

	// Función para mostrar un toast de información
	function showInfoToast(message) {
		return toast(message);
	}

	// Función para mostrar un toast de carga
	function showLoadingToast() {
		return toast.loading("Cargando...");
	}

	// Función que envuelve una promesa y muestra un toast de carga mientras se está ejecutando
	function withLoadingToast(promise) {
		showLoadingToast();
		return promise.finally(hideAllToasts);
	}

	// Función que envuelve una promesa y muestra un toast de carga mientras se está ejecutando
	function withLoadingSuccessAndErrorFuntionsToast(promise, success, error) {
		// showLoadingToast();
		// return promise.finally(hideAllToasts);

		toast.promise(
			promise,
			{
				id: "LoandingData",
				loading: "Espere un momento...",
				success,
				error,
			},
			{
				success: {
					duration: 2000,
				},
				error: {
					duration:2000,
				},
			}
		);
	}

	// Función para ocultar todos los toasts
	function hideAllToasts() {
		return toast.dismiss();
	}
	return (
		<ToastContext.Provider
			value={{
				showSuccessToast,
				showErrorToast,
				showInfoToast,
				showLoadingToast,
				withLoadingToast,
				withLoadingSuccessAndErrorFuntionsToast,
				hideAllToasts,
			}}
		>
			<Toaster />
			{children}
		</ToastContext.Provider>
	);
};

export default ToastContext;
