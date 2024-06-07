<template>
  <div class="job-speed-in-place-editor d-flex "
    :class="[cssClass, !!required ? 'job-speed-required' : '', !!horizontal ? 'flex-row align-items-center' : 'flex-column']"
    :style="contentStyle">
    <div v-if="labelVisible" class="d-flex flex-row pb-1 job-speed-in-place-labor"
      :class="[!!horizontal ? 'align-items-center' : 'align-items-end']">
      <label v-if="!labelHtml" ref="labelEl" data-bs-toggle="tooltip" :data-bs-title="labelTooltip"
        :data-bs-placement="labelTooltipPlacement">
        {{ label }}
      </label>
      <label v-else ref="labelHtmlEl" data-bs-toggle="tooltip" :data-bs-title="labelTooltip" 
        :data-bs-placement="labelTooltipPlacement" v-html="label">
      </label>
      <button v-if="showButtonEditMode" ref="editBtnEl" type="button" data-bs-toggle="tooltip" data-bs-title="Sửa"
        class="btn btn-sm py-1 px-2 border border-0"
        :class="[!controlEnableEditMode ? 'btn-outline-dark' : 'btn-outline-danger']"
        @click="changeEnableEditMode(!controlEnableEditMode)">
        <i class="bi" :class="[!controlEnableEditMode ? 'bi-pencil' : 'bi-slash-circle']"></i>
      </button>
      <button v-if="showButtonEditMode && !!controlEnableEditMode" ref="saveBtnEl" data-bs-toggle="tooltip"
        data-bs-title="Lưu" :disabled="!(localValidState && isValueDiff)" type="button"
        class="btn btn-outline-success btn-sm py-1 px-2 border border-0"
        :class="{ 'opacity-25': !(localValidState && isValueDiff) }" title="Edit!" @click="save">
        <i class="bi bi-save"></i>
      </button>
      <button v-if="showButtonAdd" type="button" class="btn btn-outline-dark btn-sm py-1 px-2 border border-0"
        title="Edit!" @click="changeEnableEditMode(!controlEnableEditMode)">
        <i class="bi bi-plus-circle"></i>
      </button>
    </div>

    <div class="job-speed-in-place-value-wrapper">
      <div v-if="!controlEnableEditMode" class="job-speed-in-place-value">
        <slot name="displayValue">
          <span>
            {{ localValue }}
          </span>
        </slot>
      </div>
      <div v-if="!!controlEnableEditMode">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
const { $bootstrap, $filters, $_ } = useNuxtApp();
//#region Component Properties
const props = defineProps({
  modelValue: {
    default: () => null,
  },
  showButtonEditMode: {
    type: Boolean,
    default: () => true,
  },
  enableEditMode: {
    type: Boolean,
    default: () => false,
  },
  required: {
    type: Boolean,
    default: () => false,
  },
  label: {
    type: String,
    default: () => "Label",
  },
  labelHtml: {
    type: Boolean,
    default: () => false
  },
  labelTooltip: {
    type: String,
    default: () => null,
  },
  labelTooltipPlacement: {
    type: String,
    default: () => "top",
  },
  labelTooltipHideAfter: {
    type: Number,
    default: () => 6000,
  },
  cssClass: {
    type: String,
    default: () => "",
  },
  contentStyle: {
    type: String,
    default: () => "",
  },
  horizontal: {
    type: Boolean,
    default: () => false
  },
  labelVisible: {
    type: Boolean,
    default: () => true
  },
  showButtonAdd: {
    type: Boolean,
    default: () => false
  },
  validState: {
    type: Boolean,
    default: () => true
  },
  hook: {
    type: Object,
    default: () => ({})
  }
});

const {
  modelValue,
  showButtonEditMode,
  enableEditMode,
  required,
  label,
  labelHtml,
  labelTooltip,
  labelTooltipPlacement,
  labelTooltipHideAfter,
  cssClass,
  contentStyle,
  showButtonAdd,
  validState,
  hook
} = toRefs(props);

const emit = defineEmits(["update:modelValue", "update:enableEditMode", "closeEditMode", "save"]);
//#endregion

const labelEl = ref(null);
const labelHtmlEl = ref(null);
const editBtnEl = ref(null);
const editTooltipIns = ref(null);
const saveBtnEl = ref(null);
const controlEnableEditMode = ref(false);
const localValidState = computed(() => validState?.value);
const oldValue = ref(null);
const localValue = computed({
  get() {
    return modelValue?.value;
  },
  set(value) {
    if (!$_.isEqual(modelValue.value, value)) {
      emit("update:modelValue", value)
    }
  }
})

