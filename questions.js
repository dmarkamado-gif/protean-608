window.QUIZ_QUESTIONS = [
  // ===== CORE =====
  {
    section: "Core",
    stem: "Which federal law governs the use of refrigerants in stationary HVAC/R equipment in the United States?",
    choices: [
      "The Occupational Safety and Health Act",
      "Section 608 of the Clean Air Act",
      "The Montreal Protocol",
      "Section 609 of the Clean Air Act"
    ],
    answer: 1,
    explanation: "Section 608 of the Clean Air Act regulates stationary refrigerant equipment. Section 609 covers motor-vehicle A/C. The Montreal Protocol is an international treaty, not U.S. law."
  },
  {
    section: "Core",
    stem: "Which of the following is defined by the EPA as 'reclaiming' refrigerant?",
    choices: [
      "Removing refrigerant from a system and storing it in a container",
      "Cleaning refrigerant on-site with a filter-drier and oil separator",
      "Reprocessing refrigerant to meet AHRI Standard 700 new-product specification",
      "Topping off a system after a leak has been repaired"
    ],
    answer: 2,
    explanation: "Reclaiming is the off-site reprocessing of refrigerant to AHRI Standard 700 purity — only reclaimed refrigerant may be resold. Recovery is simple removal; recycling is on-site cleaning."
  },
  {
    section: "Core",
    stem: "Which refrigerant class has zero ozone depletion potential (ODP) but can have a high global warming potential (GWP)?",
    choices: ["CFCs", "HCFCs", "HFCs", "Halons"],
    answer: 2,
    explanation: "HFCs (hydrofluorocarbons) contain no chlorine, so their ODP is zero. However, many HFCs have a high GWP, which is why the AIM Act is phasing them down."
  },
  {
    section: "Core",
    stem: "When may a refrigerant cylinder be filled by weight?",
    choices: [
      "Up to 100% of water capacity",
      "Up to 80% of water capacity",
      "Up to 50% of water capacity",
      "There is no limit for approved cylinders"
    ],
    answer: 1,
    explanation: "Refrigerant recovery cylinders must never be filled above 80% of their water capacity — liquid refrigerant expands with temperature, and over-filling risks rupture."
  },
  {
    section: "Core",
    stem: "Disposable refrigerant cylinders may be:",
    choices: [
      "Refilled once, as long as the valve is still intact",
      "Refilled by EPA-certified technicians only",
      "Refilled only with the original refrigerant",
      "Never refilled — it is a DOT violation"
    ],
    answer: 3,
    explanation: "Refilling a disposable (non-refillable) cylinder is a Department of Transportation violation. They must be depressurized, rendered useless, and recycled as scrap."
  },
  {
    section: "Core",
    stem: "Which of the following is NOT considered a de minimis release and is therefore illegal?",
    choices: [
      "Small amount of refrigerant released when purging a hose",
      "Refrigerant released while evacuating hoses into the recovery unit",
      "Knowingly venting refrigerant before scrapping an appliance to avoid recovery costs",
      "Minor losses associated with good-faith recovery practices"
    ],
    answer: 2,
    explanation: "Knowingly venting to avoid recovery is illegal under the venting prohibition and carries fines up to $37,500/day. De minimis applies only to small unavoidable releases during good-faith servicing."
  },
  {
    section: "Core",
    stem: "What color code identifies an EPA-approved recovery cylinder?",
    choices: [
      "All white",
      "Gray body with yellow top",
      "Light blue (R-134a color)",
      "Green with white top"
    ],
    answer: 1,
    explanation: "EPA-approved recovery cylinders are gray with a yellow shoulder (top). Virgin refrigerants have their own container colors (e.g., R-22 light green, R-410A rose), but recovery cylinders are universal gray/yellow."
  },
  {
    section: "Core",
    stem: "How often must DOT recovery cylinders be hydrostatically tested?",
    choices: [
      "Every year",
      "Every 3 years",
      "Every 5 years",
      "Only once, before first use"
    ],
    answer: 2,
    explanation: "DOT 4BA and 4BW refillable recovery cylinders require hydrostatic retesting every 5 years. The test date is stamped on the cylinder."
  },
  {
    section: "Core",
    stem: "Refrigerant released near an open flame can decompose into which of the following?",
    choices: [
      "Carbon monoxide only",
      "Phosgene, hydrofluoric acid, and hydrochloric acid",
      "Only water vapor and CO₂",
      "Ammonia and sulfur dioxide"
    ],
    answer: 1,
    explanation: "At high temperatures (flames, glowing metal, combustion), halogenated refrigerants decompose into highly toxic phosgene and acid gases. Never braze on a system with refrigerant present."
  },
  {
    section: "Core",
    stem: "Which gas is appropriate to use with a trace of refrigerant when pressure-testing for leaks?",
    choices: ["Oxygen", "Compressed air", "Dry nitrogen", "Carbon dioxide under pressure"],
    answer: 2,
    explanation: "Only dry nitrogen is safe for pressurizing a refrigeration system. Oxygen can react explosively with compressor oil. Compressed air contains moisture and can also reach explosive conditions."
  },
  {
    section: "Core",
    stem: "What is the primary purpose of a filter-drier?",
    choices: [
      "To filter airborne dust from the evaporator",
      "To remove moisture and particulates from the refrigerant circuit",
      "To lower the superheat of the suction line",
      "To recover refrigerant during service"
    ],
    answer: 1,
    explanation: "Filter-driers trap moisture and particulates in the liquid or suction line. Moisture in a system forms acids, corrodes metals, and can freeze at the metering device."
  },
  {
    section: "Core",
    stem: "If a refrigerant is to be RESOLD to a new owner, it must first be:",
    choices: [
      "Recovered by a certified technician",
      "Recycled on-site",
      "Reclaimed to AHRI 700 standard",
      "Filtered through a suction filter"
    ],
    answer: 2,
    explanation: "Only reclaimed refrigerant, which has been processed off-site to AHRI Standard 700 purity, may be resold. On-site recycled refrigerant can be returned only to the same owner's equipment."
  },
  {
    section: "Core",
    stem: "Who may legally purchase a 30-lb cylinder of R-410A?",
    choices: [
      "Any homeowner for DIY repairs",
      "Anyone, as long as the purchase is recorded",
      "EPA Section 608-certified technicians only (with appropriate type)",
      "Only technicians with MVAC Section 609 certification"
    ],
    answer: 2,
    explanation: "Under the sales restriction, regulated refrigerant in bulk containers may only be sold to EPA-certified technicians holding the appropriate Section 608 certification."
  },
  {
    section: "Core",
    stem: "The first step before starting any refrigerant recovery is:",
    choices: [
      "Top off the recovery cylinder to 80%",
      "Verify the recovery cylinder is rated for the refrigerant and is not overfilled",
      "Pressurize the system with nitrogen",
      "Remove the filter-drier"
    ],
    answer: 1,
    explanation: "Always confirm the recovery cylinder is the correct type (DOT-approved for that refrigerant), is within its test date, and is not already overfilled. An overfilled cylinder under heat can rupture."
  },
  {
    section: "Core",
    stem: "The Montreal Protocol primarily targets:",
    choices: [
      "Greenhouse gas emissions from vehicles",
      "Ozone-depleting substances",
      "Air-quality standards in urban areas",
      "Energy-efficiency labeling of appliances"
    ],
    answer: 1,
    explanation: "The Montreal Protocol (1987) is the international treaty that phases out ozone-depleting substances — CFCs, HCFCs, and halons. The AIM Act and Kigali Amendment deal with HFCs/GWP."
  },
  {
    section: "Core",
    stem: "A 'hermetic' compressor means:",
    choices: [
      "The compressor is water-cooled",
      "The motor and compressor are sealed together in a welded housing",
      "The compressor can be serviced without refrigerant recovery",
      "The compressor is air-cooled but not factory-sealed"
    ],
    answer: 1,
    explanation: "Hermetic compressors have the motor and compressor welded into a single sealed shell — you cannot access the internals. Semi-hermetic compressors are bolted and can be opened for service."
  },

  // ===== TYPE I =====
  {
    section: "Type I",
    stem: "A Type I certification covers small appliances containing how much refrigerant or less?",
    choices: ["1 lb", "2 lbs", "5 lbs", "10 lbs"],
    answer: 2,
    explanation: "Type I applies to hermetically sealed, factory-charged appliances with 5 lb or less of refrigerant — household refrigerators, window A/C, water coolers, dehumidifiers, etc."
  },
  {
    section: "Type I",
    stem: "For a small appliance with a functioning compressor, recovery equipment manufactured after November 15, 1993 must recover:",
    choices: [
      "80% of the refrigerant",
      "90% of the refrigerant (or achieve 4 in. Hg vacuum)",
      "99% of the refrigerant",
      "100% of the refrigerant"
    ],
    answer: 1,
    explanation: "With an operating compressor, certified Type I recovery equipment must recover 90% of the charge or pull the appliance down to 4 in. Hg. If the compressor is inoperative, the target drops to 80%."
  },
  {
    section: "Type I",
    stem: "When is 'system-dependent' (passive) recovery allowed?",
    choices: [
      "Only on small appliances (Type I)",
      "On any appliance under 50 lbs",
      "On residential split systems",
      "Only on low-pressure chillers"
    ],
    answer: 0,
    explanation: "Passive (system-dependent) recovery, which uses the compressor and/or vapor pressure to push refrigerant into a recovery cylinder, is allowed ONLY on small appliances."
  },
  {
    section: "Type I",
    stem: "After recovering refrigerant from a small appliance's process tube, what is the correct way to seal it?",
    choices: [
      "Leave the saddle valve in place — it's sealed when closed",
      "Cap the saddle valve with a brass plug",
      "Pinch the process tube and braze it closed, then remove the saddle valve",
      "Tape over the valve with HVAC foil tape"
    ],
    answer: 2,
    explanation: "Saddle (piercing) valves are not a permanent seal — they weep over time. The process tube should be pinched off and brazed closed, and the saddle valve removed."
  },
  {
    section: "Type I",
    stem: "Who is ultimately responsible for ensuring refrigerant is recovered before a small appliance is disposed of as scrap?",
    choices: [
      "The original manufacturer",
      "The last person in the disposal chain (scrap yard or recycler)",
      "The EPA",
      "The appliance owner only"
    ],
    answer: 1,
    explanation: "The last person before disposal is legally responsible. They may accept a signed statement from the previous party confirming recovery, but can't scrap a charged unit."
  },
  {
    section: "Type I",
    stem: "Which of the following is NOT typically covered by a Type I certification?",
    choices: [
      "A household refrigerator",
      "A 6,000 BTU window A/C unit",
      "A residential central air conditioning split system",
      "A standalone dehumidifier"
    ],
    answer: 2,
    explanation: "Residential central split systems contain more than 5 lbs of refrigerant and are not hermetically sealed factory packages — they fall under Type II."
  },
  {
    section: "Type I",
    stem: "When recovering from a small appliance with an inoperative compressor, what is the minimum recovery efficiency required?",
    choices: ["50%", "80%", "90%", "99%"],
    answer: 1,
    explanation: "If the compressor will not operate, recovery equipment only needs to achieve 80% recovery (vs. 90% with a running compressor), because pulling down is more difficult."
  },
  {
    section: "Type I",
    stem: "A refrigerator leaks all of its refrigerant before the technician arrives. What action is required under 608?",
    choices: [
      "Recover what's left from the suction line only",
      "No recovery is needed — the system is empty",
      "Pressurize the system with nitrogen and recover that",
      "Report it to the EPA within 24 hours"
    ],
    answer: 1,
    explanation: "There is nothing to recover from a system that has already lost all its charge to atmosphere before the tech arrived. The venting prohibition addresses future releases, not past ones."
  },

  // ===== TYPE II =====
  {
    section: "Type II",
    stem: "Type II certification covers high-pressure refrigerants with a boiling point at atmospheric pressure of:",
    choices: [
      "Above 10 °C",
      "Between -50 °C and 10 °C",
      "Below -100 °C",
      "Between 0 °C and 100 °C"
    ],
    answer: 1,
    explanation: "High-pressure refrigerants boil between -50 °C and 10 °C at atmospheric pressure (R-22, R-134a, R-410A, R-404A, R-407C). Above 10 °C is low-pressure (Type III)."
  },
  {
    section: "Type II",
    stem: "For a high-pressure appliance containing less than 200 lbs of refrigerant manufactured after Nov 15, 1993, what recovery level is required before opening the system (non-leaking)?",
    choices: ["0 psig", "4 in. Hg vacuum", "10 in. Hg vacuum", "500 microns"],
    answer: 0,
    explanation: "For high-pressure systems under 200 lbs, the recovery target is 0 psig. At ≥200 lbs it's 10 in. Hg vacuum. The 500-micron target is for evacuation after a repair, not recovery."
  },
  {
    section: "Type II",
    stem: "During system evacuation after a repair, what vacuum level generally indicates the system is dry and tight?",
    choices: [
      "0 psig",
      "10 in. Hg",
      "500 microns held for 10 minutes with the pump isolated",
      "28 psig"
    ],
    answer: 2,
    explanation: "A common field standard is 500 microns of absolute pressure held for 10 minutes after isolating the vacuum pump. If the pressure rises rapidly, moisture or a leak is present."
  },
  {
    section: "Type II",
    stem: "When charging a blended refrigerant like R-410A or R-407C, you should:",
    choices: [
      "Charge as vapor to avoid slugging the compressor",
      "Charge as liquid to preserve the blend's composition",
      "Charge half as vapor and half as liquid",
      "Mix with nitrogen first"
    ],
    answer: 1,
    explanation: "Zeotropic blends can fractionate — different components boil off at different rates. Always charge them as LIQUID (usually metered into the suction line) to keep the mixture at its intended ratio."
  },
  {
    section: "Type II",
    stem: "A halide torch will detect leaks of which refrigerant?",
    choices: [
      "R-410A (HFC)",
      "R-134a (HFC)",
      "R-22 (HCFC)",
      "R-1234yf (HFO)"
    ],
    answer: 2,
    explanation: "A halide torch detects chlorine — so it works for CFCs and HCFCs (like R-22) but NOT for chlorine-free HFCs or HFOs. Electronic detectors or dye are required for those."
  },
  {
    section: "Type II",
    stem: "Residential central A/C systems typically fall under which certification type?",
    choices: ["Type I", "Type II", "Type III", "Section 609 only"],
    answer: 1,
    explanation: "Residential split systems use high-pressure refrigerant (historically R-22, now R-410A) and typically contain more than 5 lbs of refrigerant, placing them under Type II."
  },
  {
    section: "Type II",
    stem: "What is the correct leak-repair annual leak-rate threshold for a 600-lb commercial refrigeration appliance?",
    choices: ["5%", "10%", "20%", "35%"],
    answer: 2,
    explanation: "Under the current rule, commercial refrigeration appliances with 50 lbs or more must have leaks repaired if the full-charge annual leak rate exceeds 20%. (Industrial process is 30%; comfort cooling is 10%.)"
  },
  {
    section: "Type II",
    stem: "Why must a R-22 system NEVER be topped off with R-410A?",
    choices: [
      "R-410A operates at much higher pressures and uses different oil (POE); mixing is dangerous and damages the equipment",
      "R-410A causes no issue — they are interchangeable",
      "R-22 boils at a higher temperature than R-410A",
      "Only homeowners may mix refrigerants"
    ],
    answer: 0,
    explanation: "R-410A runs at roughly 50–70% higher pressures than R-22 and uses polyolester (POE) oil instead of mineral oil. Mixing refrigerants is prohibited and will destroy the compressor."
  },
  {
    section: "Type II",
    stem: "The 'glide' in a zeotropic refrigerant blend refers to:",
    choices: [
      "The slope of a refrigerant hose",
      "The temperature difference between the bubble point and dew point at constant pressure",
      "The compressor discharge angle",
      "The ODP of the blend"
    ],
    answer: 1,
    explanation: "Temperature glide is the difference between the bubble and dew points of a zeotropic blend at the same pressure. This is why you measure superheat and subcool using the appropriate bubble/dew points on the P-T chart."
  },
  {
    section: "Type II",
    stem: "Non-condensables (like air) in a high-pressure system will:",
    choices: [
      "Lower the head pressure and improve efficiency",
      "Raise the head pressure and reduce capacity",
      "Have no effect once the system is running",
      "Only affect the evaporator"
    ],
    answer: 1,
    explanation: "Air trapped in the condenser takes up volume that should hold refrigerant, raising head pressure and reducing heat rejection — the system runs hotter, uses more power, and may trip on high pressure."
  },

  // ===== TYPE III =====
  {
    section: "Type III",
    stem: "Low-pressure refrigerants are defined as those with a boiling point at atmospheric pressure:",
    choices: [
      "Below -50 °C",
      "Between -50 °C and 10 °C",
      "Above 10 °C",
      "Above 100 °C"
    ],
    answer: 2,
    explanation: "Low-pressure refrigerants (R-11, R-113, R-123) boil above 10 °C (50 °F) at atmospheric pressure and typically operate the evaporator under a vacuum."
  },
  {
    section: "Type III",
    stem: "What recovery target must be achieved for a low-pressure chiller manufactured after Nov 15, 1993?",
    choices: [
      "0 psig",
      "10 in. Hg",
      "25 mm Hg absolute",
      "500 microns"
    ],
    answer: 2,
    explanation: "Low-pressure systems must be evacuated to 25 mm Hg absolute pressure (approximately 29 in. Hg vacuum) during recovery."
  },
  {
    section: "Type III",
    stem: "Because low-pressure systems operate under a vacuum, what typically leaks INTO the machine?",
    choices: [
      "Refrigerant vapor",
      "Oil",
      "Air and moisture (non-condensables)",
      "Nitrogen"
    ],
    answer: 2,
    explanation: "Low-pressure systems run with the evaporator below atmospheric pressure, so leaks draw air and water vapor IN, not refrigerant out. This is why purge units are essential on chillers."
  },
  {
    section: "Type III",
    stem: "The purpose of the purge unit on a low-pressure chiller is to:",
    choices: [
      "Add refrigerant automatically when low",
      "Remove non-condensables (air/moisture) that accumulate in the condenser",
      "Prevent the rupture disk from releasing",
      "Increase the compressor's capacity"
    ],
    answer: 1,
    explanation: "Purge units separate non-condensables from refrigerant vapor in the condenser and vent only the air/moisture. A high-efficiency purge unit loses less than 0.1 lb of refrigerant per lb of air purged."
  },
  {
    section: "Type III",
    stem: "A rupture disk on a low-pressure centrifugal chiller is typically set at:",
    choices: ["5 psig", "15 psig", "50 psig", "150 psig"],
    answer: 1,
    explanation: "A 15 psig rupture disk protects low-pressure vessels. If the disk ruptures, refrigerant is released to a designated safe location — usually outdoors."
  },
  {
    section: "Type III",
    stem: "When warming refrigerant during recovery from a low-pressure chiller, you must NOT exceed:",
    choices: ["90 °F", "125 °F", "150 °F", "200 °F"],
    answer: 2,
    explanation: "Heat the refrigerant no higher than 150 °F, and only with heating blankets — never an open flame. Excessive heat causes dangerously high pressure in the recovery cylinder."
  },
  {
    section: "Type III",
    stem: "When leak-testing a low-pressure chiller with nitrogen, the pressure should generally not exceed:",
    choices: ["5 psig", "10 psig", "50 psig", "100 psig"],
    answer: 1,
    explanation: "Low-pressure vessels are only designed for around 15 psig at the rupture disk, so pressure testing is limited to roughly 10 psig. Over-pressurization can rupture the shell."
  },
  {
    section: "Type III",
    stem: "Which refrigerant is most commonly found in Type III low-pressure equipment still in service today?",
    choices: ["R-22", "R-410A", "R-123", "R-134a"],
    answer: 2,
    explanation: "R-123 is the most common low-pressure refrigerant in today's centrifugal chillers (often replacing R-11). R-22 and R-410A are high-pressure; R-134a is used in medium/high-pressure centrifugals."
  },
  {
    section: "Type III",
    stem: "If during recovery from a low-pressure chiller the recovery cylinder pressure approaches the rupture disk setting, you should:",
    choices: [
      "Continue recovering — the disk is a safety device",
      "Stop and cool the cylinder, check for non-condensables, and isolate the cause before continuing",
      "Vent the cylinder briefly to atmosphere to reduce pressure",
      "Switch to a disposable cylinder"
    ],
    answer: 1,
    explanation: "Pressure approaching the rupture setting usually means non-condensables are accumulating or the cylinder is too warm. Stop, diagnose, and resolve the cause — never vent."
  },
  {
    section: "Type III",
    stem: "R-123 is classified by ASHRAE Standard 34 as:",
    choices: ["A1 (low toxicity, no flame propagation)", "B1 (higher toxicity, no flame propagation)", "A2L (mildly flammable)", "A3 (highly flammable)"],
    answer: 1,
    explanation: "R-123 carries a B1 classification — higher toxicity, no flame propagation. This is why machine rooms with R-123 chillers require refrigerant monitors and mechanical ventilation."
  },

  // ===== CORE (expanded) =====
  {
    section: "Core",
    stem: "Stratospheric ozone (O₃) protects life on Earth primarily by:",
    choices: [
      "Trapping greenhouse gases near the surface",
      "Absorbing harmful ultraviolet (UV-B) radiation from the sun",
      "Generating breathable oxygen",
      "Reflecting visible light back into space"
    ],
    answer: 1,
    explanation: "Stratospheric ozone absorbs most of the sun's UV-B radiation, shielding humans, plants, and animals. Chlorine atoms released from CFCs catalytically destroy ozone molecules (Montreal Protocol; 40 CFR 82 Subpart A)."
  },
  {
    section: "Core",
    stem: "The venting prohibition on substitute refrigerants (HFCs and HFOs used in place of CFCs/HCFCs) took effect on:",
    choices: [
      "July 1, 1992",
      "November 15, 1993",
      "November 15, 1995",
      "January 1, 2018"
    ],
    answer: 2,
    explanation: "Venting of CFCs/HCFCs was prohibited July 1, 1992. The prohibition was extended to non-exempt substitutes (HFCs such as R-134a, R-410A) on November 15, 1995 (40 CFR 82.154(a))."
  },
  {
    section: "Core",
    stem: "An ASHRAE 34 safety classification of 'A2L' indicates a refrigerant that is:",
    choices: [
      "Higher toxicity, non-flammable",
      "Lower toxicity, mildly flammable with low burning velocity",
      "Lower toxicity, non-flammable",
      "Higher toxicity, highly flammable"
    ],
    answer: 1,
    explanation: "In ASHRAE 34, 'A' = lower toxicity, '2L' = mildly flammable with a burning velocity ≤10 cm/s. Examples include R-32, R-454B, and R-1234yf (ASHRAE Standard 34)."
  },
  {
    section: "Core",
    stem: "Under the AIM Act, the U.S. must phase down production and consumption of HFCs by what amount by 2036?",
    choices: [
      "40% reduction from baseline",
      "60% reduction from baseline",
      "85% reduction from baseline",
      "100% (complete ban)"
    ],
    answer: 2,
    explanation: "The American Innovation and Manufacturing (AIM) Act of 2020 requires an 85% stepped phasedown of HFC production and consumption below baseline by 2036, implemented via EPA allowance allocations (AIM Act § 103; 40 CFR 84)."
  },
  {
    section: "Core",
    stem: "Which EPA program evaluates and lists acceptable alternative refrigerants to replace ozone-depleting substances?",
    choices: [
      "Energy Star",
      "SNAP (Significant New Alternatives Policy)",
      "NESHAP",
      "TSCA"
    ],
    answer: 1,
    explanation: "The SNAP program reviews substitutes for ozone-depleting substances and lists them as acceptable, acceptable with use conditions, or unacceptable for specific end-uses (40 CFR 82 Subpart G)."
  },
  {
    section: "Core",
    stem: "Effective January 1, 2019, comfort-cooling appliances containing 50 lbs or more of refrigerant must have leaks repaired when the annual leak rate exceeds:",
    choices: ["10%", "15%", "20%", "35%"],
    answer: 0,
    explanation: "The leak-repair trigger is 10% for comfort cooling, 20% for commercial refrigeration, and 30% for industrial process refrigeration, calculated as a full-charge annualized rate (40 CFR 82.157)."
  },
  {
    section: "Core",
    stem: "Beginning January 1, 2026, certain leak-repair and recordkeeping provisions expand to cover systems containing:",
    choices: [
      "5 lbs or more for residential units only",
      "15 lbs or more of HFCs and blends with GWP above a threshold, and 50 lbs for other refrigerants",
      "100 lbs or more of any refrigerant",
      "Any amount of A2L refrigerant"
    ],
    answer: 1,
    explanation: "Under the Technology Transitions rule and 2024 refrigerant management amendments, the 15-lb threshold applies to many high-GWP HFCs while the 50-lb threshold continues for other refrigerants starting 2026 (40 CFR 84; 40 CFR 82.157)."
  },
  {
    section: "Core",
    stem: "To sell recovered refrigerant for use by a different owner, the refrigerant must be reprocessed by:",
    choices: [
      "Any Section 608-certified technician on site",
      "An EPA-certified reclaimer meeting AHRI Standard 700 purity",
      "The original equipment manufacturer",
      "A DOT-licensed cylinder tester"
    ],
    answer: 1,
    explanation: "Only an EPA-certified reclaimer can reprocess used refrigerant to AHRI Standard 700 specification and legally resell it to a new owner (40 CFR 82.164; AHRI 700)."
  },
  {
    section: "Core",
    stem: "A cylinder marked 'DOT 4BA 400' indicates:",
    choices: [
      "It was tested in April of 2004",
      "It is a refillable steel cylinder rated for 400 psig service pressure",
      "It holds 400 lbs of refrigerant",
      "It is a single-use disposable cylinder"
    ],
    answer: 1,
    explanation: "The DOT 4BA/4BW specification designates refillable welded steel cylinders; the number (e.g., 400) is the marked service pressure in psig (49 CFR 178.61; 49 CFR 173.304a)."
  },
  {
    section: "Core",
    stem: "R-1234yf, commonly used in motor-vehicle A/C, belongs to which class of refrigerants?",
    choices: ["CFC", "HCFC", "HFC", "HFO"],
    answer: 3,
    explanation: "R-1234yf is a hydrofluoroolefin (HFO) with a double bond that gives it a very low GWP (~4) and zero ODP. It is ASHRAE 34 class A2L (40 CFR 82 Subpart G; ASHRAE 34)."
  },
  {
    section: "Core",
    stem: "A technician releases a small puff of refrigerant while disconnecting hoses after a properly performed recovery. This release is:",
    choices: [
      "A felony punishable by imprisonment",
      "Considered a de minimis release associated with good-faith servicing",
      "A reportable spill requiring EPA notification within 24 hours",
      "Only legal if it is less than 1 oz"
    ],
    answer: 1,
    explanation: "Small unavoidable releases that occur during good-faith attempts to recycle or recover refrigerant are considered de minimis and are not violations of the venting prohibition (40 CFR 82.154(a))."
  },
  {
    section: "Core",
    stem: "Which of the following is TRUE of a chlorofluorocarbon (CFC) such as R-12?",
    choices: [
      "It has zero ozone-depletion potential",
      "Its production for domestic use has been phased out since 1996",
      "It is currently the preferred refrigerant for new residential systems",
      "It contains hydrogen, making it less stable in the atmosphere"
    ],
    answer: 1,
    explanation: "Production and import of CFCs for domestic use ended January 1, 1996 under the Montreal Protocol and Title VI of the Clean Air Act. CFCs have the highest ODP and contain no hydrogen (40 CFR 82 Subpart A)."
  },
  {
    section: "Core",
    stem: "A technician must keep records of refrigerant added and recovered for appliances with a full charge of:",
    choices: [
      "5 lbs or more",
      "25 lbs or more",
      "50 lbs or more",
      "200 lbs or more"
    ],
    answer: 2,
    explanation: "Servicing records (date, amount added/recovered, technician ID) are required for appliances with a full charge of 50 lbs or more (40 CFR 82.157(h)). The 15-lb threshold for some HFC systems begins in 2026."
  },
  {
    section: "Core",
    stem: "Which of the following is the correct order of the 'three Rs' in refrigerant handling?",
    choices: [
      "Reclaim, Recycle, Recover",
      "Recover, Recycle, Reclaim",
      "Reuse, Recover, Recycle",
      "Reduce, Reuse, Recycle"
    ],
    answer: 1,
    explanation: "Recover means removing refrigerant in any condition; Recycle means cleaning it on-site for reuse in the same owner's equipment; Reclaim means off-site reprocessing to AHRI 700 for resale (40 CFR 82.152)."
  },
  {
    section: "Core",
    stem: "Under Section 608, the maximum civil penalty per violation per day for knowing releases of refrigerant can be up to approximately:",
    choices: [
      "$500",
      "$5,000",
      "$37,500 or more (adjusted for inflation)",
      "$1,000,000"
    ],
    answer: 2,
    explanation: "Civil penalties under the Clean Air Act are inflation-adjusted and currently exceed $37,500 per violation per day; EPA also offers rewards for information leading to convictions (CAA § 113; 40 CFR 82.166)."
  },
  {
    section: "Core",
    stem: "A refrigerant with a GWP of 2,088 (relative to CO₂) would most likely be which of the following?",
    choices: ["R-1234yf", "R-32", "R-410A", "R-744 (CO₂)"],
    answer: 2,
    explanation: "R-410A has a GWP of approximately 2,088. R-32 is about 675, R-1234yf is about 4, and CO₂ is 1 by definition. This is why R-410A is being phased down under the AIM Act (AIM Act; IPCC AR4)."
  },
  {
    section: "Core",
    stem: "Refrigerant cylinders being transported must be:",
    choices: [
      "Laid on their side with the valve unprotected",
      "Secured upright with the valve protected by a cap or collar",
      "Stored in the passenger compartment for temperature control",
      "Completely full of liquid to avoid sloshing"
    ],
    answer: 1,
    explanation: "DOT requires cylinders to be secured upright with valve protection (caps or collars) and adequate ventilation during transport (49 CFR 173.301)."
  },
  {
    section: "Core",
    stem: "The EPA requires technicians handling refrigerant to be certified under Section 608 when performing which activity?",
    choices: [
      "Cleaning evaporator coils with water",
      "Maintaining or servicing equipment that could release refrigerant to the atmosphere",
      "Replacing a thermostat on a furnace",
      "Installing electrical disconnects"
    ],
    answer: 1,
    explanation: "Section 608 certification is required for any person who maintains, services, repairs, or disposes of appliances in a manner that could reasonably be expected to release refrigerant (40 CFR 82.161)."
  },
  {
    section: "Core",
    stem: "Which refrigerant is considered a 'mildly flammable' A2L replacement for R-410A in new residential split systems?",
    choices: ["R-22", "R-134a", "R-454B", "R-123"],
    answer: 2,
    explanation: "R-454B (a blend of R-32 and R-1234yf, approximately 68.9/31.1) is an A2L refrigerant with a GWP near 466 — an approved replacement for R-410A in new residential equipment (ASHRAE 34; SNAP listings)."
  },
  {
    section: "Core",
    stem: "When working in a confined mechanical room with potential refrigerant leaks, the primary hazard from most halocarbon refrigerants is:",
    choices: [
      "Acute toxicity at room concentrations",
      "Asphyxiation by displacing oxygen",
      "Frostbite from cold vapor only",
      "Spontaneous combustion"
    ],
    answer: 1,
    explanation: "Most halocarbon refrigerants are heavier than air and can displace oxygen in low areas, leading to asphyxiation. ASHRAE 15 requires refrigerant monitors and ventilation in machine rooms (ASHRAE 15; ASHRAE 34)."
  },

  // ===== TYPE I (expanded) =====
  {
    section: "Type I",
    stem: "Which of the following BEST fits the definition of a 'small appliance' under 40 CFR 82.152?",
    choices: [
      "Any rooftop unit under 10 tons",
      "A product fully manufactured, charged, and hermetically sealed in a factory with 5 lbs or less of refrigerant",
      "Any split-system air conditioner under 3 tons",
      "Any packaged terminal air conditioner installed in a wall sleeve"
    ],
    answer: 1,
    explanation: "Small appliances are products fully manufactured, charged, and hermetically sealed in a factory with 5 lbs or less of refrigerant — refrigerators, freezers, dehumidifiers, room A/C, water coolers, and vending machines (40 CFR 82.152)."
  },
  {
    section: "Type I",
    stem: "A 'system-dependent' (passive) recovery device:",
    choices: [
      "Uses its own compressor to pull refrigerant out of the appliance",
      "Relies on the appliance's compressor or internal pressure to transfer refrigerant to a non-pressurized container",
      "Requires a separate vacuum pump running continuously",
      "Can only be used on low-pressure chillers"
    ],
    answer: 1,
    explanation: "Passive recovery equipment uses the appliance's own pressure (or compressor, if operable) to push refrigerant into a recovery bag or cylinder. Type I is the only category where passive recovery is allowed (40 CFR 82.158)."
  },
  {
    section: "Type I",
    stem: "For a small appliance with a non-operating compressor, system-dependent recovery equipment must be capable of pulling the system to:",
    choices: [
      "0 psig",
      "4 inches of mercury vacuum",
      "10 inches of mercury vacuum",
      "500 microns"
    ],
    answer: 1,
    explanation: "Certified system-dependent recovery equipment must achieve at least 4 in. Hg of vacuum on a non-leaking small appliance with an inoperative compressor, and recover at least 80% of the charge (40 CFR 82.158; Appendix B1 to Subpart F)."
  },
  {
    section: "Type I",
    stem: "If a small appliance has a leak large enough that 4 in. Hg cannot be reached with passive equipment, the technician should:",
    choices: [
      "Vent remaining refrigerant as de minimis",
      "Recover as much as possible into the recovery container without achieving the 4 in. Hg target",
      "Seal the leak with tape and try again",
      "Pressurize the system with nitrogen to push refrigerant out"
    ],
    answer: 1,
    explanation: "For a leaky small appliance that cannot reach 4 in. Hg, the technician is required to recover as much as practicable into the non-pressurized container — documenting the inability to achieve vacuum (40 CFR 82.158(c))."
  },
  {
    section: "Type I",
    stem: "An 'active' (self-contained) recovery machine for a small appliance with a working compressor must recover:",
    choices: [
      "At least 80% of the refrigerant or pull down to 0 psig",
      "At least 90% of the refrigerant or pull down to 4 in. Hg",
      "At least 95% of the refrigerant or pull down to 10 in. Hg",
      "100% of the refrigerant in all cases"
    ],
    answer: 1,
    explanation: "Self-contained (active) Type I recovery equipment manufactured after November 15, 1993 must achieve 90% recovery when the compressor is running, or pull the system to 4 in. Hg (40 CFR 82.158; Appendix B1)."
  },
  {
    section: "Type I",
    stem: "A saddle (piercing) valve is commonly used on small appliances because:",
    choices: [
      "It provides a permanent, leak-free access port",
      "It allows access to systems without factory service ports, but is only a temporary access",
      "It is the only EPA-approved refrigerant connection",
      "It eliminates the need for recovery equipment"
    ],
    answer: 1,
    explanation: "Saddle valves create a temporary access into the process tube or line. After recovery, the process tube should be pinched/brazed and the saddle valve removed because piercing valves weep over time (EPA Section 608 Handbook)."
  },
  {
    section: "Type I",
    stem: "Before a refrigerator is loaded onto a scrap truck by a recycler, documentation must verify:",
    choices: [
      "It has been certified by an appliance manufacturer",
      "Refrigerant and compressor oil have been properly recovered",
      "It has been sanitized with bleach",
      "Its EnergyStar rating has been recorded"
    ],
    answer: 1,
    explanation: "The final person in the disposal chain must ensure refrigerant has been recovered, either by doing it themselves or obtaining a signed statement from an upstream party (40 CFR 82.155)."
  },
  {
    section: "Type I",
    stem: "Which of the following is NOT acceptable for sealing a small-appliance process tube after refrigerant recovery?",
    choices: [
      "Pinching and brazing closed",
      "Using a factory-approved solderable cap",
      "Closing a saddle (piercing) valve and leaving it installed permanently",
      "Crimping and brazing"
    ],
    answer: 2,
    explanation: "Leaving a piercing valve as the permanent seal is not acceptable — the rubber grommet and piercing mechanism leak over time. Brazing a pinched or capped process tube is the correct closure (EPA Section 608 Handbook)."
  },
  {
    section: "Type I",
    stem: "Recovery equipment used on small appliances that was manufactured BEFORE November 15, 1993 must:",
    choices: [
      "Be immediately retired and scrapped",
      "Be capable of achieving 4 in. Hg vacuum on a non-leaking appliance",
      "Meet only the earlier EPA standard applicable at time of manufacture",
      "Be relabeled as Type II equipment"
    ],
    answer: 2,
    explanation: "Recovery equipment manufactured before November 15, 1993 is grandfathered to the earlier standard, while equipment manufactured after that date must meet the current EPA/Appendix B1 requirements (40 CFR 82.158)."
  },
  {
    section: "Type I",
    stem: "Which of the following appliances would fall OUTSIDE Type I certification even if it contains less than 5 lbs of refrigerant?",
    choices: [
      "A household refrigerator",
      "A residential mini-split that is field-charged and connected via flare fittings",
      "A standalone dehumidifier",
      "A packaged water cooler"
    ],
    answer: 1,
    explanation: "Even under 5 lbs, a field-installed, field-charged split system is not 'fully manufactured, charged, and hermetically sealed in a factory' and therefore is not a small appliance — it falls under Type II (40 CFR 82.152)."
  },
  {
    section: "Type I",
    stem: "Using a pressurized, DOT-rated recovery cylinder for passive system-dependent recovery is:",
    choices: [
      "Required by EPA",
      "Prohibited — passive recovery uses a non-pressurized bag or container designed for that purpose",
      "Required only for R-22 appliances",
      "Only allowed below 4 in. Hg"
    ],
    answer: 1,
    explanation: "System-dependent recovery requires a non-pressurized container designed to receive refrigerant under the appliance's own pressure differential; a pressurized DOT cylinder would prevent proper passive transfer (40 CFR 82.158)."
  },
  {
    section: "Type I",
    stem: "Which refrigerant is still commonly found in older household refrigerators that a Type I technician may encounter?",
    choices: ["R-410A", "R-134a", "R-22", "R-744"],
    answer: 1,
    explanation: "Older domestic refrigerators frequently contain R-134a (HFC). Newer units increasingly use R-600a (isobutane), while R-12 remains in vintage units (ASHRAE 34; SNAP listings)."
  },

  // ===== TYPE II (expanded) =====
  {
    section: "Type II",
    stem: "Which of the following is the cleanest definition of a 'high-pressure' refrigerant for EPA certification purposes?",
    choices: [
      "A refrigerant with a boiling point above 10 °C at atmospheric pressure",
      "A refrigerant with a saturation pressure between 45 psia and 170 psia at 104 °F",
      "A refrigerant used only in chillers",
      "Any refrigerant operating above 100 psig"
    ],
    answer: 1,
    explanation: "EPA defines high-pressure refrigerants as those with a saturation pressure between about 45 psia (at 68 °F) and 170 psia at 104 °F — including R-22, R-134a, R-404A, R-410A, R-32, and R-454B (40 CFR 82.152)."
  },
  {
    section: "Type II",
    stem: "A 250-lb rooftop unit charged with R-410A needs to be opened for a compressor replacement. What is the minimum recovery level required before breaking into the system (non-leaking)?",
    choices: [
      "0 psig",
      "4 in. Hg vacuum",
      "10 in. Hg vacuum",
      "500 microns"
    ],
    answer: 2,
    explanation: "For high-pressure appliances with a full charge of 200 lbs or more (manufactured after Nov 15, 1993), the recovery target is 10 in. Hg vacuum. Under 200 lbs, the target is 0 psig (40 CFR 82.158 Appendix B)."
  },
  {
    section: "Type II",
    stem: "R-410A is a near-azeotropic blend of:",
    choices: [
      "R-32 and R-125 in a 50/50 mass ratio",
      "R-134a and R-1234yf in a 90/10 ratio",
      "R-22 and R-142b",
      "R-32 and R-1234yf (68.9/31.1)"
    ],
    answer: 0,
    explanation: "R-410A is 50% R-32 and 50% R-125 by mass — a near-azeotropic blend with negligible glide. This is why it can be charged as liquid without significant fractionation risk (ASHRAE 34; AHRI 700)."
  },
  {
    section: "Type II",
    stem: "R-454B is being adopted as a replacement for R-410A. It is composed of:",
    choices: [
      "R-32 and R-1234yf at approximately 68.9/31.1",
      "R-32 and R-125 at 50/50",
      "R-134a and R-1234ze at 60/40",
      "Pure R-32"
    ],
    answer: 0,
    explanation: "R-454B is a zeotropic blend of 68.9% R-32 and 31.1% R-1234yf, carrying an ASHRAE 34 A2L classification and GWP near 466 — approved under SNAP for new residential/commercial A/C (ASHRAE 34)."
  },
  {
    section: "Type II",
    stem: "After evacuating a system for moisture removal, a vacuum pump is isolated from the system and the reading is watched. Rapid pressure rise to atmospheric in a few minutes indicates:",
    choices: [
      "The system is dry and leak-tight",
      "A leak in the system",
      "Normal behavior for R-410A",
      "The micron gauge is faulty"
    ],
    answer: 1,
    explanation: "A rapid rise to atmospheric after isolating the pump indicates a leak (outside air entering). A slow rise that levels off typically indicates residual moisture boiling. 500 microns holding steady for 10 minutes confirms a tight, dry system (ACR best practice)."
  },
  {
    section: "Type II",
    stem: "When pressure-testing a high-pressure system with nitrogen, the applied test pressure should:",
    choices: [
      "Always be 250 psig regardless of system",
      "Not exceed the labeled low-side test pressure on the equipment nameplate",
      "Exceed the high-side design pressure by 50 psi",
      "Be at least double the operating pressure"
    ],
    answer: 1,
    explanation: "Test pressure must never exceed the equipment's labeled low-side test pressure (or the appropriate low-side design/test pressure per manufacturer). Over-pressurizing can rupture components and void UL listing (ASHRAE 15)."
  },
  {
    section: "Type II",
    stem: "A zeotropic blend such as R-407C should be charged into a system as:",
    choices: [
      "Vapor only, to avoid slugging",
      "Liquid, to preserve the blend composition and avoid fractionation",
      "Alternating vapor and liquid for balance",
      "Mixed with nitrogen in a 3:1 ratio"
    ],
    answer: 1,
    explanation: "Zeotropic blends have components with different boiling points; if drawn off as vapor, the lower-boiling component leaves the cylinder first and the charge fractionates. Always charge as liquid — metered into the suction side if the compressor is running (AHRI 700; ASHRAE 34)."
  },
  {
    section: "Type II",
    stem: "The preferred lubricant for R-410A systems is:",
    choices: [
      "Mineral oil",
      "Alkylbenzene (AB)",
      "Polyolester (POE)",
      "Silicone oil"
    ],
    answer: 2,
    explanation: "R-410A systems use polyolester (POE) oil, which is miscible with HFCs. POE is very hygroscopic — bottles must be kept sealed and exposure to moisture minimized (AHRI 700; equipment manufacturer specs)."
  },
  {
    section: "Type II",
    stem: "Which leak-detection method generally provides the highest sensitivity for small HFC leaks?",
    choices: [
      "Soap bubbles",
      "Halide torch",
      "Heated-diode or infrared electronic leak detector",
      "Ultrasonic listening device"
    ],
    answer: 2,
    explanation: "Modern heated-diode and infrared electronic detectors can detect leaks in the 0.1 oz/yr range — far more sensitive than bubbles or ultrasonic methods. Halide torches don't respond to chlorine-free HFCs (EPA Section 608 Handbook)."
  },
  {
    section: "Type II",
    stem: "An A2L refrigerant installed in a residential split system has a maximum allowable charge determined primarily by:",
    choices: [
      "EPA Section 608 alone",
      "The IEC 60335-2-40 / UL 60335-2-40 charge-limit formulas based on room area and installation height",
      "The refrigerant's GWP",
      "The system's SEER rating"
    ],
    answer: 1,
    explanation: "A2L charge limits are governed by IEC/UL 60335-2-40, which ties maximum charge to conditioned floor area, installation height, and refrigerant properties (LFL). Exceeding the limit requires mitigation such as leak detection and shutoff valves (UL 60335-2-40)."
  },
  {
    section: "Type II",
    stem: "Retrofitting an R-22 system to an HFC alternative generally requires:",
    choices: [
      "No changes — just charge the new refrigerant in",
      "Replacing the mineral oil with POE, replacing the filter-drier, and often a new expansion device",
      "Only replacing the thermostat",
      "Adding a second compressor"
    ],
    answer: 1,
    explanation: "Most R-22 retrofits require changing to POE oil (multiple flushes), installing a new filter-drier, verifying/changing metering devices, and checking seal compatibility. The refrigerant must be SNAP-approved for that use (40 CFR 82 Subpart G; SNAP)."
  },
  {
    section: "Type II",
    stem: "The main concern with mixing two different refrigerants in a single system is:",
    choices: [
      "It is fine as long as both are HFCs",
      "The resulting blend's P-T characteristics, safety class, and oil compatibility are unknown, and reclamation becomes impossible",
      "Only pressure will change slightly",
      "It improves efficiency"
    ],
    answer: 1,
    explanation: "Mixing refrigerants creates an unknown blend that behaves unpredictably, voids manufacturer warranties, and cannot be reclaimed to AHRI 700 — so the entire charge becomes waste. Mixing is prohibited (AHRI 700; 40 CFR 82.154)."
  },
  {
    section: "Type II",
    stem: "Which refrigerant is a pure fluid (not a blend) with ASHRAE 34 classification A2L and GWP near 675?",
    choices: ["R-410A", "R-32", "R-454B", "R-22"],
    answer: 1,
    explanation: "R-32 (difluoromethane) is a pure, single-component A2L refrigerant with a GWP around 675 — used directly in some new split systems and as a major component of R-410A and R-454B (ASHRAE 34)."
  },
  {
    section: "Type II",
    stem: "After replacing a burnt-out hermetic compressor, the technician should:",
    choices: [
      "Just install the new compressor and charge — oil contamination doesn't matter",
      "Replace the liquid-line filter-drier (and often a suction-line drier), flush lines, evacuate, and use appropriate acid-scavenging practices",
      "Only change the refrigerant",
      "Pressurize to 500 psig to clean the lines"
    ],
    answer: 1,
    explanation: "A compressor burnout releases acids and soot into the system. Best practice includes new filter-driers (often including a suction-line acid drier), line flushing, proper evacuation to 500 microns, and sometimes an oil change after running (manufacturer service guidelines)."
  },

  // ===== TYPE III (expanded) =====
  {
    section: "Type III",
    stem: "Which of the following is characteristic of a low-pressure refrigerant?",
    choices: [
      "Saturation pressure above 170 psia at 104 °F",
      "Boiling point BELOW -50 °C at atmospheric pressure",
      "Saturation pressure below 45 psia at 68 °F and the evaporator operating in a vacuum",
      "Used primarily in reciprocating rooftop units"
    ],
    answer: 2,
    explanation: "Low-pressure refrigerants (R-11, R-123, R-245fa) have a saturation pressure below 45 psia at 68 °F. The evaporator in a centrifugal chiller typically operates under vacuum, so leaks draw air INTO the machine (40 CFR 82.152)."
  },
  {
    section: "Type III",
    stem: "A low-pressure centrifugal chiller manufactured after Nov 15, 1993 must be evacuated during refrigerant recovery to at least:",
    choices: [
      "0 psig",
      "10 in. Hg vacuum",
      "25 mm Hg absolute (approximately 29 in. Hg vacuum)",
      "500 microns"
    ],
    answer: 2,
    explanation: "The recovery target for low-pressure appliances is 25 mm Hg absolute pressure (about 29 in. Hg vacuum at sea level) — one of the deepest recovery requirements in 608 (40 CFR 82.158 Appendix B)."
  },
  {
    section: "Type III",
    stem: "The rupture disk on a low-pressure centrifugal chiller is typically set to burst at:",
    choices: ["5 psig", "15 psig", "30 psig", "75 psig"],
    answer: 1,
    explanation: "Rupture disks on low-pressure chillers are typically set at 15 psig. This protects the thin-walled shell and evaporator/condenser vessels from over-pressurization and vents to a safe location (ASHRAE 15)."
  },
  {
    section: "Type III",
    stem: "When pressure-testing a low-pressure chiller for leaks, the nitrogen pressure must NOT exceed:",
    choices: [
      "5 psig",
      "10 psig",
      "25 psig",
      "50 psig"],
    answer: 1,
    explanation: "Because the rupture disk is set at 15 psig, leak-test pressure on a low-pressure machine is typically limited to about 10 psig — going higher risks rupturing the disk and releasing refrigerant (ASHRAE 15; EPA Section 608 Handbook)."
  },
  {
    section: "Type III",
    stem: "When warming refrigerant in a cylinder or chiller to aid recovery, the temperature must not exceed:",
    choices: [
      "100 °F",
      "125 °F",
      "150 °F",
      "200 °F"
    ],
    answer: 2,
    explanation: "The maximum heat-assisted recovery temperature is 150 °F, and only heating blankets or warm water may be used — never an open flame. Exceeding this can over-pressurize the recovery cylinder (EPA Section 608 Handbook)."
  },
  {
    section: "Type III",
    stem: "The main function of a high-efficiency purge unit on a low-pressure chiller is to:",
    choices: [
      "Add fresh refrigerant from a storage tank automatically",
      "Separate and expel air and moisture (non-condensables) while retaining refrigerant vapor",
      "Boost head pressure to improve condenser performance",
      "Lubricate the centrifugal compressor bearings"
    ],
    answer: 1,
    explanation: "Purge units collect non-condensables from the condenser, separate refrigerant from them, and vent only air/water. Modern high-efficiency purges typically lose less than 0.1 lb refrigerant per lb of air purged (ASHRAE 15)."
  },
  {
    section: "Type III",
    stem: "Excessive purge-unit runtime on a low-pressure chiller typically indicates:",
    choices: [
      "Normal operation",
      "An air/moisture leak INTO the machine that should be located and repaired",
      "The compressor needs to be replaced",
      "The rupture disk is about to fail"
    ],
    answer: 1,
    explanation: "Because the evaporator operates in a vacuum, leaks draw air and moisture IN. High purge runtime is the primary indicator of a leak on a low-pressure machine; locate and repair the leak to reduce refrigerant loss and corrosion (EPA Section 608 Handbook)."
  },
  {
    section: "Type III",
    stem: "R-123 is classified as B1 under ASHRAE 34. The 'B' designation means:",
    choices: [
      "Non-flammable with low toxicity",
      "Higher toxicity at low concentrations (occupational exposure limit below 400 ppm)",
      "Mildly flammable",
      "Highly flammable"
    ],
    answer: 1,
    explanation: "'B' in ASHRAE 34 means higher toxicity — OEL below 400 ppm. '1' means no flame propagation. This is why R-123 machine rooms require refrigerant monitors, ventilation, and evacuation alarms (ASHRAE 34; ASHRAE 15)."
  },
  {
    section: "Type III",
    stem: "R-11 (CFC-11) centrifugal chillers are still occasionally encountered. What is their regulatory status?",
    choices: [
      "Fully legal to top off with new R-11",
      "Existing machines may continue to operate, but new R-11 production ended in 1996; only reclaimed/recycled supply remains",
      "Must be decommissioned immediately by federal law",
      "R-11 may be vented if the machine is over 30 years old"
    ],
    answer: 1,
    explanation: "U.S. production of CFC-11 ended January 1, 1996 under the Montreal Protocol. Existing equipment may continue operating with reclaimed refrigerant, but new production is banned and venting remains prohibited (40 CFR 82 Subpart A)."
  },
  {
    section: "Type III",
    stem: "A low-pressure chiller is found with its shell pressure at 12 in. Hg vacuum while idle. This most likely indicates:",
    choices: [
      "A refrigerant overcharge",
      "That the machine is leaking refrigerant out through its relief valve",
      "Non-condensables have been purged recently, and the saturation pressure corresponds to ambient refrigerant temperature",
      "Rupture disk has failed"
    ],
    answer: 2,
    explanation: "An idle low-pressure chiller's shell sits at the saturation pressure of the refrigerant at ambient temperature — typically well below atmospheric. A reading of 12 in. Hg vacuum is normal for R-123 at moderate temperatures (ASHRAE refrigerant P-T data)."
  },
  {
    section: "Type III",
    stem: "When leak-testing a low-pressure chiller, the preferred trace gas to add with nitrogen is:",
    choices: [
      "A small amount of the same refrigerant (e.g., R-123) for detection",
      "Oxygen",
      "Ammonia",
      "Carbon monoxide"
    ],
    answer: 0,
    explanation: "A small trace of the system's own refrigerant mixed with dry nitrogen (kept below 10 psig) allows use of electronic detectors while avoiding the hazards of pressurized pure refrigerant. Never use oxygen — it can react violently with oil (ASHRAE 15)."
  },
  {
    section: "Type III",
    stem: "When recovering refrigerant from a low-pressure chiller, the recovery cylinder pressure gauge begins climbing rapidly although liquid is still in the chiller. The most likely cause is:",
    choices: [
      "Normal operation — keep recovering",
      "Non-condensables (air) have accumulated in the recovery cylinder",
      "The chiller's compressor motor is overloaded",
      "The rupture disk needs to be replaced"
    ],
    answer: 1,
    explanation: "Rising cylinder pressure with refrigerant remaining suggests air/non-condensables were pulled into the cylinder. Stop, let the cylinder cool, purge non-condensables safely (if equipped), and diagnose the source before continuing (EPA Section 608 Handbook)."
  },
  {
    section: "Type III",
    stem: "The water box covers on a low-pressure chiller condenser or evaporator should be pressure-tested:",
    choices: [
      "Only with the refrigerant charge in the machine",
      "With the refrigerant side isolated and water side pressurized per manufacturer specification, to check tube-sheet integrity",
      "Using compressed air at 150 psig",
      "They never require testing"
    ],
    answer: 1,
    explanation: "Tube and tube-sheet leaks are tested by isolating the refrigerant side and hydrostatically pressurizing the water side per the manufacturer's limits. A leak here contaminates the refrigerant with water, forming acids (manufacturer service bulletins)."
  },
  {
    section: "Type III",
    stem: "Which of the following is NOT typically regulated under EPA Section 608?",
    choices: [
      "A 500-ton R-123 centrifugal chiller",
      "A 300-ton R-134a centrifugal chiller",
      "An ammonia (R-717) absorption chiller in an industrial plant",
      "An R-245fa chiller"
    ],
    answer: 2,
    explanation: "Ammonia (R-717) is not a Class I or Class II ODS and is exempt from the Section 608 venting prohibition for most purposes; ammonia systems are instead regulated under OSHA PSM, EPA RMP, and IIAR standards (40 CFR 82.154; IIAR 2/6)."
  }
];
