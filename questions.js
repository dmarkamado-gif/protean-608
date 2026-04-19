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
  }
];
