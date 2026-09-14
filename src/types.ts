export interface TemplateSection {
  id: string;
  type: string;
  content: Record<string, any>;
  editable: boolean;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  thumbnail: string;
  sections: TemplateSection[];
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
}

export interface EditingState {
  selectedSection: string | null;
  selectedElement: string | null;
  isEditing: boolean;
}
