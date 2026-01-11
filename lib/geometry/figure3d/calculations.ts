/**
 * Volume and Surface Area Calculations for 3D Solids
 */

/**
 * Calculate cube volume
 */
export function volumeCubo(lado: number): number {
  return lado * lado * lado;
}

/**
 * Calculate rectangular prism volume
 */
export function volumePrismaRectangular(
  largo: number,
  ancho: number,
  altura: number
): number {
  return largo * ancho * altura;
}

/**
 * Calculate triangular prism volume
 */
export function volumePrismaTriangular(
  baseWidth: number,
  baseHeight: number,
  profundidad: number
): number {
  const baseArea = (baseWidth * baseHeight) / 2;
  return baseArea * profundidad;
}

/**
 * Calculate pyramid volume (general)
 */
export function volumePiramide(baseArea: number, altura: number): number {
  return (baseArea * altura) / 3;
}

/**
 * Calculate square pyramid volume
 */
export function volumePiramideCuadrada(base: number, altura: number): number {
  return volumePiramide(base * base, altura);
}

/**
 * Calculate triangular pyramid volume
 */
export function volumePiramideTriangular(base: number, altura: number): number {
  // Equilateral triangle base area
  const baseArea = (Math.sqrt(3) / 4) * base * base;
  return volumePiramide(baseArea, altura);
}

/**
 * Calculate cylinder volume
 */
export function volumeCilindro(radio: number, altura: number): number {
  return Math.PI * radio * radio * altura;
}

/**
 * Calculate cone volume
 */
export function volumeCono(radio: number, altura: number): number {
  return (Math.PI * radio * radio * altura) / 3;
}

/**
 * Calculate sphere volume
 */
export function volumeEsfera(radio: number): number {
  return (4 / 3) * Math.PI * radio * radio * radio;
}

/**
 * Calculate cube surface area
 */
export function areaSuperficieCubo(lado: number): number {
  return 6 * lado * lado;
}

/**
 * Calculate rectangular prism surface area
 */
export function areaSuperficiePrismaRectangular(
  largo: number,
  ancho: number,
  altura: number
): number {
  return 2 * (largo * ancho + largo * altura + ancho * altura);
}

/**
 * Calculate cylinder surface area
 */
export function areaSuperficieCilindro(radio: number, altura: number): number {
  const lateral = 2 * Math.PI * radio * altura;
  const bases = 2 * Math.PI * radio * radio;
  return lateral + bases;
}

/**
 * Calculate cone surface area
 */
export function areaSuperficieCono(radio: number, altura: number): number {
  const slantHeight = Math.sqrt(radio * radio + altura * altura);
  const lateral = Math.PI * radio * slantHeight;
  const base = Math.PI * radio * radio;
  return lateral + base;
}

/**
 * Calculate sphere surface area
 */
export function areaSuperficieEsfera(radio: number): number {
  return 4 * Math.PI * radio * radio;
}
