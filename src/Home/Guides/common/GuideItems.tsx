import { observer } from 'mobx-react';
import { IonGrid, IonRow, IonCol } from '@ionic/react';

export type GuideItem = {
  id: string;
  name: string;
  description: string;
};

const bySpeciesName = (sp1: GuideItem, sp2: GuideItem) =>
  sp1.name.localeCompare(sp2.name);

type Props = {
  items: GuideItem[];
  onClick: any;
};

const GuideItems = ({ items, onClick }: Props) => {
  const speciesList = items.sort(bySpeciesName);

  const getSpeciesElement = (item: GuideItem) => {
    const { id, name } = item;

    const onClickWrap = () => onClick(item);

    return (
      <IonCol
        key={id}
        className="ion-no-padding ion-no-margin"
        onClick={onClickWrap}
        size="6"
        size-lg
      >
        <div
          className="h-[50vw] w-[50vw] bg-cover"
          style={{
            backgroundImage: `url('/images/${id}_thumbnail.jpg')`,
          }}
        >
          <span className="absolute bottom-0 w-full bg-black/60 px-4 py-1 text-sm text-white">
            {name}
          </span>
        </div>
      </IonCol>
    );
  };

  const speciesColumns = speciesList.map(getSpeciesElement);

  return (
    <IonGrid className="guide-items ion-no-padding ion-no-margin">
      <IonRow className="ion-no-padding ion-no-margin">{speciesColumns}</IonRow>
    </IonGrid>
  );
};

export default observer(GuideItems);
