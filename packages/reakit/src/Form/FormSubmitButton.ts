import { ButtonOptions, ButtonHTMLProps, useButton } from "../Button/Button";
import { unstable_useOptions } from "../system/useOptions";
import { unstable_useProps } from "../system/useProps";
import { unstable_createComponent } from "../utils/createComponent";
import { unstable_mergeProps } from "../utils/mergeProps";
import { Keys } from "../__utils/types";
import { unstable_FormStateReturn, unstable_useFormState } from "./FormState";
import { getFirstInvalidInput } from "./__utils/getFirstInvalidInput";

export type unstable_FormSubmitButtonOptions = ButtonOptions &
  Pick<Partial<unstable_FormStateReturn<any>>, "submitting"> &
  Pick<unstable_FormStateReturn<any>, "baseId" | "submit">;

export type unstable_FormSubmitButtonHTMLProps = ButtonHTMLProps;

export type unstable_FormSubmitButtonProps = unstable_FormSubmitButtonOptions &
  unstable_FormSubmitButtonHTMLProps;

export function unstable_useFormSubmitButton(
  options: unstable_FormSubmitButtonOptions,
  htmlProps: unstable_FormSubmitButtonHTMLProps = {}
) {
  options = unstable_useOptions("FormSubmitButton", options, htmlProps);

  htmlProps = unstable_mergeProps(
    {
      type: "submit",
      disabled: options.submitting,
      onClick: () => {
        window.requestAnimationFrame(() => {
          const input = getFirstInvalidInput(options.baseId);
          if (input) {
            input.select();
            input.focus();
          }
        });
      }
    } as unstable_FormSubmitButtonHTMLProps,
    htmlProps
  );

  htmlProps = unstable_useProps("FormSubmitButton", options, htmlProps);
  htmlProps = useButton(options, htmlProps);
  return htmlProps;
}

const keys: Keys<
  unstable_FormStateReturn<any> & unstable_FormSubmitButtonOptions
> = [...useButton.__keys, ...unstable_useFormState.__keys];

unstable_useFormSubmitButton.__keys = keys;

export const unstable_FormSubmitButton = unstable_createComponent({
  as: "button",
  useHook: unstable_useFormSubmitButton
});
