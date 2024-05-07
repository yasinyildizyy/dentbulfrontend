import React, { useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import { IContactProps } from "interfaces";
import PhoneInput from "react-phone-input-2";
import Store from "stores";

interface IContactFormProps {
  store: Store | any;
  contact?: any;
  content?: any;
  locale: string;
  isShow?: any;
}

const initialContactValues: IContactProps = {
  fullName: "",
  email: "",
  phoneNumber: "",
  subject: "",
  message: "",
};

const ContactForm = ({
  store,
  content,
  contact,
  locale,
  isShow = {
    right: true,
    row: true,
  },
}: IContactFormProps) => {
  const { t } = useTranslation("common");
  const [formMessage, setFormMessage]: any = useState({
    status: false,
    message: t("form.contact.response.success"),
    type: "success",
  });

  const onSubmit = async (values: IContactProps, { resetForm }: { resetForm: any }) => {
    const response: any = await store.mainStore.postContact(locale, values);
    if (response && response?.status === 201) {
      resetForm(initialContactValues);
      setFormMessage({
        status: true,
        message: t("form.contact.response.success"),
        type: "success",
      });
    } else {
      setFormMessage({
        status: true,
        message: t("form.contact.response.error"),
        type: "error",
      });
    }
  };

  return (
    <section className="p-contact__form drop-area">
      <div
        className={cx("row", {
          "visible-row": !isShow?.row,
        })}
      >
        <div
          className={cx("p-0", {
            "col-lg-7": isShow.right,
            "col-lg-12": !isShow.right,
          })}
        >
          <div className="drop-item">
            <div
              className={cx("drop-left", {
                "mw-100": !isShow.right,
                "p-0": !isShow.right,
              })}
            >
              <div className="contact-form form-style-3">
                {content?.title && <h2 className="mb-2">{content?.title}</h2>}
                {content?.description && <p className="mb-5">{content?.description}</p>}

                <Formik
                  initialValues={initialContactValues}
                  enableReinitialize
                  onSubmit={onSubmit}
                  validationSchema={Yup.object().shape({
                    fullName: Yup.string()
                      .max(100, t("form.contact.elements.full-name.validations.max", { length: 100 }))
                      .matches(/^[a-zA-ZöÖüÜşŞıİçÇğĞ ]+$/, t("form.contact.elements.full-name.validations.matches"))
                      .required(t("form.contact.elements.full-name.validations.required")),
                    email: Yup.string()
                      .email(t("form.contact.elements.email.validations.matches"))
                      .required(t("form.contact.elements.email.validations.required")),
                    subject: Yup.string()
                      .min(3, t("form.contact.elements.subject.validations.min", { length: 3 }))
                      .max(80, t("form.contact.elements.subject.validations.max", { length: 80 }))
                      .required(t("form.contact.elements.subject.validations.required")),
                    phoneNumber: Yup.string()
                      .min(7, t("form.contact.elements.phone.validations.required", { length: 7 }))
                      .required(t("form.contact.elements.phone.validations.required")),
                    message: Yup.string()
                      .min(3, t("form.contact.elements.message.validations.min", { length: 3 }))
                      .max(300, t("form.contact.elements.message.validations.max", { length: 300 }))
                      .required(t("form.contact.elements.message.validations.required")),
                  })}
                >
                  {({
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    setFieldValue,
                  }: {
                    values: any;
                    touched: any;
                    errors: any;
                    handleSubmit: any;
                    handleBlur: any;
                    setFieldValue: any;
                    handleChange: any;
                    isSubmitting: boolean;
                  }) => (
                    <Form>
                      <div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <Field
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={values?.fullName || ""}
                                className={cx("form-control", {
                                  error: touched?.fullName && errors?.fullName,
                                })}
                                placeholder={t("form.contact.elements.full-name.placeholder")}
                              />

                              {touched?.fullName && errors?.fullName && (
                                <div className="invalid-feedback" style={{ display: "block" }}>
                                  {errors?.fullName}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
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

                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <Field name="phoneNumber">
                                {({ field }: any) => (
                                  <div className="form-phone">
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
                                  </div>
                                )}
                              </Field>

                              {touched?.phoneNumber && errors?.phoneNumber && (
                                <div className="invalid-feedback" style={{ display: "block" }}>
                                  {errors?.phoneNumber}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6">
                            <div className="form-group">
                              <Field
                                id="subject"
                                name="subject"
                                type="text"
                                value={values.subject || ""}
                                className={cx("form-control", {
                                  error: touched?.subject && errors?.subject,
                                })}
                                placeholder={t("form.contact.elements.subject.placeholder")}
                              />

                              {touched?.subject && errors?.subject && (
                                <div className="invalid-feedback" style={{ display: "block" }}>
                                  {errors?.subject}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-lg-12 col-md-12">
                            <div className="form-group">
                              <Field
                                id="message"
                                name="message"
                                type="text"
                                as="textarea"
                                rows={6}
                                value={values.message || ""}
                                className={cx("form-control h-auto", {
                                  error: touched?.message && errors?.message,
                                })}
                                placeholder={t("form.contact.elements.message.placeholder")}
                              />

                              {touched?.message && errors?.message && (
                                <div className="invalid-feedback" style={{ display: "block" }}>
                                  {errors?.message}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-lg-12 col-sm-12">
                            {formMessage.status && (
                              <div className="mb-3">
                                <p
                                  className={cx("", {
                                    "fs-6 fw-semibold mt-0 text-success": formMessage.type === "success",
                                    "fs-6 fw-semibold mt-0 text-danger": formMessage.type === "error",
                                  })}
                                >
                                  <Trans t={t} components={{ br: <br /> }}>
                                    {formMessage.message}
                                  </Trans>
                                </p>
                              </div>
                            )}

                            <button type="submit" disabled={isSubmitting} onClick={handleSubmit} className="drop-btn">
                              {t("form.contact.button")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>

        {isShow.right && (
          <div className="col-lg-5 p-0">
            <div className="speciality-item speciality-right speciality-right-two speciality-right-three">
              <img src="/images/contact.jpg" alt="Contact" />

              {contact && (
                <a href={contact?.slug} target="_blank" className="speciality-emergency" rel="noreferrer">
                  <div className="speciality-icon">
                    <i className="icofont-whatsapp"></i>
                  </div>

                  <h3>{contact?.title}</h3>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
