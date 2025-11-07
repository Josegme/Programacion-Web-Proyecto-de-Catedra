export interface ContactoData {
  nombre: string;
  email: string;
  mensaje?: string;
  fecha: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}