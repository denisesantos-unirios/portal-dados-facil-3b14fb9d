export interface ApiModule {
  id: string;
  name: string;
  description: string;
  icon: string;
  endpoints: Endpoint[];
}

export interface Endpoint {
  id: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  description: string;
  parameters?: Parameter[];
}

export interface Parameter {
  name: string;
  type: 'string' | 'number' | 'boolean';
  required: boolean;
  description: string;
  example?: string;
}

export interface QueryResult {
  data: unknown;
  loading: boolean;
  error: string | null;
}
