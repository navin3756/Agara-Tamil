export const combineWordAndCase = (word: string, caseCode: string): string => {
  if (caseCode === 'first') return word;

  // 1. Words ending in 'ம்' (e.g., Maram)
  // Rule: Remove 'm', add 'th' stem, then apply suffix.
  // Result: Maram -> Maraththai (மரத்தை)
  if (word.endsWith('ம்')) {
    const stem = word.substring(0, word.length - 2); // remove ம்
    const base = stem + 'த்';
    if (caseCode === 'ai') return base + 'தை';
    if (caseCode === 'aal') return base + 'தால்';
    if (caseCode === 'odu') return base + 'தோடு';
    if (caseCode === 'udan') return base + 'துடன்';
    if (caseCode === 'ku') return base + 'திற்கு'; 
    if (caseCode === 'in') return base + 'தின்';
    if (caseCode === 'adhu') return base + 'தினது';
    if (caseCode === 'udaiya') return base + 'துடைய';
    if (caseCode === 'il') return base + 'தில்';
    if (caseCode === 'idam') return base + 'திடம்';
    if (caseCode === 'vili') return stem + 'மே'; // Marame
  }

  // 2. Words ending in 'டு' (e.g., Kadu, Veedu)
  // Rule: Convert 'du' to 'tt' stem.
  // Result: Kadu -> Kattai (காட்டை)
  if (word.endsWith('டு')) {
    const stem = word.substring(0, word.length - 2);
    const base = stem + 'ட்';
    if (caseCode === 'ai') return base + 'டை';
    if (caseCode === 'aal') return base + 'டால்';
    if (caseCode === 'odu') return base + 'டோடு';
    if (caseCode === 'ku') return base + 'டுக்கு'; // Kattukku
    if (caseCode === 'in') return base + 'டின்';
    if (caseCode === 'adhu') return base + 'டினது';
    if (caseCode === 'il') return base + 'டில்';
    if (caseCode === 'vili') return word + 'வே';
  }

  // 3. Words ending in 'று' (e.g., Aaru)
  // Rule: Convert 'ru' to 'rr' stem.
  // Result: Aaru -> Aatrai (ஆற்றை)
  if (word.endsWith('று')) {
    const stem = word.substring(0, word.length - 2);
    const base = stem + 'ற்';
    if (caseCode === 'ai') return base + 'றை';
    if (caseCode === 'aal') return base + 'றால்';
    if (caseCode === 'odu') return base + 'றோடு';
    if (caseCode === 'ku') return base + 'றுக்கு';
    if (caseCode === 'in') return base + 'றின்';
    if (caseCode === 'adhu') return base + 'றினது';
    if (caseCode === 'il') return base + 'றில்';
    if (caseCode === 'vili') return word + 'வே';
  }

  // 4. Words ending in 'ன்' (e.g., Nanban, Maan)
  // Rule: Combine directly usually, but check for specific glides if needed.
  if (word.endsWith('ன்')) {
    const stem = word.substring(0, word.length - 2);
    if (caseCode === 'ai') return stem + 'னை';
    if (caseCode === 'aal') return stem + 'னால்';
    if (caseCode === 'odu') return stem + 'னோடு';
    if (caseCode === 'ku') return stem + 'னுக்கு';
    if (caseCode === 'in') return stem + 'னின்'; 
    if (caseCode === 'adhu') return stem + 'னது';
    if (caseCode === 'il') return stem + 'னில்'; 
    if (caseCode === 'vili') return stem + 'னே';
  }

  // 5. Words ending in 'ண்' (e.g., Kan)
  // Rule: Double the 'n' (Retroflex) for suffixes.
  if (word.endsWith('ண்')) {
    const stem = word.substring(0, word.length - 2);
    if (caseCode === 'ai') return stem + 'ண்ணை';
    if (caseCode === 'aal') return stem + 'ண்ணால்';
    if (caseCode === 'odu') return stem + 'ண்ணோடு';
    if (caseCode === 'ku') return stem + 'ண்ணுக்கு';
    if (caseCode === 'in') return stem + 'ண்ணின்';
    if (caseCode === 'adhu') return stem + 'ண்ணது';
    if (caseCode === 'il') return stem + 'ண்ணில்';
    if (caseCode === 'vili') return stem + 'ணே';
  }

  // 6. Words ending in 'ய்' (e.g., Naai)
  // Rule: 'y' ending usually takes suffixes naturally, doubling 'k' for ku.
  if (word.endsWith('ய்')) {
    const stem = word.substring(0, word.length - 2);
    if (caseCode === 'ai') return stem + 'யை';
    if (caseCode === 'aal') return stem + 'யால்';
    if (caseCode === 'odu') return stem + 'யோடு';
    if (caseCode === 'ku') return word + 'க்கு'; // Naaikku
    if (caseCode === 'in') return stem + 'யின்';
    if (caseCode === 'adhu') return stem + 'யினது';
    if (caseCode === 'il') return stem + 'யில்';
    if (caseCode === 'vili') return stem + 'யே';
  }

  // 7. Kutriyalukaram (Words ending in u sound that shorten) - ku, su, du, thu, bu, ru
  // Specifically: ku, su, thu, bu (du, ru handled above).
  // Example: Kurangu (Monkey), Pandhu (Ball).
  // Rule: Drop 'u', add vowel suffix. For 'ku', add 'kku'.
  if (word.endsWith('கு') || word.endsWith('சு') || word.endsWith('து') || word.endsWith('பு')) {
    const stem = word.substring(0, word.length - 2); // Remove last char
    
    // Find base consonant
    let cons = '';
    if (word.endsWith('கு')) cons = 'க';
    else if (word.endsWith('சு')) cons = 'ச';
    else if (word.endsWith('து')) cons = 'த';
    else if (word.endsWith('பு')) cons = 'ப';

    if (caseCode === 'ai') return stem + cons + 'ை'; // Pandh + ai -> Pandhai
    if (caseCode === 'aal') return stem + cons + 'ால்'; // Pandhaal
    if (caseCode === 'odu') return stem + cons + 'ோடு'; // Pandhodu
    if (caseCode === 'ku') return word + 'க்கு'; // Pandhukku
    if (caseCode === 'in') return stem + cons + 'ின்'; // Pandhin
    if (caseCode === 'adhu') return stem + cons + 'ினது'; // Pandhinadhu
    if (caseCode === 'il') return stem + cons + 'ில்'; // Pandhil
    if (caseCode === 'vili') return stem + cons + 'ே'; // Pandhe
  }

  // 8. Vowel Endings - 'i', 'ai', 'ii' (Palli, Malai, Nandri, Udhavi)
  // Rule: Add 'y' (Ya-garam) glide.
  // Result: Palli -> Palliyai, Nandri -> Nandrikku
  if (word.endsWith('ி') || word.endsWith('ை') || word.endsWith('ீ')) {
    if (caseCode === 'ai') return word + 'யை';
    if (caseCode === 'aal') return word + 'யால்';
    if (caseCode === 'odu') return word + 'யோடு';
    if (caseCode === 'ku') return word + 'க்கு'; // Strong K usually (Pallikku)
    if (caseCode === 'in') return word + 'யின்';
    if (caseCode === 'adhu') return word + 'யினது';
    if (caseCode === 'il') return word + 'யில்';
    if (caseCode === 'vili') return word + 'யே';
  }

  // 9. Vowel Endings - 'a', 'aa', 'u' (non-shortening), 'oo', 'e', 'ae' (Amma, Appa)
  // Rule: Add 'v' (Va-garam) glide.
  // Result: Amma -> Ammavai, Ammavaal
  if (word.endsWith('ா') || word.endsWith('ூ') || word.endsWith('ே') || word.endsWith('ோ')) {
     if (caseCode === 'ai') return word + 'வை';
     if (caseCode === 'aal') return word + 'வால்';
     if (caseCode === 'odu') return word + 'வோடு';
     if (caseCode === 'ku') return word + 'வுக்கு'; // Ammavukku
     if (caseCode === 'in') return word + 'வின்';
     if (caseCode === 'adhu') return word + 'வினது';
     if (caseCode === 'il') return word + 'வில்';
     if (caseCode === 'vili') return word + 'வே';
  }

  // Fallback / Soft joiners
  if (caseCode === 'ai') return word + 'ஐ';
  if (caseCode === 'aal') return word + 'ஆல்';
  if (caseCode === 'odu') return word + 'ஓடு';
  if (caseCode === 'ku') return word + 'கு';
  if (caseCode === 'in') return word + 'இன்';
  if (caseCode === 'adhu') return word + 'அது';
  if (caseCode === 'il') return word + 'இல்';
  if (caseCode === 'vili') return word + 'ஏ';

  return word;
};

export const getTamilCaseSuffix = (caseCode: string): string => {
  switch (caseCode) {
    case 'first': return ' (1st - No suffix)';
    case 'ai': return 'ஐ (2nd)';
    case 'aal': return 'ஆல் (3rd)';
    case 'odu': return 'ஓடு (3rd)';
    case 'ku': return 'கு (4th)';
    case 'in': return 'இன் (5th)';
    case 'adhu': return 'அது (6th)';
    case 'il': return 'இல் (7th)';
    case 'vili': return 'ஏ (8th - Vocative)';
    default: return '';
  }
};