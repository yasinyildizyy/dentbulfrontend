import Store from "stores";
import { action, makeObservable } from "mobx";
import buildUrl from "build-url";
import { ITreatmentProps } from "interfaces";

export default class TreatmentStore {
  store: Store;
  constructor(store: Store) {
    this.store = store;

    makeObservable(this);
  }

  @action
  public getTreatments = async ({
    page = "1",
    itemsPerPage = "6",
    pagination = "false",
    order = "asc",
    isShowHomepage,
    locale,
  }: ITreatmentProps) => {
    const { apiStore } = this.store;

    const url = buildUrl("/cures", {
      queryParams: {
        page: page,
        pagination: pagination,
        itemsPerPage: itemsPerPage,
        "order[position]": order,
        isShowHomepage: isShowHomepage,
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };

  @action
  public getTreatmentDetail = async (locale: string, slug: any) => {
    const { apiStore } = this.store;

    const url = buildUrl("/cures/" + slug, {
      queryParams: {
        locale: locale,
      },
    });

    const { data, status } = await apiStore.fetch({
      method: "get",
      url: url,
      auth: true,
    });

    return { data, status };
  };
}
