import type { Modulo, Bibliografia, CriterioEvaluacion } from "../types";

export const COURSE_NAME = "Testing com Bun.js";
export const COURSE_CODE = "Opcional 2";

export const MODULOS: Modulo[] = [
	{
		id: "modulo-1",
		titulo: "MÓDULO 1: Preparação e Boas-Vindas",
		conferencias: [
			{
				id: "1.1",
				path: "modulo-1/conferencia-1",
				titulo: "1.1 Por que testar software? A história de um desastre real",
			},
			{
				id: "1.2",
				path: "modulo-1/conferencia-2",
				titulo: "1.2 Instalação e configuração do ambiente com Bun",
			},
		],
	},
	{
		id: "modulo-2",
		titulo: "MÓDULO 2: Fundamentos do Testing",
		conferencias: [
			{
				id: "2.1",
				path: "modulo-2/conferencia-1",
				titulo: "2.1 O que é um teste? Anatomia de um teste do zero",
			},
			{
				id: "2.2",
				path: "modulo-2/conferencia-2",
				titulo: "2.2 O ciclo de vida de um teste: Arrange, Act, Assert (AAA)",
			},
			{
				id: "2.3",
				path: "modulo-2/conferencia-3",
				titulo: "2.3 Tipos de testes: unitários, de integração e end-to-end",
			},
			{
				id: "2.4",
				path: "modulo-2/conferencia-4",
				titulo: "2.4 Testes com bun:test — primeira bateria de testes reais",
			},
			{
				id: "2.5",
				path: "modulo-2/conferencia-5",
				titulo: "2.5 Matchers: como verificar resultados de forma precisa",
			},
			{
				id: "2.6",
				path: "modulo-2/conferencia-6",
				titulo: "2.6 Organização de testes com describe, it e test",
			},
		],
	},
	{
		id: "modulo-3",
		titulo: "MÓDULO 3: Mocking e Controle de Dependências",
		conferencias: [
			{
				id: "3.1",
				path: "modulo-3/conferencia-1",
				titulo: "3.1 O que é um Mock? Controlar o mundo para testar",
			},
			{
				id: "3.2",
				path: "modulo-3/conferencia-2",
				titulo: "3.2 mock() e jest.fn() — criando funções falsas",
			},
			{
				id: "3.3",
				path: "modulo-3/conferencia-3",
				titulo: "3.3 spyOn() — espionando funções reais sem as destruir",
			},
			{
				id: "3.4",
				path: "modulo-3/conferencia-4",
				titulo: "3.4 Mocking de módulos inteiros com mock.module()",
			},
			{
				id: "3.5",
				path: "modulo-3/conferencia-5",
				titulo: "3.5 Mocking de tempo: setSystemTime e datas controladas",
			},
			{
				id: "3.6",
				path: "modulo-3/conferencia-6",
				titulo: "3.6 Mocking avançado: retornos, implementações e reset",
			},
			{
				id: "3.7",
				path: "modulo-3/conferencia-7",
				titulo: "3.7 Workshop prático: testando um sistema com mocks reais",
			},
		],
	},
	{
		id: "modulo-4",
		titulo: "MÓDULO 4: Testes Assíncronos",
		conferencias: [
			{
				id: "4.1",
				path: "modulo-4/conferencia-1",
				titulo: "4.1 Async/Await no testing: por que é diferente?",
			},
			{
				id: "4.2",
				path: "modulo-4/conferencia-2",
				titulo: "4.2 Testando Promises, fetch e APIs externas",
			},
			{
				id: "4.3",
				path: "modulo-4/conferencia-3",
				titulo: "4.3 Timeouts, retries e testes que demoram",
			},
			{
				id: "4.4",
				path: "modulo-4/conferencia-4",
				titulo: "4.4 Workshop: testando uma API real com mocks de fetch",
			},
		],
	},
	{
		id: "modulo-5",
		titulo: "MÓDULO 5: Cobertura de Código",
		conferencias: [
			{
				id: "5.1",
				path: "modulo-5/conferencia-1",
				titulo: "5.1 O que é cobertura de código? bun test --coverage",
			},
			{
				id: "5.2",
				path: "modulo-5/conferencia-2",
				titulo: "5.2 Interpretando relatórios de cobertura",
			},
			{
				id: "5.3",
				path: "modulo-5/conferencia-3",
				titulo: "5.3 Cobertura de branches, linhas e funções",
			},
		],
	},
	{
		id: "modulo-6",
		titulo: "MÓDULO 6: TDD — Test Driven Development",
		conferencias: [
			{
				id: "6.1",
				path: "modulo-6/conferencia-1",
				titulo: "6.1 A filosofia TDD: escrever o teste antes do código",
			},
			{
				id: "6.2",
				path: "modulo-6/conferencia-2",
				titulo: "6.2 O ciclo Red-Green-Refactor na prática",
			},
			{
				id: "6.3",
				path: "modulo-6/conferencia-3",
				titulo: "6.3 TDD aplicado a funções puras",
			},
			{
				id: "6.4",
				path: "modulo-6/conferencia-4",
				titulo: "6.4 TDD aplicado a uma API REST com Elysia.js",
			},
			{
				id: "6.5",
				path: "modulo-6/conferencia-5",
				titulo: "6.5 Workshop TDD: construindo um módulo do zero com testes",
			},
		],
	},
	{
		id: "modulo-7",
		titulo: "MÓDULO 7: Testes de Integração e End-to-End",
		conferencias: [
			{
				id: "7.1",
				path: "modulo-7/conferencia-1",
				titulo: "7.1 Diferença entre unitário e integração na prática",
			},
			{
				id: "7.2",
				path: "modulo-7/conferencia-2",
				titulo: "7.2 Testando rotas HTTP com Elysia.js e bun:test",
			},
			{
				id: "7.3",
				path: "modulo-7/conferencia-3",
				titulo: "7.3 Testando com banco de dados: estratégias e fixtures",
			},
		],
	},
	{
		id: "modulo-8",
		titulo: "MÓDULO 8: Boas Práticas e Projeto Final",
		conferencias: [
			{
				id: "8.1",
				path: "modulo-8/conferencia-1",
				titulo: "8.1 Boas práticas: como escrever testes que não mentem",
			},
			{
				id: "8.2",
				path: "modulo-8/conferencia-2",
				titulo: "8.2 Projeto final: sistema completo com testes",
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
