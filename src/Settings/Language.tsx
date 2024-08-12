import { useContext } from 'react';
import { Page, Main, Header, Attr } from '@flumens';
import { NavContext } from '@ionic/react';
import languages from 'common/languages';
import app from 'models/app';

const Component: React.FC = () => {
  const { goBack } = useContext(NavContext);

  const getOption = ([key, value]: any) => ({
    value: key,
    label: value,
  });

  const goBackWrap = () => goBack();

  return (
    <Page id="language">
      <Header title="Language" />
      <Main>
        <Attr
          attr="language"
          model={app}
          input="radio"
          inputProps={{
            options: Object.entries(languages).map(getOption),
          }}
          onChange={goBackWrap}
        />
      </Main>
    </Page>
  );
};

export default Component;
