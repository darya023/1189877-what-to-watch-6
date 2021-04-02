import {useState} from "react";

export const useFormData = (initialFormData, onSubmit) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleFieldChange = (event) => {
    const {name, value} = event.target;

    setFormData((state)=>({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return [formData, handleFieldChange, handleSubmit];
};
