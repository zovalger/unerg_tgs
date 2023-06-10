import * as Yup from "yup";

export const rutaValidatorSchema = Yup.object({
	name: Yup.string()
				.required("El nombre es obligatorio")
				.min(3, "El nombre es muy corto"),
			description: Yup.string(),
});
