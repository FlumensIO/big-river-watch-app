// import { useTranslation } from 'react-i18next';

export default () => {
  // const { t } = useTranslation();

  const getValidationProps = (schema: any, value: any) => {
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
