import { useController } from "react-hook-form";

function HiddenField({ control, defaultValue, rules, name, type }) {
  // use hooks
  const { field } = useController({ name, control, rules, defaultValue });

  // useEffect(() => {
  //   // field.onChange(defaultValue);
  //   setValue(name, defaultValue, { shouldDirty: true });
  // }, [defaultValue, name, setValue]);

  return (
    <>
      <input {...field} type="hidden" />
    </>
  );
}

export default HiddenField;
