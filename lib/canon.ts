export type BookInfo = {
  id: string
  en: string
  fr: string
  testament: "OT" | "NT"
  chapters: number
  aliases: string[]
}

const raw: Array<[string, string, string, "OT" | "NT", number, string[]]> = [
  ["Gen","Genesis","Genèse","OT",50,["gen","gn","genesis","genese"]],
  ["Exod","Exodus","Exode","OT",40,["exod","ex","exo","exodus","exode"]],
  ["Lev","Leviticus","Lévitique","OT",27,["lev","lv","leviticus","levitique"]],
  ["Num","Numbers","Nombres","OT",36,["num","nb","numbers","nombres"]],
  ["Deut","Deuteronomy","Deutéronome","OT",34,["deut","dt","deuteronomy","deuteronome"]],
  ["Josh","Joshua","Josué","OT",24,["josh","jos","joshua","josue"]],
  ["Judg","Judges","Juges","OT",21,["judg","jdg","judges","juges"]],
  ["Ruth","Ruth","Ruth","OT",4,["ruth","rt"]],
  ["1Sam","1 Samuel","1 Samuel","OT",31,["1 sam","1sam","1 samuel","i samuel","i sam"]],
  ["2Sam","2 Samuel","2 Samuel","OT",24,["2 sam","2sam","2 samuel","ii samuel","ii sam"]],
  ["1Kgs","1 Kings","1 Rois","OT",22,["1 kgs","1kgs","1 kings","1 rois","1 roi","i kings","i rois"]],
  ["2Kgs","2 Kings","2 Rois","OT",25,["2 kgs","2kgs","2 kings","2 rois","ii kings","ii rois"]],
  ["1Chr","1 Chronicles","1 Chroniques","OT",29,["1 chr","1chr","1 chronicles","1 chroniques","1 chronique"]],
  ["2Chr","2 Chronicles","2 Chroniques","OT",36,["2 chr","2chr","2 chronicles","2 chroniques"]],
  ["Ezra","Ezra","Esdras","OT",10,["ezra","esdras","esd"]],
  ["Neh","Nehemiah","Néhémie","OT",13,["neh","nehemiah","nehemie"]],
  ["Esth","Esther","Esther","OT",10,["esth","esther","est"]],
  ["Job","Job","Job","OT",42,["job"]],
  ["Ps","Psalms","Psaumes","OT",150,["ps","psa","psalm","psalms","psaume","psaumes"]],
  ["Prov","Proverbs","Proverbes","OT",31,["prov","proverbs","proverbe","proverbes"]],
  ["Eccl","Ecclesiastes","Ecclésiaste","OT",12,["eccl","ecclesiastes","ecclesiaste"]],
  ["Song","Song of Solomon","Cantique des Cantiques","OT",8,["song","song of solomon","song of songs","cantique","cantique des cantiques","cantiques"]],
  ["Isa","Isaiah","Ésaïe","OT",66,["isa","is","isaiah","esaie","esaïe"]],
  ["Jer","Jeremiah","Jérémie","OT",52,["jer","jeremiah","jeremie"]],
  ["Lam","Lamentations","Lamentations","OT",5,["lam","lamentations"]],
  ["Ezek","Ezekiel","Ézéchiel","OT",48,["ezek","ezk","ezekiel","ezechiel"]],
  ["Dan","Daniel","Daniel","OT",12,["dan","daniel"]],
  ["Hos","Hosea","Osée","OT",14,["hos","hosea","osee"]],
  ["Joel","Joel","Joël","OT",3,["joel"]],
  ["Amos","Amos","Amos","OT",9,["amos"]],
  ["Obad","Obadiah","Abdias","OT",1,["obad","obadiah","abdias"]],
  ["Jonah","Jonah","Jonas","OT",4,["jonah","jonas"]],
  ["Mic","Micah","Michée","OT",7,["mic","micah","michee"]],
  ["Nah","Nahum","Nahum","OT",3,["nah","nahum"]],
  ["Hab","Habakkuk","Habacuc","OT",3,["hab","habakkuk","habacuc"]],
  ["Zeph","Zephaniah","Sophonie","OT",3,["zeph","zephaniah","sophonie"]],
  ["Hag","Haggai","Aggée","OT",2,["hag","haggai","aggee"]],
  ["Zech","Zechariah","Zacharie","OT",14,["zech","zechariah","zacharie"]],
  ["Mal","Malachi","Malachie","OT",4,["mal","malachi","malachie"]],
  ["Matt","Matthew","Matthieu","NT",28,["matt","mt","matthew","matthieu","mat"]],
  ["Mark","Mark","Marc","NT",16,["mark","mk","marc","mr"]],
  ["Luke","Luke","Luc","NT",24,["luke","lk","luc"]],
  ["John","John","Jean","NT",21,["john","jn","joh","jean"]],
  ["Acts","Acts","Actes","NT",28,["acts","actes","ac"]],
  ["Rom","Romans","Romains","NT",16,["rom","romans","romains"]],
  ["1Cor","1 Corinthians","1 Corinthiens","NT",16,["1 cor","1cor","1 corinthians","1 corinthiens"]],
  ["2Cor","2 Corinthians","2 Corinthiens","NT",13,["2 cor","2cor","2 corinthians","2 corinthiens"]],
  ["Gal","Galatians","Galates","NT",6,["gal","galatians","galates"]],
  ["Eph","Ephesians","Éphésiens","NT",6,["eph","ephesians","ephesiens"]],
  ["Phil","Philippians","Philippiens","NT",4,["phil","philippians","philippiens"]],
  ["Col","Colossians","Colossiens","NT",4,["col","colossians","colossiens"]],
  ["1Thess","1 Thessalonians","1 Thessaloniciens","NT",5,["1 thess","1thess","1 thessalonians","1 thessaloniciens"]],
  ["2Thess","2 Thessalonians","2 Thessaloniciens","NT",3,["2 thess","2thess","2 thessalonians","2 thessaloniciens"]],
  ["1Tim","1 Timothy","1 Timothée","NT",6,["1 tim","1tim","1 timothy","1 timothee"]],
  ["2Tim","2 Timothy","2 Timothée","NT",4,["2 tim","2tim","2 timothy","2 timothee"]],
  ["Titus","Titus","Tite","NT",3,["titus","tite"]],
  ["Phlm","Philemon","Philémon","NT",1,["phlm","philemon","philem","philemon"]],
  ["Heb","Hebrews","Hébreux","NT",13,["heb","hebrews","hebreux"]],
  ["Jas","James","Jacques","NT",5,["jas","james","jacques","jac"]],
  ["1Pet","1 Peter","1 Pierre","NT",5,["1 pet","1pet","1 peter","1 pierre","1 pi"]],
  ["2Pet","2 Peter","2 Pierre","NT",3,["2 pet","2pet","2 peter","2 pierre"]],
  ["1John","1 John","1 Jean","NT",5,["1 john","1john","1 jn","1 jean","i john","i jean"]],
  ["2John","2 John","2 Jean","NT",1,["2 john","2john","2 jn","2 jean","ii john","ii jean"]],
  ["3John","3 John","3 Jean","NT",1,["3 john","3john","3 jn","3 jean","iii john","iii jean"]],
  ["Jude","Jude","Jude","NT",1,["jude"]],
  ["Rev","Revelation","Apocalypse","NT",22,["rev","revelation","apocalypse","apoc","apo"]],
]

export const BOOKS: BookInfo[] = raw.map(([id,en,fr,testament,chapters,aliases]) => ({
  id, en, fr, testament, chapters, aliases: [en, fr, ...aliases]
}))

export function bookById(id: string) {
  return BOOKS.find(b => b.id.toLowerCase() === id.toLowerCase())
}
