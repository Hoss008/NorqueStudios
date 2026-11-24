import React from 'react';

export default function ContactFieldError({ id, error }) {
  if (!error) return null;
  return <p id={id} role="alert" className="text-xs mt-1">{error.message}</p>;
}
