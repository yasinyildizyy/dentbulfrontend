import { Stringify } from "../utils";

import ApiStore from "./apiStore";
import MainStore from "./mainStore";
import BlogStore from "./blogStore";
import ModalStore from "./modalStore";
import TreatmentStore from "./treatmentStore";
import TestimonialsStore from "./testimonialsStore";

declare global {
  interface Window {
    store: Store;
  }
}
export default class Store {
  public apiStore = new ApiStore(this);
  public mainStore = new MainStore(this);
  public blogStore = new BlogStore(this);
  public modalStore = new ModalStore(this);
  public treatmentStore = new TreatmentStore(this);
  public testimonialsStore = new TestimonialsStore(this);

  [name: string]: any;

  public export = (): string => JSON.stringify(Stringify(this));
}
