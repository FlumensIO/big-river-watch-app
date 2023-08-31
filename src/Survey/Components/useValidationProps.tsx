import { useTranslation } from 'react-i18next';

export default () => {
  const { t } = useTranslation();

  const getValidationProps = (schema: any, value: any) => {
    try {
      schema.validateSync(value);
      return {};
    } catch (error: any) {
      return { className: 'ion-invalid', errorText: t(error.message) };
    }
  };

  return getValidationProps;
};
