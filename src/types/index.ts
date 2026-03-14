export interface CodeExample {
  language: string;
  code: string;
  label?: string;
}

export interface Ejercicio {
  titulo: string;
  descripcion: string;
}

export interface ConferenciaData {
  titulo: string;
  objetivos: string[];
  contenido: React.ReactNode;
  codeExamples?: CodeExample[];
  ejercicios?: Ejercicio[];
}

export interface ConferenciaLink {
  id: string;
  path: string;
  titulo: string;
}

export interface Modulo {
  id: string;
  titulo: string;
  conferencias: ConferenciaLink[];
}

export interface Bibliografia {
  titulo: string;
  autor: string;
  ano: string;
  tipo: 'Oficial' | 'Libro' | 'Articulo';
  enlace?: string;
}

export interface CriterioEvaluacion {
  nombre: string;
  porcentaje: number;
  descripcion: string;
}
