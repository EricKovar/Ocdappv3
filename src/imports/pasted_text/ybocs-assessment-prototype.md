Create a **desktop web app prototype** for a clinical assessment tool called **Y-BOCS Assessment** (Yale-Brown Obsessive Compulsive Scale). The product should feel like a **modern clinical workflow application**, not a generic consumer wellness app. Design for **clinicians administering the assessment**, not patients self-completing it.

## Overall design direction

* Clean, professional, calm, clinical
* Modern SaaS healthcare style
* White background with subtle gray panels/cards
* Deep blue primary color, soft teal accent
* Rounded cards, subtle borders, minimal shadows
* Strong spacing and hierarchy
* Accessible typography
* Desktop-first responsive layout
* Use a consistent component system across all screens

## Visual system

* Primary blue: #1E3A8A
* Accent teal: #14B8A6
* Background: #F9FAFB
* Border: #E5E7EB
* Text primary: #111827
* Text secondary: #6B7280

Typography:

* H1: 32px semibold
* H2: 24px semibold
* Section heading: 18–20px medium
* Body: 14–16px regular
* Labels: 14px medium
* Helper text: 12–13px regular

Components:

* Primary button
* Secondary button
* Input fields
* Date picker field
* Instruction card
* Checklist row
* Category sidebar
* Selected summary card
* Vertical score selector
* Score summary panel
* Success / confirmation card

## Product structure

Create a **10-screen connected web app flow** with consistent navigation and layout.

---

# SCREEN 1 — HOME / INTAKE

Title: **Y-BOCS Assessment**
Subtitle: **Yale-Brown Obsessive Compulsive Scale**

Create a centered intake form card with these fields in this order:

1. Patient Name
2. Date of Birth
3. MRN / ID
4. Date
5. Clinician Name

Add a full-width primary CTA button:
**Begin Assessment**

Style:

* Clean intake form
* Clinical, not decorative
* Desktop layout centered in page
* Support calendar icon for DOB and Date

---

# SCREEN 2 — GENERAL INSTRUCTIONS

Title: **General Instructions**
Step label: **Step 1 of 6**

Create a structured content screen with:

* Header
* Progress indicator
* Instruction cards / sections
* Sticky footer with Back and Continue

Sections:

1. **Purpose of Assessment**

   * Explain that the scale evaluates severity and types of obsessive-compulsive symptoms over the past week
   * Ratings are based on patient report, collateral input if applicable, and clinician judgment

2. **Definitions**
   Create 3 definition cards:

   * Obsessions
   * Compulsions
   * Avoidance

3. **How to Conduct the Assessment**

   * Semi-structured interview
   * Assess symptoms over past week
   * Capture average severity, not peak only
   * Additional clarifying questions allowed
   * Collateral input only when consistent and necessary

4. **Identifying Target Symptoms**

   * List current obsessions and compulsions
   * Use symptom checklist as guide
   * Distinguish recent vs current
   * Identify most prominent symptoms
   * Include avoidance behaviors

5. **Clinical Considerations**

   * Differentiate OCD from other disorders
   * Use clinician judgment

Include a checkbox near bottom:
**I understand the definitions and assessment guidelines**

Continue button should appear enabled only after acknowledgement.

---

# SCREEN 3 — SYMPTOMS

Use a **3-column desktop layout**:

* Left sidebar: categories
* Center: checklist workspace
* Right sidebar: selected symptoms summary

Header:

* Back
* Title: **Symptom Checklist**
* Continue button

Top of center panel:
Add an instruction block:
“Review the following symptom categories with the patient and identify all that apply. Mark symptoms that have been present recently (past 30 days) and those currently active (past week). Clearly indicate the principal symptoms that will guide assessment. Use clinical judgment to distinguish OCD symptoms from those of other conditions.”

Left sidebar:

* Categories list with counts
* Search field
* Collapsible navigation feel

Center panel:
Create reusable checklist rows with:

* Checkbox
* Symptom label
* Toggle chips: Current / Past
* Primary marker button

