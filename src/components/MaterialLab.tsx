import { useState } from 'react';
import { useLanguage } from '../state/LanguageContext';
import type { Language } from '../state/LanguageContext';
import { Reveal } from './Reveal';

type MaterialId = 'Plastic' | 'Soft Plastic' | 'PU' | 'EVA';

interface MaterialItem {
  id: MaterialId;
  labelKey: string;
  visibleForm: Record<Language, string>;
  verifiedOptions: Record<Language, string>;
}

const MATERIALS: MaterialItem[] = [
  {
    id: 'Plastic',
    labelKey: 'plastic',
    visibleForm: {
      zh: '页面展示直筒塑料柱体、圆形底座与反光带。',
      en: 'The listing shows a straight plastic post, round base, and reflective bands.',
      es: 'El listado muestra un poste de plástico recto, base redonda y bandas reflectantes.',
      fr: 'La fiche montre un potelet plastique droit, une base ronde et des bandes réfléchissantes.',
      de: 'Das Angebot zeigt einen geraden Kunststoffpfosten, runden Fuß und Reflexstreifen.',
      ar: 'تعرض الصفحة عموداً بلاستيكياً مستقيماً وقاعدة دائرية وأشرطة عاكسة.'
    },
    verifiedOptions: {
      zh: '已见 70 cm、75 cm、加厚款与双色反光带图片。',
      en: 'Verified images include 70 cm, 75 cm, thickened, and dual-band versions.',
      es: 'Las imágenes verificadas incluyen versiones de 70 cm, 75 cm, engrosada y de doble banda.',
      fr: 'Les images vérifiées incluent les versions 70 cm, 75 cm, épaissie et double bande.',
      de: 'Geprüfte Bilder zeigen 70 cm, 75 cm, verstärkte und zweifarbige Varianten.',
      ar: 'تشمل الصور الموثقة إصدارات 70 و75 سم والمقواة وذات الشريطين.'
    }
  },
  {
    id: 'Soft Plastic',
    labelKey: 'softPlastic',
    visibleForm: {
      zh: '页面标注软塑料，展示 73 cm 柱体、6.5 cm 顶部与 18 cm 底座。',
      en: 'The listing labels soft plastic and shows a 73 cm post, 6.5 cm top, and 18 cm base.',
      es: 'El listado indica plástico blando y muestra 73 cm de altura, parte superior de 6,5 cm y base de 18 cm.',
      fr: 'La fiche indique plastique souple, hauteur 73 cm, sommet 6,5 cm et base 18 cm.',
      de: 'Das Angebot nennt Weichkunststoff, 73 cm Höhe, 6,5 cm Kopf und 18 cm Fuß.',
      ar: 'تذكر الصفحة البلاستيك الناعم بارتفاع 73 سم وقمة 6.5 سم وقاعدة 18 سم.'
    },
    verifiedOptions: {
      zh: '白色反光带，螺丝配置以询盘确认为准。',
      en: 'White reflective bands; screw package must be confirmed in the inquiry.',
      es: 'Bandas reflectantes blancas; confirme el paquete de tornillos en la consulta.',
      fr: 'Bandes réfléchissantes blanches ; confirmer le lot de vis dans la demande.',
      de: 'Weiße Reflexstreifen; Schraubenpaket in der Anfrage bestätigen.',
      ar: 'أشرطة عاكسة بيضاء؛ يجب تأكيد حزمة البراغي في الاستفسار.'
    }
  },
  {
    id: 'PU',
    labelKey: 'pu',
    visibleForm: {
      zh: '页面标注 PU，展示 70 cm 柱体、三条荧光黄反光带与 18 cm 底座。',
      en: 'The listing labels PU and shows a 70 cm post, three fluorescent bands, and an 18 cm base.',
      es: 'El listado indica PU y muestra 70 cm, tres bandas fluorescentes y base de 18 cm.',
      fr: 'La fiche indique PU et montre 70 cm, trois bandes fluorescentes et une base de 18 cm.',
      de: 'Das Angebot nennt PU und zeigt 70 cm, drei fluoreszierende Streifen und 18 cm Fuß.',
      ar: 'تذكر الصفحة مادة PU بارتفاع 70 سم وثلاثة أشرطة فلورية وقاعدة 18 سم.'
    },
    verifiedOptions: {
      zh: '商品图演示可弯曲形态；具体回弹与使用条件需供应商确认。',
      en: 'A product image demonstrates a bent form; recovery and use conditions require supplier confirmation.',
      es: 'Una imagen muestra la forma doblada; la recuperación y las condiciones de uso deben confirmarse.',
      fr: 'Une image montre une forme pliée ; le retour en forme et l’usage doivent être confirmés.',
      de: 'Ein Bild zeigt den gebogenen Zustand; Rückstellung und Einsatzbedingungen sind zu bestätigen.',
      ar: 'تظهر صورة شكلاً منحنياً؛ يجب تأكيد الاستعادة وظروف الاستخدام مع المورد.'
    }
  },
  {
    id: 'EVA',
    labelKey: 'eva',
    visibleForm: {
      zh: '页面标注 EVA 泡沫，展示 75 cm 高度、7 cm 顶部和 20 cm 底座。',
      en: 'The listing labels EVA foam and shows 75 cm height, 7 cm top, and 20 cm base.',
      es: 'El listado indica espuma EVA con 75 cm de altura, parte superior de 7 cm y base de 20 cm.',
      fr: 'La fiche indique mousse EVA, hauteur 75 cm, sommet 7 cm et base 20 cm.',
      de: 'Das Angebot nennt EVA-Schaum, 75 cm Höhe, 7 cm Kopf und 20 cm Fuß.',
      ar: 'تذكر الصفحة رغوة EVA بارتفاع 75 سم وقمة 7 سم وقاعدة 20 سم.'
    },
    verifiedOptions: {
      zh: '页面展示黑色、红色与橙色方向；具体颜色需询盘确认。',
      en: 'Black, red, and orange directions are shown; exact colors require inquiry confirmation.',
      es: 'Se muestran negro, rojo y naranja; confirme el color exacto en la consulta.',
      fr: 'Les directions noir, rouge et orange sont montrées ; confirmer la couleur exacte.',
      de: 'Schwarz, Rot und Orange werden gezeigt; genaue Farbe in der Anfrage bestätigen.',
      ar: 'تظهر خيارات الأسود والأحمر والبرتقالي؛ يجب تأكيد اللون الدقيق.'
    }
  }
];

export function MaterialLab() {
  const { t, lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<MaterialId>('Plastic');
  const active = MATERIALS.find((item) => item.id === activeTab) ?? MATERIALS[0];

  return (
    <section className="material-lab-section" data-component="material-lab" id="materials">
      <Reveal><h2 className="section-title">{t('materials')}</h2></Reveal>
      <div className="lab-container">
        <div aria-label={t('materials')} className="lab-tabs" role="tablist">
          {MATERIALS.map((item) => (
            <button
              aria-selected={activeTab === item.id}
              className={`lab-tab ${activeTab === item.id ? 'active' : ''}`}
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              role="tab"
              type="button"
            >
              {t(item.labelKey)}
            </button>
          ))}
        </div>
        <div className="lab-content" role="tabpanel">
          <Reveal key={active.id}>
            <div className="material-detail">
              <h3 className="material-name">{t(active.labelKey)}</h3>
              <div className="material-evidence">
                <article><span>01</span><p>{active.visibleForm[lang]}</p></article>
                <article><span>02</span><p>{active.verifiedOptions[lang]}</p></article>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
