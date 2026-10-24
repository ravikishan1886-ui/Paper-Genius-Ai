package com.papergenius.ai.model

import java.util.UUID

object SampleData {
    val samplePaper: GeneratedPaper by lazy {
        GeneratedPaper(
            id = "sample-cbse-10-science",
            title = "Class X Science Pre-Board Examination 2025",
            schoolName = "Delhi Public Senior Secondary School",
            board = EducationBoard.CBSE,
            className = "Class 10",
            subject = "Science",
            examType = ExamType.PRE_BOARD,
            totalMarks = 80,
            duration = "3 Hours",
            generalInstructions = listOf(
                "This question paper consists of 39 questions in 5 sections.",
                "All questions are compulsory. However, an internal choice is provided in some questions.",
                "Section A consists of 20 objective type questions carrying 1 mark each.",
                "Section B consists of 6 Very Short questions carrying 02 marks each. Answers should be in the range of 30 to 50 words.",
                "Section C consists of 7 Short Answer type questions carrying 03 marks each. Answers should be in the range of 50 to 80 words.",
                "Section D consists of 3 Long Answer type questions carrying 05 marks each. Answers should be in the range of 80 to 120 words.",
                "Section E consists of 3 source-based/case-based units of assessment of 04 marks each with sub-parts."
            ),
            sections = listOf(
                PaperSection(
                    id = "sec-a",
                    name = "Section A",
                    instructions = "Multiple Choice Questions & Assertion-Reasoning (1 Mark each)",
                    marksPerQuestion = 1,
                    totalMarks = 20,
                    questions = listOf(
                        QuestionItem(
                            id = "q1",
                            number = 1,
                            type = QuestionType.MCQ,
                            text = "Which of the following reaction is an example of an endothermic reaction?",
                            marks = 1,
                            options = listOf(
                                "Burning of natural gas",
                                "Respiration",
                                "Decomposition of calcium carbonate to form quicklime and carbon dioxide",
                                "Reaction of quicklime with water"
                            ),
                            correctAnswer = "Decomposition of calcium carbonate to form quicklime and carbon dioxide",
                            explanation = "Decomposition of CaCO3 requires absorption of heat energy, hence it is endothermic.",
                            chapter = "Chemical Reactions and Equations"
                        ),
                        QuestionItem(
                            id = "q2",
                            number = 2,
                            type = QuestionType.MCQ,
                            text = "An aqueous solution turns red litmus solution blue. Excess addition of which of the following solution would reverse the change?",
                            marks = 1,
                            options = listOf(
                                "Baking powder",
                                "Lime",
                                "Ammonium hydroxide solution",
                                "Hydrochloric acid"
                            ),
                            correctAnswer = "Hydrochloric acid",
                            explanation = "The original solution is basic. Adding excess acid (HCl) neutralizes it and turns blue litmus red.",
                            chapter = "Acids, Bases and Salts"
                        ),
                        QuestionItem(
                            id = "q3",
                            number = 3,
                            type = QuestionType.MCQ,
                            text = "A student determines the focal length of a concave mirror by focusing the image of a distant tree on a screen. Which is the correct position of the screen?",
                            marks = 1,
                            options = listOf(
                                "At the centre of curvature",
                                "Between focus and centre of curvature",
                                "At the principal focus",
                                "Beyond the centre of curvature"
                            ),
                            correctAnswer = "At the principal focus",
                            explanation = "Light rays from an object at infinity (distant tree) converge at the principal focus of the concave mirror.",
                            chapter = "Light: Reflection and Refraction"
                        ),
                        QuestionItem(
                            id = "q4",
                            number = 4,
                            type = QuestionType.ASSERTION_REASON,
                            text = "Assertion (A): Human beings have a double circulatory system.\nReason (R): Blood flows through the heart twice during each complete cycle.",
                            marks = 1,
                            options = listOf(
                                "Both A and R are true and R is the correct explanation of A.",
                                "Both A and R are true but R is not the correct explanation of A.",
                                "A is true but R is false.",
                                "A is false but R is true."
                            ),
                            correctAnswer = "Both A and R are true and R is the correct explanation of A.",
                            explanation = "In humans, pulmonary and systemic circuits cause blood to pass through the heart twice per cycle, known as double circulation.",
                            chapter = "Life Processes"
                        )
                    )
                ),
                PaperSection(
                    id = "sec-b",
                    name = "Section B",
                    instructions = "Very Short Answer Questions (2 Marks each)",
                    marksPerQuestion = 2,
                    totalMarks = 12,
                    questions = listOf(
                        QuestionItem(
                            id = "q5",
                            number = 5,
                            type = QuestionType.VSA,
                            text = "State Ohm's Law. Write the mathematical formula expressing the relationship between potential difference and current.",
                            marks = 2,
                            correctAnswer = "Ohm's law states that the current flowing through a conductor is directly proportional to the potential difference across its ends, provided temperature remains constant. V = IR.",
                            explanation = "V = I * R where R is the resistance in ohms.",
                            chapter = "Electricity"
                        ),
                        QuestionItem(
                            id = "q6",
                            number = 6,
                            type = QuestionType.VSA,
                            text = "Why do copper and aluminium wires generally used for electrical transmission lines?",
                            marks = 2,
                            hasInternalChoice = true,
                            orQuestion = "Why is tungsten used almost exclusively for filament of incandescent electric lamps?",
                            correctAnswer = "Copper and aluminium have very low electrical resistivity and high ductility, minimizing Joule heating power losses.",
                            explanation = "Low resistivity prevents voltage drop across transmission distances.",
                            chapter = "Electricity"
                        )
                    )
                ),
                PaperSection(
                    id = "sec-c",
                    name = "Section C",
                    instructions = "Short Answer Questions (3 Marks each)",
                    marksPerQuestion = 3,
                    totalMarks = 21,
                    questions = listOf(
                        QuestionItem(
                            id = "q7",
                            number = 7,
                            type = QuestionType.SHORT,
                            text = "Describe how bile juice plays a critical role in digestion of fats in the human small intestine.",
                            marks = 3,
                            correctAnswer = "1. Bile salts emulsify large fat globules into tiny micelles, drastically increasing surface area for lipase activity. 2. Bile provides an alkaline pH essential for pancreatic enzymes.",
                            explanation = "Emulsification and neutralization are the two primary functions of bile.",
                            chapter = "Life Processes"
                        ),
                        QuestionItem(
                            id = "q8",
                            number = 8,
                            type = QuestionType.NUMERICAL,
                            text = "An object 4.0 cm in size is placed 25.0 cm in front of a concave mirror of focal length 15.0 cm. Find the position, nature, and size of the image formed.",
                            marks = 3,
                            correctAnswer = "Image distance v = -37.5 cm (in front of mirror). Nature: Real and inverted. Height of image h' = -6.0 cm (magnified).",
                            explanation = "Using mirror formula 1/f = 1/v + 1/u with sign convention u = -25 cm, f = -15 cm. 1/v = -1/15 - (-1/25) = -2/75 => v = -37.5 cm. m = -v/u = -( -37.5 / -25) = -1.5. h' = -1.5 * 4 = -6 cm.",
                            chapter = "Light: Reflection and Refraction"
                        )
                    )
                ),
                PaperSection(
                    id = "sec-d",
                    name = "Section D",
                    instructions = "Long Answer Questions (5 Marks each)",
                    marksPerQuestion = 5,
                    totalMarks = 15,
                    questions = listOf(
                        QuestionItem(
                            id = "q9",
                            number = 9,
                            type = QuestionType.LONG,
                            text = "(a) Explain the formation of covalent bonds in methane (CH4) and ethene (C2H4) using electron dot structures.\n(b) Why do covalent compounds generally have low melting and boiling points compared to ionic compounds?",
                            marks = 5,
                            hasInternalChoice = true,
                            orQuestion = "(a) What is homologous series? Give any two characteristics.\n(b) Write the chemical equation for the esterification reaction between ethanoic acid and ethanol in presence of conc. H2SO4.",
                            correctAnswer = "(a) Carbon shares 4 valence electrons with 4 hydrogen atoms in methane. In ethene, carbon shares a double bond with another carbon and two single bonds with hydrogens.\n(b) Covalent compounds have weak intermolecular forces (Van der Waals forces), needing small thermal energy to overcome.",
                            explanation = "Electron sharing vs electrostatic lattice difference.",
                            chapter = "Carbon and its Compounds"
                        )
                    )
                ),
                PaperSection(
                    id = "sec-e",
                    name = "Section E",
                    instructions = "Case-Based / Source-Based Integrated Questions (4 Marks each)",
                    marksPerQuestion = 4,
                    totalMarks = 12,
                    questions = listOf(
                        QuestionItem(
                            id = "q10",
                            number = 10,
                            type = QuestionType.CASE_BASED,
                            text = "Read the passage carefully and answer the questions that follow:\n\nMendel worked on the inheritance of traits in garden pea (Pisum sativum). In a monohybrid cross between pure tall (TT) and pure dwarf (tt) pea plants, all plants in the F1 generation were tall. When F1 plants were self-pollinated, both tall and dwarf plants were obtained in the F2 generation.\n\n(i) What was the phenotypic ratio of tall to dwarf plants in F2 generation? (1 Mark)\n(ii) State the law of segregation deduced by Mendel. (1 Mark)\n(iii) What would be the expected genotype ratio if an F1 plant is test-crossed with a pure recessive dwarf plant? Show the Punnett square. (2 Marks)",
                            marks = 4,
                            correctAnswer = "(i) Phenotypic ratio is 3:1 (Tall : Dwarf).\n(ii) Alleles segregate during gamete formation so each gamete carries only one allele for each gene.\n(iii) Tt x tt yields 50% Tall (Tt) and 50% Dwarf (tt), genotype ratio 1:1.",
                            explanation = "Standard Mendelian monohybrid genetics.",
                            chapter = "Heredity and Evolution"
                        )
                    )
                )
            ),
            uploadedPagesCount = 3,
            analyzedTopics = listOf(
                "Chemical Reactions & Energy changes",
                "Acids, Bases & Litmus indicators",
                "Concave mirror optics & ray tracing",
                "Human circulatory system & heart chambers",
                "Ohm's Law & electrical resistivity",
                "Bile juice emulsification",
                "Mirror formula calculations",
                "Carbon covalent bonding & esterification",
                "Mendelian monohybrid inheritance & Punnett squares"
            ),
            createdAt = System.currentTimeMillis() - 3600000L
        )
    }