Right panel:
Selected symptoms summary cards with:

* Symptom name
* Status chips: Current / Past / Primary
* Remove action

Overall feel:

* Similar to modern clinical filtering / triage UI
* Balanced whitespace
* Clear hierarchy

---

# SCREEN 4 — OBSESSIONS

Use same exact **3-column layout** as Symptoms screen for consistency.

Title: **Obsessions**

Instruction block:
“Assess the presence of obsessive thoughts, images, or impulses experienced by the patient. These are typically unwanted, distressing, and intrusive. Identify both current and past symptoms, and indicate which are most prominent for assessment.”

Left sidebar categories:

* Aggressive
* Contamination
* Sexual
* Hoarding/Saving
* Religious (Scrupulosity)
* Symmetry/Exactness
* Miscellaneous
* Somatic

Center panel:
Create checklist rows using example obsession items from Y-BOCS, such as:

* Fear might harm self
* Fear might harm others
* Violent or horrific images
* Concern with dirt or germs
* Need for symmetry
* Lucky/unlucky numbers
* Concern with illness or disease

Each row includes:

* Checkbox
* Current
* Past
* Primary

Right panel:
Selected obsessions summary

---

# SCREEN 5 — COMPULSIONS

Use same exact layout as Symptoms and Obsessions.

Title: **Compulsions**

Instruction block:
“Assess compulsive behaviors or mental acts that the patient feels driven to perform in response to obsessions or according to rigid rules. These behaviors are typically aimed at reducing anxiety or preventing feared outcomes, even if they are recognized as excessive or unrealistic. Identify current and past compulsions and note those that are most prominent.”

Left sidebar categories:

* Cleaning/Washing
* Checking
* Repeating
* Counting
* Ordering/Arranging
* Hoarding/Collecting
* Miscellaneous

Center panel:
Sample compulsion items:

* Excessive handwashing
* Cleaning objects
* Checking locks or appliances
* Checking that no harm occurred
* Re-reading or re-writing
* Counting compulsions
* Ordering/arranging
* Mental rituals
* Need to confess
* Touching/tapping rituals

Same row behavior:

* Checkbox
* Current
* Past
* Primary

Right panel:
Selected compulsions summary

---

# SCREEN 6 — AVOIDANCE

Use same exact 3-column layout for full consistency.

Title: **Avoidance**

Instruction block:
“Evaluate avoidance behaviors used to reduce exposure to triggers associated with obsessions or compulsions. Identify behaviors that limit functioning or are used in place of rituals, and include them as part of the overall symptom profile.”

Add small helper text:
“Avoidance may reduce visible compulsions but still indicates severity.”

Left sidebar:
Single category or simple group:

* Avoidance Behaviors

Center panel:
Sample avoidance items:

* Avoids doing things, going places, or being with someone because of obsessions
* Avoids contact with contaminated objects or people
* Avoids handling sharp or dangerous objects
* Avoids contact with people, children, or animals because of unwanted impulses
* Avoids talking or writing for fear of saying the wrong thing
* Avoids watching TV, using the internet, or reading to shield from triggers
* Avoids situations that trigger time-consuming rituals

Same row behavior:

* Checkbox
* Current
* Past
* Primary

Right panel:
Selected avoidance summary

---

# SCREEN 7 — TARGET SYMPTOMS

Use a 3-column desktop layout.

Header:

* Back
* Title: **Target Symptoms**
* Continue

Instruction block:
“Select and prioritize the most prominent symptoms identified during the checklist. Choose up to three obsessions, compulsions, and avoidance behaviors that best represent the patient’s current condition. These will be used for severity rating and ongoing tracking.”

Left sidebar:
Category counts:

* Obsessions (x/3)
* Compulsions (x/3)
* Avoidance (x/3)

Center panel:
Create a prioritization workspace with three stacked sections:

1. Obsessions
2. Compulsions
3. Avoidance

Each section should support ranked items 1–3 using draggable cards.
Each card should show:

* Drag handle
* Rank number
* Symptom label
* Remove action

