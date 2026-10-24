import { GeneratedPaper, UploadedPagePhoto } from '../types/paper';

export const SAMPLE_TEXTBOOK_PAGES: {
  id: string;
  title: string;
  subject: string;
  classLevel: string;
  board: 'CBSE' | 'PSEB' | 'ICSE';
  description: string;
  thumbnail: string;
  svgDataUri: string;
}[] = [
  {
    id: 'sample-science-1',
    title: 'NCERT Class 10 Science: Chemical Reactions & Equations',
    subject: 'Science',
    classLevel: 'Class 10',
    board: 'CBSE',
    description: 'Covers Combination, Decomposition, Displacement, Double Displacement, Redox reactions, Corrosion & Rancidity with chemical formulas.',
    thumbnail: '🔬 Chemical Reactions Page',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" style="background:%23fff; font-family:sans-serif; color:%231e293b; padding:40px;">
      <rect width="100%" height="100%" fill="%23ffffff" />
      <rect x="30" y="30" width="740" height="1040" fill="none" stroke="%23cbd5e1" stroke-width="2" />
      <text x="60" y="80" font-size="24" font-weight="bold" fill="%231e3a8a">CHAPTER 1: CHEMICAL REACTIONS AND EQUATIONS</text>
      <line x1="60" y1="95" x2="740" y2="95" stroke="%233b82f6" stroke-width="2" />
      <text x="60" y="130" font-size="16" font-weight="bold" fill="%234338ca">1.1 What is a Chemical Reaction?</text>
      <text x="60" y="160" font-size="14" fill="%23334155">Whenever a chemical change occurs, we can say that a chemical reaction has taken place.</text>
      <text x="60" y="185" font-size="14" fill="%23334155">Observations determining a reaction: (i) Change in state, (ii) Change in colour,</text>
      <text x="60" y="210" font-size="14" fill="%23334155">(iii) Evolution of a gas, (iv) Change in temperature.</text>
      <rect x="60" y="235" width="680" height="90" fill="%23eff6ff" rx="8" stroke="%23bfdbfe" />
      <text x="80" y="265" font-size="14" font-weight="bold" fill="%231e40af">Activity 1.1: Magnesium Ribbon Burning</text>
      <text x="80" y="295" font-size="14" fill="%231e3a8a">2Mg(s) + O2(g) -> 2MgO(s) + Heat + Bright White Flame</text>
      <text x="60" y="360" font-size="16" font-weight="bold" fill="%234338ca">1.2 Types of Chemical Reactions</text>
      <text x="60" y="390" font-size="14" font-weight="bold" fill="%230f172a">A. Combination Reaction:</text>
      <text x="80" y="415" font-size="14" fill="%23334155">Quick lime reacts vigorously with water to produce slaked lime (calcium hydroxide):</text>
      <text x="80" y="440" font-size="14" font-family="monospace" fill="%23b91c1c">CaO(s) + H2O(l) -> Ca(OH)2(aq) + Heat  (Exothermic)</text>
      <text x="60" y="480" font-size="14" font-weight="bold" fill="%230f172a">B. Decomposition Reaction:</text>
      <text x="80" y="505" font-size="14" fill="%23334155">When ferrous sulphate crystals (FeSO4.7H2O) are heated, green color changes:</text>
      <text x="80" y="530" font-size="14" font-family="monospace" fill="%23b91c1c">2FeSO4(s) -Heat-> Fe2O3(s) + SO2(g) + SO3(g)</text>
      <text x="80" y="555" font-size="14" fill="%23334155">Thermal decomposition of Calcium Carbonate:</text>
      <text x="80" y="580" font-size="14" font-family="monospace" fill="%23b91c1c">CaCO3(s) -Heat-> CaO(s) + CO2(g)</text>
      <text x="60" y="620" font-size="16" font-weight="bold" fill="%234338ca">1.3 Oxidation and Reduction (Redox)</text>
      <text x="60" y="650" font-size="14" fill="%23334155">Oxidation: Gain of oxygen or loss of hydrogen/electrons.</text>
      <text x="60" y="675" font-size="14" fill="%23334155">Reduction: Loss of oxygen or gain of hydrogen/electrons.</text>
      <text x="80" y="705" font-size="14" font-family="monospace" fill="%23b91c1c">CuO + H2 -Heat-> Cu + H2O (CuO reduced to Cu, H2 oxidised to H2O)</text>
      <rect x="60" y="735" width="680" height="110" fill="%23fdf4ff" rx="8" stroke="%23f5d0fe" />
      <text x="80" y="765" font-size="14" font-weight="bold" fill="%2386198f">1.4 Effects of Oxidation in Everyday Life</text>
      <text x="80" y="795" font-size="14" fill="%23701a75">1. Corrosion: Iron rusts forming hydrated ferric oxide (Fe2O3.xH2O).</text>
      <text x="80" y="820" font-size="14" fill="%23701a75">2. Rancidity: Fats and oils oxidise leading to bad smell; prevented by flushing with Nitrogen.</text>
      <text x="350" y="1020" font-size="12" fill="%2394a3b8">NCERT Science - Page 14</text>
    </svg>`,
  },
  {
    id: 'sample-math-1',
    title: 'NCERT Class 10 Mathematics: Quadratic Equations',
    subject: 'Mathematics (Standard)',
    classLevel: 'Class 10',
    board: 'CBSE',
    description: 'Standard form ax² + bx + c = 0, Factorisation method, Discriminant D = b² - 4ac, Nature of roots, and real-life word problems.',
    thumbnail: '📐 Quadratic Equations Page',
    svgDataUri: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1100" viewBox="0 0 800 1100" style="background:%23fff; font-family:sans-serif; color:%231e293b; padding:40px;">
      <rect width="100%" height="100%" fill="%23ffffff" />
      <rect x="30" y="30" width="740" height="1040" fill="none" stroke="%23cbd5e1" stroke-width="2" />
      <text x="60" y="80" font-size="24" font-weight="bold" fill="%231e3a8a">CHAPTER 4: QUADRATIC EQUATIONS</text>
      <line x1="60" y1="95" x2="740" y2="95" stroke="%233b82f6" stroke-width="2" />
      <text x="60" y="130" font-size="16" font-weight="bold" fill="%234338ca">4.1 Standard Form</text>
      <text x="60" y="160" font-size="14" fill="%23334155">A quadratic equation in variable x is an equation of the form:</text>
      <text x="80" y="190" font-size="16" font-weight="bold" font-family="monospace" fill="%23b91c1c">ax² + bx + c = 0, where a ≠ 0 and a, b, c are real numbers.</text>
      <text x="60" y="235" font-size="16" font-weight="bold" fill="%234338ca">4.2 Quadratic Formula & Discriminant</text>
      <text x="60" y="265" font-size="14" fill="%23334155">Roots of ax² + bx + c = 0 are given by:</text>
      <text x="80" y="300" font-size="16" font-weight="bold" font-family="monospace" fill="%231e40af">x = (-b ± √(b² - 4ac)) / (2a)</text>
      <text x="60" y="340" font-size="14" fill="%23334155">The expression D = b² - 4ac is called the Discriminant.</text>
      <rect x="60" y="365" width="680" height="130" fill="%23f0fdf4" rx="8" stroke="%23bbf7d0" />
      <text x="80" y="395" font-size="14" font-weight="bold" fill="%23166534">Nature of Roots:</text>
      <text x="80" y="425" font-size="14" fill="%2315803d">1. If D > 0: Two distinct real roots.</text>
      <text x="80" y="450" font-size="14" fill="%2315803d">2. If D = 0: Two equal real roots (x = -b / 2a).</text>
      <text x="80" y="475" font-size="14" fill="%2315803d">3. If D &lt; 0: No real roots (roots are imaginary/complex).</text>
      <text x="60" y="530" font-size="16" font-weight="bold" fill="%234338ca">4.3 Solved Examples</text>
      <text x="60" y="560" font-size="14" font-weight="bold" fill="%230f172a">Example 1: Find roots of 2x² - 5x + 3 = 0</text>
      <text x="80" y="585" font-size="14" fill="%23334155">Here a = 2, b = -5, c = 3. D = (-5)² - 4(2)(3) = 25 - 24 = 1 > 0.</text>
      <text x="80" y="610" font-size="14" fill="%23334155">x = (5 ± √1)/4 => x = 6/4 = 3/2 or x = 4/4 = 1. Roots are 3/2 and 1.</text>
      <text x="350" y="1020" font-size="12" fill="%2394a3b8">NCERT Mathematics - Page 78</text>
    </svg>`,
  },
];