    val sampleTextbookPages: List<UploadedPagePhoto> = listOf(
        UploadedPagePhoto(
            id = "demo-page-1",
            fileName = "Chapter1_Chemical_Reactions_p14.jpg",
            fileSizeBytes = 420500,
            analysisSummary = "Topic: Types of chemical reactions, endothermic and exothermic processes, calcium carbonate thermal decomposition.",
            detectedKeywords = listOf("Decomposition", "Endothermic", "Exothermic", "CaCO3", "Quicklime")
        ),
        UploadedPagePhoto(
            id = "demo-page-2",
            fileName = "Chapter10_Light_Optics_p162.jpg",
            fileSizeBytes = 512300,
            analysisSummary = "Topic: Reflection by spherical mirrors, principal focus, focal length, image formation and sign conventions.",
            detectedKeywords = listOf("Concave Mirror", "Focal Length", "Principal Focus", "Real Image", "Magnification")
        ),
        UploadedPagePhoto(
            id = "demo-page-3",
            fileName = "Chapter12_Electricity_p208.jpg",
            fileSizeBytes = 389100,
            analysisSummary = "Topic: Ohm's law, resistance, resistivity of conductors, series and parallel circuits.",
            detectedKeywords = listOf("Ohm's Law", "Potential Difference", "Current", "Resistivity", "V=IR")
        )
    )
}
