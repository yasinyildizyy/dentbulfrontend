import React, { useEffect, useRef, useState } from "react";
import { inject, observer } from "mobx-react";
import { NextSeo } from "next-seo";
import { useTranslation } from "react-i18next";
import Store from "stores";
import { LoadingBar, StepImageChoice } from "components";
import { ModalProvider } from "components/modals";
import { toJS } from "mobx";
import { StepComplete, StepForm, StepPrepare } from "components/quizSteps";
import { useRouter } from "next/router";

interface IJourneyPlanProps {
  store?: Store | any;
  settings: any;
  locale: string;
}

const isDEV = process.env.NODE_ENV === "development";

const JourneyPlan = ({ store, locale, settings }: IJourneyPlanProps) => {
  const { t } = useTranslation("common");
  const quizRef: any = useRef(null);
  const whatsappNumber = settings?.filter((filter: any) => filter.uniqueName === "whatsapp")[0].extensions[0];
  const modal = toJS(store.modalStore.modal);

  let isLeave = true;
  useEffect(() => {
    const handleTabClose = async (event: any) => {
      event.preventDefault();
      if (!isDEV) onTabCloseSubmit();
      return (event.returnValue = "Are you sure you want to exit?");
    };

    window.addEventListener("beforeunload", handleTabClose);

    return () => {
      window.removeEventListener("beforeunload", handleTabClose);
    };
  }, []);

  const onTabCloseSubmit = async () => {
    if (!isLeave) return;
    isLeave = false;

    const form = {
      fullName: "empty",
      email: "empty@dentbul.com",
      phoneNumber: "empty",
      subject: "empty",
      message: "empty",
      locale: locale,
      extensions: [
        {
          title: "empty",
          value: "empty",
        },
      ],
    };

    await store.mainStore.postContact(locale, form);
  };

  const quiz = [
    {
      id: 1,
      question: t("quiz.questions.q.q"),
      type: "image-choice",
      note: "",
      loading: t("quiz.questions.q.loading"),
      answers: [
        {
          id: 1,
          img: "/images/quiz/q-a1.png",
          text: t("quiz.questions.q.a1"),
        },
        {
          id: 2,
          img: "/images/quiz/q-a4.png",
          text: t("quiz.questions.q.a2"),
        },
        {
          id: 3,
          img: "/images/quiz/q-a2.png",
          text: t("quiz.questions.q.a3"),
        },
        {
          id: 4,
          img: "/images/quiz/q-a3.png",
          text: t("quiz.questions.q.a4"),
        },
      ],
    },
    {
      id: 2,
      question: t("quiz.questions.q1.q"),
      type: "image-choice",
      note: "",
      loading: t("quiz.questions.q1.loading"),
      answers: [
        {
          id: 1,
          img: "/images/quiz/q1-a1.png",
          text: t("quiz.questions.q1.a1"),
        },
        {
          id: 2,
          img: "/images/quiz/q1-a2.png",
          text: t("quiz.questions.q1.a2"),
        },
      ],
    },
    {
      id: 3,
      question: t("quiz.questions.q2.q"),
      type: "image-choice",
      note: "",
      loading: t("quiz.questions.q2.loading"),
      answers: [
        {
          id: 1,
          img: "/images/quiz/q2-a1.png",
          text: t("quiz.questions.q2.a1"),
        },
        {
          id: 2,
          img: "/images/quiz/q2-a2.png",
          text: t("quiz.questions.q2.a2"),
        },
        {
          id: 3,
          img: "/images/quiz/q2-a3.png",
          text: t("quiz.questions.q2.a3"),
        },
        {
          id: 4,
          img: "/images/quiz/q2-a4.png",
          text: t("quiz.questions.q2.a4"),
        },
        {
          id: 5,
          img: "/images/quiz/q2-a5.png",
          text: t("quiz.questions.q2.a5"),
        },
      ],
    },
    {
      id: 4,
      question: t("quiz.questions.q3.q"),
      type: "image-choice",
      note: "",
      loading: t("quiz.questions.q3.loading"),
      answers: [
        {
          id: 1,
          img: "/images/quiz/q3-a1.png",
          text: t("quiz.questions.q3.a1"),
        },
        {
          id: 2,
          img: "/images/quiz/q3-a2.png",
          text: t("quiz.questions.q3.a2"),
        },
        {
          id: 3,
          img: "/images/quiz/q3-a3.png",
          text: t("quiz.questions.q3.a3"),
        },
        {
          id: 4,
          img: "/images/quiz/q3-a4.png",
          text: t("quiz.questions.q3.a4"),
        },
        {
          id: 5,
          img: "/images/quiz/q3-a5.png",
          text: t("quiz.questions.q3.a5"),
        },
      ],
    },
    {
      id: 5,
      question: t("quiz.questions.q4.q"),
      type: "image-choice",
      note: t("quiz.questions.q4.note"),
      loading: t("quiz.questions.q4.loading"),
      answers: [
        {
          id: 1,
          img: "/images/quiz/q4-a1.png",
          text: t("quiz.questions.q4.a1"),
        },
        {
          id: 2,
          img: "/images/quiz/q4-a2.png",
          text: t("quiz.questions.q4.a2"),
        },
      ],
    },
    {
      id: 6,
      question: t("quiz.questions.q5.q"),
      type: "image-choice",
      note: "",
      loading: t("quiz.questions.q5.loading"),
      answers: [
        {
          id: 1,
          img: "/images/quiz/q5-a1.png",
          text: t("quiz.questions.q5.a1"),
        },
        {
          id: 2,
          img: "/images/quiz/q5-a2.png",
          text: t("quiz.questions.q5.a2"),
        },
      ],
    },
    {
      id: 7,
      question: t("quiz.questions.q6.q"),
      type: "image-choice",
      note: "",
      loading: t("quiz.questions.q6.loading"),
      answers: [
        {
          id: 1,
          img: "/images/quiz/q6-a1.png",
          text: t("quiz.questions.q6.a1"),
        },
        {
          id: 2,
          img: "/images/quiz/q6-a2.png",
          text: t("quiz.questions.q6.a2"),
        },
        {
          id: 3,
          img: "/images/quiz/q6-a3.png",
          text: t("quiz.questions.q6.a3"),
        },
        {
          id: 4,
          img: "/images/quiz/q6-a4.png",
          text: t("quiz.questions.q6.a4"),
        },
      ],
    },
    {
      id: 8,
      question: t("quiz.questions.q7.q"),
      type: "image-choice",
      note: "",
      loading: t("quiz.questions.q7.loading"),
      answers: [
        {
          id: 1,
          img: "/images/quiz/q7-a1.png",
          text: t("quiz.questions.q7.a1"),
        },
        {
          id: 2,
          img: "/images/quiz/q7-a2.png",
          text: t("quiz.questions.q7.a2"),
        },
      ],
    },
    {
      id: 9,
      question: t("quiz.questions.q8.q"),
      type: "image-choice",
      note: t("quiz.questions.q8.note"),
      loading: t("quiz.questions.q8.loading"),
      isForm: {
        show: true,
      },
      answers: [
        {
          id: 1,
          img: "/images/quiz/q8-a1.png",
          text: t("quiz.questions.q8.a1"),
        },
        {
          id: 2,
          img: "/images/quiz/q8-a2.png",
          text: t("quiz.questions.q8.a2"),
        },
        {
          id: 3,
          img: "/images/quiz/q8-a3.png",
          text: t("quiz.questions.q8.a3"),
        },
      ],
    },
  ];

  const router = useRouter();
  const [body, setBody]: any = useState([]);
  const [currentStep, setStep]: any = useState(quiz[0]);
  const [subStep, setSubStep]: any = useState(null);

  const changeStep = (id: number) => {
    store.modalStore.closeModal();
    if (quiz.length === id) {
      setStep({ id: currentStep.id + 1, type: "prepare" });
    } else {
      setStep(quiz[id]);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const onSubmit = (data: any) => {
    const { quizId, answer } = data;
    if (!quizId) {
      setStep({ type: !answer?.text ? "form" : "complete" });

      if (answer?.text) {
        isLeave = false;
      }
      return;
    }

    if (quiz[quiz?.length - 1]?.id !== currentStep?.id) {
      store.modalStore.showModal({
        isShow: true,
        body: (
          <LoadingBar
            content={currentStep?.loading}
            onAction={() => {
              if (quizId === 1) {
                if (answer.answerId === 2) {
                  router.push("/results/before-after");
                  return;
                }

                if ([1, 3].includes(answer.answerId)) {
                  setStep({ type: "form" });
                  setSubStep(answer);
                } else {
                  changeStep(2);
                }
                store.modalStore.closeModal();
              } else {
                changeStep(quizId);
              }
            }}
          />
        ),
        type: "stage-loading",
      });
    } else {
      changeStep(quizId);
    }

    const newBody = body;
    newBody.push({
      title: currentStep.question,
      value: answer?.text,
    });

    setBody(newBody);
  };

  const steps: any = {
    "image-choice": (
      <StepImageChoice
        store={store}
        locale={locale}
        data={currentStep}
        onSubmit={(data: any) => onSubmit(data)}
        body={body}
      />
    ),
    prepare: (
      <StepPrepare
        title={t("quiz.loading.title")}
        completedText={t("quiz.loading.completed")}
        data={[
          { key: 1, value: t("quiz.loading.stage1") },
          { key: 2, value: t("quiz.loading.stage2") },
          { key: 3, value: t("quiz.loading.stage3") },
        ]}
        onSubmit={(data: any) => onSubmit(data)}
      />
    ),
    form: (
      <StepForm
        store={store}
        locale={locale}
        subStep={subStep}
        whatsappNumber={whatsappNumber}
        data={{
          title: t("breadcrumbs.quiz.page-title"),
          noteTitle: t("quiz.complete.note-title"),
          online: t("quiz.complete.online"),
          completed: t("quiz.complete.completed"),
          note: t("quiz.complete.note"),
          congrats: t("quiz.complete.congrats"),
          personal: t("quiz.complete.personal"),
        }}
        body={body}
        onSubmit={(data: any) => onSubmit(data)}
      />
    ),
    complete: <StepComplete whatsappNumber={whatsappNumber} />,
  };

  return (
    <>
      <NextSeo title={t("seo.quiz")} />
      {modal && modal.isShow && modal?.type === "stage-loading" && (
        <ModalProvider isCloseAction={false}>{modal.body}</ModalProvider>
      )}

      <div className="p-quiz">
        <>
          <div ref={quizRef} className="quiz">
            {currentStep.id === 1 && <h5 className="quiz-description">{t("quiz.description")}</h5>}

            {quiz.length >= currentStep.id && (
              <div className="quiz__loading">
                <div className="c-loading--bar">
                  <h4>{t("breadcrumbs.quiz.page-title")}</h4>
                  <div className="progress">
                    <div className="bar" style={{ width: `${(100 / quiz.length) * currentStep.id}%` }} />
                  </div>
                </div>
              </div>
            )}

            <div className="quiz__elements">{steps[currentStep?.type]}</div>
          </div>
        </>
      </div>
    </>
  );
};

JourneyPlan.getInitialProps = async ({ ctx }: any) => {
  const store = new Store();
  const settingsResponse = await store.mainStore.getSettings(ctx?.locale);

  return {
    locale: ctx?.locale,
    settings: settingsResponse?.data?.["hydra:member"],
  };
};

JourneyPlan.pageConfig = {
  header: {
    topHeader: false,
    navbar: true,
  },
  footer: false,
  whatsappVisible: false,
};

export default inject("store")(observer(JourneyPlan));
