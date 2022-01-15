import { computed, ref, onMounted, onActivated, watch, nextTick } from 'vue';

const MAX_UID = 1000000;

const getUID = (prefix) => {
  do {
    prefix += Math.floor(Math.random() * MAX_UID);
  } while (document.getElementById(prefix));

  return prefix;
};

function useId(id, suffix) {
  return computed(() => id || getUID(suffix));
}

function useFormInput(props, emit) {
  const input = ref();
  let inputValue = null;
  let neverFormatted = true;
  const computedId = useId(props.id, "input");

  const _formatValue = (value, evt, force = false) => {
    value = String(value);
    if (
      typeof props.formatter === "function" &&
      (!props.lazyFormatter || force)
    ) {
      neverFormatted = false;
      return props.formatter(value, evt);
    }
    return value;
  };

  const _getModelValue = (value) => {
    if (props.trim) return value.trim();
    if (props.number) return parseFloat(value);

    return value;
  };

  const handleAutofocus = () => {
    nextTick(() => {
      if (props.autofocus) input.value.focus();
    });
  };

  onMounted(handleAutofocus);
  onMounted(() => {
    if (input.value) {
      input.value.value = props.modelValue;
    }
  });

  onActivated(handleAutofocus);

  const computedAriaInvalid = computed(() => {
    if (props.ariaInvalid) {
      return props.ariaInvalid.toString();
    }
    return props.state === false ? "true" : undefined;
  });

  const onInput = (evt) => {
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt);
    if (formattedValue === false || evt.defaultPrevented) {
      evt.preventDefault();
      return;
    }

    if (props.lazy) return;
    emit("input", formattedValue);

    const nextModel = _getModelValue(formattedValue);

    if (props.modelValue !== nextModel) {
      inputValue = value;
      emit("update:modelValue", nextModel);
    }
  };

  const onChange = (evt) => {
    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt);
    if (formattedValue === false || evt.defaultPrevented) {
      evt.preventDefault();
      return;
    }

    if (!props.lazy) return;
    inputValue = value;
    emit("update:modelValue", formattedValue);

    const nextModel = _getModelValue(formattedValue);
    if (props.modelValue !== nextModel) {
      emit("change", formattedValue);
    }
  };

  const onBlur = (evt) => {
    emit("blur", evt);
    if (!props.lazy && !props.lazyFormatter) return;

    const { value } = evt.target;
    const formattedValue = _formatValue(value, evt, true);

    inputValue = value;
    emit("update:modelValue", formattedValue);
  };

  const focus = () => {
    if (!props.disabled) input.value.focus();
  };

  const blur = () => {
    if (!props.disabled) {
      input.value.blur();
    }
  };

  watch(
    () => props.modelValue,
    (newValue) => {
      if (!input.value) return;
      input.value.value = inputValue && neverFormatted ? inputValue : newValue;
      inputValue = null;
      neverFormatted = true;
    }
  );

  return {
    input,
    computedId,
    computedAriaInvalid,
    onInput,
    onChange,
    onBlur,
    focus,
    blur,
  };
}

export { useFormInput, useId };
