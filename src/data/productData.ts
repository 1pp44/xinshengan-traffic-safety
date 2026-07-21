import { assetUrl } from '../lib/assetUrl';

export interface Product {
  id: string;
  name: { [key: string]: string };
  image: string;
  material: string;
  height: string;
  top: string;
  base: string;
  band: { [key: string]: string };
  screwNote: { [key: string]: string };
  structure?: { [key: string]: string };
}

export const products: Product[] = [
  {
    id: "p1",
    name: {
      zh: "70cm 塑料警示柱",
      en: "70cm Plastic Bollard",
      es: "Bolardo de plástico de 70 cm",
      fr: "Potelet en plastique de 70 cm",
      de: "70 cm Kunststoff-Poller",
      ar: "عمود بلاستيكي 70 سم"
    },
    image: assetUrl("assets/images/xinshengan/plastic-70.jpg"),
    material: "Plastic",
    height: "70 cm",
    top: "7 cm",
    base: "18 cm",
    band: {
      zh: "白色或荧光黄反光带",
      en: "White or fluorescent yellow bands",
      es: "Bandas blancas o amarillas fluorescentes",
      fr: "Bandes blanches ou jaune fluorescent",
      de: "Weiße oder fluoreszierende gelbe Bänder",
      ar: "أشرطة بيضاء أو صفراء فلورية"
    },
    screwNote: {
      zh: "不含螺丝 (可按需配置)",
      en: "Screws not included (configurable)",
      es: "Tornillos no incluidos (configurable)",
      fr: "Vis non incluses (configurable)",
      de: "Schrauben nicht enthalten (konfigurierbar)",
      ar: "البراغي غير متضمنة (قابلة للتكوين)"
    }
  },
  {
    id: "p2",
    name: {
      zh: "75cm 塑料警示柱",
      en: "75cm Plastic Bollard",
      es: "Bolardo de plástico de 75 cm",
      fr: "Potelet en plastique de 75 cm",
      de: "75 cm Kunststoff-Poller",
      ar: "عمود بلاستيكي 75 سم"
    },
    image: assetUrl("assets/images/xinshengan/plastic-75.jpg"),
    material: "Plastic",
    height: "75 cm",
    top: "7 cm",
    base: "18 cm",
    band: {
      zh: "高亮反光带",
      en: "High-visibility reflective bands",
      es: "Bandas reflectantes de alta visibilidad",
      fr: "Bandes réfléchissantes haute visibilité",
      de: "Hochsichtbare reflektierende Bänder",
      ar: "أشرطة عاكسة عالية الرؤية"
    },
    screwNote: {
      zh: "标准配置",
      en: "Standard configuration",
      es: "Configuración estándar",
      fr: "Configuration standard",
      de: "Standardkonfiguration",
      ar: "التكوين القياسي"
    }
  },
  {
    id: "p3",
    name: {
      zh: "73cm 软塑料隔离桩",
      en: "73cm Soft Plastic Bollard",
      es: "Bolardo de plástico blando de 73 cm",
      fr: "Potelet en plastique souple de 73 cm",
      de: "73 cm Weichkunststoff-Poller",
      ar: "عمود بلاستيك ناعم 73 سم"
    },
    image: assetUrl("assets/images/xinshengan/soft-plastic-73.jpg"),
    material: "Soft Plastic",
    height: "73 cm",
    top: "6.5 cm",
    base: "18 cm",
    band: {
      zh: "白色反光带",
      en: "White reflective bands",
      es: "Bandas reflectantes blancas",
      fr: "Bandes réfléchissantes blanches",
      de: "Weiße reflektierende Bänder",
      ar: "أشرطة عاكسة بيضاء"
    },
    screwNote: {
      zh: "螺丝配置需确认",
      en: "Confirm screw package",
      es: "Confirmar paquete de tornillos",
      fr: "Confirmer le lot de vis",
      de: "Schraubenpaket bestätigen",
      ar: "تأكيد حزمة البراغي"
    }
  },
  {
    id: "p4",
    name: {
      zh: "70cm PU 弹力反光柱",
      en: "70cm PU Flexible Bollard",
      es: "Bolardo flexible de PU de 70 cm",
      fr: "Potelet flexible en PU de 70 cm",
      de: "70 cm PU Flexibler Poller",
      ar: "عمود مرن PU 70 سم"
    },
    image: assetUrl("assets/images/xinshengan/pu-70.jpg"),
    material: "PU",
    height: "70 cm",
    top: "7 cm",
    base: "18 cm",
    band: {
      zh: "荧光反光带",
      en: "Fluorescent reflective bands",
      es: "Bandas reflectantes fluorescentes",
      fr: "Bandes réfléchissantes fluorescentes",
      de: "Fluoreszierende reflektierende Bänder",
      ar: "أشرطة عاكسة فلورية"
    },
    screwNote: {
      zh: "螺丝配置需确认",
      en: "Confirm screw package",
      es: "Confirmar paquete de tornillos",
      fr: "Confirmer le lot de vis",
      de: "Schraubenpaket bestätigen",
      ar: "تأكيد حزمة البراغي"
    }
  },
  {
    id: "p5",
    name: {
      zh: "70cm 加厚塑料警示柱",
      en: "70cm Thickened Plastic Bollard",
      es: "Bolardo de plástico engrosado de 70 cm",
      fr: "Potelet en plastique épaissi de 70 cm",
      de: "70 cm Verdickter Kunststoff-Poller",
      ar: "عمود بلاستيكي سميك 70 سم"
    },
    image: assetUrl("assets/images/xinshengan/thickened-plastic-70.jpg"),
    material: "Plastic",
    height: "70 cm",
    top: "7 cm",
    base: "18 cm",
    band: {
      zh: "加宽反光带",
      en: "Widened reflective bands",
      es: "Bandas reflectantes ensanchadas",
      fr: "Bandes réfléchissantes élargies",
      de: "Verbreiterte reflektierende Bänder",
      ar: "أشرطة عاكسة موسعة"
    },
    screwNote: {
      zh: "加厚管壁",
      en: "Thickened wall",
      es: "Pared engrosada",
      fr: "Paroi épaissie",
      de: "Verdickte Wand",
      ar: "جدار سميك"
    }
  },
  {
    id: "p6",
    name: {
      zh: "75cm 挂链款隔离桩",
      en: "75cm Chain-ready Bollard",
      es: "Bolardo para cadena de 75 cm",
      fr: "Potelet prêt pour chaîne de 75 cm",
      de: "75 cm Kettenfertiger Poller",
      ar: "عمود جاهز للسلسلة 75 سم"
    },
    image: assetUrl("assets/images/xinshengan/chain-ready-75.jpg"),
    material: "Plastic",
    height: "75 cm",
    top: "Loop style",
    base: "18 cm",
    band: {
      zh: "黄色反光带",
      en: "Yellow reflective bands",
      es: "Bandas reflectantes amarillas",
      fr: "Bandes réfléchissantes jaunes",
      de: "Gelbe reflektierende Bänder",
      ar: "أشرطة عاكسة صفراء"
    },
    screwNote: {
      zh: "顶部挂环",
      en: "Top loop design",
      es: "Diseño de lazo superior",
      fr: "Conception à boucle supérieure",
      de: "Top-Loop-Design",
      ar: "تصميم حلقة علوية"
    }
  },
  {
    id: "p7",
    name: {
      zh: "75cm EVA 反光柱",
      en: "75cm EVA Bollard",
      es: "Bolardo de EVA de 75 cm",
      fr: "Potelet en EVA de 75 cm",
      de: "75 cm EVA-Poller",
      ar: "عمود EVA 75 سم"
    },
    image: assetUrl("assets/images/xinshengan/eva-75.jpg"),
    material: "EVA",
    height: "75 cm",
    top: "7 cm",
    base: "20 cm",
    band: {
      zh: "多重反光带",
      en: "Multiple reflective bands",
      es: "Múltiples bandas reflectantes",
      fr: "Plusieurs bandes réfléchissantes",
      de: "Mehrere reflektierende Bänder",
      ar: "أشرطة عاكسة متعددة"
    },
    screwNote: {
      zh: "底座宽大",
      en: "Large base",
      es: "Base grande",
      fr: "Grande base",
      de: "Große Basis",
      ar: "قاعدة كبيرة"
    }
  },
  {
    id: "p8",
    name: {
      zh: "70cm 双色塑料警示柱",
      en: "70cm Dual-color Plastic Bollard",
      es: "Bolardo de plástico bicolor de 70 cm",
      fr: "Potelet en plastique bicolore de 70 cm",
      de: "70 cm Zweifarbiger Kunststoff-Poller",
      ar: "عمود بلاستيك ثنائي اللون 70 سم"
    },
    image: assetUrl("assets/images/xinshengan/plastic-70-dual.jpg"),
    material: "Plastic",
    height: "70 cm",
    top: "7 cm",
    base: "18 cm",
    band: {
      zh: "经典双色",
      en: "Classic dual-color",
      es: "Clásico bicolor",
      fr: "Classique bicolore",
      de: "Klassisches Zweifarben-Design",
      ar: "كلاسيكي ثنائي اللون"
    },
    screwNote: {
      zh: "组合式设计",
      en: "Modular design",
      es: "Diseño modular",
      fr: "Conception modulaire",
      de: "Modulares Design",
      ar: "تصميم معياري"
    }
  }
];
