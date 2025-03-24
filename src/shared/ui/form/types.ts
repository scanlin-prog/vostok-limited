export interface SchemaItem {
  id?: string | number | null;
  type?: string;
  name: string;
  label?: string;
  hint?: string;
  placeholder?: string;
  disabled?: boolean;
}

export interface SelectItem {
  id: string | number;
  value: string | number;
  title: string;
  disabled?: boolean;
  cityId?: string;
  workshopId?: string;
}
