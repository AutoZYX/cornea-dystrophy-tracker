import type {
  Category,
  DashboardStats,
  EvidenceLevel,
  InstitutionRecord,
  KnowledgeRecord,
} from "./types";
import { SOURCES } from "./sources";

export const CATEGORY_LABELS: Record<Category, string> = {
  overview: "总览",
  classification: "分类",
  gene: "基因",
  condition: "分型",
  diagnosis: "诊断",
  treatment: "治疗",
  care: "护理",
  institution: "医院",
  clinician: "医生",
  research: "研究",
  glossary: "术语",
};

export const KNOWLEDGE_RECORDS: KnowledgeRecord[] = [
  {
    id: "CD-OVERVIEW-001",
    category: "overview",
    title: "角膜营养不良是一组以角膜透明性和结构异常为核心的遗传性疾病",
    title_en: "Corneal dystrophies as inherited disorders of corneal transparency and structure",
    summary:
      "角膜营养不良不是单一疾病，而是一组多发生在角膜特定层次、常有家族性、通常缓慢进展的疾病。不同分型在发病年龄、遗传模式、复发风险和治疗路径上差别很大。",
    key_points: [
      "多数患者需要裂隙灯检查、角膜影像和家族史共同判断，不能只靠症状自我诊断。",
      "病变层次很关键：上皮、Bowman 层、基质、Descemet 膜和内皮受累时，治疗选择完全不同。",
      "常见症状包括视物模糊、眩光、畏光、复发性角膜上皮糜烂、疼痛或角膜混浊。",
      "很多类型存在术后复发可能，因此记录长期随访比单次手术结论更重要。",
    ],
    clinical_use: [
      "作为患者和家属理解疾病分型的入口。",
      "复诊前先确认医生讨论的是哪一种分型、哪一层角膜和哪一个基因。",
    ],
    limits: [
      "不能用“角膜营养不良”四个字直接推导治疗方案。",
      "家族史提示遗传风险，但不能替代基因检测和眼科专科诊断。",
    ],
    tags: ["总览", "家族史", "诊断入口"],
    source_ids: ["SRC-NEI-2024-CORNEAL-DYSTROPHIES", "SRC-IC3D-2024"],
    evidence_level: "A",
    source_type: "official_health",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
    related_ids: ["CD-CLASS-001", "CD-DX-001"],
  },
  {
    id: "CD-CLASS-001",
    category: "classification",
    title: "IC3D 是当前整理角膜营养不良分型的核心参考框架",
    title_en: "IC3D is the core reference framework for corneal dystrophy classification",
    summary:
      "IC3D 将临床表现、病理、遗传证据和影像资料合并到标准化模板中。2024 年第三版继续更新 22 种角膜营养不良及其证据等级。",
    key_points: [
      "IC3D 的价值不是给患者自我分型，而是减少命名混乱和旧文献误读。",
      "同一个中文病名背后可能对应不同英文分类、不同基因和不同组织层次。",
      "网页中的分型条目应跟随 IC3D 更新，并保留核验日期。",
    ],
    clinical_use: [
      "把就诊记录中的中文诊断和英文/基因分型对齐。",
      "用于组织知识库导航：上皮、Bowman 层、基质、内皮等维度。",
    ],
    limits: [
      "IC3D 是分类参考，不是具体治疗指南。",
      "部分疾病是否属于严格意义的营养不良，仍可能随证据更新而变化。",
    ],
    tags: ["IC3D", "分型", "证据等级"],
    source_ids: ["SRC-IC3D-2024"],
    evidence_level: "A",
    source_type: "peer_review",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
    related_ids: ["CD-OVERVIEW-001"],
  },
  {
    id: "CD-GENE-TGFBI",
    category: "gene",
    title: "TGFBI 是多种上皮-基质型角膜营养不良的重要相关基因",
    title_en: "TGFBI is central to multiple epithelial-stromal corneal dystrophies",
    summary:
      "TGFBI 相关角膜营养不良常表现为异常蛋白在角膜沉积，涉及颗粒状、格子状、Reis-Bucklers、Thiel-Behnke 等表型。具体突变位点会影响分型、复发风险和未来基因治疗可能性。",
    key_points: [
      "家系中多代发病时，TGFBI 是需要医生考虑的关键基因之一。",
      "同为 TGFBI 相关疾病，不同突变的临床表现和严重程度仍可能不同。",
      "TGFBI 也是当前角膜营养不良基因编辑研究的重要靶点。",
    ],
    clinical_use: [
      "复诊时询问是否需要做角膜营养不良基因 panel 或 TGFBI 靶向检测。",
      "将家庭成员的检查结果用同一个突变位点追踪，而不是只记录中文病名。",
    ],
    limits: [
      "基因检测结果需要遗传咨询或眼遗传专科解释。",
      "有突变不等于立即需要手术，治疗仍取决于视功能、角膜层次和进展速度。",
    ],
    tags: ["TGFBI", "遗传", "颗粒状", "格子状", "基因治疗"],
    source_ids: ["SRC-IC3D-2024", "SRC-FUDAN-GEB101-2025"],
    evidence_level: "A",
    source_type: "peer_review",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
    related_ids: ["CD-RSCH-GEB101", "CD-TX-PTK"],
  },
  {
    id: "CD-GENE-DCN",
    category: "gene",
    title: "DCN 相关先天性基质角膜营养不良需要儿童期长期视觉随访",
    title_en: "DCN-related congenital stromal corneal dystrophy requires childhood visual surveillance",
    summary:
      "GeneReviews 将先天性基质角膜营养不良描述为出生时或出生后不久可见的双侧角膜混浊，DCN 杂合致病变异可确认诊断。儿童期需要关注屈光、斜视和弱视风险。",
    key_points: [
      "该病通常按常染色体显性方式遗传，受影响个体的子女有 50% 遗传致病变异风险。",
      "儿童建议至少每年进行视力和眼科常规检查。",
      "治疗可包括眼镜/接触镜、弱视处理，严重时考虑穿透或深板层角膜移植。",
    ],
    clinical_use: [
      "儿童家族成员随访时，单独记录视力、屈光、角膜厚度、眼压和斜弱视情况。",
      "当病史提示出生早期角膜混浊时，将 DCN 纳入遗传咨询问题清单。",
    ],
    limits: [
      "这只是某一种分型，不能套用于所有角膜营养不良儿童。",
      "是否手术必须由儿童眼科和角膜专科共同评估。",
    ],
    tags: ["DCN", "儿童", "先天性", "弱视", "常染色体显性"],
    source_ids: ["SRC-GENEREVIEWS-CSCD"],
    evidence_level: "A",
    source_type: "gene_database",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
  },
  {
    id: "CD-GENE-TCF4-FUCHS",
    category: "gene",
    title: "Fuchs 内皮角膜营养不良与内皮细胞功能衰退相关，晚发型常需关注 TCF4 相关研究",
    title_en: "Fuchs endothelial dystrophy involves endothelial failure and TCF4-associated research",
    summary:
      "Fuchs 病变核心在角膜内皮细胞泵功能不足，导致角膜水肿、晨起模糊、眩光和晚期疼痛。晚发型 Fuchs 与 TCF4 内含子重复扩增相关的研究较多。",
    key_points: [
      "典型症状是晨起视物更模糊，白天可能改善。",
      "检查常包括裂隙灯、角膜厚度、角膜断层和内皮细胞评估。",
      "中晚期常见手术路径是 DMEK 或 DSEK/DSAEK，而非一开始就做全层移植。",
    ],
    clinical_use: [
      "如果诊断为内皮型疾病，重点记录角膜厚度、内皮细胞、晨起症状和眼压。",
      "白内障手术前应主动询问是否需要评估内皮储备。",
    ],
    limits: [
      "Fuchs 多为成人发病，不能直接解释所有儿童或青少年家族性角膜混浊。",
      "基因研究不等于已有常规基因治疗。",
    ],
    tags: ["Fuchs", "内皮", "TCF4", "DMEK", "DSEK"],
    source_ids: ["SRC-AAO-EYEWIKI-FUCHS", "SRC-MAYO-FUCHS"],
    evidence_level: "B",
    source_type: "official_health",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
    related_ids: ["CD-TX-DMEK", "CD-DX-001"],
  },
  {
    id: "CD-COND-EBMD",
    category: "condition",
    title: "上皮基底膜营养不良常与复发性角膜上皮糜烂和表面不规则相关",
    title_en: "Epithelial basement membrane dystrophy is linked to recurrent erosions and surface irregularity",
    summary:
      "上皮基底膜营养不良又称 map-dot-fingerprint dystrophy。患者可无症状，也可出现晨起疼痛、异物感、流泪、畏光和视物波动。",
    key_points: [
      "病变在角膜表层，症状常与上皮附着不良和表面不规则有关。",
      "保守治疗包括润滑、眼膏、治疗性接触镜等，严重或瘢痕时可讨论激光或手术。",
      "与深层基质或内皮型疾病相比，治疗目标和风险完全不同。",
    ],
    clinical_use: [
      "记录疼痛是否晨起更重、是否反复发作、是否伴随视力波动。",
      "就诊时请医生明确是否属于 EBMD，还是其他 TGFBI 相关表型。",
    ],
    limits: [
      "GTR 页面依赖提交者信息，具体检测方案仍需医生判断。",
    ],
    tags: ["EBMD", "上皮", "复发性糜烂", "疼痛"],
    source_ids: ["SRC-NEI-2024-CORNEAL-DYSTROPHIES", "SRC-NCBI-GTR-EBMD"],
    evidence_level: "B",
    source_type: "official_health",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
    related_ids: ["CD-CARE-RED-FLAGS"],
  },
  {
    id: "CD-COND-LATTICE",
    category: "condition",
    title: "格子状角膜营养不良常从儿童或青少年期开始并可能反复糜烂",
    title_en: "Lattice corneal dystrophy may begin early and cause recurrent erosions",
    summary:
      "格子状角膜营养不良可出现角膜内格子样沉积，随时间累积影响视力，也可能出现复发性角膜上皮糜烂。",
    key_points: [
      "NEI 患者资料提示 lattice dystrophy 通常可在儿童期开始。",
      "症状可包括疼痛、畏光、流泪、异物感和视物模糊。",
      "治疗从润滑和保护性处理到 PTK 或角膜移植不等，取决于深度和瘢痕。",
    ],
    clinical_use: [
      "家族成员如果儿童期或青少年期即有症状，应保留连续裂隙灯描述和照片。",
      "记录是否做过 PTK 或移植，以及多久复发。",
    ],
    limits: [
      "格子样表现有不同遗传背景，需结合医生诊断和基因检测。",
    ],
    tags: ["格子状", "儿童期", "糜烂", "TGFBI"],
    source_ids: ["SRC-NEI-2024-CORNEAL-DYSTROPHIES", "SRC-IC3D-2024"],
    evidence_level: "A",
    source_type: "official_health",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
    related_ids: ["CD-GENE-TGFBI", "CD-TX-PTK"],
  },
  {
    id: "CD-DX-001",
    category: "diagnosis",
    title: "诊断不应停在病名，需要同时记录角膜层次、影像、基因和家族史",
    title_en: "Diagnosis should capture layer, imaging, gene, and family history",
    summary:
      "同样叫角膜营养不良，病变层次和遗传基础不同，治疗路径可能从眼表处理到内皮移植完全不同。结构化记录可以显著减少复诊沟通成本。",
    key_points: [
      "基础检查：视力、验光、裂隙灯、眼压。",
      "角膜检查：角膜地形图/断层、角膜厚度、前节 OCT、内皮细胞计数视情况选择。",
      "遗传相关：三代家族史、发病年龄、手术史、基因检测报告。",
      "儿童额外关注：弱视、斜视、屈光参差和学习阅读影响。",
    ],
    clinical_use: [
      "把每次就诊按同一模板记录，便于比较进展。",
      "复诊前生成一页 briefing，列出当前症状、上次检查、用药和问题。",
    ],
    limits: [
      "检查项目不是越多越好，应由角膜专科医生按病情选择。",
    ],
    tags: ["诊断", "裂隙灯", "角膜地形图", "基因检测", "家系图"],
    source_ids: ["SRC-NEI-2024-CORNEAL-DYSTROPHIES", "SRC-MAYO-FUCHS", "SRC-GENEREVIEWS-CSCD"],
    evidence_level: "A",
    source_type: "official_health",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
  },
  {
    id: "CD-TX-LENSES",
    category: "treatment",
    title: "眼镜、硬性接触镜和巩膜镜常用于改善不规则散光和视觉质量",
    title_en: "Spectacles, rigid lenses, and scleral lenses can improve irregular astigmatism and visual quality",
    summary:
      "当主要问题是角膜表面或形态导致的散光和视觉质量下降时，非手术光学矫正可能先于手术。术后患者也常需要长期配镜或接触镜优化。",
    key_points: [
      "全层角膜移植后即使植片透明，也可能因缝线、角膜形态或散光影响小字阅读。",
      "硬性角膜接触镜或巩膜镜可在部分不规则角膜中改善视觉质量。",
      "儿童需要同时考虑依从性、弱视窗口和安全性。",
    ],
    clinical_use: [
      "术后视物模糊不等于移植失败，先让医生区分散光、干眼、排斥、眼压和晶状体等因素。",
      "记录裸眼视力、最佳矫正视力和实际阅读限制，比只记录裸眼视力更有用。",
    ],
    limits: [
      "接触镜选择需要验配经验，不能自行购买替代专业验配。",
    ],
    tags: ["散光", "硬镜", "巩膜镜", "术后视觉"],
    source_ids: ["SRC-NEI-2024-CORNEAL-DYSTROPHIES", "SRC-GENEREVIEWS-CSCD"],
    evidence_level: "B",
    source_type: "official_health",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
  },
  {
    id: "CD-TX-PTK",
    category: "treatment",
    title: "PTK 是部分表浅或前基质角膜营养不良的常用治疗方式，但存在复发问题",
    title_en: "PTK is used for selected superficial or anterior stromal dystrophies but recurrence remains a problem",
    summary:
      "治疗性准分子激光角膜切削术可以去除部分表浅混浊或不规则组织，改善视力或糜烂症状。复旦上医 2025 年报道中也将 PTK 作为基因编辑给药联合策略的一部分。",
    key_points: [
      "PTK 适合与否取决于沉积深度、角膜厚度、瘢痕位置和既往手术史。",
      "单纯 PTK 后数月至数年复发是临床难题之一。",
      "PTK 不是所有角膜营养不良的通用方案，尤其不解决内皮泵功能失败。",
    ],
    clinical_use: [
      "就诊时询问沉积深度、剩余角膜厚度、预期获益和复发可能。",
      "记录每次 PTK 或激光治疗的日期、深度、术后视力和复发间隔。",
    ],
    limits: [
      "是否适合 PTK 必须由角膜专科医生基于影像和厚度判断。",
    ],
    tags: ["PTK", "激光", "复发", "TGFBI"],
    source_ids: ["SRC-FUDAN-GEB101-2025", "SRC-NEI-2024-CORNEAL-DYSTROPHIES"],
    evidence_level: "B",
    source_type: "official_health",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
    related_ids: ["CD-RSCH-GEB101", "CD-GENE-TGFBI"],
  },
  {
    id: "CD-TX-DALK",
    category: "treatment",
    title: "DALK 适用于内皮相对健康的深基质病变，目标是避免全层移植部分风险",
    title_en: "DALK is considered for deep stromal disease with relatively healthy endothelium",
    summary:
      "深板层角膜移植保留受者内皮，理论上可减少内皮排斥相关风险。它常用于基质型疾病或圆锥角膜等场景，但技术难度和适应证选择很关键。",
    key_points: [
      "DALK 是否适合取决于病变是否主要位于基质，内皮是否仍可用。",
      "对儿童或年轻患者，保留内皮可能有长期意义，但手术判断更复杂。",
      "国内温州眼视光等团队在深板层角膜移植方面有较多公开资料。",
    ],
    clinical_use: [
      "咨询手术时询问为什么选择 DALK、PK 或其他术式。",
      "记录医生对内皮状态、病变深度和术后散光的判断。",
    ],
    limits: [
      "DALK 不是更高级的通用替代品，部分病变仍需 PK 或其他手术。",
    ],
    tags: ["DALK", "深板层", "基质", "移植"],
    source_ids: ["SRC-WZEYE-CORNEA", "SRC-GENEREVIEWS-CSCD"],
    evidence_level: "B",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
  },
  {
    id: "CD-TX-PK",
    category: "treatment",
    title: "穿透性角膜移植仍是严重全层受累或复杂角膜混浊的重要手术方案",
    title_en: "Penetrating keratoplasty remains important for severe full-thickness disease or complex opacity",
    summary:
      "穿透性角膜移植用供体角膜替换全层受累组织。Moorfields 患者资料提示，完整视觉恢复可能需要较长时间，术后排斥和散光管理是长期议题。",
    key_points: [
      "Moorfields 资料提示，全层移植后完整视觉改善可能需要长达 24 个月。",
      "移植排斥可以发生在术后任何阶段，红眼、畏光、视力下降、疼痛需要立即处理。",
      "术后可能需要长期激素滴眼、眼压监测、缝线调整、配镜或再次手术。",
    ],
    clinical_use: [
      "术后记录应覆盖视力、散光、眼压、植片透明度、用药和排斥警示症状。",
      "小字阅读困难需要区分散光、干眼、排斥、白内障和眼底问题。",
    ],
    limits: [
      "具体预后与原发病、血管化、炎症、复植次数和眼表状态有关。",
    ],
    tags: ["PK", "穿透性角膜移植", "排斥", "散光", "复查"],
    source_ids: ["SRC-MOORFIELDS-PK"],
    evidence_level: "A",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
    related_ids: ["CD-CARE-RED-FLAGS", "CD-CARE-TRANSPLANT-LONGTERM"],
  },
  {
    id: "CD-TX-DMEK",
    category: "treatment",
    title: "DMEK 和 DSEK/DSAEK 是内皮型疾病的重要移植路径",
    title_en: "DMEK and DSEK/DSAEK are key transplant pathways for endothelial disease",
    summary:
      "Fuchs 等内皮型疾病的核心问题是内皮细胞失能。AAO EyeWiki 和 Mayo Clinic 均将后板层内皮移植列为重要治疗路径，其中 DMEK 移植更薄的 Descemet 膜和内皮组织。",
    key_points: [
      "DMEK 通常视觉质量较好，但组织处理和贴附要求更高。",
      "DSEK/DSAEK 可作为部分病例的替代方案，尤其在眼部条件复杂时。",
      "如果角膜已因长期水肿形成瘢痕，单纯内皮移植效果可能受限。",
    ],
    clinical_use: [
      "内皮型患者要记录角膜厚度、内皮细胞、晨起模糊程度和既往眼内手术史。",
      "术后需按医生要求体位、复查植片贴附和监测眼压。",
    ],
    limits: [
      "是否 DMEK、DSEK 还是 PK，取决于角膜瘢痕、眼部结构和医生经验。",
    ],
    tags: ["DMEK", "DSEK", "DSAEK", "内皮", "Fuchs"],
    source_ids: ["SRC-AAO-EYEWIKI-FUCHS", "SRC-MAYO-FUCHS"],
    evidence_level: "B",
    source_type: "official_health",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
    related_ids: ["CD-GENE-TCF4-FUCHS"],
  },
  {
    id: "CD-RSCH-GEB101",
    category: "research",
    title: "GEB-101 代表 TGFBI 角膜营养不良基因编辑治疗的早期临床探索",
    title_en: "GEB-101 represents early clinical exploration of genome editing for TGFBI corneal dystrophy",
    summary:
      "2025 年复旦上医报道首例接受 PTK 联合角膜基质内 TGFBI 靶向基因编辑药物的患者出院，视力由术前 0.05 提高到 0.5。该进展重要，但仍应作为临床研究追踪，不应等同于成熟常规治疗。",
    key_points: [
      "公开报道中的策略是手术清除加基因干预，目标是延缓进展并减少复发。",
      "报道强调非病毒蛋白质递送载体和临床前安全性，但长期疗效仍需更多数据。",
      "公司新闻称首例患者未观察到不良事件，但公司稿件证据等级低于同行评议论文。",
    ],
    clinical_use: [
      "适合放入研究进展追踪，不适合直接作为个人治疗决策依据。",
      "若患者为 TGFBI 确认突变，可在专家门诊咨询是否存在合规临床研究机会。",
    ],
    limits: [
      "截至本次核验，这不是标准常规治疗。",
      "单例出院和短期视力改善不能代表长期安全性、有效性和适用人群。",
    ],
    tags: ["GEB-101", "基因编辑", "TGFBI", "PTK", "临床研究"],
    source_ids: ["SRC-FUDAN-GEB101-2025", "SRC-GENEDITBIO-GEB101"],
    evidence_level: "B",
    source_type: "official_news",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "research_only",
    related_ids: ["CD-GENE-TGFBI", "CD-TX-PTK"],
  },
  {
    id: "CD-RSCH-ENDOTHELIAL-SUBSTITUTE",
    category: "research",
    title: "角膜内皮替代物研究试图缓解供体不足和内皮功能障碍治疗难题",
    title_en: "Corneal endothelial substitutes aim to address donor shortage and endothelial dysfunction",
    summary:
      "北京大学新闻网 2025 年报道北医三院洪晶/彭荣梅团队开发用于大泡性角膜病变的生物可降解丝素角膜内皮膜片，并研究角膜内皮屏障机制。",
    key_points: [
      "该方向主要关联严重角膜内皮功能障碍，不等同于所有角膜营养不良。",
      "供体角膜稀缺是中国角膜移植长期面临的问题之一。",
      "组织工程或细胞替代方向值得追踪，但临床可及性和适应证需持续核验。",
    ],
    clinical_use: [
      "作为内皮型疾病和未来治疗方向的资料条目。",
      "咨询时应询问是否处于研究、临床试验还是常规临床应用阶段。",
    ],
    limits: [
      "新闻报道不能替代正式临床指南或个体治疗建议。",
    ],
    tags: ["内皮", "组织工程", "供体不足", "北医三院"],
    source_ids: ["SRC-PKU-ENDOTHELIAL-SUBSTITUTE"],
    evidence_level: "B",
    source_type: "official_news",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "research_only",
    related_ids: ["CD-TX-DMEK"],
  },
  {
    id: "CD-CARE-RED-FLAGS",
    category: "care",
    title: "角膜移植术后红眼、畏光、视力下降、疼痛应按排斥或严重并发症信号处理",
    title_en: "Redness, light sensitivity, visual loss, and pain after transplant are urgent warning signs",
    summary:
      "Moorfields 患者资料明确将红眼、畏光、视力下降和疼痛列为角膜移植排斥症状，并提示排斥需要紧急治疗。术后患者应把这四个症状写进个人记录首页。",
    key_points: [
      "这四个症状的英文常被概括为 RSVP：Redness, Sensitivity to light, Vision loss, Pain。",
      "排斥可发生在术后任何时间，不只发生在早期。",
      "及时处理有机会逆转，拖延可能导致植片失败和视力损失。",
    ],
    clinical_use: [
      "个人记录首页固定展示，出现任何一项都不要只观察。",
      "复诊记录中单独留一个字段：本周期是否出现红眼、畏光、视力下降、疼痛。",
    ],
    limits: [
      "这些症状不只由排斥引起，但术后患者应按需急诊或联系手术团队。",
    ],
    tags: ["术后", "排斥", "急诊", "RSVP"],
    source_ids: ["SRC-MOORFIELDS-PK"],
    evidence_level: "A",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "urgent",
    related_ids: ["CD-TX-PK", "CD-CARE-TRANSPLANT-LONGTERM"],
  },
  {
    id: "CD-CARE-TRANSPLANT-LONGTERM",
    category: "care",
    title: "角膜移植后的长期管理要同时追踪植片、散光、眼压、用药和生活功能",
    title_en: "Long-term transplant care should track graft, astigmatism, IOP, medication, and function",
    summary:
      "术后多年能正常生活，并不代表不需要随访。全层移植后散光、缝线相关形态、长期激素导致的眼压问题、白内障和排斥风险都需要结构化记录。",
    key_points: [
      "记录裸眼视力和最佳矫正视力，才能区分角膜透明度和屈光问题。",
      "散光建议记录轴位、度数、是否规则、是否与缝线或角膜形态相关。",
      "长期激素用药需关注眼压和医生给出的停药/减量方案。",
      "生活功能也重要：小字阅读、夜间眩光、屏幕耐受、驾驶能力。",
    ],
    clinical_use: [
      "适合作为私密记录功能的核心模板。",
      "每次复查后更新一条 follow-up，而不是覆盖旧结论。",
    ],
    limits: [
      "具体复查频率和用药调整必须听从手术医生或角膜专科医生。",
    ],
    tags: ["长期随访", "散光", "眼压", "用药", "小字阅读"],
    source_ids: ["SRC-MOORFIELDS-PK", "SRC-MAYO-FUCHS"],
    evidence_level: "A",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
    related_ids: ["CD-TX-PK", "CD-TX-LENSES"],
  },
  {
    id: "CD-CARE-CHILDREN",
    category: "care",
    title: "儿童家族成员随访重点不是只看角膜，还要防止弱视窗口被错过",
    title_en: "Children need cornea surveillance plus amblyopia-sensitive visual follow-up",
    summary:
      "儿童角膜营养不良的影响不只是角膜混浊本身。视力发育期还要关注屈光不正、屈光参差、斜视和弱视，随访记录必须比成人更细。",
    key_points: [
      "GeneReviews 对先天性基质角膜营养不良建议儿童至少每年视力和眼科常规检查。",
      "儿童的关键问题是视觉发育窗口，不能等到明显影响学习才处理。",
      "记录应包含年龄、视力、验光、眼位、角膜表现和医生对弱视风险的判断。",
    ],
    clinical_use: [
      "适合做 Lucky 或其他儿童家族成员的私密记录模板。",
      "复诊前列出：最近是否眯眼、怕光、揉眼、阅读距离变化、幼儿园/学校反馈。",
    ],
    limits: [
      "不同分型的儿童随访强度不同，必须由儿童眼科和角膜专科共同判断。",
    ],
    tags: ["儿童", "弱视", "屈光", "家族随访"],
    source_ids: ["SRC-GENEREVIEWS-CSCD", "SRC-NEI-2024-CORNEAL-DYSTROPHIES"],
    evidence_level: "A",
    source_type: "gene_database",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "doctor_confirm",
  },
  {
    id: "CD-CARE-PREVISIT",
    category: "care",
    title: "复诊前 briefing 应压缩到一页：症状变化、检查数据、用药和问题",
    title_en: "A pre-visit briefing should fit on one page: symptoms, data, medication, and questions",
    summary:
      "罕见或少见遗传眼病的复诊常跨医院、跨医生。患者自己维护一页结构化 briefing，可以减少反复讲病史，也能让医生更快看到变化。",
    key_points: [
      "第一段：诊断、家族史、手术史。",
      "第二段：最近三个月症状变化和生活受限。",
      "第三段：最近一次检查关键数据。",
      "第四段：当前用药、过敏史和本次想问的问题。",
    ],
    clinical_use: [
      "私密记录模块应支持导出 PDF 或复制 Markdown。",
      "就诊后把医生回答回填到记录，形成连续时间线。",
    ],
    limits: [
      "briefing 是沟通工具，不是医学结论。",
    ],
    tags: ["复诊", "病史摘要", "行动清单"],
    source_ids: ["SRC-MOORFIELDS-PK", "SRC-GENEREVIEWS-CSCD"],
    evidence_level: "B",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
  },
  {
    id: "CD-INST-ZOC",
    category: "institution",
    title: "中山大学中山眼科中心角膜病科",
    title_en: "Zhongshan Ophthalmic Center cornea department",
    summary:
      "中山眼科中心官网介绍其角膜病科为国家级角膜病和眼表疾病诊疗中心，开展深板层角膜移植、角膜内皮移植、穿透性角膜移植、生物工程角膜移植、人工角膜移植等。",
    key_points: [
      "适合作为中国角膜病和复杂眼表疾病的重要咨询节点之一。",
      "公开资料强调角膜移植规模、复杂眼表疾病和共识制定参与。",
      "适合关注复杂手术路径、二次意见和疑难角膜病。",
    ],
    tags: ["广州", "中山眼科", "角膜移植", "眼表"],
    source_ids: ["SRC-ZOC-CORNEA"],
    evidence_level: "A",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
  },
  {
    id: "CD-INST-FUDAN",
    category: "institution",
    title: "复旦大学附属眼耳鼻喉科医院",
    title_en: "Eye and ENT Hospital of Fudan University",
    summary:
      "复旦眼耳鼻喉科医院在角膜营养不良基因编辑治疗、PTK 联合给药和复杂屈光/角膜研究方面有公开进展，2025 年报道了 TGFBI 角膜营养不良新一代基因疗法首例患者。",
    key_points: [
      "适合跟踪 TGFBI 相关角膜营养不良前沿研究。",
      "公开报道中的基因疗法仍应按临床研究对待。",
      "如果家族基因检测确认 TGFBI，复诊问题可包含是否有合规临床研究信息。",
    ],
    tags: ["上海", "复旦五官科", "TGFBI", "基因治疗", "PTK"],
    source_ids: ["SRC-FUDAN-GEB101-2025"],
    evidence_level: "B",
    source_type: "official_news",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "research_only",
    related_ids: ["CD-RSCH-GEB101"],
  },
  {
    id: "CD-INST-TONGREN",
    category: "institution",
    title: "北京同仁医院眼角膜科",
    title_en: "Beijing Tongren Hospital cornea service",
    summary:
      "北京同仁医院眼角膜科公开资料显示其关注角膜眼表疾病、角膜移植、感染性和免疫性角结膜病等方向。自动抓取受限，具体医生和出诊需就诊前再次核验。",
    key_points: [
      "适合作为北京地区角膜病和眼表疾病的重要咨询节点。",
      "公开页面抓取不稳定，平台应标注来源状态为 blocked。",
      "挂号前应核对医院官方渠道、出诊时间和医生专长。",
    ],
    tags: ["北京", "同仁", "角膜科", "角膜移植"],
    source_ids: ["SRC-TONGREN-CORNEA"],
    evidence_level: "B",
    source_type: "hospital_official",
    source_status: "blocked",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
  },
  {
    id: "CD-INST-WZEYE",
    category: "institution",
    title: "温州医科大学附属眼视光医院角膜与眼表疾病中心",
    title_en: "Wenzhou Eye Hospital cornea and ocular surface center",
    summary:
      "温州眼视光官网介绍其角膜与眼表疾病中心在角膜移植体系、深板层角膜移植、内皮移植、培训基地和真实世界研究方面有较多积累。",
    key_points: [
      "公开资料强调角膜移植系统创新和国家级培训基地。",
      "适合关注深板层、内皮移植、复杂眼表和角膜盲防控。",
      "陈蔚团队相关信息可作为医生追踪条目的起点。",
    ],
    tags: ["温州", "眼视光", "陈蔚", "DALK", "内皮移植"],
    source_ids: ["SRC-WZEYE-CORNEA"],
    evidence_level: "A",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
  },
  {
    id: "CD-INST-SDEYE",
    category: "institution",
    title: "山东第一医科大学附属青岛眼科医院/山东省眼科研究所",
    title_en: "Qingdao Eye Hospital and Shandong Eye Institute",
    summary:
      "山东青岛眼科医院官方资料显示谢立信教授长期深耕角膜病、白内障和眼表疾病，并创建山东省眼科研究所及相关三甲眼科专科医院体系。",
    key_points: [
      "适合关注角膜病、复杂角膜移植和中国眼库/角膜材料相关方向。",
      "谢立信相关公开资料属于国内角膜病领域重要专家线索。",
      "具体就诊应核对院区、医生团队和出诊安排。",
    ],
    tags: ["青岛", "山东眼科", "谢立信", "角膜病"],
    source_ids: ["SRC-SDEYE-XIELIXIN"],
    evidence_level: "A",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
  },
  {
    id: "CD-INST-PKU3",
    category: "institution",
    title: "北京大学第三医院眼科角膜内皮与移植研究方向",
    title_en: "Peking University Third Hospital corneal endothelial and transplant research",
    summary:
      "北医三院洪晶/彭荣梅团队公开报道涉及角膜内皮屏障机制和生物可降解角膜内皮替代物。对内皮功能障碍和供体不足相关治疗趋势值得长期追踪。",
    key_points: [
      "适合关注内皮移植、儿童角膜移植和角膜内皮替代物研究。",
      "新闻中的组织工程方向仍需区分研究成果和常规临床服务。",
      "若病变为内皮型，可作为二次意见和研究追踪节点。",
    ],
    tags: ["北京", "北医三院", "洪晶", "内皮", "组织工程"],
    source_ids: ["SRC-PKU-ENDOTHELIAL-SUBSTITUTE"],
    evidence_level: "B",
    source_type: "official_news",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "research_only",
  },
  {
    id: "CD-INST-MOORFIELDS",
    category: "institution",
    title: "Moorfields Eye Hospital",
    title_en: "Moorfields Eye Hospital",
    summary:
      "Moorfields 提供角膜移植和 Fuchs 等角膜疾病公开患者资料。对英文患者教育、术后风险沟通和长期随访说明具有参考价值。",
    key_points: [
      "适合用作英文患者资料和术后管理说明的参考源。",
      "其角膜移植页面清楚列出排斥症状和随访逻辑。",
      "在英国就诊时可作为专科资源线索。",
    ],
    tags: ["英国", "Moorfields", "角膜移植", "患者教育"],
    source_ids: ["SRC-MOORFIELDS-PK"],
    evidence_level: "A",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
  },
  {
    id: "CD-INST-US-REFERENCE",
    category: "institution",
    title: "美国角膜病参考中心：Wilmer、Mass Eye and Ear、Bascom Palmer",
    title_en: "US reference centers: Wilmer, Mass Eye and Ear, Bascom Palmer",
    summary:
      "Wilmer Eye Institute、Mass Eye and Ear 和 Bascom Palmer 均有公开角膜专科页面，可作为国外医院和技术趋势参考，不建议在没有具体病情匹配时简单按排名选择。",
    key_points: [
      "国外中心信息适合作为治疗路径和研究趋势参考。",
      "跨境就医需考虑保险、转诊、检查资料翻译、费用和连续随访。",
      "对中国患者，国内一线角膜病中心通常仍是首要路径。",
    ],
    tags: ["美国", "Wilmer", "Mass Eye and Ear", "Bascom Palmer"],
    source_ids: ["SRC-WILMER-CORNEA", "SRC-MASSEYE-CORNEA", "SRC-BASCOM-CORNEA"],
    evidence_level: "B",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
  },
  {
    id: "CD-GLOSSARY-KERATOPLASTY",
    category: "glossary",
    title: "Keratoplasty：角膜移植或角膜成形术的总称",
    title_en: "Keratoplasty",
    summary:
      "Keratoplasty 常被翻译为角膜移植或角膜成形术。它不是单一术式，PK、DALK、DMEK、DSEK/DSAEK 都属于不同层次和目标的角膜移植相关手术。",
    key_points: [
      "PK：穿透性，全层。",
      "DALK：深板层，保留内皮。",
      "DMEK/DSEK/DSAEK：后板层或内皮移植，主要用于内皮功能障碍。",
    ],
    tags: ["术语", "PK", "DALK", "DMEK"],
    source_ids: ["SRC-MOORFIELDS-PK", "SRC-AAO-EYEWIKI-FUCHS"],
    evidence_level: "B",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
  },
  {
    id: "CD-GLOSSARY-BCVA",
    category: "glossary",
    title: "最佳矫正视力比裸眼视力更能说明术后视觉潜力",
    title_en: "Best corrected visual acuity matters after corneal surgery",
    summary:
      "裸眼视力受散光和屈光状态影响很大。术后复查时同时记录裸眼视力和最佳矫正视力，才能判断问题是角膜透明度、屈光矫正、眼表还是其他结构。",
    key_points: [
      "如果最佳矫正视力明显好于裸眼视力，配镜或接触镜优化可能很重要。",
      "如果最佳矫正视力也下降，需要医生排查植片、排斥、眼压、晶状体和眼底等因素。",
    ],
    tags: ["术语", "BCVA", "视力", "散光"],
    source_ids: ["SRC-MOORFIELDS-PK"],
    evidence_level: "B",
    source_type: "hospital_official",
    source_status: "verified",
    verified_at: "2026-05-15",
    medical_caveat: "educational",
    related_ids: ["CD-TX-LENSES", "CD-CARE-TRANSPLANT-LONGTERM"],
  },
];