Right panel:
Available selected symptoms from prior screens with add buttons

Goal:
This screen should feel like a structured prioritization step before scoring.

---

# SCREEN 8 — SEVERITY INTERVIEW / SCORING

This is the most important screen.

Use a **3-column guided interview layout**:

* Left sidebar: section navigation + target symptoms
* Center: active question card
* Right: live score summary

Header:

* Back
* Title: **Severity Interview**
* Subtitle: **Y-BOCS Scoring**
* Continue

Left sidebar:
Show sections with progress:

* Obsessions
* Compulsions
* Insight

Also show target symptoms reference grouped by:

* Obsessions
* Compulsions
* Avoidance

Center panel:
Use **one question at a time** format.
Create an instruction card above the question when relevant.
For obsessions, include script like:
“I am now going to ask several questions about your obsessive thoughts.”

Show active question card example:
Section label: **Obsessions • Question 1 of 6**
Question title: **Time Occupied by Obsessive Thoughts**
Prompt:
“How much of your time is occupied by obsessive thoughts?”

IMPORTANT:
Use a **vertical scoring selector**, not horizontal pills.

Each score option should appear as a full-width selectable row with:

* radio button
* number
* label
* definition beneath label

Example:

* 0 — None
  No symptoms
* 1 — Mild
  Less than 1 hour/day or occasional intrusion
* 2 — Moderate
  1–3 hours/day or frequent intrusion
* 3 — Severe
  Greater than 3 and up to 8 hours/day or very frequent intrusion
* 4 — Extreme
  Greater than 8 hours/day or near constant intrusion

Below selector:

* Optional notes field

Bottom of center panel:

* Previous
* Next Question

Right sidebar:
Live score summary card showing:

* Total score
* Obsessions subtotal
* Compulsions subtotal
* Not-counted items (1b, 6b, 11)
* Progress bar

Use this same vertical-definition selector pattern for all scoring questions.

Question groups:
Obsessions:

1. Time occupied
   1b. Obsession-free interval (not scored)
2. Interference
3. Distress
4. Resistance
5. Control

Compulsions:
6. Time spent
6b. Compulsion-free interval (not scored)
7. Interference
8. Distress if prevented
9. Resistance
10. Control

Insight:
11. Insight into obsessions and compulsions

For Insight, use same vertical scoring style with labels:

* 0 Excellent
* 1 Good
* 2 Fair
* 3 Poor
* 4 Absent / Delusional

Overall design goal:
A guided clinical interview interface, not a spreadsheet.

---

# SCREEN 9 — RESULTS

Create a results summary screen in a clean clinical dashboard style.

Title: **Assessment Results**

Display:

* Total Y-BOCS score
* Obsessions subtotal
* Compulsions subtotal
* Insight score

Add a visual score interpretation card:

* 0–7 Subclinical
* 8–15 Mild
* 16–23 Moderate
* 24–31 Severe
* 32–40 Extreme

Add a summary section for target symptoms:

* Top obsessions
* Top compulsions
* Top avoidance behaviors

Add action buttons:

* View Full Report
* Download PDF
* Save to EHR

This screen should feel analytical, clear, and clinician-friendly.

---

# SCREEN 10 — CONFIRMATION

Create a clean completion screen.

Title: **Assessment Complete**

Centered success state with:

* Success icon
* Message: **Y-BOCS Assessment Saved**

Add a summary card:

* Patient name
* Date
* Clinician
* Total score
* Severity label

Add score breakdown card:

* Obsessions
* Compulsions
* Insight

Add target symptoms card:

* List selected target symptoms by category

Add actions:

* Download PDF
* Save to EHR
* View Full Report
* Start New Assessment

Use a simple centered completion layout, not the 3-column working layout.

---

## Navigation and prototype behavior

Connect all screens in a logical linear flow:
1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

Maintain consistent header, spacing, and visual language throughout.
Use realistic placeholder data where useful.
Make the prototype feel polished and investor/client-ready.
Prioritize **clarity, clinical trust, and workflow consistency** over visual decoration.
