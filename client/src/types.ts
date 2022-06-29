interface FormAttributeProps {
  form: HTMLFormElement;
}

export interface InputFieldAttributesProps extends FormAttributeProps {
  field: React.HTMLAttributes<HTMLInputElement>;
}

export interface TextareaFieldAttributesProps extends FormAttributeProps {
  field: React.ReactHTMLElement<HTMLTextAreaElement>;
}

export interface SelectFieldAttributesProps extends FormAttributeProps {
  field: React.ReactHTMLElement<HTMLSelectElement>;
}
