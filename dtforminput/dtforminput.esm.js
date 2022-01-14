import { computed, ref, onMounted, watch, openBlock, createElementBlock, mergeProps } from 'vue';

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

const COMMON_INPUT_PROPS = {
  ariaInvalid: {
    type: [Boolean, String],
    default: false,
  },
  autocomplete: { type: String, required: false },
  autofocus: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  form: { type: String, required: false },
  formatter: { type: Function, required: false },
  id: { type: String, required: false },
  lazy: { type: Boolean, default: false },
  lazyFormatter: { type: Boolean, default: false },
  list: { type: String, required: false },
  modelValue: { type: [String, Number], default: "" },
  name: { type: String, required: false },
  number: { type: Boolean, default: false },
  placeholder: { type: String, required: false },
  plaintext: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
  required: { type: Boolean, default: false },
  size: { type: String, required: false },
  state: { type: Boolean, default: null },
  trim: { type: Boolean, default: false },
};

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

  onMounted(() => {
    if (input.value) {
      input.value.value = props.modelValue;
    }
  });

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
  };
}

const allowedTypes = [
  "text",
  "number",
  "email",
  "password",
  "search",
  "url",
  "tel",
  "date",
  "time",
  "range",
  "color",
];

var script = {
  name: "DtFormInput",
  props: {
    ...COMMON_INPUT_PROPS,
    // debounce: {type: [String, Number], default: 0}, TODO: not implemented yet
    max: { type: [String, Number], required: false },
    min: { type: [String, Number], required: false },
    // noWheel: {type: Boolean, default: false}, TODO: not implemented yet
    step: { type: [String, Number], required: false },
    type: {
      type: String,
      default: "text",
      validator: (value) => allowedTypes.includes(value),
    },
  },
  emits: ["update:modelValue", "change", "blur", "input"],
  setup(props, { emit }) {
    const classes = computed(() => {
      const isRange = props.type === "range";
      const isColor = props.type === "color";
      return {
        "form-range": isRange,
        "form-control": isColor || (!props.plaintext && !isRange),
        "form-control-color": isColor,
        "form-control-plaintext": props.plaintext && !isRange && !isColor,
        [`form-control-${props.size}`]: props.size,
        "is-valid": props.state === true,
        "is-invalid": props.state === false,
      };
    });

    const localType = computed(() =>
      allowedTypes.includes(props.type) ? props.type : "text"
    );

    const {
      input,
      computedId,
      computedAriaInvalid,
      onInput,
      onChange,
      onBlur,
      focus,
      blur,
    } = useFormInput(props, emit);

    return {
      classes,
      localType,
      input,
      computedId,
      computedAriaInvalid,
      onInput,
      onChange,
      onBlur,
      focus,
      blur,
    };
  },
};

const _hoisted_1 = ["id", "name", "form", "type", "disabled", "placeholder", "required", "autocomplete", "readonly", "min", "max", "step", "list", "aria-required", "aria-invalid"];

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("input", mergeProps({
    id: $setup.computedId,
    ref: "input",
    class: $setup.classes,
    name: _ctx.name || undefined,
    form: _ctx.form || undefined,
    type: $setup.localType,
    disabled: _ctx.disabled,
    placeholder: _ctx.placeholder,
    required: _ctx.required,
    autocomplete: _ctx.autocomplete || undefined,
    readonly: _ctx.readonly || _ctx.plaintext,
    min: $props.min,
    max: $props.max,
    step: $props.step,
    list: $props.type !== 'password' ? _ctx.list : undefined,
    "aria-required": _ctx.required ? 'true' : undefined,
    "aria-invalid": $setup.computedAriaInvalid
  }, _ctx.$attrs, {
    onInput: _cache[0] || (_cache[0] = $event => ($setup.onInput($event))),
    onChange: _cache[1] || (_cache[1] = $event => ($setup.onChange($event))),
    onBlur: _cache[2] || (_cache[2] = $event => ($setup.onBlur($event)))
  }), null, 16 /* FULL_PROPS */, _hoisted_1))
}

script.render = render;
script.__file = "src/components/dtforminput/DtFormInput.vue";

export { script as default };
