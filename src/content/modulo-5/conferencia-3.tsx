import type { ConferenciaData } from "../../types";
import { Box } from "../../components/CourseComponents";

export const data: ConferenciaData = {
	titulo: "5.3 Cobertura de branches, linhas e funções",
	objetivos: [
		"Compreender os conceitos fundamentais desta conferência.",
		"Aplicar os conhecimentos em exercícios práticos.",
	],
	contenido: (
		<>
			<Box className='bg-primary/10 border-primary mb-12'>
				<h3 className='text-2xl font-black uppercase mb-4 text-primary'>
					Em Construção
				</h3>
				<p className='text-lg leading-relaxed'>
					Esta conferência está a ser preparada. Fica atento às atualizações!
				</p>
			</Box>
		</>
	),
	ejercicios: [],
};