export const INSTITUTIONS: InstitutionRecord[] = [
  {
    id: "INST-ZOC",
    name: "中山大学中山眼科中心角膜病科",
    city: "广州",
    country: "中国",
    focus: ["复杂角膜病", "角膜移植", "角膜内皮移植", "眼表重建"],
    why_it_matters: "国内角膜病和眼表疾病重要中心，公开资料显示手术类型覆盖全面。",
    public_note: "适合疑难角膜病、复杂眼表和二次意见咨询。",
    source_ids: ["SRC-ZOC-CORNEA"],
    evidence_level: "A",
    verified_at: "2026-05-15",
  },
  {
    id: "INST-FUDAN",
    name: "复旦大学附属眼耳鼻喉科医院",
    city: "上海",
    country: "中国",
    focus: ["PTK", "TGFBI", "基因编辑研究", "复杂角膜病"],
    why_it_matters: "2025 年公开报道 TGFBI 角膜营养不良 PTK 联合基因编辑药物首例患者。",
    public_note: "适合跟踪前沿研究，但治疗决策需严格区分临床研究与常规治疗。",
    source_ids: ["SRC-FUDAN-GEB101-2025"],
    evidence_level: "B",
    verified_at: "2026-05-15",
  },
  {
    id: "INST-TONGREN",
    name: "北京同仁医院眼角膜科",
    city: "北京",
    country: "中国",
    focus: ["角膜眼表", "角膜移植", "感染性角膜病", "免疫性角膜病"],
    why_it_matters: "北京地区传统眼科强中心之一，角膜科公开资料显示覆盖角膜和眼表疾病。",
    public_note: "自动核验受限，具体医生和出诊需医院官方渠道二次确认。",
    source_ids: ["SRC-TONGREN-CORNEA"],
    evidence_level: "B",
    verified_at: "2026-05-15",
  },
  {
    id: "INST-WZEYE",
    name: "温州医科大学附属眼视光医院角膜与眼表疾病中心",
    city: "温州",
    country: "中国",
    focus: ["深板层角膜移植", "内皮移植", "眼表疾病", "培训基地"],
    why_it_matters: "官网强调角膜移植系统创新、国家级培训基地和陈蔚团队。",
    public_note: "适合关注 DALK、内皮移植和复杂眼表疾病。",
    source_ids: ["SRC-WZEYE-CORNEA"],
    evidence_level: "A",
    verified_at: "2026-05-15",
  },
  {
    id: "INST-SDEYE",
    name: "山东第一医科大学附属青岛眼科医院/山东省眼科研究所",
    city: "青岛",
    country: "中国",
    focus: ["角膜病", "复杂角膜移植", "眼库", "眼表疾病"],
    why_it_matters: "谢立信教授及山东眼科体系是国内角膜病领域重要资源。",
    public_note: "适合复杂角膜病和角膜移植相关二次意见咨询。",
    source_ids: ["SRC-SDEYE-XIELIXIN"],
    evidence_level: "A",
    verified_at: "2026-05-15",
  },
  {
    id: "INST-PKU3",
    name: "北京大学第三医院眼科",
    city: "北京",
    country: "中国",
    focus: ["角膜内皮", "内皮移植", "儿童角膜移植", "组织工程研究"],
    why_it_matters: "洪晶/彭荣梅团队公开报道角膜内皮替代物和内皮屏障机制研究。",
    public_note: "适合关注内皮型疾病与前沿治疗方向。",
    source_ids: ["SRC-PKU-ENDOTHELIAL-SUBSTITUTE"],
    evidence_level: "B",
    verified_at: "2026-05-15",
  },
  {
    id: "INST-MOORFIELDS",
    name: "Moorfields Eye Hospital",
    city: "London",
    country: "UK",
    focus: ["corneal transplant", "Fuchs dystrophy", "patient education"],
    why_it_matters: "Provides clear public patient materials on corneal transplantation and rejection symptoms.",
    public_note: "Useful as UK reference and for English patient education.",
    source_ids: ["SRC-MOORFIELDS-PK"],
    evidence_level: "A",
    verified_at: "2026-05-15",
  },
  {
    id: "INST-US-REFERENCE",
    name: "Wilmer / Mass Eye and Ear / Bascom Palmer",
    city: "US reference centers",
    country: "US",
    focus: ["cornea service", "transplant", "external disease", "research"],
    why_it_matters: "Public specialty pages provide useful international reference points.",
    public_note: "Use for research tracking and second-opinion orientation, not as ranking-based medical advice.",
    source_ids: ["SRC-WILMER-CORNEA", "SRC-MASSEYE-CORNEA", "SRC-BASCOM-CORNEA"],
    evidence_level: "B",
    verified_at: "2026-05-15",
  },
];

