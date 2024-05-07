export default class Abbreviation {
  static text(text: string, limit: number) {
    if (text?.length > limit) {
      return text.substring(0, limit - 3) + "...";
    }

    return text;
  }

  static splitAll = (str: string, find?: any, replace?: string) => {
    let text = str;
    find.map((item: any) => (text = text.split(item).join(replace)));

    return text;
  };

  static capitalize = (word: string) => {
    return word?.charAt(0).toLocaleUpperCase() + word?.slice(1);
  };
}
