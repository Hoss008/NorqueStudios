import { useId } from 'react';
import { useController, useForm } from 'react-hook-form';

const defaults = {
  name: '', phone: '', email: '', company: '', website: '', details: '',
  projectTypes: [], budget: '', source: '', _gotcha: '',
};

function validWebsite(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    if (['http:', 'https:'].includes(url.protocol)) return true;
  } catch {
    // Show the same correction for incomplete URLs and unsupported protocols.
  }
  return 'Enter a website starting with https:// or http://.';
}

const lengthLimit = value => ({ value, message: `Use ${value} characters or fewer.` });
const rules = {
  name: { required: 'Enter your name.', maxLength: lengthLimit(120) },
  phone: {
    required: 'Enter your phone number.',
    validate: value => (/^\+?[\d\s().-]+$/.test(value) && /^\d{7,15}$/.test(value.replace(/\D/g, ''))) || 'Enter a valid phone number, including your country code if applicable.',
    maxLength: lengthLimit(40),
  },
  email: {
    required: 'Enter your email address.',
    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address.' },
    maxLength: lengthLimit(254),
  },
  company: { maxLength: lengthLimit(160) },
  website: { validate: validWebsite, maxLength: lengthLimit(2048) },
  details: { maxLength: lengthLimit(5000) },
};

export function useContactForm() {
  const id = useId();
  const { register, control, handleSubmit, setError, reset, formState } = useForm({ defaultValues: defaults });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;
  const { field: projects } = useController({ name: 'projectTypes', control });
  const { field: budget } = useController({ name: 'budget', control });
  const { field: referral } = useController({ name: 'source', control });

  function inputProps(name) {
    return {
      ...register(name, { ...rules[name], setValueAs: value => value.trim() }),
      id: id + name,
      'aria-invalid': Boolean(errors[name]),
      'aria-describedby': errors[name] ? id + name + '-error' : undefined,
    };
  }

  async function send(values) {
    const formId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim();
    const failed = message => setError('root.delivery', { type: 'delivery', message });
    if (!formId || !/^[a-z0-9]+$/i.test(formId)) {
      failed('The form is temporarily unavailable. Please email Norque directly.');
      return;
    }
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, projectTypes: values.projectTypes.join(', ') }),
      });
      if (!response.ok) {
        failed(response.status === 429
          ? 'Too many submissions. Please wait and try again.'
          : 'Your inquiry could not be sent. Please try again.');
      }
    } catch {
      failed('Could not reach the form service. Check your connection and try again.');
    }
  }

  return {
    id, inputProps, errors, isSubmitting, isSubmitted: isSubmitSuccessful, reset,
    handleSubmit: handleSubmit(send), spamField: register('_gotcha'),
    selectedTypes: projects.value,
    toggleProjectType(type) {
      projects.onChange(projects.value.includes(type)
        ? projects.value.filter(item => item !== type)
        : [...projects.value, type]);
    },
    selectedBudget: budget.value,
    handleBudgetSelect: value => budget.onChange(budget.value === value ? '' : value),
    source: referral.value || 'Select your option', setSource: referral.onChange,
    errorMessage: errors.root?.delivery?.message,
  };
}
