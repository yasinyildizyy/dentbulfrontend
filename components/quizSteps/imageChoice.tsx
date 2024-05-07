import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import { useTranslation } from "react-i18next";

interface IStepImageChoiceProps {
  data?: any;
  onSubmit?: any;
  isForm?: any;
  store: any;
  locale: any;
  body: any;
}

const StepMultipleImageChoice = ({ store, locale, data, body, onSubmit }: IStepImageChoiceProps) => {
  const { t } = useTranslation("common");

  const [stageInfo, setStageInfo]: any = useState({
    quizId: 1,
    answer: {
      answerId: 1,
      text: "",
    },
  });
  const submit = async (values: any, { resetForm }: { resetForm: any }) => {
    const form = {
      fullName: "QUIZ",
      subject: "QUIZ",
      message: "QUIZ",
      email: values?.email,
      phoneNumber: "QUIZ",
      extensions: body,
    };

    const response: any = await store.mainStore.postContact(locale, form);
    if (response && response?.status === 201) {
      onSubmit(stageInfo);
      resetForm(values);
    }
  };

  return (
    <div className="quiz__elements--image-choice">
      <div className="heading">
        <h3>{data?.question}</h3>
        {data?.note && <p>{data?.note}</p>}
      </div>

      {data?.isForm?.show ? (
        <div className="form">
          <div className="pb-32">
            <Formik
              initialValues={{
                email: "",
              }}
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
                }),
              )}
            >
              {({
                touched,
                values,
                errors,
                isSubmitting,
                handleSubmit,
              }: {
                touched: any;
                errors: any;
                values: any;
                handleSubmit: any;
                isSubmitting: boolean;
              }) => (
                <Form className="c-form">
                  <div className="row">
                    <div className="col col-12 col-lg-4" />
                    <div className="col col-12 col-lg-4">
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
                          <div className="text-center fw-semibold invalid-feedback" style={{ display: "block" }}>
                            {errors?.email}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col col-12 col-lg-4" />
                  </div>

                  <div className="row pt-5">
                    <div className="col-12">
                      <div className="answers">
                        {data?.answers?.map((item: any, index: number) => (
                          <a
                            key={index}
                            className={cx("answers--item", {
                              "pe-none": isSubmitting,
                            })}
                            style={{
                              backgroundImage: `url(${item.img})`,
                              backgroundSize: item?.options?.size || "cover",
                            }}
                            onClick={(values) => {
                              setStageInfo({
                                quizId: data?.id,
                                answer: {
                                  answerId: item.id,
                                  text: item.text,
                                },
                              });
                              handleSubmit(values);
                            }}
                          >
                            <span>{item.text}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      ) : (
        <div className="answers">
          {data?.answers?.map((item: any, index: number) => (
            <a
              key={index}
              className="answers--item"
              style={{
                backgroundImage: `url(${item.img})`,
                backgroundSize: item?.options?.size || "cover",
              }}
              onClick={() => {
                onSubmit({
                  quizId: data?.id,
                  answer: {
                    answerId: item?.id,
                    text: item?.text,
                  },
                });
              }}
            >
              <span>{item.text}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepMultipleImageChoice;
