import { ReactElement } from 'react';
import { globeOutline } from 'ionicons/icons';
import { Main, Page } from '@flumens';
import {
  IonIcon,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
} from '@ionic/react';
import languages from 'common/languages';
import appModel from 'models/app';
// import './language-page-background.jpg?originalName';
import './styles.scss';

type Props = {
  children: ReactElement;
};

const LanguageSelectRequired = ({ children }: Props) => {
  if (appModel.attrs.language) return children;

  function onSelect(language: keyof typeof languages) {
    appModel.attrs.language = language; // eslint-disable-line no-param-reassign
  }

  const getLanguageOption = ([value, language]: any) => {
    const onSelectWrap = () => onSelect(value);

    return (
      <IonItem
        key={value}
        onClick={onSelectWrap}
        className="pretty-button-language font-semibold"
        detail
      >
        <IonLabel>{language}</IonLabel>
      </IonItem>
    );
  };
  const languagesOptions = Object.entries(languages).map(getLanguageOption);

  return (
    <Page id="language-select-required">
      <Main>
        <IonIcon
          icon={globeOutline}
          className="w-full py-20 text-center text-8xl [--ionicon-stroke-width:8px]"
        />
        <IonList className="h-1/3">
          <IonItemGroup>{languagesOptions}</IonItemGroup>
        </IonList>
      </Main>
    </Page>
  );
};

export default LanguageSelectRequired;
