export const obsessionCategories = [
  {
    id: 'aggressive',
    name: 'Aggressive',
    items: [
      { id: 'obs-1', label: 'Fear might harm self' },
      { id: 'obs-2', label: 'Fear might harm others' },
      { id: 'obs-3', label: 'Violent or horrific images' },
      { id: 'obs-4', label: 'Fear of blurting out obscenities or insults' },
      { id: 'obs-5', label: 'Fear of doing something embarrassing' },
    ],
  },
  {
    id: 'contamination',
    name: 'Contamination',
    items: [
      { id: 'obs-6', label: 'Concern with dirt or germs' },
      { id: 'obs-7', label: 'Concern with bodily waste or secretions' },
      { id: 'obs-8', label: 'Concern with environmental contaminants' },
      { id: 'obs-9', label: 'Concern with household items' },
      { id: 'obs-10', label: 'Concern with animals or insects' },
    ],
  },
  {
    id: 'sexual',
    name: 'Sexual',
    items: [
      { id: 'obs-11', label: 'Forbidden or perverse sexual thoughts, images, or impulses' },
      { id: 'obs-12', label: 'Sexual obsessions involving children or incest' },
      { id: 'obs-13', label: 'Obsessions about homosexuality' },
    ],
  },
  {
    id: 'hoarding',
    name: 'Hoarding/Saving',
    items: [
      { id: 'obs-14', label: 'Difficulty discarding objects' },
      { id: 'obs-15', label: 'Excessive acquisition of items' },
    ],
  },
  {
    id: 'religious',
    name: 'Religious (Scrupulosity)',
    items: [
      { id: 'obs-16', label: 'Concern with sacrilege or blasphemy' },
      { id: 'obs-17', label: 'Excessive concern with right/wrong or morality' },
    ],
  },
  {
    id: 'symmetry',
    name: 'Symmetry/Exactness',
    items: [
      { id: 'obs-18', label: 'Need for symmetry or evenness' },
      { id: 'obs-19', label: 'Lucky/unlucky numbers' },
      { id: 'obs-20', label: 'Colors with special significance' },
      { id: 'obs-21', label: 'Superstitious fears' },
    ],
  },
  {
    id: 'miscellaneous',
    name: 'Miscellaneous',
    items: [
      { id: 'obs-22', label: 'Need to know or remember' },
      { id: 'obs-23', label: 'Fear of saying certain things' },
      { id: 'obs-24', label: 'Fear of not saying just the right thing' },
      { id: 'obs-25', label: 'Intrusive (nonviolent) images' },
      { id: 'obs-26', label: 'Intrusive nonsense sounds, words, or music' },
    ],
  },
  {
    id: 'somatic',
    name: 'Somatic',
    items: [
      { id: 'obs-27', label: 'Concern with illness or disease' },
      { id: 'obs-28', label: 'Excessive concern with body part or appearance' },
    ],
  },
];

export const compulsionCategories = [
  {
    id: 'cleaning',
    name: 'Cleaning/Washing',
    items: [
      { id: 'comp-1', label: 'Excessive handwashing' },
      { id: 'comp-2', label: 'Excessive showering, bathing, toothbrushing, grooming' },
      { id: 'comp-3', label: 'Cleaning objects or household items' },
      { id: 'comp-4', label: 'Other measures to prevent contact with contaminants' },
    ],
  },
  {
    id: 'checking',
    name: 'Checking',
    items: [
      { id: 'comp-5', label: 'Checking locks, stove, appliances, etc.' },
      { id: 'comp-6', label: 'Checking that did not/will not harm others' },
      { id: 'comp-7', label: 'Checking that did not/will not harm self' },
      { id: 'comp-8', label: 'Checking that nothing terrible did/will happen' },
      { id: 'comp-9', label: 'Checking that did not make a mistake' },
    ],
  },
  {
    id: 'repeating',
    name: 'Repeating',
    items: [
      { id: 'comp-10', label: 'Re-reading or re-writing' },
      { id: 'comp-11', label: 'Repeating routine activities' },
    ],
  },
  {
    id: 'counting',
    name: 'Counting',
    items: [
      { id: 'comp-12', label: 'Counting compulsions' },
    ],
  },
  {
    id: 'ordering',
    name: 'Ordering/Arranging',
    items: [
      { id: 'comp-13', label: 'Ordering/arranging objects' },
      { id: 'comp-14', label: 'Symmetry/evening up behaviors' },
    ],
  },
  {
    id: 'hoarding-comp',
    name: 'Hoarding/Collecting',
    items: [
      { id: 'comp-15', label: 'Difficulty discarding objects' },
      { id: 'comp-16', label: 'Collecting or saving objects' },
    ],
  },
  {
    id: 'miscellaneous-comp',
    name: 'Miscellaneous',
    items: [
      { id: 'comp-17', label: 'Mental rituals (other than checking/counting)' },
      { id: 'comp-18', label: 'Need to tell, ask, or confess' },
      { id: 'comp-19', label: 'Need to touch, tap, or rub' },
      { id: 'comp-20', label: 'Rituals involving blinking or staring' },
      { id: 'comp-21', label: 'Measures to prevent harm to self/others' },
      { id: 'comp-22', label: 'Ritualized eating behaviors' },
      { id: 'comp-23', label: 'Superstitious behaviors' },
      { id: 'comp-24', label: 'Trichotillomania (hair pulling)' },
    ],
  },
];

