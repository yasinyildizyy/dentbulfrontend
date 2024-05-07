import React, { useState } from "react";
import { inject, observer } from "mobx-react";
import { Trans, useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import { ContactForm } from "components/form";
import { toJS } from "mobx";
import PhoneInput from "react-phone-input-2";
import { Abbreviation } from "utils";
import { ModalProvider } from "components/modals";

interface IStepFormProps {
  body?: any;
  data?: any;
  store?: any;
  locale: string;
  subStep?: any;
  onSubmit?: any;
  whatsappNumber: any;
}

const StepForm = ({ store, locale, subStep, whatsappNumber, data, body, onSubmit }: IStepFormProps) => {
  const { t } = useTranslation("common");
  const [modalType, setModalType]: any = useState(null);
  const modal = toJS(store.modalStore.modal);
  const subStep1 = subStep?.answerId === 1;

  const PricingTable = () => (
    <table className="prices-table">
      <thead>
        <tr>
          <th>
            {t("prices.treatment")} / {t("prices.price")}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{t("prices.zirconium-coating.value")}</td>
          <td>{t("prices.zirconium-coating.price")}</td>
        </tr>
        <tr>
          <td>{t("prices.emax-coating.value")}</td>
          <td>{t("prices.emax-coating.price")}</td>
        </tr>
        <tr>
          <td>{t("prices.porcelain-veneer.value")}</td>
          <td>{t("prices.porcelain-veneer.price")}</td>
        </tr>
        <tr>
          <td>{t("prices.native-implant.value")}</td>
          <td>{t("prices.native-implant.price")}</td>
        </tr>
        <tr>
          <td>{t("prices.medentika-implant.value")}</td>
          <td>{t("prices.medentika-implant.price")}</td>
        </tr>
        <tr>
          <td>{t("prices.swiss-implant.value")}</td>
          <td>{t("prices.swiss-implant.price")}</td>
        </tr>
        <tr>
          <td>{t("prices.x-ray-and-examination.value")}</td>
          <td>
            <Trans components={{ span: <span /> }}>{t("prices.x-ray-and-examination.price")}</Trans>
          </td>
        </tr>
        <tr>
          <td>{t("prices.accommodation.value")}</td>
          <td>
            <Trans components={{ span: <span /> }}>{t("prices.accommodation.price")}</Trans>
          </td>
        </tr>
        <tr>
          <td>{t("prices.vip-transfer.value")}</td>
          <td>
            <Trans components={{ span: <span /> }}>{t("prices.vip-transfer.price")}</Trans>
          </td>
        </tr>
        <tr>
          <td>{t("prices.teeth-whitening.value")}</td>
          <td>
            <Trans components={{ span: <span /> }}>{t("prices.teeth-whitening.price")}</Trans>
          </td>
        </tr>
        <tr>
          <td>{t("prices.interpreter-service.value")}</td>
          <td>
            <Trans components={{ span: <span /> }}>{t("prices.interpreter-service.price")}</Trans>
          </td>
        </tr>
      </tbody>
    </table>
  );

  const submit = async (values: any, { resetForm }: { resetForm: any }) => {
    const form = {
      fullName: "QUIZ",
      subject: "QUIZ",
      message: "QUIZ",
      email: values?.email || "quiz@dentbul.com",
      phoneNumber: values.phoneNumber
        ? `${Abbreviation.splitAll(values.phoneNumber, ["(", ")", "-", " "], "")}`
        : "QUIZ",
      extensions: body,
    };

    const response: any = await store.mainStore.postContact(locale, form);
    if (response && response?.status === 201) {
      if (subStep1) {
        setModalType("show-pricing");
        store.modalStore.showModal({
          isShow: true,
          body: <PricingTable />,
          type: "show-pricing",
        });
      } else {
        onSubmit({
          quizId: null,
          answer: {
            answerId: null,
            text: "complete",
          },
        });
      }
      resetForm(values);
    }
  };

  const closeAction = () => {
    store.modalStore.closeModal();
    onSubmit({
      quizId: null,
      answer: {
        answerId: null,
        text: "complete",
      },
    });
  };

  const initialValues: any = {
    phoneNumber: "",
  };

  return (
    <React.Fragment>
      {modal && modal.isShow && modal?.type === modalType && (
        <ModalProvider showCloseButton isCloseAction={closeAction}>
          {modal.body}
        </ModalProvider>
      )}

      <div className="quiz__elements--form">
        <div className="container">
          {!subStep && (
            <div className="banner">
              <span>
                <Trans count={Math.floor(Math.random() * 31) + 30} components={{ strong: <strong /> }}>
                  {data?.congrats}
                </Trans>
              </span>
            </div>
          )}

          <div className="row">
            <div className="col col-12 col-lg-8 grid-left">
              {subStep ? (
                <div className="row">
                  <div className="col col-12">
                    <h1>{t(subStep1 ? "quiz.questions.q.a1" : "quiz.questions.q.a3")}</h1>
                    <p className="sub-title">
                      <Trans components={{ br: <br /> }}>
                        {t(subStep1 ? "email-or-phone.description" : "free-consultation.form.sub-title")}
                      </Trans>
                    </p>

                    {subStep1 ? (
                      <div className="quiz__elements--form">
                        <Formik
                          initialValues={initialValues}
                          enableReinitialize
                          onSubmit={submit}
                          validationSchema={Yup.lazy((values) =>
                            Yup.object().shape({
                              email: Yup.string()
                                .email(t("form.contact.elements.email.validations.matches"))
                                .required(() => {
                                  if (!values.phoneNumber) {
                                    return t("form.contact.elements.email.validations.required");
                                  }
                                }),
                              phoneNumber: Yup.string()
                                .min(7, t("form.contact.elements.phone.validations.required", { length: 7 }))
                                .required(() => {
                                  if (!values.email) {
                                    return t("form.contact.elements.phone.validations.required");
                                  }
                                }),
                            }),
                          )}
                        >
                          {({
                            errors,
                            values,
                            touched,
                            handleBlur,
                            isSubmitting,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                          }: {
                            errors: any;
                            values: any;
                            touched: any;
                            handleBlur: any;
                            handleSubmit: any;
                            handleChange: any;
                            isSubmitting: boolean;
                            setFieldValue: any;
                          }) => (
                            <Form className="c-form">
                              <div className="row">
                                <div className="col col-12 col-md-5 col-lg-5">
                                  <div className="form-group">
                                    <Field name="phoneNumber">
                                      {({ field }: any) => (
                                        <PhoneInput
                                          {...field}
                                          country="us"
                                          specialLabel=""
                                          name="phoneNumber"
                                          inputProps={{ name: "phoneNumber" }}
                                          onChange={(e) => {
                                            setFieldValue("phoneNumber", e);
                                            handleChange(e);
                                          }}
                                          onlyCountries={["us", "de", "es", "tr", "ru"]}
                                          value={null}
                                          onBlur={handleBlur}
                                          placeholder={t("form.contact.elements.phone.placeholder")}
                                        />
                                      )}
                                    </Field>

                                    {touched?.phoneNumber && errors?.phoneNumber && (
                                      <div className="invalid-feedback" style={{ display: "block" }}>
                                        {errors?.phoneNumber}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col col-12 col-md-2 col-lg-2 d-flex align-items-center justify-content-center my-3">
                                  <span>{t("or")}</span>
                                </div>

                                <div className="col col-12 col-md-5 col-lg-5">
                                  <div className="form-group">
                                    <Field
                                      id="email"
                                      name="email"
                                      type="text"
                                      value={values.email || ""}
                                      className={cx("form-control", {
                                        error: touched?.email && errors?.email,
                                      })}
                                      placeholder={t("form.contact.elements.email.placeholder")}
                                    />

                                    {touched?.email && errors?.email && (
                                      <div className="invalid-feedback" style={{ display: "block" }}>
                                        {errors?.email}
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="col col-12 button">
                                  <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    onClick={handleSubmit}
                                    className="btn-primary"
                                  >
                                    {t("quiz.questions.q.a1")}
                                  </button>
                                </div>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    ) : (
                      <ContactForm store={store} locale={locale} isShow={{ right: false, row: false }} />
                    )}
                  </div>
                </div>
              ) : (
                <React.Fragment>
                  <h1>{data?.title}</h1>
                  <p className="sub-title">
                    <Trans components={{ br: <br /> }}>{data?.completed}</Trans>
                  </p>
                  <div className="quiz__elements--form">
                    <Formik
                      initialValues={initialValues}
                      enableReinitialize
                      onSubmit={submit}
                      validationSchema={Yup.lazy(() =>
                        Yup.object().shape({
                          phoneNumber: Yup.string()
                            .min(7, t("form.contact.elements.phone.validations.required", { length: 7 }))
                            .required(t("form.contact.elements.phone.validations.required")),
                        }),
                      )}
                    >
                      {({
                        errors,
                        touched,
                        handleBlur,
                        isSubmitting,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                      }: {
                        errors: any;
                        touched: any;
                        handleBlur: any;
                        handleSubmit: any;
                        handleChange: any;
                        isSubmitting: boolean;
                        setFieldValue: any;
                      }) => (
                        <Form className="c-form">
                          <div className="row">
                            <div className="col col-12 col-lg-6">
                              <div className="form-group">
                                <h6>{t("form.contact.elements.phone.placeholder")}</h6>
                                <Field name="phoneNumber">
                                  {({ field }: any) => (
                                    <PhoneInput
                                      {...field}
                                      country="us"
                                      specialLabel=""
                                      name="phoneNumber"
                                      inputProps={{ name: "phoneNumber" }}
                                      onChange={(e) => {
                                        setFieldValue("phoneNumber", e);
                                        handleChange(e);
                                      }}
                                      onlyCountries={["us", "de", "es", "tr", "ru"]}
                                      value={null}
                                      onBlur={handleBlur}
                                      placeholder={t("form.contact.elements.phone.placeholder")}
                                    />
                                  )}
                                </Field>

                                {touched?.phoneNumber && errors?.phoneNumber && (
                                  <div className="invalid-feedback" style={{ display: "block" }}>
                                    {errors?.phoneNumber}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col col-12 col-lg-6"></div>

                            <div className="col col-12 button">
                              <button
                                type="submit"
                                disabled={isSubmitting}
                                onClick={handleSubmit}
                                className="btn-primary"
                              >
                                {t("quiz.complete.start-free")}
                              </button>

                              <span>
                                <small className="px-3 py-3"> or </small>
                                <a
                                  href={whatsappNumber?.key}
                                  className="btn-online animation-none btn-online p-3"
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <i className="icofont-whatsapp"></i>
                                  <b className="m-2">{t("form.contact.whatsapp")}</b>
                                </a>
                              </span>
                            </div>
                          </div>
                        </Form>
                      )}
                    </Formik>
                  </div>
                  <div className="notes">
                    <div className="d-flex align-items-center mb-2">
                      <i className="icofont-info-circle fs-5"></i>
                      <h5>{data?.noteTitle}</h5>
                    </div>
                    <p>
                      <Trans components={{ br: <br /> }}>{data?.note}</Trans>
                    </p>
                  </div>
                </React.Fragment>
              )}
            </div>
            <div className="col col-12 col-lg-4 grid-right">
              <div className="customer-agent">
                <img src="/images/mt.png" draggable="false" />

                <a href={whatsappNumber?.key} className="online" target={"_blank"} rel="noreferrer">
                  <i className="icofont-whatsapp" />
                  <span>{data?.online}</span>
                </a>

                <div className="help-us">
                  <span>
                    <Trans components={{ strong: <strong /> }}>{data?.personal}</Trans>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default inject("store")(observer(StepForm));
