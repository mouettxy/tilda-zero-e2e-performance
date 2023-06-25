export async function setupDebugger(page) {
  await page.evaluate(() => {
    (() => {
      const functions = [];
    // prettier-ignore
    const ignoredFunctions = ["onpopstate", "alert", "atob", "blur", "btoa", "cancelAnimationFrame", "cancelIdleCallback", "captureEvents", "clearInterval", "clearTimeout", "close", "confirm", "createImageBitmap", "fetch", "find", "focus", "getComputedStyle", "getSelection", "matchMedia", "moveBy", "moveTo", "open", "postMessage", "print", "prompt", "queueMicrotask", "releaseEvents", "reportError", "requestAnimationFrame", "requestIdleCallback", "resizeBy", "resizeTo", "scroll", "scrollBy", "scrollTo", "setInterval", "setTimeout", "stop", "structuredClone", "webkitCancelAnimationFrame", "webkitRequestAnimationFrame", "getScreenDetails", "queryLocalFonts", "showDirectoryPicker", "showOpenFilePicker", "showSaveFilePicker", "openDatabase", "webkitRequestFileSystem", "webkitResolveLocalFileSystemURL", "define", "$", "jQuery", "colorpicker__init", "allcolorpickers__destroy", "colorpicker__processAbColors", "colorpicker__setColorValue", "colorpicker__setColorValueForElem", "colorpicker__setPreviousStateToUndo", "colorpicker__processColorValue", "colorpicker__setAbEmptyColor", "colorpicker__processElemColors", "colorpicker__removeEmptyValueFromElem", "colorpicker__getCurrentElemFromInput", "_typeof", "_classCallCheck", "_defineProperties", "_createClass", "_inherits", "_getPrototypeOf", "_setPrototypeOf", "_isNativeReflectConstruct", "_assertThisInitialized", "_possibleConstructorReturn", "_createSuper", "_superPropBase", "_get", "_slicedToArray", "_arrayWithHoles", "_iterableToArrayLimit", "_unsupportedIterableToArray", "_arrayLikeToArray", "_nonIterableRest", "_createForOfIteratorHelper", "AlignDropdown", "CleanstyleDropdown", "Divider", "Dropdown", "Font", "FontSize", "FontWeight", "Inline$2", "HighlightBlot", "Hotkeys", "ImageBlot", "FontLineheight", "Link", "LinkBlot", "CustomLink", "ListColor", "ListItemBlot", "CustomListItem", "MediaBlot", "Modal", "More", "PlainClipboard", "Popup", "Inline$1", "SubscriptBlot", "Inline", "SuperscriptBlot", "TextStylesDropdown", "FontColor", "ToolbarContent", "Tooltip", "Typograph", "Video", "Quill", "humanDigits", "tu_onReady", "fadeIn", "fadeOut", "removeAllEventListeners", "reqAnimationFrame", "Tildaupload", "require", "t_zeroForms__init", "t_zeroForms__waitForTN", "t_zeroForms__renderForm", "t_zeroForms__initMaskAfterRender", "t_zeroForms__createForm", "t_zeroForms__updateStylesOnResize", "t_zeroForms__createCommentField", "t_zeroForms__generateInputsBlock", "t_zeroForms__parseIntoElement", "t_zeroForms__waitCalcFields", "t_zeroForms__generateSubtitle", "t_zeroForms__generateTitle", "t_zeroForms__createPhoneInput", "t_zeroForms__createInput", "t_zeroForms__setTextareaHeight", "t_zeroForms__createSelect", "t_zeroForms__createRadio", "t_zeroForms__createRadioImage", "t_zeroForms__createCheckbox", "t_zeroForms__createUploadField", "t_zeroForms__createDateField", "t_zeroForms__createQuantityField", "t_zeroForms__createQuantityBtn", "t_zeroForms__createQuantityRange", "t_zeroForms__createRangeField", "t_zeroForms__createCalculation", "t_zeroForms__createCalcTextField", "t_zeroForms__createFormButton", "t_zeroForms__setBtnInlineStyles", "t_zeroForms__generateBtnStyles", "t_zeroForms__generateButtonStyles", "t_zeroForms__processButtonBG", "t_zeroForms__generateButtonHoverStyles", "t_zeroForms__createErrorBox", "t_zeroForms__createErrorBoxBtn", "t_zeroForms__getBottomText", "t_zeroForms__animateInputs", "t_zeroForms__appendAttributes", "t_zeroForms__appendStylesToField", "t_zeroForms__setIndicatorStyles", "t_zeroForms__createInputPlaceholderStyles", "t_zeroForms__setScriptOrStyle", "t_zeroForms__createLabel", "t_zeroForms__createIndicator", "t_zeroForms__createNameFieldForCheckbox", "t_zeroForms__createHiddenField", "t_zeroForms__createWrapper", "t_zeroForms__appendMainSettingToField", "t_zeroForms__initInputStyles", "t_zeroForms__setTitleStyles", "t_zeroForms__isRecordHidden", "t_zeroForms__isFormOutside", "t_zeroForms__getFieldValue", "t_zeroForms__getEl", "t_zeroForms__generateAttribute", "t_zeroForms__getResOpts", "t_zeroForms__createSelector", "t_zeroForms__removeStringQuotes", "t_zeroForms__fromObjToArray", "t_zeroForms__updateCheckboxesValues", "t_zeroForms__initQuanityClickCount", "t_zeroForms__initErrorBoxClose", "t_zeroForms__onReady", "t_zeroForms__onRender", "t_zeroForms__getTildaMode", "t_zeroForms__createFormObj", "t_zeroForms__onFuncLoad", "t_sldsInit", "t_slds__removeAutoplayByVideo", "t_slds__initFeedsSlider", "t_slds__createDummies", "t_slds__hideMobileSlides", "t_slds_updateOnDisplayChange", "t_slds_updateFeedsSliderOnResize", "t_slds_setItemsInRow", "t_slds_initSliderControls", "t_slds_animate", "t_slide_MoveAnimation", "t_slideMoveWithoutAnimation", "t_slideMoveInstantly", "t_slideMove", "t_slds_updateSlider", "t_slds_UpdateImages", "t_slds_ActiveCaption", "t_slds_scrollImages", "t_slds_ActiveBullet", "t_slds_ActiveSlide", "t_slds__setTabindexForFocusableElements", "t_slds_SliderWidth", "t_slds_SliderHeight", "t_slds_UpdateSliderHeight", "t_slds_SliderArrowsHeight", "t_slds_UpdateSliderArrowsHeight", "t_slds_initAutoPlay", "t_slds_positionArrows", "t_slds_initSliderSwipe", "t_slds_getCurrentTranslate", "t_slds_changeImageUrl", "t_slds_onHammerLoad", "t_slds_fadeOut", "t_slds_fadeIn", "t_zeroGallery__init", "t_zeroGallery__updateSliderHandler", "t_zeroGallery__setLazyloadUrls", "t_zeroGallery__render", "t_zeroGallery__setSideHandlers", "t_zeroGallery__isEmptyObj", "t_zeroGallery__render_next", "t_zeroGallery__getArrowSize", "t_zeroGallery__renderViewOneField", "t_zeroGallery__removeElement", "t_zeroGallery__onSldsLoad", "t_zeroGallery__playVideo", "addEventListener", "dispatchEvent", "removeEventListener"];

    for (let i in window) {
      if (typeof window[i] === 'function' && !ignoredFunctions.includes(i)) {
        functions.push(i);
      }
    }

    window.tn_debugging_functions = [];

    functions.forEach(fn => {
      const originalFn = window[fn];
      window[fn] = function (...args) {
        const entry = {
          name: fn,
          startTime: performance.now(),
        };

        const result = originalFn.apply(this, args);
        entry.endTime = performance.now();
        entry.time = entry.endTime - entry.startTime;

        window.tn_debugging_functions.push(entry);

        return result;
      };
    });
    })()
  })
}

export async function getDebugInfo(page) {
  return await page.evaluate(() => {
    return JSON.parse(JSON.stringify(window.tn_debugging_functions));
  });
}