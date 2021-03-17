import {useState} from "react";

export const useFormData = (lastRating, onSubmit) => {
  const [formData, setFormData] = useState({
    "rating": lastRating,
    "review-text": ``
  });

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
