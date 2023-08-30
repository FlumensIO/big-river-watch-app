/* eslint-disable @getify/proper-arrows/name */
import { Trans as T } from 'react-i18next';
import * as Yup from 'yup';
import { InfoButton } from '@flumens';
import { IonRouterLink } from '@ionic/react';
import user from 'models/user';
import pollution from '../Home/Guides/Pollution/items.json';
import wildlife from '../Home/Guides/Wildlife/items.json';
import GuideCheckboxInput from './Components/GuideCheckboxInput';
import litter from './photos/litter.jpg';
import litterRiverbank from './photos/litter_riverbank.jpg';
import litterVegetation from './photos/litter_vegetation.jpg';
import plantsAlgae from './photos/plants_algae.jpg';
import plantsBanks from './photos/plants_banks.jpg';
import plantsEmerging from './photos/plants_emerging.jpg';
import plantsNone from './photos/plants_none.jpg';
import plantsSurface from './photos/plants_surface.jpg';
import plantsUnderwater from './photos/plants_underwater.jpg';

const getWildlifeOptions = () => {
  const getOption = (item: any) => ({
    label: item.name,
    value: item.id,
    ...item,
    icon: `/images/${item.id}_thumbnail.jpg`,
  });

  return wildlife.map(getOption);
};

const getPollutionOptions = () => {
  const getOption = (item: any) => ({
    label: item.name,
    value: item.id,
    ...item,
    icon: `/images/${item.id}_thumbnail.jpg`,
  });

  return pollution.map(getOption);
};

const noneSetter = (attr: string) => (val: any, model: any) => {
  // eslint-disable-next-line no-param-reassign
  model.attrs[attr] =
    val?.includes('None') && !model.attrs[attr]?.includes('None')
      ? ['None']
      : val.filter((v: any) => v !== 'None');
};