const isValueDiff = computed(() => {
  let oldValueCompare = $filters.isNullOrEmpty(oldValue?.value) ? null : oldValue.value;
  let localValueCompare = $filters.isNullOrEmpty(localValue?.value) ? null : localValue.value;

  return !$_.isEqual(oldValueCompare, localValueCompare);
})

watch(
  () => enableEditMode,
  (newValue) => {
    controlEnableEditMode.value = !!newValue?.value;
  },
  { deep: true }
)

const changeEnableEditMode = (enableEditMode) => {
  //Call before begin edit mode hook.
  if (!!enableEditMode && !!hook?.value?.beforeBeginEditMode &&
    typeof hook.value.beforeBeginEditMode === 'function') {
    hook.value.beforeBeginEditMode();
  }

  controlEnableEditMode.value = !!enableEditMode;
  //AnhTranTuan 2023-11-08: Check controlEnableEditMode
  if (!controlEnableEditMode.value) {
    emit("closeEditMode");
    //AnhTranTuan 2023-11-08: Trả về giá trị ban đầu.
    discard();
  } else {
    setTimeout(() => {
      reRenderTooltip();
      oldValue.value = $_.cloneDeep(localValue.value);
    }, 1);
  }

  if (!!editTooltipIns?.value) {
    editTooltipIns.value.setContent({ '.tooltip-inner': !controlEnableEditMode.value ? 'Sửa' : 'Hủy' })
  }

  //Sync to Parent value
  emit("update:enableEditMode", controlEnableEditMode.value);
}

/**
 * AnhTranTuan 2023-11-08.
 * Call Save Event.
 */
const save = () => {
  emit("save", {
    oldValue: $_.cloneDeep(oldValue.value)
  });

  //Set old value by local value.
  setTimeout(() => {
    oldValue.value = $_.cloneDeep(localValue.value);
  }, 1);
}

/**
 * AnhTranTuan 2023-11-08.
 * Trả về giá trị ban đầu.
 */
const discard = () => {
  localValue.value = $_.cloneDeep(oldValue.value);
}

const reRenderTooltip = () => {
  if (!!saveBtnEl?.value) {
    const saveBtnTooltip = new $bootstrap.Tooltip(saveBtnEl.value);
    //Set timeout hide tooltip
    saveBtnEl.value.addEventListener("shown.bs.tooltip", () => {
      setTimeout(() => {
        saveBtnTooltip.hide(); //close the tooltip
      }, labelTooltipHideAfter?.value ?? 6000);
    });
  }
}

onMounted(() => {
  //AnhTranTuan 2023-03-15: Run Bootstrap execution exclusively on the client side.
  //Kindly take note that Bootstrap is intended for client-side use only.
  if (!!process.client) {
    nextTick().then(() => {
      setTimeout(() => {
        //#region Tooltips
        if (!!labelTooltip?.value) {
          const labelTooltipEls = [labelEl?.value ?? null, labelHtmlEl?.value ?? null];
          labelTooltipEls.filter(el => !!el).forEach(tooltipTriggerEl => {
            const tooltip = new $bootstrap.Tooltip(tooltipTriggerEl);
            const hideTooltipTimestamp = labelTooltipHideAfter?.value ?? 6000;

            //Set timeout hide tooltip
            tooltipTriggerEl.addEventListener("shown.bs.tooltip", () => {
              setTimeout(() => {
                tooltip.hide(); //close the tooltip
              }, hideTooltipTimestamp);
            });
          })
        }

        if (!!editBtnEl?.value) {
          editTooltipIns.value = new $bootstrap.Tooltip(editBtnEl.value);
          editTooltipIns.value.setContent({ '.tooltip-inner': 'Sửa' })
          //Set timeout hide tooltip
          editBtnEl.value.addEventListener("shown.bs.tooltip", () => {
            setTimeout(() => {
              editTooltipIns.value.hide(); //close the tooltip
            }, labelTooltipHideAfter?.value ?? 6000);
          });
        }
        //#endregion
      }, 1);

      //AnhTranTuan 2023-04-05: Set stack delay for editMode. Fix render html error when init editMode = true.
      if (!!enableEditMode?.value) {
        setTimeout(() => {
          controlEnableEditMode.value = !!enableEditMode?.value;
        }, 100);
      }
    })
  }
})
</script >
