import Store from "stores";
import { action, makeObservable, observable, runInAction } from "mobx";

export default class ModalStore {
  @observable modal: any = {
    isShow: false,
    body: null,
    type: null,
  };

  store: Store;
  constructor(store: Store) {
    this.store = store;

    makeObservable(this);
  }

  @action
  public showModal = (body: string | any = null) => {
    runInAction(() => {
      this.modal = body;
    });

    setTimeout(() => {
      runInAction(() => {
        this.modal.isShow = true;
      });
    }, 100);
  };

  @action
  public closeModal = () => {
    runInAction(() => {
      this.modal.isShow = false;
    });

    setTimeout(() => {
      runInAction(() => {
        this.modal.body = null;
      });
    }, 100);
  };
}
