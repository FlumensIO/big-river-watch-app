// import { useTranslation } from 'react-i18next';

const useValidationProps = () => {
  // const { t } = useTranslation();

  const getValidationProps = (schema: any, value: any) => {
    // check if it's a Zod schema
    if (schema && typeof schema.safeParse === 'function') {
      const result = schema.safeParse(value);

      if (!result.success) {
        // return { isInvalid: true, errorMessage: t(result.error.message) };
        return {};
      }

      return {};
    }

    // fallback to Yup validation
    try {
      schema.validateSync(value);
      return {};
    } catch (error: any) {
      // return { isInvalid: true, errorMessage: t(error.message) };
      return {};
    }
  };

  return getValidationProps;
};

export default useValidationProps;