const survey = {
  attrs: {
    experience: {
      pageProps: {
        headerProps: { title: 'Experience' },
        attrProps: {
          input: 'radio',
          info: (
            <div className="font-medium">
              <T>
                Have you ever taken part in a citizen science activity before?
              </T>
            </div>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [{ value: 'Yes' }, { value: 'No' }, { value: 'Unsure' }],
          },
        },
      },
    },

    rain: {
      pageProps: {
        headerProps: { title: 'Rain' },
        attrProps: {
          input: 'radio',
          info: (
            <div className="font-medium">
              <T>Has it rained in the last 24 hours?</T>
            </div>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              { value: 'Yes' },
              { value: 'No' },
              { value: "Don't know" },
              { value: 'Currently raining' },
            ],
          },
        },
      },
    },

    flow: {
      pageProps: {
        headerProps: { title: 'River Speed' },
        attrProps: {
          input: 'radio',
          info: (
            <div className="font-medium">
              <T>How fast is the river flowing?</T>
            </div>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              { value: 'Still' },
              { value: 'Slow – Slower than walking pace' },
              { value: 'Steady – About walking pace' },
              { value: 'Surging – Faster than walking pace' },
              { value: "Don't know" },
            ],
          },
        },
      },
    },

    visits: {
      pageProps: {
        headerProps: { title: 'Visits' },
        attrProps: {
          input: 'radio',
          info: (
            <div className="font-medium">
              <T>How often do you usually visit this river/place?</T>
            </div>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              { value: 'Daily' },
              { value: 'Weekly' },
              { value: 'Monthly' },
              { value: 'Less than monthly' },
              { value: 'This is my first time' },
            ],
          },
        },
      },
    },

    health: {
      pageProps: {
        headerProps: { title: 'Health' },
        attrProps: {
          input: 'radio',
          info: (
            <div className="font-medium">
              <T>
                Based on what you can see, what is your first impression of this
                river?
              </T>
            </div>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              { value: 'Healthy' },
              { value: 'Unhealthy' },
              { value: 'Other' },
            ],
          },
        },
      },
    },

    surveyors: {
      pageProps: {
        headerProps: { title: 'Surveyors' },
        attrProps: {
          input: 'slider',
          info: (
            <div className="font-medium">
              <T>How many of you have taken part in this survey today?</T>
            </div>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            min: 1,
            max: 35,
            step: 1,
          },
        },
      },
    },

    feeling: {
      pageProps: {
        headerProps: { title: 'Feeling' },
        attrProps: {
          input: 'input',
          info: (
            <>
              <div className="font-medium">
                <T>
                  What one word would you use to describe how you feel when you
                  are by this river?
                </T>
              </div>
              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>Remember to describe how you feel, not what you can see.</T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            autofocus: false,
            format: (newValue: string) => newValue?.replaceAll(' ', ''),
            onkeydown: (e: any) => e.key !== ' ',
          },
        },
      },
    },

    naturalness: {
      pageProps: {
        headerProps: { title: 'Naturalness' },
        attrProps: {
          input: 'radio',
          info: (
            <>
              <div className="font-medium">
                <T>
                  From where you are standing, do you think this river is
                  natural?
                </T>
              </div>
              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>
                  A natural river is a flowing body of water that has not been
                  significantly altered or impacted by human activities.
                </T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              { value: 'Natural' },
              { value: 'Mixed' },
              { value: 'Unnatural' },
              { value: "Don't know" },
            ],
          },
        },
      },
    },

    barriers: {
      pageProps: {
        headerProps: { title: 'Barriers' },
        attrProps: {
          input: 'checkbox',
          info: (
            <>
              <div className="font-medium">
                <T>Can you see any barriers in this river?</T>
              </div>
              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>
                  A barrier is a physical structure, either natural or
                  artificial, located within a river channel. They can have both
                  positive and negative impacts on ecosystem health. Select all
                  that apply.
                </T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              {
                value:
                  'Natural – e.g. waterfalls, fallen trees stretching across the river',
              },
              {
                value:
                  'Artificial – e.g. dams, weirs, locks, culverts, fords, sluices',
              },
              { value: "Don't know" },
              { value: 'None' },
            ],
          },
          set: noneSetter('barriers'),
        },
      },
    },

    banks: {
      pageProps: {
        headerProps: { title: 'Banks' },
        attrProps: {
          input: 'radio',
          info: (
            <div className="font-medium">
              <T>Are the river banks mostly natural or artificial?</T>
            </div>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              {
                value:
                  'Mostly natural – made up of soil, rocks and vegetation that have been shaped by the movement of the river',
              },
              {
                value:
                  'Mixed – both natural features, as well as sections of straightening or human built structures',
              },
              {
                value:
                  'Mostly artificial – typically made of metal, concrete, wood or stone and characterised by a range of features such as straight sides, and concrete riverbeds',
              },
              { value: "Don't know" },
            ],
          },
        },
      },
    },

    wildlife: {
      pageProps: {
        headerProps: { title: 'Wildlife' },
        attrProps: {
          input: GuideCheckboxInput,
          info: (
            <>
              <div className="font-medium">
                <T>What wildlife have you seen during your survey?</T>
              </div>
              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>
                  Seeing a variety of species, including those listed below, can
                  provide a good indication of the overall health of a river.
                </T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              ...getWildlifeOptions(),
              { value: 'Other' },
              { value: 'None' },
            ],
          },
          set: noneSetter('wildlife'),
        },
      },
    },

    plants: {
      pageProps: {
        headerProps: { title: 'Plants' },
        attrProps: {
          input: 'checkbox',
          info: (
            <>
              <div className="font-medium">
                <T>What plants can you see in and around the river today?</T>
              </div>
              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>
                  Plants may suggest a healthy river but that can be misleading,
                  sometimes they can be non-native. Select all that apply.
                </T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              {
                value: 'Plants growing completely under the water',
                icon: plantsUnderwater,
              },
              {
                value: 'Plants emerging out of the water',
                icon: plantsEmerging,
              },
              { value: 'Plants floating on the surface', icon: plantsSurface },
              {
                value:
                  'Plants growing on the bank, completely out of the water (including trees)',
                icon: plantsBanks,
              },
              {
                value:
                  'Algae – green, hair-like, can form clumps on the surface of the water',
                icon: plantsAlgae,
              },
              { value: 'None', icon: plantsNone },
            ],
          },
          set: noneSetter('plants'),
        },
      },
    },

    water: {
      pageProps: {
        headerProps: { title: 'Water' },
        attrProps: {
          input: 'radio',
          info: (
            <>
              <div className="font-medium">
                <T>How clear or cloudy is the water?</T>
              </div>
              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>
                  Please don't climb down the river bank and only look if it is
                  safe to do so. If you can't see because it is too far away or
                  the water is too murky, then select 'Don't know'.
                </T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              { value: 'Very clear, I can see right through the water' },
              { value: 'There’s a bit of sediment' },
              { value: 'It’s quite murky' },
              {
                value:
                  'There’s lots of sediment, I can’t see through the water at all',
              },
            ],
          },
        },
      },
    },

    smell: {
      pageProps: {
        headerProps: { title: 'Smell' },
        attrProps: {
          input: 'radio',
          info: (
            <>
              <div className="font-medium">
                <T>Does the water smell unpleasant?</T>
              </div>
              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>
                  Different odors can be associated with different types and
                  levels of pollution. On the other hand, a river with a clean,
                  fresh smell can indicate good water quality and a healthy
                  ecosystem.
                </T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              { value: 'Yes' },
              { value: 'No' },
              { value: "Don't know" },
            ],
          },
        },
      },
    },

    litter: {
      pageProps: {
        headerProps: { title: 'Litter' },
        attrProps: {
          input: 'checkbox',
          info: (
            <div className="font-medium">
              <T>Can you see any litter?</T>
            </div>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              { value: 'Yes – in the river', icon: litter },
              {
                value:
                  'Yes – caught in the bankside vegetation (above river surface)',
                icon: litterVegetation,
              },
              { value: 'Yes – on the river banks', icon: litterRiverbank },
              { value: "Don't know" },
              { value: 'None' },
            ],
          },
          set: noneSetter('litter'),
        },
      },
    },

    pollution: {
      pageProps: {
        headerProps: { title: 'Pollution' },
        attrProps: {
          input: GuideCheckboxInput,
          info: (
            <>
              <div className="font-medium">
                <T>Can you see any other signs of pollution?</T>
              </div>
              <i className="mt-3 block">
                <T>
                  Think you can see a serious pollution incident?{' '}
                  <IonRouterLink
                    routerLink="/info/pollution"
                    className="font-semibold underline"
                  >
                    Click here
                  </IonRouterLink>{' '}
                  to read guidance on understanding and reporting pollution to
                  your local relevant authority.
                </T>
              </i>

              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>
                  There are several visible signs of pollution in a river that
                  can indicate poor water quality. It's important to monitor and
                  address pollution sources in order to protect and restore the
                  health of our rivers.
                </T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: {
            options: [
              ...getPollutionOptions(),
              { value: 'Other' },
              { value: "Don't know" },
              { value: 'None' },
            ],
          },
          set: noneSetter('pollution'),
        },
      },
    },

    goodThings: {
      pageProps: {
        headerProps: { title: 'Good things' },
        attrProps: {
          input: 'inputList',
          required: false,
          info: (
            <>
              <div className="font-medium">
                <T>
                  Noticing the good things in nature can bring sustained and
                  significant improvements in your well-being. Note down three
                  good things that you've noticed by the river today.
                </T>
              </div>
              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>This could be something you have seen, heard, or smelled.</T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: { min: 3, max: 3 },
        },
      },
    },

    comment: {
      pageProps: {
        headerProps: { title: 'Comment' },
        attrProps: {
          input: 'textarea',
          required: false,
          info: (
            <>
              <div className="font-medium">
                <T>
                  Is there anything else you'd like to share before you submit
                  your survey?
                </T>
              </div>
              <InfoButton
                label="READ MORE"
                header="Info"
                className="-mb-2 -mr-2"
              >
                <T>
                  This could be other animals you have seen, things you have
                  observed on previous occasions, anything we have not asked
                  about that you feel is important.
                </T>
              </InfoButton>
            </>
          ),
          infoProps: { icon: null, skipTranslation: true },
          inputProps: { autofocus: false },
        },
      },
    },
  },

  create({ Record }: any) {
    const record = new Record({
      attrs: {
        date: new Date().toISOString(),
        surveyors: 1,
        location: {},
        ...user.attrs,
      },
    });

    record.startGPS();

    return record;
  },

  verify(attrs: any) {
    try {
      Yup.object().shape({}).validateSync(attrs, { abortEarly: false });
    } catch (attrError) {
      return attrError;
    }

    return null;
  },
};

export default survey;
