import type { Modulo, Bibliografia, CriterioEvaluacion } from "../types";

export const COURSE_NAME = "Testing com Bun.js";
export const COURSE_CODE = "Opcional 2";

export const MODULOS: Modulo[] = [
	{
		id: "modulo-1",
		titulo: "MÓDULO 1: Fundamentos e Configuração",
		conferencias: [
			{
				id: "1.1",
				path: "modulo-1/conferencia-1",
				titulo: "1.1 Introdução ao Bun e ao seu ecossistema de testing",
			},
			{
				id: "1.2",
				path: "modulo-1/conferencia-2",
				titulo: "1.2 Instalação e configuração inicial",
			},
			{
				id: "1.3",
				path: "modulo-1/conferencia-1",
				titulo: "1.3 O teu primeiro teste com o Bun",
			},
		],
	},
	{
		id: "modulo-2",
		titulo: "MÓDULO 2: Testing Fundamental",
		conferencias: [
			{
				id: "2.1",
				path: "modulo-2/conferencia-1",
				titulo: "2.1 Assertions e Matchers",
			},
			{
				id: "2.2",
				path: "modulo-2/conferencia-2",
				titulo: "2.2 Setup e Teardown",
			},
			{
				id: "2.3",
				path: "modulo-2/conferencia-3",
				titulo: "2.3 Organização de testes",
			},
		],
	},
	{
		id: "modulo-3",
		titulo: "MÓDULO 3: Testing Assíncrono",
		conferencias: [
			{
				id: "3.1",
				path: "modulo-3/conferencia-1",
				titulo: "3.1 Promises e Async/Await",
			},
			{
				id: "3.2",
				path: "modulo-3/conferencia-2",
				titulo: "3.2 Timers e Mocking de tempo",
			},
			{
				id: "3.3",
				path: "modulo-3/conferencia-3",
				titulo: "3.3 Testing de APIs e HTTP",
			},
		],
	},
	{
		id: "modulo-4",
		titulo: "MÓDULO 4: Testing de Código Real",
		conferencias: [
			{ id: "4.1", path: "modulo-4/conferencia-1", titulo: "4.1 Unit Testing" },
			{
				id: "4.2",
				path: "modulo-4/conferencia-2",
				titulo: "4.2 Integration Testing",
			},
			{
				id: "4.3",
				path: "modulo-4/conferencia-3",
				titulo: "4.3 Testing de TypeScript",
			},
		],
	},
	{
		id: "modulo-5",
		titulo: "MÓDULO 5: Testing de Aplicações Web",
		conferencias: [
			{
				id: "5.1",
				path: "modulo-5/conferencia-1",
				titulo: "5.1 Testing de Componentes React",
			},
			{
				id: "5.2",
				path: "modulo-5/conferencia-2",
				titulo: "5.2 End-to-End (E2E) com o Playwright/Bun",
			},
		],
	},
	{
		id: "modulo-6",
		titulo: "MÓDULO 6: Code Coverage e Qualidade",
		conferencias: [
			{
				id: "6.1",
				path: "modulo-6/conferencia-1",
				titulo: "6.1 Relatórios de Coverage nativos",
			},
			{
				id: "6.2",
				path: "modulo-6/conferencia-2",
				titulo: "6.2 Linting e Testes Automáticos",
			},
		],
	},
	{
		id: "modulo-7",
		titulo: "MÓDULO 7: Performance Testing",
		conferencias: [
			{
				id: "7.1",
				path: "modulo-7/conferencia-1",
				titulo: "7.1 Performance testing (Benchmarking, Optimización)",
			},
		],
	},
	{
		id: "modulo-8",
		titulo: "MÓDULO 8: Proyectos Prácticos",
		conferencias: [
			{
				id: "8.1",
				path: "modulo-8/conferencia-1",
				titulo: "8.1 Proyecto 1: API REST con Testing Completo",
			},
		],
	},
	{
		id: "modulo-9",
		titulo: "MÓDULO 9: Recursos y Siguiente Nivel",
		conferencias: [
			{
				id: "9.1",
				path: "modulo-9/conferencia-1",
				titulo: "9.1 Comunidad y recursos",
			},
		],
	},
];

export const NAV_LINKS = [
	{ title: "Início", path: "/" },
	{ title: "Conferências", path: "/conferencias" },
	{ title: "Bibliografia", path: "/bibliografia" },
	{ title: "Avaliação", path: "/avaliacao" },
];

export const BIBLIOGRAFIA: Bibliografia[] = [
	{
		titulo: "Bun Testing Documentation",
		autor: "Oven (Bun Core Team)",
		ano: "2024",
		tipo: "Oficial",
		enlace: "https://bun.sh/docs/cli/test",
	},
	{
		titulo: "Testing JavaScript Applications",
		autor: "Lucas da Silva",
		ano: "2023",
		tipo: "Livro",
		downloadUrl: "/libros/testing-javascript-applications.pdf",
	},
	{
		titulo: "Testing Strategies for Modern Web Applications",
		autor: "Ramón Guijarro, Medium",
		ano: "2020",
		tipo: "Artigo",
		enlace:
			"https://medium.com/scopedev/testing-strategies-for-modern-web-applications-71836e480cc6",
	},
	{
		titulo: "Migrate from Jest to Bun's test runner",
		autor: "Bun.sh",
		ano: "2026",
		tipo: "Oficial",
		enlace: "https://bun.com/docs/guides/test/migrate-from-jest",
	},
	{
		titulo: "Elysia.js Testing Guide",
		autor: "SaltyAom",
		ano: "2024",
		tipo: "Oficial",
		enlace: "https://elysiajs.com/essential/plugin.html#testing",
	},
];

export const EVALUACIONES: CriterioEvaluacion[] = [
	{
		nombre: "Provas Parcelares (2)",
		porcentaje: 40,
		descripcion:
			"Duas provas teóricas e práticas realizadas durante o semestre (20% cada) para validar os fundamentos.",
	},
	{
		nombre: "Exame Final & Projeto Integrador",
		porcentaje: 60,
		descripcion:
			"Apresentação de um Projeto Integrador desenvolvido após a segunda parcelar, integrando todos os conhecimentos de Bun e Teste de Software.",
	},
];