export function getAllRecords() {
  return [...KNOWLEDGE_RECORDS].sort((a, b) => a.id.localeCompare(b.id));
}

export function getRecordsByCategory(category: Category) {
  return KNOWLEDGE_RECORDS.filter((record) => record.category === category);
}

export function getRecordById(id: string) {
  return KNOWLEDGE_RECORDS.find((record) => record.id === id);
}

export function searchRecords(query: string, categories: Category[] = []) {
  const q = query.trim().toLowerCase();
  return KNOWLEDGE_RECORDS.filter((record) => {
    if (categories.length && !categories.includes(record.category)) return false;
    if (!q) return true;
    const haystack = [
      record.id,
      record.title,
      record.title_en,
      record.summary,
      record.key_points.join(" "),
      record.clinical_use?.join(" "),
      record.limits?.join(" "),
      record.tags.join(" "),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export function getDashboardStats(): DashboardStats {
  const categoryCounts = Object.keys(CATEGORY_LABELS).reduce(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {} as Record<Category, number>
  );
  const evidenceCounts: Record<EvidenceLevel, number> = { A: 0, B: 0, C: 0, D: 0 };
  for (const record of KNOWLEDGE_RECORDS) {
    categoryCounts[record.category] += 1;
    evidenceCounts[record.evidence_level] += 1;
  }

  return {
    totalRecords: KNOWLEDGE_RECORDS.length,
    sourceCount: SOURCES.length,
    institutionCount: INSTITUTIONS.length,
    researchCount: getRecordsByCategory("research").length,
    treatmentCount: getRecordsByCategory("treatment").length,
    categoryCounts,
    evidenceCounts,
    latestVerifiedAt: KNOWLEDGE_RECORDS.map((record) => record.verified_at).sort().at(-1) ?? "",
  };
}
