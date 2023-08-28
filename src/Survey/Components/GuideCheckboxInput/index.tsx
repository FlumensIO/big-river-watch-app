import { FC, useState } from 'react';
import clsx from 'clsx';
import { informationCircleOutline } from 'ionicons/icons';
import { useTranslation } from 'react-i18next';
import {
  IonItem,
  IonLabel,
  IonList,
  IonCheckbox,
  IonItemDivider,
  IonIcon,
} from '@ionic/react';
import GuideItemProfile from 'Components/GuideItemProfile';
import { GuideItem } from '../../../Home/Guides/common/GuideItems';
import './styles.scss';

export type Props = {
  /**
   * Radio input list options.
   */
  options: any[];
  /**
   * Function invoke on input selection.
   */
  onChange: any;
  /**
   * Skips all translations.
   */
  skipTranslation?: boolean;
  /**
   * Currently selected input value.
   */
  value?: any[];
  /**
   * Class name.
   */
  className?: string;
};

const GuideCheckboxInput: FC<Props> = ({
  value: valueProp,
  onChange,
  options,
  skipTranslation,
  className,
}) => {
  const [item, setItem] = useState<GuideItem | null>();
  const onClose = () => setItem(null);

  const { t } = useTranslation();

  const onCheckboxValueChanged = (e: any) => {
    const { value, checked } = e.detail;

    let newValues = [...(valueProp || [])];
    if (checked && !newValues.includes(value)) {
      newValues.push(value);
    } else if (!checked && newValues.includes(value)) {
      const doesNotMatch = (existingVal: any) => existingVal !== value;
      newValues = newValues.filter(doesNotMatch);
    }

    onChange(newValues);
  };

  const getCheckbox = ({
    label,
    value,
    icon,
    isDefault,
    isPlaceholder,
    id,
    className: itemClassName,
    disabled: itemDisabled,
    ...otherItemProps
  }: any) => {
    let checkboxInput = label || `${value}`; // wrap value in string to skip i18n interpolation
    if (!skipTranslation) {
      checkboxInput = t(checkboxInput);
    }
    if (isPlaceholder) {
      return (
        <IonItemDivider key={checkboxInput}>
          <IonLabel>{checkboxInput}</IonLabel>
        </IonItemDivider>
      );
    }

    const key = `${label}${value}${id}`;
    const checked = valueProp?.includes(value);

    const onOpenProfile = (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      setItem({ id, ...otherItemProps });
    };

    return (
      <IonItem
        key={key}
        className={clsx(
          itemClassName,
          isDefault && 'checkbox-input-default-option',
          icon && 'hasIcon',
          '[--padding-start:0]'
        )}
      >
        {!!icon && (
          <div className="relative z-10 h-full">
            <img src={icon} className="h-full w-16" onClick={onOpenProfile} />
            <IonIcon
              icon={informationCircleOutline}
              className="absolute left-1 top-1 text-white [--ionicon-stroke-width:50px]"
            />
          </div>
        )}

        <IonLabel className="ion-text-wrap normal-font-size ml-4 mr-3">
          {checkboxInput}
        </IonLabel>
        <IonCheckbox
          value={value}
          onIonChange={onCheckboxValueChanged}
          checked={checked}
          disabled={itemDisabled}
        />
      </IonItem>
    );
  };

  const input = options.map(getCheckbox);

  return (
    <>
      <IonList lines="full" className={clsx('checkbox-input-attr', className)}>
        {input}
      </IonList>
      <GuideItemProfile item={item} onClose={onClose} />
    </>
  );
};

export default GuideCheckboxInput;
