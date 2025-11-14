/**
 * Type definitions for Operations Practice Path
 */

export type OperationType =
  // Arithmetic (Phase 1)
  | 'addition' | 'subtraction' | 'multiplication' | 'division' | 'mixed-arithmetic'
  // Algebraic (Phase 2)
  | 'simple-equation' | 'expression-evaluation' | 'simplification'
  // Logical (Phase 3)
  | 'comparison' | 'logical-operators' | 'compound-conditions'
  // Structural (Phase 4)
  | 'sets' | 'sequences' | 'functions'
  // Algorithmic (Phase 5)
  | 'sorting' | 'counting' | 'composition';

export type DifficultyLevel = 'basic' | 'intermediate' | 'advanced' | 'expert';
export type PhaseType = 'arithmetic' | 'algebraic' | 'logical' | 'structural' | 'algorithmic';

/**
 * Operation level definition (without level number)
 * Use this when defining problems - the level number is assigned automatically based on array position
 */
export interface OperationLevelDefinition {
  title: string;
  description?: string;
  operationType: OperationType;
  phase: PhaseType;
  difficulty: DifficultyLevel;
  problemsToComplete: number;
  thematicUnits?: string[]; // Array of thematic unit codes (e.g., ['M1-NUM-001', 'M1-NUM-002'])
  config: {
    // General numeric config
    minValue?: number;
    maxValue?: number;
    allowNegatives?: boolean;
    forceNegative?: boolean;
    allowDecimals?: boolean;
    numberOfOperands?: number;

    // Arithmetic
    mixedOperations?: OperationType[];
    specificTables?: number[];

    // Algebraic
    variables?: string[];
    equationType?: 'x+a=b' | 'x-a=b' | 'a-x=b' | 'ax=b' | 'x/a=b' | 'ax+b=c' | 'ax-b=c' | 'a(x+b)=c' | '2x+a=x+b' | 'ax+b=cx+d';
    expressionType?: 'x+a' | 'ax' | 'ax+b' | 'x²' | 'ax²+b' | 'x+y' | 'xy' | 'ax+by' | 'x²+y²' | '(x+y)²';
    simplificationType?:
      | 'x+x' | 'ax+bx' | 'ax-bx' | '-ax-bx' | '-ax+bx'
      | 'x±x±x' | 'ax±bx±cx' | 'x+x+x' | 'ax+bx-cx' | 'ax+x-x'
      | 'ax+by+x' | 'ax+by-x' | 'ax-by+x'
      | 'ax+by+cx-dy' | 'ax+by-cx+dy' | 'ax-by+cx-dy'
      | 'a(x+b)+x' | 'a(x+b)+cx' | 'a(x+b)-cx' | 'a(x+b)+c(x+d)'
      | 'a(x+y)+bx' | 'a(x+b)+c(y+d)'
      | 'a(bx+y)-c(dx-y)';

    // Logical
    operators?: string[];
    conditionType?: 'x>a' | 'x>a AND x<b' | 'x<a OR x>b' | 'range' | 'two-vars-AND' | 'two-vars-OR' | 'NOT' | 'multiple';

    // Structural
    sequenceLength?: number;
    sequenceType?: '+n' | '-n' | '*n' | 'squares' | 'fibonacci' | 'alternating' | 'two-rules' | 'complex';
    setSize?: number;
    functionType?: 'x+a' | 'ax' | 'ax+b' | 'x²' | 'x²+ax' | 'x+y' | 'xy' | 'x²+y²' | 'composition' | 'inverse';

    // Algorithmic
    algorithmSteps?: number;
    arraySize?: number;
    sortingType?: 'sort-asc' | 'sort-desc' | 'min' | 'max' | 'median';
    countingType?: 'count-all' | 'count-even' | 'count-odd' | 'count-greater' | 'count-multiples' | 'count-duplicates' | 'count-unique' | 'sum-even' | 'count-condition';
    compositionType?: 'map+n' | 'map*n' | 'map-then-reduce' | 'filter-even' | 'filter-map' | 'three-transforms' | 'reduce' | 'conditional' | 'pipeline';

    // Complexity indicator (1-4)
    complexity?: number;
  };
}

/**
 * Operation level (with level number assigned)
 * This is the final type used in OPERATIONS_PATH after level numbers are calculated
 */
export interface OperationLevel extends OperationLevelDefinition {
  level: number;
}
