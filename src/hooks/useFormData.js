import {useState} from "react";
import {useLocation} from "react-router";

export const useFormData = (lastRating, onSubmit, redirect) => {
  const path = useLocation().pathname;
  const regexp = /(\/.*)\/review/;
  const [, url] = path.match(regexp);

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
    redirect(url);
  };

  return [formData, handleFieldChange, handleSubmit];
};
