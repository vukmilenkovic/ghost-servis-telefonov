export const serviceTierDetailsBySlug = {
  zasloni: {
    kicker: 'Podrobnosti storitve',
    title: 'Zasloni',
    description:
      'Za menjavo zaslona ponujamo 4 kakovostne nivoje. Izberi med originalno kakovostjo in cenovno ucinkovitimi alternativami glede na svoje potrebe.',
    tiersTitle: 'Nivoji za storitev Zasloni',
    tiersDescription:
      'Vsak nivo je na voljo odvisno od modela naprave in zaloge delov. Pred posegom vedno potrdimo koncno ceno in cas izvedbe.',
    tiers: [
      {
        slug: 'diamond',
        name: 'Diamond',
        partLabel: 'New Genuine Apple OLED',
        description:
          'Najvisji nivo z originalnim panelom za najboljso svetilnost, barvno natancnost in odziv na dotik.',
        imageSrc: null,
        imageAlt: 'Diamond tier',
        fallbackLabel: 'DM',
        accent: '#2e8d49',
      },
      {
        slug: 'platinum',
        name: 'Platinum',
        partLabel: 'Refurbished Genuine OLED',
        description:
          'Originalna osnova z obnovljenim panelom, zelo blizu tovarniski izkusnji in odlicno razmerje kakovost/cena.',
        imageSrc: null,
        imageAlt: 'Platinum tier',
        fallbackLabel: 'PT',
        accent: '#3f9073',
      },
      {
        slug: 'gold',
        name: 'Gold',
        partLabel: 'Soft OLED',
        description:
          'Fleksibilna OLED izvedba z zelo dobro sliko in prijetnim odzivom. Dobra izbira za vsakodnevno uporabo.',
        imageSrc: null,
        imageAlt: 'Gold tier',
        fallbackLabel: 'GD',
        accent: '#8b7a2f',
      },
      {
        slug: 'silver',
        name: 'Silver',
        partLabel: 'Hard OLED / LCD',
        description:
          'Najbolj dostopen nivo za hitro in budget-prijazno popravilo, primeren ko je prioriteta nizja cena.',
        imageSrc: null,
        imageAlt: 'Silver tier',
        fallbackLabel: 'SV',
        accent: '#6a7c55',
      },
    ],
  },
}