export const DEMO_PREGENERATED_PAPER: GeneratedPaper = {
  id: 'demo-sample-paper-1',
  title: 'CBSE Class 10 Science Practice Paper',
  schoolName: 'ST. XAVIER SENIOR SECONDARY SCHOOL',
  examinationHeading: 'ANNUAL EXAMINATION (SESSION 2026-27)',
  board: 'CBSE',
  classLevel: 'Class 10',
  subject: 'Science',
  examType: 'Annual Examination',
  totalMarks: 80,
  durationMinutes: 180,
  generalInstructions: [
    'This question paper consists of 39 questions in 5 sections.',
    'All questions are compulsory. However, internal choices have been provided in some questions.',
    'Section A consists of 20 objective type questions carrying 1 mark each.',
    'Section B consists of 6 Very Short Answer questions carrying 2 marks each.',
    'Section C consists of 7 Short Answer questions carrying 3 marks each.',
    'Section D consists of 3 Long Answer questions carrying 5 marks each.',
    'Section E consists of 3 source-based / case-based units of assessment of 4 marks each with sub-parts.',
  ],
  topicsCovered: [
    'Chemical Reactions and Equations',
    'Types of Chemical Reactions',
    'Oxidation and Reduction (Redox)',
    'Corrosion and Prevention',
    'Rancidity and Food Preservation',
  ],
  analysisReport: {
    pagesAnalyzed: 2,
    readabilityScore: 96,
    extractedTopics: ['Types of Reactions', 'Redox Reactions', 'Corrosion & Rancidity'],
    isTextbookBasedPractice: true,
  },
  createdAt: '2026-10-24T12:00:00.000Z',
  updatedAt: '2026-10-24T12:00:00.000Z',
  sections: [
    {
      name: 'Section A',
      title: 'Objective Type Questions (MCQs & Assertion-Reason)',
      instructions: 'Select and write the most appropriate option out of the given choices.',
      totalMarks: 20,
      questions: [
        {
          id: 'demo_q1',
          questionNumber: 1,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'When aqueous solution of potassium iodide is added to lead nitrate solution, a precipitate is formed. What is the colour and chemical formula of the precipitate?',
          marks: 1,
          options: [
            'Yellow precipitate of PbI2',
            'White precipitate of KNO3',
            'Black precipitate of PbO',
            'Yellow precipitate of Pb(NO3)2',
          ],
          answerKey: '(A) Yellow precipitate of PbI2',
          solutionSteps: ['Lead nitrate Pb(NO3)2 reacts with potassium iodide 2KI to form yellow lead iodide PbI2 precipitate.'],
          markingScheme: '1 mark for correct option.',
        },
        {
          id: 'demo_q2',
          questionNumber: 2,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Which of the following is an endothermic process?',
          marks: 1,
          options: [
            'Dilution of sulphuric acid',
            'Sublimation of dry ice (solid CO2)',
            'Condensation of water vapours',
            'Respiration in living organisms',
          ],
          answerKey: '(B) Sublimation of dry ice (solid CO2)',
          solutionSteps: ['Sublimation requires absorption of heat energy from surroundings.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q3',
          questionNumber: 3,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Fatty foods become rancid upon exposure to air due to which process?',
          marks: 1,
          options: ['Reduction', 'Oxidation', 'Corrosion', 'Hydrogenation'],
          answerKey: '(B) Oxidation',
          solutionSteps: ['Fats and oils are oxidised by atmospheric oxygen producing unpleasant smell.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q4',
          questionNumber: 4,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'In the reaction: CuO + H2 -> Cu + H2O, which substance acts as the reducing agent?',
          marks: 1,
          options: ['CuO', 'H2', 'Cu', 'H2O'],
          answerKey: '(B) H2',
          solutionSteps: ['H2 gains oxygen and gets oxidised, therefore it acts as the reducing agent.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q5',
          questionNumber: 5,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Calcium oxide reacts vigorously with water to produce slaked lime. This reaction can be classified as:',
          marks: 1,
          options: [
            'Combination and Endothermic',
            'Combination and Exothermic',
            'Decomposition and Exothermic',
            'Displacement and Endothermic',
          ],
          answerKey: '(B) Combination and Exothermic',
          solutionSteps: ['Two substances combine to form a single product with evolution of heat.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q6',
          questionNumber: 6,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'When ferrous sulphate crystals are heated in a dry boiling tube, the gas evolved has the characteristic odour of:',
          marks: 1,
          options: ['Rotten eggs', 'Burning sulphur', 'Ammonia gas', 'Chlorine gas'],
          answerKey: '(B) Burning sulphur',
          solutionSteps: ['SO2 and SO3 gases evolved have the suffocating smell of burning sulphur.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q7',
          questionNumber: 7,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Which gas is flushed into packets of potato chips to prevent rancidity?',
          marks: 1,
          options: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
          answerKey: '(B) Nitrogen',
          solutionSteps: ['Nitrogen is an inert gas that prevents oxidation of oils.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q8',
          questionNumber: 8,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'What is the chemical formula of rust on iron articles?',
          marks: 1,
          options: ['FeO', 'Fe3O4', 'Fe2O3.xH2O', 'Fe(OH)2'],
          answerKey: '(C) Fe2O3.xH2O',
          solutionSteps: ['Rust is hydrated iron(III) oxide.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q9',
          questionNumber: 9,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'The thermal decomposition of limestone produces quicklime and carbon dioxide. The type of reaction is:',
          marks: 1,
          options: ['Displacement', 'Combination', 'Thermal decomposition', 'Electrolytic decomposition'],
          answerKey: '(C) Thermal decomposition',
          solutionSteps: ['CaCO3 breaks down into CaO + CO2 upon heating.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q10',
          questionNumber: 10,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'A shiny brown element X on heating in air turns black. Identify X and the black compound formed.',
          marks: 1,
          options: ['X is Fe, black is FeO', 'X is Cu, black is CuO', 'X is Ag, black is Ag2S', 'X is Al, black is Al2O3'],
          answerKey: '(B) X is Cu, black is CuO',
          solutionSteps: ['Copper reacts with oxygen on heating to form copper(II) oxide.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q11',
          questionNumber: 11,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Electrolysis of water produces hydrogen and oxygen gases at cathode and anode in the volume ratio of:',
          marks: 1,
          options: ['1:1', '2:1', '1:2', '3:1'],
          answerKey: '(B) 2:1',
          solutionSteps: ['Water formula is H2O; decomposition gives 2 volumes of H2 for every 1 volume of O2.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q12',
          questionNumber: 12,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Silver chloride turns grey in sunlight. This is an example of:',
          marks: 1,
          options: ['Photolytic decomposition', 'Thermal decomposition', 'Displacement', 'Double displacement'],
          answerKey: '(A) Photolytic decomposition',
          solutionSteps: ['2AgCl(s) under sunlight decomposes into 2Ag(s) and Cl2(g).'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q13',
          questionNumber: 13,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Barium chloride reacts with sodium sulphate to produce white barium sulphate. This is an example of:',
          marks: 1,
          options: ['Double displacement reaction', 'Combination reaction', 'Reduction reaction', 'Decomposition reaction'],
          answerKey: '(A) Double displacement reaction',
          solutionSteps: ['Exchange of ions occurs between Ba2+ and SO4(2-).'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q14',
          questionNumber: 14,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Which of the following metals does not corrode easily in atmospheric air?',
          marks: 1,
          options: ['Iron', 'Copper', 'Gold', 'Silver'],
          answerKey: '(C) Gold',
          solutionSteps: ['Gold is a noble metal with very low reactivity.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q15',
          questionNumber: 15,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Magnesium ribbon is rubbed with sandpaper before burning in air to remove:',
          marks: 1,
          options: ['Basic magnesium carbonate/oxide layer', 'Dust particles', 'Moisture', 'Magnesium chloride'],
          answerKey: '(A) Basic magnesium carbonate/oxide layer',
          solutionSteps: ['Protective oxide coating prevents smooth combustion.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q16',
          questionNumber: 16,
          type: 'mcq',
          sectionName: 'Section A',
          questionText: 'Zinc reacts with dilute sulphuric acid to evolve a gas. The evolved gas burns with:',
          marks: 1,
          options: ['A pungent smell', 'A pop sound', 'A green flame', 'A crackling sound'],
          answerKey: '(B) A pop sound',
          solutionSteps: ['Hydrogen gas evolved burns with a characteristic pop sound.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q17',
          questionNumber: 17,
          type: 'assertion_reason',
          sectionName: 'Section A',
          questionText: 'Assertion (A): Respiration is an exothermic process.\nReason (R): Glucose combines with oxygen in cells of our body and releases energy.',
          marks: 1,
          options: [
            'Both (A) and (R) are true and (R) is correct explanation of (A)',
            'Both (A) and (R) are true but (R) is NOT correct explanation of (A)',
            '(A) is true but (R) is false',
            '(A) is false but (R) is true',
          ],
          answerKey: '(A) Both (A) and (R) are true and (R) is correct explanation of (A)',
          solutionSteps: ['Respiration breaks down glucose yielding energy (ATP), thus exothermic.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q18',
          questionNumber: 18,
          type: 'assertion_reason',
          sectionName: 'Section A',
          questionText: 'Assertion (A): Corrosion of iron is a serious problem causing massive financial loss.\nReason (R): Coating with zinc (galvanisation) protects iron from rusting.',
          marks: 1,
          options: [
            'Both (A) and (R) are true and (R) is correct explanation of (A)',
            'Both (A) and (R) are true but (R) is NOT correct explanation of (A)',
            '(A) is true but (R) is false',
            '(A) is false but (R) is true',
          ],
          answerKey: '(B) Both (A) and (R) are true but (R) is NOT correct explanation of (A)',
          solutionSteps: ['Both statements are scientifically correct, but galvanisation explains prevention, not why corrosion is damaging.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q19',
          questionNumber: 19,
          type: 'assertion_reason',
          sectionName: 'Section A',
          questionText: 'Assertion (A): The reaction of calcium oxide with water is an exothermic reaction.\nReason (R): Heat is released along with formation of slaked lime.',
          marks: 1,
          options: [
            'Both (A) and (R) are true and (R) is correct explanation of (A)',
            'Both (A) and (R) are true but (R) is NOT correct explanation of (A)',
            '(A) is true but (R) is false',
            '(A) is false but (R) is true',
          ],
          answerKey: '(A) Both (A) and (R) are true and (R) is correct explanation of (A)',
          solutionSteps: ['Evolution of heat defines an exothermic reaction.'],
          markingScheme: '1 mark.',
        },
        {
          id: 'demo_q20',
          questionNumber: 20,
          type: 'assertion_reason',
          sectionName: 'Section A',
          questionText: 'Assertion (A): Chips manufacturers flush bags of chips with nitrogen gas.\nReason (R): Nitrogen prevents oxidation and rancidity of oils.',
          marks: 1,
          options: [
            'Both (A) and (R) are true and (R) is correct explanation of (A)',
            'Both (A) and (R) are true but (R) is NOT correct explanation of (A)',
            '(A) is true but (R) is false',
            '(A) is false but (R) is true',
          ],
          answerKey: '(A) Both (A) and (R) are true and (R) is correct explanation of (A)',
          solutionSteps: ['Nitrogen creates an unreactive atmosphere preventing food degradation.'],
          markingScheme: '1 mark.',
        },
      ],
    },
    {
      name: 'Section B',
      title: 'Very Short Answer Questions',
      instructions: 'Answer in 30-50 words each.',
      totalMarks: 12,
      questions: [
        {
          id: 'demo_q21',
          questionNumber: 21,
          type: 'very_short',
          sectionName: 'Section B',
          questionText: 'Why should a magnesium ribbon be cleaned with sandpaper before burning in air?',
          marks: 2,
          answerKey: 'To remove the protective layer of basic magnesium carbonate/oxide formed due to moist air, allowing clean combustion.',
          solutionSteps: [
            'Step 1: Mention basic magnesium carbonate/oxide coating. (1 mark)',
            'Step 2: Explain it hinders combustion and needs removal. (1 mark)',
          ],
          markingScheme: '1 + 1 = 2 marks.',
        },
        {
          id: 'demo_q22',
          questionNumber: 22,
          type: 'very_short',
          sectionName: 'Section B',
          questionText: 'Write a balanced chemical equation with state symbols for the reaction between iron and steam.',
          marks: 2,
          answerKey: '3Fe(s) + 4H2O(g) -> Fe3O4(s) + 4H2(g)',
          solutionSteps: [
            'Correct formula and balancing: 3Fe + 4H2O -> Fe3O4 + 4H2. (1.5 marks)',
            'Correct state symbols (s, g). (0.5 mark)',
          ],
          markingScheme: '2 marks total.',
        },
        {
          id: 'demo_q23',
          questionNumber: 23,
          type: 'very_short',
          sectionName: 'Section B',
          questionText: 'Define Rancidity. State two methods commonly used to prevent it.',
          marks: 2,
          answerKey: 'Rancidity is the slow aerial oxidation of fats and oils leading to unpleasant smell and taste.\nPrevention: (i) Adding antioxidants like BHA/BHT, (ii) Flushing with nitrogen gas.',
          solutionSteps: [
            'Definition: 1 mark.',
            'Two prevention methods: 0.5 + 0.5 = 1 mark.',
          ],
          markingScheme: '1 + 1 = 2 marks.',
        },
        {
          id: 'demo_q24',
          questionNumber: 24,
          type: 'very_short',
          sectionName: 'Section B',
          questionText: 'What happens when silver chloride is exposed to sunlight? Write the balanced chemical reaction.',
          marks: 2,
          answerKey: 'White silver chloride turns grey due to photolytic decomposition into silver metal and chlorine gas.\n2AgCl(s) -Sunlight-> 2Ag(s) + Cl2(g)',
          solutionSteps: [
            'Observation: turns grey due to silver formation (1 mark).',
            'Balanced chemical equation: 2AgCl -> 2Ag + Cl2 (1 mark).',
          ],
          markingScheme: '1 + 1 = 2 marks.',
        },
        {
          id: 'demo_q25',
          questionNumber: 25,
          type: 'very_short',
          sectionName: 'Section B',
          questionText: 'Why is respiration considered an exothermic reaction? Explain briefly.',
          marks: 2,
          answerKey: 'During respiration, glucose obtained from food combines with oxygen in the cells of our body and breaks down into carbon dioxide and water, with release of energy in the form of ATP. C6H12O6 + 6O2 -> 6CO2 + 6H2O + Energy.',
          solutionSteps: [
            'Explanation of breakdown releasing heat/energy: 1 mark.',
            'Overall equation or mention of ATP release: 1 mark.',
          ],
          markingScheme: '1 + 1 = 2 marks.',
        },
        {
          id: 'demo_q26',
          questionNumber: 26,
          type: 'very_short',
          sectionName: 'Section B',
          questionText: 'Identify the oxidised substance and reduced substance in the reaction: MnO2 + 4HCl -> MnCl2 + 2H2O + Cl2.',
          marks: 2,
          answerKey: 'Substance oxidised: HCl (loses hydrogen to form Cl2).\nSubstance reduced: MnO2 (loses oxygen to form MnCl2).',
          solutionSteps: [
            'Identifying HCl as oxidised: 1 mark.',
            'Identifying MnO2 as reduced: 1 mark.',
          ],
          markingScheme: '1 + 1 = 2 marks.',
        },
      ],
    },
    {
      name: 'Section C',
      title: 'Short Answer Questions',
      instructions: 'Answer in 50-80 words each.',
      totalMarks: 21,
      questions: [
        {
          id: 'demo_q27',
          questionNumber: 27,
          type: 'short_answer',
          sectionName: 'Section C',
          questionText: 'Explain the term "Double Displacement Reaction" with two distinct examples, writing their balanced chemical equations.',
          marks: 3,
          answerKey: 'Reactions in which there is an exchange of ions between the reactants to form new compounds.\nExample 1: Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq)\nExample 2: Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)',
          solutionSteps: [
            'Definition: 1 mark.',
            'First balanced reaction with precipitate name: 1 mark.',
            'Second balanced reaction: 1 mark.',
          ],
          markingScheme: '1 + 1 + 1 = 3 marks.',
        },
        {
          id: 'demo_q28',
          questionNumber: 28,
          type: 'short_answer',
          sectionName: 'Section C',
          questionText: 'A copper wire is placed in silver nitrate solution. Describe your observations, state the type of chemical reaction, and provide the balanced chemical equation.',
          marks: 3,
          answerKey: 'Observations: Solution gradually turns blue due to Cu2+ ions; shiny greyish crystals of silver deposit on the copper wire.\nType: Single Displacement reaction.\nEquation: Cu(s) + 2AgNO3(aq) -> Cu(NO3)2(aq) + 2Ag(s)',
          solutionSteps: [
            'Observations (blue solution + silver deposit): 1 mark.',
            'Type of reaction: 1 mark.',
            'Balanced equation: 1 mark.',
          ],
          markingScheme: '3 marks.',
        },
        {
          id: 'demo_q29',
          questionNumber: 29,
          type: 'short_answer',
          sectionName: 'Section C',
          questionText: 'What is corrosion? Name two environmental factors necessary for rusting of iron. How does galvanisation prevent rusting?',
          marks: 3,
          answerKey: 'Corrosion is the gradual destruction of metals by chemical or electrochemical reaction with environmental gases.\nFactors for rusting: (i) Oxygen/air, (ii) Moisture/water.\nGalvanisation coats iron with zinc; even if the zinc layer is scratched, zinc corrodes preferentially because it is more reactive than iron.',
          solutionSteps: [
            'Definition of corrosion: 1 mark.',
            'Factors (moisture and air): 1 mark.',
            'Explanation of galvanisation and sacrificial protection: 1 mark.',
          ],
          markingScheme: '1 + 1 + 1 = 3 marks.',
        },
        {
          id: 'demo_q30',
          questionNumber: 30,
          type: 'short_answer',
          sectionName: 'Section C',
          questionText: 'Distinguish between exothermic and endothermic reactions. Give one balanced chemical equation for each.',
          marks: 3,
          answerKey: 'Exothermic reactions release thermal energy to the surroundings (temperature rises).\nExample: CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g) + Heat.\nEndothermic reactions absorb thermal energy from surroundings (temperature drops).\nExample: 2Pb(NO3)2(s) -Heat-> 2PbO(s) + 4NO2(g) + O2(g).',
          solutionSteps: [
            'Clear distinction with thermal exchange: 1 mark.',
            'Exothermic balanced equation: 1 mark.',
            'Endothermic balanced equation: 1 mark.',
          ],
          markingScheme: '3 marks.',
        },
        {
          id: 'demo_q31',
          questionNumber: 31,
          type: 'short_answer',
          sectionName: 'Section C',
          questionText: 'Translate the following statements into balanced chemical equations:\n(a) Hydrogen sulphide gas burns in air to give water and sulphur dioxide.\n(b) Barium chloride reacts with aluminium sulphate to give aluminium chloride and a precipitate of barium sulphate.',
          marks: 3,
          answerKey: '(a) 2H2S(g) + 3O2(g) -> 2H2O(l) + 2SO2(g)\n(b) 3BaCl2(aq) + Al2(SO4)3(aq) -> 3BaSO4(s) + 2AlCl3(aq)',
          solutionSteps: [
            'Part (a) balanced equation: 1.5 marks.',
            'Part (b) balanced equation: 1.5 marks.',
          ],
          markingScheme: '1.5 + 1.5 = 3 marks.',
        },
        {
          id: 'demo_q32',
          questionNumber: 32,
          type: 'short_answer',
          sectionName: 'Section C',
          questionText: 'Explain the role of catalyst in a chemical reaction. Why are decomposition reactions called the opposite of combination reactions? Explain with equations.',
          marks: 3,
          answerKey: 'A catalyst alters the speed of a chemical reaction without undergoing any permanent chemical change.\nIn combination reactions, two or more substances combine to form a single substance (e.g. 2H2 + O2 -> 2H2O).\nIn decomposition, a single compound breaks down into two or more simpler substances (e.g. 2H2O -> 2H2 + O2). Hence they are opposite.',
          solutionSteps: [
            'Role of catalyst: 1 mark.',
            'Comparison explanation: 1 mark.',
            'Equations demonstrating opposite nature: 1 mark.',
          ],
          markingScheme: '3 marks.',
        },
        {
          id: 'demo_q33',
          questionNumber: 33,
          type: 'short_answer',
          sectionName: 'Section C',
          questionText: 'When iron nails are immersed in copper sulphate solution for 20 minutes, what changes in colour of solution and nail do you observe? Explain the chemical reason.',
          marks: 3,
          answerKey: 'Observations:\n1. Blue colour of copper sulphate solution fades and changes to light green due to formation of ferrous sulphate (FeSO4).\n2. A reddish-brown coating of copper metal is deposited on the iron nails.\nReason: Iron is more reactive than copper, displacing copper from copper sulphate solution: Fe(s) + CuSO4(aq) -> FeSO4(aq) + Cu(s).',
          solutionSteps: [
            'Colour change of solution: 1 mark.',
            'Reddish-brown coating on nail: 1 mark.',
            'Displacement reaction equation and reactivity reason: 1 mark.',
          ],
          markingScheme: '3 marks.',
        },
      ],
    },
    {
      name: 'Section D',
      title: 'Long Answer Questions',
      instructions: 'Answer in 80-120 words each. Internal choices are provided.',
      totalMarks: 15,
      questions: [
        {
          id: 'demo_q34',
          questionNumber: 34,
          type: 'long_answer',
          sectionName: 'Section D',
          questionText: 'Explain the three types of decomposition reactions: thermal decomposition, electrolytic decomposition, and photolytic decomposition. Write a balanced chemical equation with conditions for each.',
          marks: 5,
          internalChoice: {
            questionText: 'What is a Redox Reaction? In the following reactions, identify: (i) substance oxidised, (ii) substance reduced, (iii) oxidising agent, and (iv) reducing agent:\n(a) ZnO + C -> Zn + CO\n(b) 4NH3 + 5O2 -> 4NO + 6H2O',
            answerKey: 'Redox reaction is one where reduction and oxidation take place simultaneously.\n(a) ZnO + C -> Zn + CO: C oxidised, ZnO reduced. ZnO is oxidising agent, C is reducing agent.\n(b) 4NH3 + 5O2 -> 4NO + 6H2O: NH3 oxidised to NO, O2 reduced to H2O. O2 is oxidising agent, NH3 is reducing agent.',
            solution: '1 mark for definition. 2 marks for part (a) analysis. 2 marks for part (b) analysis.',
          },
          answerKey: '1. Thermal Decomposition: Decomposition by heat. 2FeSO4(s) -Heat-> Fe2O3(s) + SO2(g) + SO3(g).\n2. Electrolytic Decomposition: Decomposition by passing electricity. 2H2O(l) -Electricity-> 2H2(g) + O2(g).\n3. Photolytic Decomposition: Decomposition in presence of light. 2AgBr(s) -Sunlight-> 2Ag(s) + Br2(g).',
          solutionSteps: [
            'Thermal decomposition explanation and equation: 1.5 marks.',
            'Electrolytic decomposition explanation and equation: 1.5 marks.',
            'Photolytic decomposition explanation and equation: 2 marks.',
          ],
          markingScheme: '5 marks total.',
        },
        {
          id: 'demo_q35',
          questionNumber: 35,
          type: 'long_answer',
          sectionName: 'Section D',
          questionText: 'A chemical compound X is used in whitewashing walls. When compound X reacts with water, it produces compound Y along with liberation of heat.\n(a) Identify X and Y and write their chemical formulas.\n(b) Write the chemical equation for the reaction of X with water.\n(c) What happens when gas Z is bubbled through an aqueous solution of Y? Write the chemical equation.\n(d) Why does a whitewashed wall start shining after 2 to 3 days?',
          marks: 5,
          answerKey: '(a) X is Calcium Oxide (CaO, quicklime). Y is Calcium Hydroxide (Ca(OH)2, slaked lime).\n(b) CaO(s) + H2O(l) -> Ca(OH)2(aq) + Heat\n(c) Gas Z is Carbon dioxide (CO2). Ca(OH)2(aq) + CO2(g) -> CaCO3(s) [milky precipitate] + H2O(l).\n(d) Calcium hydroxide slowly reacts with atmospheric CO2 to form a thin, hard, shiny layer of Calcium Carbonate (CaCO3).',
          solutionSteps: [
            '(a) Identifying X and Y: 1 mark.',
            '(b) Reaction equation: 1 mark.',
            '(c) CO2 reaction and milkiness equation: 1.5 marks.',
            '(d) Explanation of calcium carbonate film: 1.5 marks.',
          ],
          markingScheme: '1 + 1 + 1.5 + 1.5 = 5 marks.',
        },
        {
          id: 'demo_q36',
          questionNumber: 36,
          type: 'long_answer',
          sectionName: 'Section D',
          questionText: '(a) What is corrosion? How does rusting of iron differ from tarnishing of silver and green patina on copper?\n(b) Suggest four practical methods to prevent the corrosion of metals in everyday appliances and machinery.',
          marks: 5,
          answerKey: '(a) Rusting of iron forms reddish brown Fe2O3.xH2O which is flaky and exposes underlying metal.\nTarnishing of silver forms black Ag2S from H2S in air.\nCopper acquires green basic copper carbonate [CuCO3.Cu(OH)2] coating from moist CO2.\n(b) Four prevention methods: (1) Painting/Oiling/Greasing, (2) Galvanisation (zinc coating), (3) Chrome plating/Electroplating, (4) Alloying (e.g. Stainless steel).',
          solutionSteps: [
            'Comparing Iron, Silver, and Copper corrosion products: 3 marks.',
            'Four prevention methods with scientific names: 2 marks.',
          ],
          markingScheme: '3 + 2 = 5 marks.',
        },
      ],
    },
    {
      name: 'Section E',
      title: 'Case-Based / Competency-Based Assessment',
      instructions: 'Read the following passages and answer the questions that follow. (4 marks each)',
      totalMarks: 12,
      questions: [
        {
          id: 'demo_q37',
          questionNumber: 37,
          type: 'case_based',
          sectionName: 'Section E',
          questionText: 'CASE STUDY 1: Activity on Burning Magnesium Ribbon\nA student took a 3 cm long clean magnesium ribbon and burned it in air using a spirit lamp while holding it with tongs. The dazzling white flame was observed and the ash formed was collected in a watch glass. The ash was dissolved in water and tested with red and blue litmus paper.\n\nSub-questions:\n(i) Name the white ash formed and write the balanced chemical equation. (1 Mark)\n(ii) What change was observed with red and blue litmus paper? What does it indicate about the nature of the ash? (1 Mark)\n(iii) Why is burning of magnesium classified as an exothermic combination reaction? (2 Marks)',
          marks: 4,
          answerKey: '(i) White ash is Magnesium Oxide (MgO). 2Mg + O2 -> 2MgO.\n(ii) Red litmus turns blue, blue litmus remains blue. Indicates basic oxide (MgO + H2O -> Mg(OH)2).\n(iii) Magnesium combines with oxygen to produce single product MgO, releasing substantial light and heat energy.',
          solutionSteps: [
            'Sub-part (i): 1 mark.',
            'Sub-part (ii): 1 mark.',
            'Sub-part (iii): 2 marks.',
          ],
          markingScheme: '1 + 1 + 2 = 4 marks.',
        },
        {
          id: 'demo_q38',
          questionNumber: 38,
          type: 'case_based',
          sectionName: 'Section E',
          questionText: 'CASE STUDY 2: Electrolysis of Water\nIn an experiment, acidulated water was placed in a plastic beaker fitted with carbon electrodes connected to a 6V battery. Two test tubes filled with water were inverted over the electrodes. Bubbles formed at both electrodes and displaced water.\n\nSub-questions:\n(i) Name the gases collected at cathode and anode. (1 Mark)\n(ii) Why is the volume of gas collected at one electrode double that of the other? (1 Mark)\n(iii) How will you test the presence of these two gases in the laboratory? (2 Marks)',
          marks: 4,
          answerKey: '(i) Cathode: Hydrogen gas (H2). Anode: Oxygen gas (O2).\n(ii) Water formula is H2O; decomposition yields 2 moles of H2 for every 1 mole of O2 (2:1 volume ratio).\n(iii) Bring a burning splinter near gas mouth: Hydrogen burns with a pop sound; Oxygen rekindles a glowing splinter.',
          solutionSteps: [
            'Sub-part (i): 1 mark.',
            'Sub-part (ii): 1 mark.',
            'Sub-part (iii): 2 marks.',
          ],
          markingScheme: '1 + 1 + 2 = 4 marks.',
        },
        {
          id: 'demo_q39',
          questionNumber: 39,
          type: 'case_based',
          sectionName: 'Section E',
          questionText: 'CASE STUDY 3: Food Preservation & Antioxidants\nRohan went on a camping trip for a week. He noticed that potato chips kept in an airtight foil packet remained fresh and crispy, while fried snacks packed in an open plastic box became stale, rancid, and tasted foul within two days.\n\nSub-questions:\n(i) Which chemical phenomenon made the open fried snacks foul-smelling? (1 Mark)\n(ii) Why were the potato chips in the foil packet still fresh? Name the gas used. (1 Mark)\n(iii) State two chemical antioxidants added to oily food items in food industries. (2 Marks)',
          marks: 4,
          answerKey: '(i) Rancidity (aerobic oxidation of unsaturated fats and oils).\n(ii) Packet was vacuum flushed with Nitrogen (N2) gas which is chemically unreactive and cuts off oxygen contact.\n(iii) BHA (Butylated Hydroxyanisole) and BHT (Butylated Hydroxytoluene) or Vitamin E / Ascorbic acid.',
          solutionSteps: [
            'Sub-part (i): 1 mark.',
            'Sub-part (ii): 1 mark.',
            'Sub-part (iii): 2 marks.',
          ],
          markingScheme: '1 + 1 + 2 = 4 marks.',
        },
      ],
    },
  ],
};