export const avoidanceCategories = [
  {
    id: 'avoidance',
    name: 'Avoidance Behaviors',
    items: [
      { id: 'avoid-1', label: 'Avoids doing things, going places, or being with someone because of obsessions' },
      { id: 'avoid-2', label: 'Avoids contact with contaminated objects or people' },
      { id: 'avoid-3', label: 'Avoids handling sharp or dangerous objects' },
      { id: 'avoid-4', label: 'Avoids contact with people, children, or animals because of unwanted impulses' },
      { id: 'avoid-5', label: 'Avoids talking or writing for fear of saying the wrong thing' },
      { id: 'avoid-6', label: 'Avoids watching TV, using the internet, or reading to shield from triggers' },
      { id: 'avoid-7', label: 'Avoids situations that trigger time-consuming rituals' },
      { id: 'avoid-8', label: 'Avoids certain numbers, colors, or words' },
    ],
  },
];

export const scoringQuestions = [
  {
    id: '1',
    section: 'Obsessions',
    title: 'Time Occupied by Obsessive Thoughts',
    prompt: 'How much of your time is occupied by obsessive thoughts?',
    instruction: 'I am now going to ask several questions about your obsessive thoughts.',
    options: [
      { value: 0, label: 'None', description: 'No symptoms' },
      { value: 1, label: 'Mild', description: 'Less than 1 hour/day or occasional intrusion' },
      { value: 2, label: 'Moderate', description: '1–3 hours/day or frequent intrusion' },
      { value: 3, label: 'Severe', description: 'Greater than 3 and up to 8 hours/day or very frequent intrusion' },
      { value: 4, label: 'Extreme', description: 'Greater than 8 hours/day or near constant intrusion' },
    ],
    scored: true,
  },
  {
    id: '1b',
    section: 'Obsessions',
    title: 'Obsession-Free Interval',
    prompt: 'On average, what is the longest number of consecutive waking hours per day that you are completely free of obsessive thoughts?',
    options: [
      { value: 0, label: 'No symptoms', description: 'Complete freedom from obsessions' },
      { value: 1, label: 'Long symptom-free interval', description: 'More than 8 consecutive hours/day symptom-free' },
      { value: 2, label: 'Moderately long symptom-free interval', description: 'More than 3 and up to 8 consecutive hours/day symptom-free' },
      { value: 3, label: 'Short symptom-free interval', description: 'From 1 to 3 consecutive hours/day symptom-free' },
      { value: 4, label: 'Extremely short symptom-free interval', description: 'Less than 1 consecutive hour/day symptom-free' },
    ],
    scored: false,
  },
  {
    id: '2',
    section: 'Obsessions',
    title: 'Interference from Obsessive Thoughts',
    prompt: 'How much do your obsessive thoughts interfere with your social or work (or role) functioning?',
    options: [
      { value: 0, label: 'None', description: 'No interference' },
      { value: 1, label: 'Mild', description: 'Slight interference, but overall performance not impaired' },
      { value: 2, label: 'Moderate', description: 'Definite interference, but still manageable' },
      { value: 3, label: 'Severe', description: 'Causes substantial impairment' },
      { value: 4, label: 'Extreme', description: 'Incapacitating' },
    ],
    scored: true,
  },
  {
    id: '3',
    section: 'Obsessions',
    title: 'Distress Associated with Obsessive Thoughts',
    prompt: 'How much distress do your obsessive thoughts cause you?',
    options: [
      { value: 0, label: 'None', description: 'No distress' },
      { value: 1, label: 'Mild', description: 'Not too disturbing' },
      { value: 2, label: 'Moderate', description: 'Disturbing, but still manageable' },
      { value: 3, label: 'Severe', description: 'Very disturbing' },
      { value: 4, label: 'Extreme', description: 'Near constant and disabling distress' },
    ],
    scored: true,
  },
  {
    id: '4',
    section: 'Obsessions',
    title: 'Resistance Against Obsessions',
    prompt: 'How much of an effort do you make to resist the obsessive thoughts?',
    options: [
      { value: 0, label: 'Makes an effort to always resist', description: 'Or symptoms so minimal doesn\'t need to actively resist' },
      { value: 1, label: 'Tries to resist most of the time', description: '' },
      { value: 2, label: 'Makes some effort to resist', description: '' },
      { value: 3, label: 'Yields to all obsessions without attempting to control them', description: 'But does so with some reluctance' },
      { value: 4, label: 'Completely and willingly yields to all obsessions', description: '' },
    ],
    scored: true,
  },
  {
    id: '5',
    section: 'Obsessions',
    title: 'Degree of Control Over Obsessive Thoughts',
    prompt: 'How much control do you have over your obsessive thoughts?',
    options: [
      { value: 0, label: 'Complete control', description: '' },
      { value: 1, label: 'Much control', description: 'Usually able to stop or divert obsessions with some effort and concentration' },
      { value: 2, label: 'Moderate control', description: 'Sometimes able to stop or divert obsessions' },
      { value: 3, label: 'Little control', description: 'Rarely successful in stopping or dismissing obsessions, can only divert attention with difficulty' },
      { value: 4, label: 'No control', description: 'Experienced as completely involuntary, rarely able to even momentarily alter obsessive thinking' },
    ],
    scored: true,
  },
  {
    id: '6',
    section: 'Compulsions',
    title: 'Time Spent Performing Compulsive Behaviors',
    prompt: 'How much time do you spend performing compulsive behaviors?',
    instruction: 'The next several questions are about your compulsive behaviors.',
    options: [
      { value: 0, label: 'None', description: 'No symptoms' },
      { value: 1, label: 'Mild', description: 'Less than 1 hour/day or occasional performance' },
      { value: 2, label: 'Moderate', description: '1–3 hours/day or frequent performance' },
      { value: 3, label: 'Severe', description: 'Greater than 3 and up to 8 hours/day or very frequent performance' },
      { value: 4, label: 'Extreme', description: 'Greater than 8 hours/day or near constant performance' },
    ],
    scored: true,
  },
  {
    id: '6b',
    section: 'Compulsions',
    title: 'Compulsion-Free Interval',
    prompt: 'On average, what is the longest number of consecutive waking hours per day that you are completely free of compulsive behavior?',
    options: [
      { value: 0, label: 'No symptoms', description: 'Complete freedom from compulsions' },
      { value: 1, label: 'Long symptom-free interval', description: 'More than 8 consecutive hours/day symptom-free' },
      { value: 2, label: 'Moderately long symptom-free interval', description: 'More than 3 and up to 8 consecutive hours/day symptom-free' },
      { value: 3, label: 'Short symptom-free interval', description: 'From 1 to 3 consecutive hours/day symptom-free' },
      { value: 4, label: 'Extremely short symptom-free interval', description: 'Less than 1 consecutive hour/day symptom-free' },
    ],
    scored: false,
  },
  {
    id: '7',
    section: 'Compulsions',
    title: 'Interference from Compulsive Behaviors',
    prompt: 'How much do your compulsive behaviors interfere with your social or work (or role) functioning?',
    options: [
      { value: 0, label: 'None', description: 'No interference' },
      { value: 1, label: 'Mild', description: 'Slight interference, but overall performance not impaired' },
      { value: 2, label: 'Moderate', description: 'Definite interference, but still manageable' },
      { value: 3, label: 'Severe', description: 'Causes substantial impairment' },
      { value: 4, label: 'Extreme', description: 'Incapacitating' },
    ],
    scored: true,
  },
  {
    id: '8',
    section: 'Compulsions',
    title: 'Distress if Compulsions Prevented',
    prompt: 'How would you feel if prevented from performing your compulsion(s)?',
    options: [
      { value: 0, label: 'None', description: 'No distress' },
      { value: 1, label: 'Mild', description: 'Only slightly anxious if compulsions prevented' },
      { value: 2, label: 'Moderate', description: 'Anxiety would mount but remain manageable if compulsions prevented' },
      { value: 3, label: 'Severe', description: 'Prominent and very disturbing increase in anxiety if compulsions prevented' },
      { value: 4, label: 'Extreme', description: 'Incapacitating anxiety from any intervention aimed at modifying activity' },
    ],
    scored: true,
  },
  {
    id: '9',
    section: 'Compulsions',
    title: 'Resistance Against Compulsions',
    prompt: 'How much of an effort do you make to resist the compulsions?',
    options: [
      { value: 0, label: 'Makes an effort to always resist', description: 'Or symptoms so minimal doesn\'t need to actively resist' },
      { value: 1, label: 'Tries to resist most of the time', description: '' },
      { value: 2, label: 'Makes some effort to resist', description: '' },
      { value: 3, label: 'Yields to all compulsions without attempting to control them', description: 'But does so with some reluctance' },
      { value: 4, label: 'Completely and willingly yields to all compulsions', description: '' },
    ],
    scored: true,
  },
  {
    id: '10',
    section: 'Compulsions',
    title: 'Degree of Control Over Compulsive Behavior',
    prompt: 'How strong is the drive to perform the compulsive behavior?',
    options: [
      { value: 0, label: 'Complete control', description: '' },
      { value: 1, label: 'Much control', description: 'Pressure to perform the behavior but usually able to exercise voluntary control' },
      { value: 2, label: 'Moderate control', description: 'Strong pressure to perform behavior, can control it only with difficulty' },
      { value: 3, label: 'Little control', description: 'Very strong drive to perform behavior, must be carried to completion, can only delay with difficulty' },
      { value: 4, label: 'No control', description: 'Drive to perform behavior experienced as completely involuntary and overpowering, rarely able to even momentarily delay activity' },
    ],
    scored: true,
  },
  {
    id: '11',
    section: 'Insight',
    title: 'Insight into Obsessions and Compulsions',
    prompt: 'Do you think your concerns or behaviors are reasonable?',
    instruction: 'The final question concerns your insight into your symptoms.',
    options: [
      { value: 0, label: 'Excellent insight', description: 'Fully rational' },
      { value: 1, label: 'Good insight', description: 'Readily acknowledges absurdity or excessiveness of thoughts or behaviors but does not seem completely convinced' },
      { value: 2, label: 'Fair insight', description: 'Reluctantly admits thoughts or behavior seem unreasonable or excessive, but wavers' },
      { value: 3, label: 'Poor insight', description: 'Maintains thoughts or behaviors are not unreasonable or excessive, but acknowledges validity of contrary evidence' },
      { value: 4, label: 'Absent insight/Delusional', description: 'Definitely convinced that concerns and behavior are reasonable, unresponsive to contrary evidence' },
    ],
    scored: false,
  },
];

export function calculateScores(scores: { questionId: string; score: number }[]) {
  const obsessionQuestions = ['1', '2', '3', '4', '5'];
  const compulsionQuestions = ['6', '7', '8', '9', '10'];
  
  const obsessionsTotal = obsessionQuestions.reduce((sum, id) => {
    const answer = scores.find((s) => s.questionId === id);
    return sum + (answer?.score || 0);
  }, 0);
  
  const compulsionsTotal = compulsionQuestions.reduce((sum, id) => {
    const answer = scores.find((s) => s.questionId === id);
    return sum + (answer?.score || 0);
  }, 0);
  
  const totalScore = obsessionsTotal + compulsionsTotal;
  
  const insightScore = scores.find((s) => s.questionId === '11')?.score;
  
  let severity = 'Subclinical';
  if (totalScore >= 32) severity = 'Extreme';
  else if (totalScore >= 24) severity = 'Severe';
  else if (totalScore >= 16) severity = 'Moderate';
  else if (totalScore >= 8) severity = 'Mild';
  
  return {
    totalScore,
    obsessionsTotal,
    compulsionsTotal,
    insightScore,
    severity,
  };
}
