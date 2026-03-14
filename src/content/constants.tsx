import type { Modulo, Bibliografia, CriterioEvaluacion } from '../types';

export const COURSE_NAME = "Testing com Bun.js";
export const COURSE_CODE = "Opcional 2";

export const MODULOS: Modulo[] = [
  {
    id: "modulo-1",
    titulo: "MÓDULO 1: Fundamentos y Configuración",
    conferencias: [
      { id: "1.1", path: "modulo-1/conferencia-1", titulo: "1.1 Introducción a Bun y su ecosistema de testing" },
      { id: "1.2", path: "modulo-1/conferencia-2", titulo: "1.2 Instalación y configuración inicial" },
      { id: "1.3", path: "modulo-1/conferencia-3", titulo: "1.3 Tu primer test con Bun" }
    ]
  },
  {
    id: "modulo-2",
    titulo: "MÓDULO 2: Testing Fundamental",
    conferencias: [
      { id: "2.1", path: "modulo-2/conferencia-1", titulo: "2.1 Assertions y Matchers" },
      { id: "2.2", path: "modulo-2/conferencia-2", titulo: "2.2 Setup y Teardown" },
      { id: "2.3", path: "modulo-2/conferencia-3", titulo: "2.3 Organización de tests" }
    ]
  },
  {
    id: "modulo-3",
    titulo: "MÓDULO 3: Testing Asíncrono",
    conferencias: [
      { id: "3.1", path: "modulo-3/conferencia-1", titulo: "3.1 Promises y Async/Await" },
      { id: "3.2", path: "modulo-3/conferencia-2", titulo: "3.2 Timers y Mocking de tiempo" },
      { id: "3.3", path: "modulo-3/conferencia-3", titulo: "3.3 Testing de APIs y HTTP" }
    ]
  },
  {
    id: "modulo-4",
    titulo: "MÓDULO 4: Testing de Código Real",
    conferencias: [
      { id: "4.1", path: "modulo-4/conferencia-1", titulo: "4.1 Unit Testing" },
      { id: "4.2", path: "modulo-4/conferencia-2", titulo: "4.2 Integration Testing" },
      { id: "4.3", path: "modulo-4/conferencia-3", titulo: "4.3 Testing de TypeScript" }
    ]
  },
  {
    id: "modulo-5",
    titulo: "MÓDULO 5: Testing de Aplicaciones Web",
    conferencias: [
      { id: "5.1", path: "modulo-5/conferencia-1", titulo: "5.1 Testing de APIs REST" },
      { id: "5.2", path: "modulo-5/conferencia-2", titulo: "5.2 Testing de aplicaciones full-stack" }
    ]
  },
  {
    id: "modulo-6",
    titulo: "MÓDULO 6: Code Coverage y Calidad",
    conferencias: [
      { id: "6.1", path: "modulo-6/conferencia-1", titulo: "6.1 Coverage con Bun" },
      { id: "6.2", path: "modulo-6/conferencia-2", titulo: "6.2 Mejores prácticas" }
    ]
  },
  {
    id: "modulo-7",
    titulo: "MÓDULO 7: Performance Testing",
    conferencias: [
      { id: "7.1", path: "modulo-7/conferencia-1", titulo: "7.1 Performance testing (Benchmarking, Optimización)" }
    ]
  },
  {
    id: "modulo-8",
    titulo: "MÓDULO 8: Proyectos Prácticos",
    conferencias: [
      { id: "8.1", path: "modulo-8/conferencia-1", titulo: "8.1 Proyecto 1: API REST con Testing Completo" }
    ]
  },
  {
    id: "modulo-9",
    titulo: "MÓDULO 9: Recursos y Siguiente Nivel",
    conferencias: [
      { id: "9.1", path: "modulo-9/conferencia-1", titulo: "9.1 Comunidad y recursos" }
    ]
  }
];

export const NAV_LINKS = [
  { title: "Início", path: "/" },
  { title: "Conferências", path: "/conferencias" },
  { title: "Bibliografia", path: "/bibliografia" },
  { title: "Avaliação", path: "/avaliacao" }
];

export const BIBLIOGRAFIA: Bibliografia[] = [
  {
    titulo: "Bun Testing Documentation",
    autor: "Oven (Bun Core Team)",
    ano: "2024",
    tipo: "Oficial",
    enlace: "https://bun.sh/docs/cli/test"
  },
  {
    titulo: "Testing JavaScript Applications",
    autor: "Lucas da Silva",
    ano: "2023",
    tipo: "Libro"
  },
  {
    titulo: "Modern Web Testing Strategies",
    autor: "Maria Fernandes",
    ano: "2023",
    tipo: "Articulo",
    enlace: "https://example.com/modern-web-testing"
  },
  {
    titulo: "Migrating from Jest to Bun",
    autor: "Carlos Mendes",
    ano: "2024",
    tipo: "Articulo"
  },
  {
    titulo: "Elysia.js Testing Guide",
    autor: "SaltyAom",
    ano: "2024",
    tipo: "Oficial",
    enlace: "https://elysiajs.com/essential/plugin.html#testing"
  }
];

export const EVALUACIONES: CriterioEvaluacion[] = [
  {
    nombre: "Participación y Ejercicios",
    porcentaje: 20,
    descripcion: "Participación activa en clases y resolución de ejercicios prácticos al final de cada conferencia."
  },
  {
    nombre: "Proyecto Práctico (API REST)",
    porcentaje: 40,
    descripcion: "Desarrollo y testeo completo de una API REST utilizando Bun y las mejores prácticas."
  },
  {
    nombre: "Examen Final",
    porcentaje: 40,
    descripcion: "Examen teórico-práctico sobre todos los conceptos aprendidos durante el curso."
  }
];
