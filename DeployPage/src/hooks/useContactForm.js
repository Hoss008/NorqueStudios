import { useCallback, useId } from 'react';
import { useController, useForm } from 'react-hook-form';
import { COUNTRY_CODES, DEFAULT_COUNTRY_ISO } from './contactOptions';

const defaults = {
  name: '', countryIso: DEFAULT_COUNTRY_ISO, phone: '', email: '', company: '', website: '', details: '',
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
  name: {
    required: 'Enter your name.',
    pattern: { value: /^(?:\p{L}\p{M}*| )+$/u, message: 'Use only letters and spaces in your name.' },
    maxLength: lengthLimit(120),
  },
  phone: {
    required: 'Enter your phone number.',
    pattern: { value: /^\p{Nd}{7,15}$/u, message: 'Enter 7–15 digits without spaces or symbols.' },
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
  const { register, control, handleSubmit, setError, clearErrors, getValues, reset, formState } = useForm({ defaultValues: defaults });
  const { errors, isSubmitting, isSubmitSuccessful } = formState;
  const { field: projects } = useController({ name: 'projectTypes', control, rules: { required: 'Select at least one project type.' } });
  const { field: budget } = useController({ name: 'budget', control, rules: { required: 'Select an expected budget.' } });
  const { field: referral } = useController({ name: 'source', control });
  const { field: countryField } = useController({ name: 'countryIso', control });

  const selectedCountry =
    COUNTRY_CODES.find((c) => c.iso === countryField.value) ||
    COUNTRY_CODES.find((c) => c.iso === DEFAULT_COUNTRY_ISO) ||
    COUNTRY_CODES[0];

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
    const country = COUNTRY_CODES.find((c) => c.iso === values.countryIso) || selectedCountry;
    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          countryCode: country.dial,
          phone: `${country.dial} ${values.phone}`.trim(),
          projectTypes: values.projectTypes.join(', '),
        }),
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

  const clearFormErrors = useCallback(() => {
    clearErrors();
    reset(getValues(), { keepDefaultValues: true });
  }, [clearErrors, getValues, reset]);

  return {
    id, inputProps, errors, isSubmitting, isSubmitted: isSubmitSuccessful, reset,
    clearFormErrors,
    handleSubmit: handleSubmit(send), spamField: register('_gotcha'),
    countryIso: selectedCountry.iso,
    countryDial: selectedCountry.dial,
    setCountryIso: countryField.onChange,
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
